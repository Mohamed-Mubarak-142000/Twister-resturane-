import { MENU_ITEMS } from "@/data/menu";
import type { MenuItem } from "@/types";

/**
 * Returns the top-N items sorted by sales popularity:
 *   1. reviewCount descending  (primary — proxy for order/sales volume)
 *   2. rating descending       (secondary tiebreaker)
 *
 * Items without reviewCount are ranked after rated items.
 * "additions" category is excluded (not a primary order item).
 *
 * When real order-count data becomes available from the backend, replace
 * the sort key with actual order frequency from the orders API/CSV.
 */
export function getBestSellers(limit = 8): MenuItem[] {
  return [...MENU_ITEMS]
    .filter((item) => item.category !== "additions")
    .sort((a, b) => {
      const rcA = a.reviewCount ?? 0;
      const rcB = b.reviewCount ?? 0;
      if (rcB !== rcA) return rcB - rcA;
      return (b.rating ?? 0) - (a.rating ?? 0);
    })
    .slice(0, limit);
}

/** Sum of all reviewCount values across all menu items. */
export function getTotalReviewCount(): number {
  return MENU_ITEMS.reduce((sum, item) => sum + (item.reviewCount ?? 0), 0);
}

/**
 * Formats an integer with Arabic-Indic digits.
 * e.g. 1380 → "١٣٨٠"
 */
export function toArabicNumerals(n: number): string {
  return n.toString().replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);
}
