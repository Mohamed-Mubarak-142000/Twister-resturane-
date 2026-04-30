"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, MenuItem, Size, Extra } from "@/types";
import {
  COUPON_CODES,
  FREE_FRIES_THRESHOLD,
  FREE_DELIVERY_THRESHOLD,
} from "@/constants/brand";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  couponDiscount: number;
  notes: string;

  // Actions
  addItem: (
    item: MenuItem,
    options?: {
      quantity?: number;
      selectedSize?: Size;
      selectedExtras?: Extra[];
      spicyLevel?: number;
      notes?: string;
    },
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setNotes: (notes: string) => void;

  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getDeliveryFee: (zoneId?: string) => number;
  getTotal: () => number;
  hasFreeFries: () => boolean;
}

const computeItemTotal = (item: CartItem): number => {
  let total = item.price;
  if (item.selectedSize) total += item.selectedSize.price;
  if (item.selectedExtras)
    total += item.selectedExtras.reduce((sum, e) => sum + e.price, 0);
  return total * item.quantity;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: null,
      couponDiscount: 0,
      notes: "",

      addItem: (menuItem, options = {}) => {
        const {
          quantity = 1,
          selectedSize,
          selectedExtras = [],
          spicyLevel = 0,
          notes = "",
        } = options;

        const cartItemId = `${menuItem.id}-${selectedSize?.id ?? "default"}-${selectedExtras.map((e) => e.id).join("-")}-${Date.now()}`;

        const newItem: CartItem = {
          id: cartItemId,
          menuItemId: menuItem.id,
          nameAr: menuItem.nameAr,
          nameEn: menuItem.nameEn,
          image: menuItem.image,
          category: menuItem.category,
          price: menuItem.price,
          quantity,
          selectedSize,
          selectedExtras,
          spicyLevel,
          notes,
          totalPrice: 0,
        };
        newItem.totalPrice = computeItemTotal(newItem);

        set((state) => ({ items: [...state.items, newItem], isOpen: true }));
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity,
                  totalPrice: computeItemTotal({ ...i, quantity }),
                }
              : i,
          ),
        }));
      },

      clearCart: () =>
        set({ items: [], couponCode: null, couponDiscount: 0, notes: "" }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      applyCoupon: (code: string) => {
        const upper = code.toUpperCase();
        const discount = COUPON_CODES[upper];
        if (discount) {
          set({ couponCode: upper, couponDiscount: discount });
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

      setNotes: (notes) => set({ notes }),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () => get().items.reduce((sum, i) => sum + i.totalPrice, 0),

      getDiscount: () => {
        const { couponDiscount, getSubtotal } = get();
        if (!couponDiscount) return 0;
        return Math.round((getSubtotal() * couponDiscount) / 100);
      },

      getDeliveryFee: (zoneId) => {
        const subtotal = get().getSubtotal();
        if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
        if (!zoneId) return 15;
        // IDs must match DELIVERY_ZONES in src/constants/categories.ts
        const fees: Record<string, number> = {
          rawda: 10,
          "shahid-fakri": 10,
          "abu-mashhour": 10,
          "barka-al-saba": 15,
        };
        return fees[zoneId] ?? 15;
      },

      getTotal: () => {
        const { getSubtotal, getDiscount, getDeliveryFee } = get();
        return getSubtotal() - getDiscount() + getDeliveryFee();
      },

      hasFreeFries: () => get().getSubtotal() >= FREE_FRIES_THRESHOLD,
    }),
    {
      name: "twister-cart",
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
      }),
    },
  ),
);
