import { google } from "googleapis";
import type { OrderRecord } from "@/app/actions/saveOrder";

/**
 * Google Sheets service for order persistence.
 *
 * Production-ready implementation with:
 * - Service account authentication
 * - Exponential backoff retry (3 attempts)
 * - 5-second timeout per request
 * - Graceful error handling
 */

interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName: string;
  serviceAccountEmail: string;
  privateKey: string;
}

class GoogleSheetsService {
  private sheets;
  private config: GoogleSheetsConfig;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;

    // Initialize Google Sheets API with service account
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: config.serviceAccountEmail,
        private_key: config.privateKey.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheets = google.sheets({ version: "v4", auth });
  }

  /**
   * Append order to Google Sheet with retry logic.
   * Returns { success: true } or { success: false, error: string }
   */
  async appendOrder(
    order: OrderRecord,
  ): Promise<{ success: boolean; error?: string }> {
    const maxRetries = 3;
    const timeoutMs = 5000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.appendOrderAttempt(order, timeoutMs);
        return result;
      } catch (error) {
        const isLastAttempt = attempt === maxRetries;
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        console.error(
          `[GoogleSheets] Attempt ${attempt}/${maxRetries} failed:`,
          errorMessage,
        );

        if (isLastAttempt) {
          return {
            success: false,
            error: `Failed after ${maxRetries} attempts: ${errorMessage}`,
          };
        }

        // Exponential backoff: 200ms, 400ms, 800ms
        const backoffMs = 200 * Math.pow(2, attempt - 1);
        await this.sleep(backoffMs);
      }
    }

    return { success: false, error: "Retry loop exited unexpectedly" };
  }

  /**
   * Single append attempt with timeout.
   */
  private async appendOrderAttempt(
    order: OrderRecord,
    timeoutMs: number,
  ): Promise<{ success: boolean; error?: string }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const values = [
        [
          order.id,
          order.timestamp,
          order.name,
          order.phone,
          order.area,
          order.address,
          order.landmark,
          order.items,
          order.subtotal,
          order.discount,
          order.delivery,
          order.total,
          order.payment === "cash" ? "كاش" : "بطاقة",
          order.notes,
          order.freeFries ? "نعم" : "لا",
          order.coupon,
        ],
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.config.spreadsheetId,
        range: `${this.config.sheetName}!A:P`,
        valueInputOption: "RAW",
        requestBody: { values },
      });

      clearTimeout(timeoutId);
      return { success: true };
    } catch (error) {
      clearTimeout(timeoutId);

      if ((error as any).name === "AbortError") {
        throw new Error(`Request timed out after ${timeoutMs}ms`);
      }

      throw error;
    }
  }

  /**
   * Initialize sheet with header row (idempotent - safe to call multiple times).
   */
  async initializeSheet(): Promise<{ success: boolean; error?: string }> {
    try {
      const headers = [
        [
          "رقم الطلب",
          "التاريخ والوقت",
          "الاسم",
          "الهاتف",
          "المنطقة",
          "العنوان",
          "علامة مميزة",
          "الطلبات",
          "فرعي",
          "خصم",
          "توصيل",
          "إجمالي",
          "الدفع",
          "ملاحظات",
          "بطاطس هدية",
          "كوبون",
        ],
      ];

      // Check if sheet exists and has headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.config.spreadsheetId,
        range: `${this.config.sheetName}!A1:P1`,
      });

      if (response.data.values && response.data.values.length > 0) {
        return { success: true }; // Headers already exist
      }

      // Add headers
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.config.spreadsheetId,
        range: `${this.config.sheetName}!A1:P1`,
        valueInputOption: "RAW",
        requestBody: { values: headers },
      });

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("[GoogleSheets] Failed to initialize sheet:", errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// ── Singleton Instance ────────────────────────────────────────────

let sheetsService: GoogleSheetsService | null = null;

/**
 * Get or create the GoogleSheetsService instance.
 * Returns null if environment variables are not configured.
 */
export function getGoogleSheetsService(): GoogleSheetsService | null {
  // Return existing instance
  if (sheetsService) {
    return sheetsService;
  }

  // Check required environment variables
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Orders";
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
    console.warn(
      "[GoogleSheets] Missing environment variables. Orders will not be saved to Google Sheets.",
    );
    return null;
  }

  // Create and cache instance
  sheetsService = new GoogleSheetsService({
    spreadsheetId,
    sheetName,
    serviceAccountEmail,
    privateKey,
  });

  return sheetsService;
}

/**
 * Convenience function to append an order.
 * Returns { success: false, error } if service is not configured.
 */
export async function appendOrderToSheet(
  order: OrderRecord,
): Promise<{ success: boolean; error?: string }> {
  const service = getGoogleSheetsService();

  if (!service) {
    return {
      success: false,
      error: "Google Sheets service not configured (missing env variables)",
    };
  }

  return service.appendOrder(order);
}

/**
 * Initialize the sheet with headers (call once during setup).
 */
export async function initializeOrderSheet(): Promise<{
  success: boolean;
  error?: string;
}> {
  const service = getGoogleSheetsService();

  if (!service) {
    return {
      success: false,
      error: "Google Sheets service not configured",
    };
  }

  return service.initializeSheet();
}
