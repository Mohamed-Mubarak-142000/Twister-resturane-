"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Star, Flame, Sparkles, X } from "lucide-react";
import { MENU_ITEMS } from "@/data/menu";
import { CATEGORIES } from "@/constants/categories";
import { useUIStore } from "@/store/uiStore";
import type { MenuItem } from "@/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductModal } from "@/components/shared/ProductModal";

export default function MenuPage() {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } =
    useUIStore();
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [filterPopular, setFilterPopular] = useState(false);

  const filtered = useMemo(() => {
    let items = MENU_ITEMS;
    if (activeCategory && activeCategory !== "all") {
      items = items.filter((i) => i.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (i) =>
          i.nameAr.includes(searchQuery) ||
          i.nameEn.toLowerCase().includes(q) ||
          i.descriptionAr.includes(searchQuery),
      );
    }
    if (filterPopular) {
      items = items.filter((i) => i.isPopular);
    }
    return items;
  }, [activeCategory, searchQuery, filterPopular]);

  const handleAdd = (item: MenuItem) => {
    setSelectedProduct(item);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D62828]/10 to-transparent" />
        <div className="container-brand relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-black text-white mb-4"
          >
            المنيو الكامل 🍕
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg"
          >
            اختار من أكثر من {MENU_ITEMS.length} صنف لذيذ
          </motion.p>
        </div>
      </div>

      <div className="container-brand">
        {/* Search + Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في المنيو..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10 h-12 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setFilterPopular(!filterPopular)}
            className={`flex items-center gap-2 px-5 h-12 rounded-xl border font-medium text-sm transition-all ${
              filterPopular
                ? "gradient-red text-white border-transparent"
                : "glass border-white/10 text-white/70 hover:text-white"
            }`}
          >
            <Flame className="w-4 h-4" />
            الأكثر طلباً
          </button>
        </motion.div>

        {/* Category tabs — sticky */}
        <div className="sticky top-16 z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-[#0F0F0F]/80 backdrop-blur-lg py-3 mb-8 border-b border-white/5">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                activeCategory === "all"
                  ? "gradient-red text-white"
                  : "glass text-white/60 hover:text-white border border-white/5"
              }`}
            >
              الكل
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeCategory === cat.id
                    ? "gradient-red text-white"
                    : "glass text-white/60 hover:text-white border border-white/5"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.nameAr}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/40 text-sm">
            {filtered.length} منتج
            {searchQuery && ` — نتائج "${searchQuery}"`}
          </p>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-6xl mb-4">🔍</p>
              <p className="text-white/50 text-lg">مفيش نتائج — جرب بحث تاني</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(i * 0.05, 0.4),
                  }}
                  layout
                  className="h-full"
                >
                  <MenuItemCard
                    item={item}
                    onAdd={() => handleAdd(item)}
                    onView={() => setSelectedProduct(item)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product modal — key resets internal state when a different product is opened */}
      <ProductModal
        key={selectedProduct?.id ?? "none"}
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

function MenuItemCard({
  item,
  onAdd,
  onView,
}: {
  item: MenuItem;
  onAdd: () => void;
  onView: () => void;
}) {
  const emojiMap: Record<string, string> = {
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

  return (
    <div className="group glass rounded-3xl overflow-hidden border border-white/5 hover:border-[#D62828]/30 transition-all duration-300 card-hover flex flex-col h-full">
      {/* Image area */}
      <button
        onClick={onView}
        className="w-full relative h-44 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center overflow-hidden flex-shrink-0"
      >
        <div className="text-7xl transform group-hover:scale-110 transition-transform duration-500">
          {emojiMap[item.category] ?? "🍕"}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-50" />

        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {item.isNew && (
            <Badge className="bg-[#F4B400] text-[#0F0F0F] text-xs font-black border-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              جديد
            </Badge>
          )}
          {item.isPopular && (
            <Badge className="gradient-red text-white text-xs font-bold border-0 flex items-center gap-1">
              <Flame className="w-3 h-3" />
              الأكثر طلباً
            </Badge>
          )}
        </div>

        {item.spicyLevel && item.spicyLevel > 0 && (
          <div className="absolute bottom-3 left-3 text-sm">
            {"🌶️".repeat(item.spicyLevel)}
          </div>
        )}
      </button>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating — reserved row keeps cards aligned when rating is absent */}
        <div className="h-6 mb-1">
          {item.rating && (
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-[#F4B400] text-[#F4B400]" />
              <span className="text-white/60 text-xs">
                {item.rating} ({item.reviewCount})
              </span>
            </div>
          )}
        </div>

        <button onClick={onView} className="text-right w-full">
          <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#F4B400] transition-colors text-right">
            {item.nameAr}
          </h3>
        </button>
        <p className="text-white/50 text-xs leading-relaxed line-clamp-2 flex-1">
          {item.descriptionAr}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3">
          <div>
            <span className="text-[#F4B400] font-black text-xl">
              {item.price}
            </span>
            <span className="text-[#F4B400]/50 text-sm mr-1">ج</span>
            {item.sizes && item.sizes.length > 1 && (
              <span className="text-white/30 text-xs"> يبدأ من</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAdd}
            className="w-10 h-10 gradient-red text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#D62828]/30"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
