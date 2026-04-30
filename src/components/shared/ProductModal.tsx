"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  Star,
  Flame,
  Sparkles,
} from "lucide-react";
import type { MenuItem, Extra, Size } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function ProductModal({ item, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(
    item?.sizes?.[0],
  );
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [spicyLevel, setSpicyLevel] = useState(0);
  const [notes, setNotes] = useState("");
  const { addItem } = useCartStore();

  const emojiMap: Record<string, string> = {
    pizza: "🍕",
    stromboli: "🌯",
    burger: "🍔",
    souri: "🥙",
    "crepes-chicken": "🥞",
    "crepes-meat": "🥩",
    "crepes-fries": "🍟",
    "crepes-mix": "🎉",
    "twister-specials": "🌟",
    additions: "➕",
  };

  if (!item) return null;

  const toggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra],
    );
  };

  const totalPrice =
    (item.price +
      (selectedSize?.price ?? 0) +
      selectedExtras.reduce((s, e) => s + e.price, 0)) *
    quantity;

  const handleAdd = () => {
    addItem(item, {
      quantity,
      selectedSize,
      selectedExtras,
      spicyLevel,
      notes,
    });
    toast.success(`✅ تمت الإضافة — ${item.nameAr}`, {
      description: `${totalPrice} ج`,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <div className="relative w-full sm:max-w-lg bg-[#1a1a1a] sm:rounded-3xl rounded-t-3xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 z-10 w-9 h-9 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image */}
              <div className="relative h-52 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center shrink-0">
                <div className="text-9xl">
                  {emojiMap[item.category] ?? "🍕"}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />

                <div className="absolute top-4 right-4 flex gap-1.5">
                  {item.isNew && (
                    <span className="px-2.5 py-1 bg-[#F4B400] text-[#0F0F0F] text-xs font-black rounded-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      جديد
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="px-2.5 py-1 gradient-red text-white text-xs font-bold rounded-lg flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      الأكثر طلباً
                    </span>
                  )}
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-5 pb-4">
                {/* Header */}
                <div className="mb-4">
                  {item.rating && (
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-[#F4B400] text-[#F4B400]" />
                      <span className="text-[#F4B400] text-sm font-bold">
                        {item.rating}
                      </span>
                      <span className="text-white/30 text-xs">
                        ({item.reviewCount} تقييم)
                      </span>
                    </div>
                  )}
                  <h2 className="text-white text-2xl font-black">
                    {item.nameAr}
                  </h2>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">
                    {item.descriptionAr}
                  </p>
                </div>

                {/* Sizes */}
                {item.sizes && item.sizes.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-white font-bold text-sm mb-3">
                      اختار الحجم
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {item.sizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                            selectedSize?.id === size.id
                              ? "gradient-red text-white border-transparent"
                              : "glass border-white/10 text-white/60 hover:text-white"
                          }`}
                        >
                          {size.nameAr}
                          {size.price > 0 && ` (+${size.price}ج)`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extras */}
                {item.extras && item.extras.length > 0 && (
                  <div className="mb-5">
                    <h3 className="text-white font-bold text-sm mb-3">
                      إضافات اختيارية
                    </h3>
                    <div className="space-y-2">
                      {item.extras.map((extra) => {
                        const selected = selectedExtras.find(
                          (e) => e.id === extra.id,
                        );
                        return (
                          <button
                            key={extra.id}
                            onClick={() => toggleExtra(extra)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                              selected
                                ? "glass-red border-[#D62828]/40 text-white"
                                : "glass border-white/5 text-white/60 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                                  selected
                                    ? "bg-[#D62828] border-[#D62828]"
                                    : "border-white/30"
                                }`}
                              >
                                {selected && (
                                  <span className="text-white text-xs">✓</span>
                                )}
                              </div>
                              {extra.nameAr}
                            </div>
                            <span className="text-[#F4B400] font-bold">
                              +{extra.price} ج
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Spicy level */}
                {item.spicyLevel !== undefined && (
                  <div className="mb-5">
                    <h3 className="text-white font-bold text-sm mb-3">
                      مستوى الحرارة
                    </h3>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3].map((level) => (
                        <button
                          key={level}
                          onClick={() => setSpicyLevel(level)}
                          className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                            spicyLevel === level
                              ? "gradient-red text-white border-transparent"
                              : "glass border-white/10 text-white/60"
                          }`}
                        >
                          {level === 0 ? "عادي" : "🌶️".repeat(level)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="mb-4">
                  <h3 className="text-white font-bold text-sm mb-3">
                    ملاحظات خاصة
                  </h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="مثال: بدون بصل، إضافي صوص..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/80 text-sm placeholder:text-white/30 resize-none h-20 focus:outline-none focus:border-[#D62828]/50"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-white/5 flex items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center gap-3 glass rounded-xl px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-white/60 hover:text-white"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-white font-bold w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-white/60 hover:text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to cart */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAdd}
                  className="flex-1 py-3.5 gradient-red text-white font-black rounded-xl flex items-center justify-center gap-2 glow-red"
                >
                  <ShoppingCart className="w-5 h-5" />
                  أضف للعربة — {totalPrice} ج
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
