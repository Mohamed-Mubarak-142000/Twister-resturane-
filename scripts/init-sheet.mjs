#!/usr/bin/env node

/**
 * Initialize Google Sheet with headers for order tracking.
 *
 * Usage:
 *   npm run sheet:init
 *
 * Prerequisites:
 *   1. .env.local file with Google Sheets credentials
 *   2. Sheet shared with service account email as Editor
 */

import { google } from "googleapis";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

try {
  const envContent = readFileSync(join(projectRoot, ".env.local"), "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      if (key && valueParts.length > 0) {
        let value = valueParts.join("=");
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        process.env[key.trim()] = value;
      }
    }
  });
} catch (error) {
  console.error("❌ Failed to load .env.local file");
  console.error("   Please create .env.local in project root");
  process.exit(1);
}

async function initializeSheet() {
  console.log("🚀 Initializing Google Sheet for orders...\n");

  // Check environment variables
  const requiredVars = [
    "GOOGLE_SHEETS_SPREADSHEET_ID",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_PRIVATE_KEY",
  ];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((varName) => console.error(`   - ${varName}`));
    console.error("\nPlease check .env.local file.");
    process.exit(1);
  }

  console.log("✓ Environment variables loaded");
  console.log(`✓ Spreadsheet ID: ${process.env.GOOGLE_SHEETS_SPREADSHEET_ID}`);
  console.log(
    `✓ Sheet Name: ${process.env.GOOGLE_SHEETS_SHEET_NAME || "Orders"}`,
  );
  console.log(
    `✓ Service Account: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}\n`,
  );

  // Initialize Google Sheets API
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Orders";

  console.log("📝 Creating/verifying header row...");

  try {
    // Check if headers already exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:P1`,
    });

    if (response.data.values && response.data.values.length > 0) {
      console.log("\n✅ Headers already exist in sheet!");
      console.log("   Skipping initialization (idempotent)");
    } else {
      // Add headers
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

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1:P1`,
        valueInputOption: "RAW",
        requestBody: { values: headers },
      });

      console.log("\n✅ Success! Headers created.");
    }

    console.log("\n📋 Expected columns (16 total):");
    console.log("   A: رقم الطلب (Order ID)");
    console.log("   B: التاريخ والوقت (Timestamp)");
    console.log("   C: الاسم (Name)");
    console.log("   D: الهاتف (Phone)");
    console.log("   E: المنطقة (Area)");
    console.log("   F: العنوان (Address)");
    console.log("   G: علامة مميزة (Landmark)");
    console.log("   H: الطلبات (Items)");
    console.log("   I: فرعي (Subtotal)");
    console.log("   J: خصم (Discount)");
    console.log("   K: توصيل (Delivery)");
    console.log("   L: إجمالي (Total)");
    console.log("   M: الدفع (Payment)");
    console.log("   N: ملاحظات (Notes)");
    console.log("   O: بطاطس هدية (Free Fries)");
    console.log("   P: كوبون (Coupon)");
    console.log("\n🎉 Google Sheet is ready!");
    console.log("   Run: npm run dev");
  } catch (error) {
    console.error("\n❌ Failed to initialize sheet:");
    console.error(`   ${error.message}`);
    console.error("\n🔍 Troubleshooting:");
    console.error("   1. Verify the spreadsheet ID is correct");
    console.error(
      "   2. Ensure the sheet is shared with the service account email",
    );
    console.error("   3. Check that Google Sheets API is enabled");
    console.error("   4. Verify the private key is correctly formatted\n");
    process.exit(1);
  }
}

initializeSheet().catch((error) => {
  console.error("\n❌ Unexpected error:", error.message);
  console.error(error.stack);
  process.exit(1);
});
