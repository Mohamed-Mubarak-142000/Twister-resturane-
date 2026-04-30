"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Plus, Flame, Sparkles } from "lucide-react";
import { getBestSellers } from "@/utils/menu";
import type { MenuItem } from "@/types";
import { ProductModal } from "@/components/shared/ProductModal";

export function BestsellerSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  const bestsellers = getBestSellers(8);

  return (
    <>
      <section ref={ref} className="py-20 relative">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D62828]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-brand relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-5 h-5 text-[#D62828]" />
                <span className="text-[#D62828] text-sm font-bold tracking-widest uppercase">
                  الأكثر طلباً
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                المفضلة عند الكل
              </h2>
            </div>
            <Link
              href="/menu"
              className="hidden sm:flex items-center gap-1 text-[#F4B400] text-sm font-medium hover:underline"
            >
              شوف الكل ←
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestsellers.map((item, i) => (
              <motion.div
                key={item.id}
                className="h-full"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ProductCard
                  item={item}
                  onAdd={() => setSelectedProduct(item)}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 glass border border-white/10 text-white font-bold rounded-2xl hover:border-[#D62828]/50 transition-all"
              >
                شوف المنيو كامل 🍕
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product modal — key resets internal state when a different product is opened */}
      <ProductModal
        key={selectedProduct?.id ?? "none"}
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

function ProductCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return (
    <div className="group glass rounded-3xl overflow-hidden card-hover border border-white/5 hover:border-[#D62828]/30 transition-all duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center overflow-hidden flex-shrink-0">
        {/* Placeholder emoji */}
        <div className="text-7xl transform group-hover:scale-110 transition-transform duration-500">
          {getCategoryEmoji(item.category)}
        </div>

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-60" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {item.isNew && (
            <span className="flex items-center gap-1 px-2 py-1 bg-[#F4B400] text-[#0F0F0F] text-xs font-black rounded-lg">
              <Sparkles className="w-3 h-3" />
              جديد
            </span>
          )}
          {item.isPopular && (
            <span className="flex items-center gap-1 px-2 py-1 gradient-red text-white text-xs font-bold rounded-lg">
              <Flame className="w-3 h-3" />
              الأكثر طلباً
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating — reserved row so cards without rating stay aligned */}
        <div className="h-6 mb-2">
          {item.rating && (
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(item.rating!)
                        ? "fill-[#F4B400] text-[#F4B400]"
                        : "text-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white/40 text-xs">
                ({item.reviewCount})
              </span>
            </div>
          )}
        </div>

        <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#F4B400] transition-colors">
          {item.nameAr}
        </h3>
        <p className="text-white/50 text-xs leading-relaxed line-clamp-2 flex-1">
          {item.descriptionAr}
        </p>

        {/* Price & add */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <div>
            <span className="text-[#F4B400] font-black text-xl">
              {item.price}
            </span>
            <span className="text-[#F4B400]/60 text-sm mr-1">ج</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAdd}
            className="w-10 h-10 gradient-red text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#D62828]/30"
            aria-label={`إضافة ${item.nameAr}`}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function getCategoryEmoji(cat: string): string {
  const map: Record<string, string> = {
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
  return map[cat] ?? "🍕";
}
