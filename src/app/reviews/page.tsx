"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

const STATS = [
  { value: "4.9", label: "تقييم متوسط", sub: "من 5 نجوم" },
  { value: "+500", label: "تقييم حقيقي", sub: "عملاء سعداء" },
  { value: "98٪", label: "نسبة الرضا", sub: "عملاء يعودون" },
  { value: "+200", label: "طلب يومياً", sub: "في أيام الذروة" },
];

export default function ReviewsPage() {
  const [page, setPage] = useState(0);
  const perPage = 6;
  const total = Math.ceil(REVIEWS.length / perPage);
  const visible = REVIEWS.slice(page * perPage, page * perPage + perPage);

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4B400]/8 to-transparent pointer-events-none" />
        <div className="container-brand relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl mb-4"
          >
            ⭐
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-black text-white mb-4"
          >
            تقييمات
            <span className="block text-gradient-red-gold">عملاؤنا</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg"
          >
            مش بس كلامنا — ده رأي عملاؤنا بالظبط
          </motion.p>
        </div>
      </div>

      <div className="container-brand">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {STATS.map(({ value, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 text-center border border-white/5"
            >
              <div className="text-3xl sm:text-4xl font-black text-gradient-red-gold mb-1">
                {value}
              </div>
              <div className="text-white font-bold text-sm">{label}</div>
              <div className="text-white/30 text-xs mt-0.5">{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8 mb-10 border border-white/5"
        >
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="text-center shrink-0">
              <div className="text-7xl font-black text-gradient-red-gold">
                4.9
              </div>
              <div className="flex items-center gap-1 justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#F4B400] text-[#F4B400]"
                  />
                ))}
              </div>
              <div className="text-white/40 text-sm mt-1">من ٥ نجوم</div>
            </div>

            <div className="flex-1 space-y-2 w-full">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = REVIEWS.filter(
                  (r) => Math.round(r.rating) === star,
                ).length;
                const pct = Math.round((count / REVIEWS.length) * 100);
                return (
                  <div key={star} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12 shrink-0">
                      <span className="text-white/60 text-sm">{star}</span>
                      <Star className="w-3 h-3 fill-[#F4B400] text-[#F4B400]" />
                    </div>
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-full gradient-gold rounded-full"
                      />
                    </div>
                    <span className="text-white/40 text-xs w-8 text-left">
                      {pct}٪
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {visible.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-3xl p-6 border border-white/5 relative overflow-hidden"
            >
              <Quote className="w-8 h-8 text-[#D62828]/20 absolute top-4 left-4" />

              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${j < review.rating ? "fill-[#F4B400] text-[#F4B400]" : "text-white/15"}`}
                  />
                ))}
              </div>

              <p className="text-white/75 text-sm leading-relaxed mb-5">
                &quot;{review.commentAr}&quot;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 gradient-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      {review.name}
                    </p>
                    <p className="text-white/30 text-xs">{review.date}</p>
                  </div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-green-400 text-xs">
                    <ThumbsUp className="w-3 h-3" />
                    <span>موثق</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-white/50 text-sm">
              {page + 1} / {total}
            </span>
            <button
              onClick={() => setPage(Math.min(total - 1, page + 1))}
              disabled={page === total - 1}
              className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
