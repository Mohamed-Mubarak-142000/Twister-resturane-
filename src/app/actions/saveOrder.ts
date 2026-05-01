"use server";

import { appendOrderToSheet } from "@/lib/googleSheets";

export interface OrderRecord {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  area: string;
  address: string;
  landmark: string;
  items: string;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  payment: string;
  notes: string;
  freeFries: boolean;
  coupon: string;
}

/**
 * Saves order to Google Sheets for production persistence.
 *
 * Production-ready implementation:
 * - Uses service account authentication
 * - 3 retry attempts with exponential backoff
 * - 5-second timeout per request
 * - Graceful degradation: WhatsApp still works if Sheets fails
 *
 * @returns { success: true } on successful save, { success: false, error } on failure
 */
export async function saveOrderAction(
  order: OrderRecord,
): Promise<{ success: boolean; error?: string }> {
  try {
    const result = await appendOrderToSheet(order);

    if (!result.success) {
      console.error(
        `[saveOrder] Failed to save order ${order.id}:`,
        result.error,
      );
    } else {
      console.log(
        `[saveOrder] Successfully saved order ${order.id} to Google Sheets`,
      );
    }

    return result;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error while saving order";
    console.error("[saveOrder] Unexpected error:", err);
    return { success: false, error: message };
  }
}
