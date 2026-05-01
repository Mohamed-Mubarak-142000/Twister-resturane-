#!/usr/bin/env node

/**
 * Verify Google Sheets access and list available sheets
 */

import { google } from "googleapis";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
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
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        process.env[key.trim()] = value;
      }
    }
  });
} catch (error) {
  console.error("❌ Failed to load .env.local");
  process.exit(1);
}

async function verify() {
  console.log("🔍 Verifying Google Sheets Access\n");
  console.log("Configuration:");
  console.log(`  Spreadsheet ID: ${process.env.GOOGLE_SHEETS_SPREADSHEET_ID}`);
  console.log(
    `  Service Account: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}\n`,
  );

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    console.log("📊 Attempting to access spreadsheet...");

    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    console.log("\n✅ SUCCESS! Access granted.\n");
    console.log(`Spreadsheet Title: "${response.data.properties.title}"`);
    console.log(`\nAvailable Sheets (${response.data.sheets.length}):`);

    response.data.sheets.forEach((sheet, index) => {
      const props = sheet.properties;
      console.log(
        `  ${index + 1}. "${props.title}" (${props.gridProperties.rowCount} rows × ${props.gridProperties.columnCount} cols)`,
      );
    });

    console.log(
      `\n💡 Your GOOGLE_SHEETS_SHEET_NAME should be one of the above (currently: "${process.env.GOOGLE_SHEETS_SHEET_NAME || "Orders"}")`,
    );

    // Check if the target sheet exists
    const targetSheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Orders";
    const sheetExists = response.data.sheets.some(
      (sheet) => sheet.properties.title === targetSheetName,
    );

    if (!sheetExists) {
      console.log(`\n⚠️  WARNING: Sheet "${targetSheetName}" not found!`);
      console.log(`   You need to either:`);
      console.log(
        `   1. Create a sheet tab named "${targetSheetName}" in your spreadsheet, OR`,
      );
      console.log(
        `   2. Update GOOGLE_SHEETS_SHEET_NAME in .env.local to match an existing sheet name`,
      );
    } else {
      console.log(`\n✅ Target sheet "${targetSheetName}" exists!`);
      console.log(`\nYou can now run: npm run sheet:init`);
    }
  } catch (error) {
    console.error("\n❌ FAILED to access spreadsheet\n");
    console.error("Error:", error.message);

    if (error.message.includes("permission")) {
      console.error("\n🔧 Action Required:");
      console.error(
        "   1. Open: https://docs.google.com/spreadsheets/d/" +
          process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      );
      console.error("   2. Click 'Share' button (top-right)");
      console.error(`   3. Add: ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`);
      console.error("   4. Set permission to: Editor");
      console.error("   5. Click 'Send'\n");
    } else if (error.message.includes("not found")) {
      console.error("\n🔧 Possible Issues:");
      console.error("   - Spreadsheet ID is incorrect");
      console.error("   - Spreadsheet was deleted");
      console.error("   - Wrong Google Cloud project\n");
    } else {
      console.error("\n🔧 Check:");
      console.error("   - Google Sheets API is enabled in Cloud Console");
      console.error("   - Private key is formatted correctly");
      console.error("   - Service account credentials are valid\n");
    }

    process.exit(1);
  }
}

verify().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
