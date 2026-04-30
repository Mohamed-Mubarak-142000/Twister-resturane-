"use server";

import { appendFile, mkdir, access } from "fs/promises";
import path from "path";

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

const HEADERS =
  "رقم الطلب,التاريخ والوقت,الاسم,الهاتف,المنطقة,العنوان,علامة مميزة,الطلبات,فرعي,خصم,توصيل,إجمالي,الدفع,ملاحظات,بطاطس هدية,كوبون\n";

function escapeCsv(val: string | number | boolean): string {
  const str = String(val);
  // Wrap in quotes if contains comma, quote, or newline
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Appends one order row to orders/orders.csv at project root.
 * File is created with UTF-8 BOM so Excel opens Arabic correctly.
 * NOTE: on serverless hosts (Vercel) the filesystem is read-only —
 * this works locally and on VPS deployments.
 */
export async function saveOrderAction(
  order: OrderRecord,
): Promise<{ success: boolean; error?: string }> {
  try {
    const dir = path.join(process.cwd(), "orders");

    // Ensure directory exists
    try {
      await access(dir);
    } catch {
      await mkdir(dir, { recursive: true });
    }

    const filePath = path.join(dir, "orders.csv");

    // Add BOM + headers if file is new
    try {
      await access(filePath);
    } catch {
      // \uFEFF = UTF-8 BOM — required for Excel to detect Arabic correctly
      await appendFile(filePath, "\uFEFF" + HEADERS, "utf-8");
    }

    const row =
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
      ]
        .map(escapeCsv)
        .join(",") + "\n";

    await appendFile(filePath, row, "utf-8");
    return { success: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error while saving order";
    console.error("[saveOrder] Failed to write order:", err);
    return { success: false, error: message };
  }
}
