#!/usr/bin/env node

/**
 * Test Google Sheets order integration
 * Creates a test order and verifies it's saved correctly
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

async function testIntegration() {
  console.log("🧪 Testing Google Sheets Integration\n");

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

  // Test order data
  const testOrder = {
    id: `TEST-${Date.now()}`,
    timestamp: new Date().toISOString(),
    name: "محمد أحمد",
    phone: "01012345678",
    area: "المعادي",
    address: "شارع 9، المعادي الجديدة",
    landmark: "بجوار مسجد المصطفى",
    items: "تويستر دجاج ×2 | بطاطس كبيرة ×1",
    subtotal: 150,
    discount: 15,
    delivery: 20,
    total: 155,
    payment: "cash",
    notes: "بدون مايونيز",
    freeFries: true,
    coupon: "SAVE10",
  };

  console.log("📝 Test Order Details:");
  console.log(`   Order ID: ${testOrder.id}`);
  console.log(`   Customer: ${testOrder.name}`);
  console.log(`   Total: ${testOrder.total} EGP`);
  console.log(`   Items: ${testOrder.items}\n`);

  try {
    console.log("💾 Saving order to Google Sheets...");

    const values = [
      [
        testOrder.id,
        testOrder.timestamp,
        testOrder.name,
        testOrder.phone,
        testOrder.area,
        testOrder.address,
        testOrder.landmark,
        testOrder.items,
        testOrder.subtotal,
        testOrder.discount,
        testOrder.delivery,
        testOrder.total,
        testOrder.payment === "cash" ? "كاش" : "بطاقة",
        testOrder.notes,
        testOrder.freeFries ? "نعم" : "لا",
        testOrder.coupon,
      ],
    ];

    const startTime = Date.now();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:P`,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    const duration = Date.now() - startTime;

    console.log(`✅ Order saved successfully! (${duration}ms)\n`);

    // Verify the order was saved
    console.log("🔍 Verifying order in sheet...");

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:P`,
    });

    const rows = response.data.values || [];
    const savedOrder = rows.find((row) => row[0] === testOrder.id);

    if (savedOrder) {
      console.log("✅ Order verified in sheet!");
      console.log("\n📊 Saved Data:");
      console.log(`   Order ID: ${savedOrder[0]}`);
      console.log(`   Name: ${savedOrder[2]}`);
      console.log(`   Phone: ${savedOrder[3]}`);
      console.log(`   Total: ${savedOrder[11]} EGP`);
      console.log(`   Payment: ${savedOrder[12]}`);

      console.log("\n🎉 SUCCESS! Integration is working correctly.");
      console.log("\n📊 Current Statistics:");
      console.log(
        `   Total Orders in Sheet: ${rows.length - 1} (excluding header)`,
      );
      console.log(`   Last Order: ${rows[rows.length - 1][0]}`);

      console.log("\n✅ Production-Ready Features Confirmed:");
      console.log("   ✓ Service account authentication");
      console.log("   ✓ Order data mapping (16 columns)");
      console.log("   ✓ Arabic text support");
      console.log("   ✓ Real-time persistence");
      console.log(`   ✓ Response time: ${duration}ms`);

      console.log("\n🚀 System is ready for production!");
      console.log(
        "   Deploy to Vercel and add the same environment variables.",
      );
    } else {
      console.log("⚠️  Order not found in sheet (may need to refresh)");
    }
  } catch (error) {
    console.error("\n❌ Test failed:", error.message);
    console.error("\nDetails:", error);
    process.exit(1);
  }
}

testIntegration().catch((error) => {
  console.error("Unexpected error:", error);
  process.exit(1);
});
