"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Tag,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import type { CartItem } from "@/types";

/** Category-to-emoji fallback map (mirrors menu data) */
const CATEGORY_EMOJI: Record<string, string> = {
  pizza: "🍕",
  stromboli: "🌯",
  burger: "🍔",
  souri: "🥙",
  "crepes-chicken": "🥞",
  "crepes-meat": "🥩",
  "crepes-fries": "🍟",
  "crepes-mix": "🎉",
  additions: "➕",
};

/**
 * Renders a cart item's image with a graceful emoji fallback
 * when the image file is missing or fails to load.
 */
function CartItemImage({ item }: { item: CartItem }) {
  const [failed, setFailed] = useState(false);
  const emoji = CATEGORY_EMOJI[item.category ?? ""] ?? "🍕";

  if (!item.image || failed) {
    return <span className="text-3xl select-none">{emoji}</span>;
  }

  return (
    <Image
      src={item.image}
      alt={item.nameAr}
      width={64}
      height={64}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDiscount,
    getDeliveryFee,
    getTotal,
    hasFreeFries,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();
  const freeFries = hasFreeFries();

  const handleCoupon = () => {
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput.trim());
    if (success) {
      toast.success(`✅ تم تطبيق كوبون ${couponInput.toUpperCase()}`);
      setCouponInput("");
    } else {
      toast.error("❌ كود الكوبون غير صحيح");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-[#141414] border-r-0 border-l border-white/5 p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#D62828]" />
              عربة التسوق
              {items.length > 0 && (
                <span className="text-sm font-normal text-white/50">
                  ({items.length} منتج)
                </span>
              )}
            </SheetTitle>
            <button
              onClick={closeCart}
              className="p-2 glass rounded-xl text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
            <div className="text-7xl">🛒</div>
            <div className="text-center">
              <p className="text-white/60 text-lg font-medium mb-2">
                العربة فاضية!
              </p>
              <p className="text-white/30 text-sm">
                ابدأ بإضافة منتجات من المنيو
              </p>
            </div>
            <Link href="/menu" onClick={closeCart}>
              <Button className="gradient-red text-white font-bold px-8 py-3 rounded-xl">
                اتفرج على المنيو
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Free fries banner */}
            <AnimatePresence>
              {freeFries && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mx-4 mt-3 px-4 py-2.5 bg-[#F4B400]/10 border border-[#F4B400]/30 rounded-xl overflow-hidden"
                >
                  <p className="text-[#F4B400] text-sm font-medium text-center">
                    🎉 مبروك! بطاطس هدية مجاناً مع طلبك
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25 }}
                    className="glass rounded-2xl p-3 flex gap-3"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/5 shrink-0 flex items-center justify-center text-3xl">
                      <CartItemImage item={item} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold truncate">
                        {item.nameAr}
                      </p>
                      {item.selectedSize && (
                        <p className="text-white/40 text-xs">
                          {item.selectedSize.nameAr}
                        </p>
                      )}
                      <p className="text-[#F4B400] text-sm font-bold mt-1">
                        {item.totalPrice} ج
                      </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col items-end justify-between gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-white/30 hover:text-red-400 transition-colors"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 glass rounded-lg flex items-center justify-center text-white/70 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white text-sm font-bold w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 glass rounded-lg flex items-center justify-center text-white/70 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-4 pb-6 pt-3 border-t border-white/5 space-y-4">
              {/* Coupon */}
              {couponCode ? (
                <div className="flex items-center justify-between px-4 py-2.5 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Tag className="w-4 h-4" />
                    <span>
                      {couponCode} — خصم {couponDiscount}٪
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-white/40 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="كود الخصم"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm"
                    onKeyDown={(e) => e.key === "Enter" && handleCoupon()}
                  />
                  <Button
                    onClick={handleCoupon}
                    variant="outline"
                    className="border-[#D62828]/50 text-[#D62828] hover:bg-[#D62828]/10 shrink-0"
                  >
                    تطبيق
                  </Button>
                </div>
              )}

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/60">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal} ج</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>الخصم</span>
                    <span>-{discount} ج</span>
                  </div>
                )}
                <div className="flex justify-between text-white/60">
                  <span>التوصيل</span>
                  <span>
                    {deliveryFee === 0
                      ? "مجاناً 🎉"
                      : `${deliveryFee} ج (يُحدد بالمنطقة)`}
                  </span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between text-white font-bold text-base">
                  <span>الإجمالي</span>
                  <span className="text-[#F4B400]">{total} ج</span>
                </div>
              </div>

              {/* Checkout */}
              <Link href="/checkout" onClick={closeCart} className="block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 gradient-red text-white font-bold text-base rounded-2xl text-center flex items-center justify-center gap-2 glow-red"
                >
                  إتمام الطلب
                  <ChevronLeft className="w-5 h-5" />
                </motion.div>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
