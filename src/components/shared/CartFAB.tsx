"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function CartFAB() {
  const { getItemCount, toggleCart } = useCartStore();
  const count = getItemCount();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCart}
          className="fixed bottom-6 right-6 z-40 gradient-red text-white rounded-2xl shadow-2xl shadow-[#D62828]/30 flex items-center gap-3 px-5 py-3.5 glow-red"
          aria-label="عربة التسوق"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-bold text-sm">{count} منتج</span>
          <span className="w-px h-4 bg-white/20" />
          <span className="font-bold text-sm text-[#F4B400]">
            {useCartStore.getState().getTotal()} ج
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
