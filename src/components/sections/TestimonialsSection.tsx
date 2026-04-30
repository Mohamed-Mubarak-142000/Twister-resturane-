"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/data/reviews";

export function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + REVIEWS.length) % REVIEWS.length);
  const next = () => setCurrent((c) => (c + 1) % REVIEWS.length);

  const visible = [
    REVIEWS[current],
    REVIEWS[(current + 1) % REVIEWS.length],
    REVIEWS[(current + 2) % REVIEWS.length],
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F4B400]/4 rounded-full blur-3xl" />
      </div>

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[#F4B400] text-sm font-bold tracking-widest uppercase mb-3 block">
            اللي بيقوله عملاؤنا
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            تقييمات حقيقية
          </h2>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-6">
            {[
              { value: "4.9", label: "تقييم متوسط" },
              { value: "+500", label: "تقييم" },
              { value: "98٪", label: "رضا العملاء" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-gradient-red-gold">
                  {value}
                </div>
                <div className="text-white/40 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AnimatePresence mode="popLayout">
            {visible.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass rounded-3xl p-6 border border-white/5 relative overflow-hidden"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-[#D62828]/30 absolute top-4 left-4" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-4 h-4 ${j < review.rating ? "fill-[#F4B400] text-[#F4B400]" : "text-white/20"}`}
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-white/80 text-sm leading-relaxed mb-5 line-clamp-4">
                  &quot;{review.commentAr}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      {review.name}
                    </p>
                    <p className="text-white/40 text-xs">{review.date}</p>
                  </div>
                  {review.platform && (
                    <div className="mr-auto">
                      <span className="text-white/20 text-xs glass px-2 py-1 rounded-lg">
                        {review.platform}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="w-11 h-11 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white border border-white/10 hover:border-[#D62828]/50 transition-all"
            aria-label="السابق"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-[#D62828]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`تقييم ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="w-11 h-11 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white border border-white/10 hover:border-[#D62828]/50 transition-all"
            aria-label="التالي"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
