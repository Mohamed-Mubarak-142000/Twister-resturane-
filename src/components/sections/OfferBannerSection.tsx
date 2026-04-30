"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles, Zap, Trophy } from "lucide-react";

const OPENING_OFFERS = [
  {
    emoji: "🍕",
    titleAr: "بيتزا هدية كل ساعة",
    descriptionAr:
      "من بعد المغرب لحد وقت العشا — بيتزا مجانية كل ساعة على التوالي!",
    badge: "يوم الافتتاح فقط",
    color: "#D62828",
  },
  {
    emoji: "🍟",
    titleAr: "بطاطس هدية مع كل طلب",
    descriptionAr:
      "أي طلب تعمله — باكيت بطاطس هدية منا تلقائياً بدون كود أو شرط",
    badge: "مع كل طلب",
    color: "#F4B400",
  },
  {
    emoji: "🛵",
    titleAr: "توصيل مجاني",
    descriptionAr: "توصيل مجاني خلال أيام الافتتاح الأولى على جميع الطلبات",
    badge: "أيام الافتتاح",
    color: "#22C55E",
  },
];

// Stable particle positions — no random in render
const PARTICLES = [
  { top: "12%", left: "6%", emoji: "🎉" },
  { top: "72%", left: "4%", emoji: "⭐" },
  { top: "18%", left: "91%", emoji: "🎊" },
  { top: "78%", left: "93%", emoji: "✨" },
  { top: "45%", left: "48%", emoji: "🏆" },
  { top: "30%", left: "22%", emoji: "🔥" },
];

export function OfferBannerSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0F0F0F 0%, #190404 50%, #0F0F0F 100%)",
      }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[280px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(214,40,40,0.2) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute text-xl select-none opacity-[0.08]"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -20, 0], rotate: [0, 18, -18, 0] }}
            transition={{
              duration: 5 + i * 0.6,
              repeat: Infinity,
              delay: i * 0.45,
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      <div className="container-brand relative z-10">
        {/* Grand Opening badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F4B400]/40 bg-[#F4B400]/8">
            <Trophy className="w-4 h-4 text-[#F4B400]" />
            <span className="text-[#F4B400] font-black text-sm tracking-widest uppercase">
              Grand Opening — عرض الافتتاح الكبير
            </span>
            <Sparkles className="w-4 h-4 text-[#F4B400]" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4">
            تويستر بيفتح أبوابه
            <span className="block text-gradient-red-gold mt-2">
              وعنده هدايا لكل الناس! 🎁
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            عروض حصرية لأيام الافتتاح فقط — استفد قبل ما الوقت يخلص
          </p>
        </motion.div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {OPENING_OFFERS.map((offer, i) => (
            <motion.div
              key={offer.titleAr}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.13 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative rounded-3xl overflow-hidden cursor-default"
              style={{
                background: `linear-gradient(145deg, ${offer.color}14 0%, rgba(15,15,15,0.97) 60%)`,
                border: `1px solid ${offer.color}28`,
              }}
            >
              {/* Hover inner glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ boxShadow: `inset 0 0 55px ${offer.color}1a` }}
              />

              {/* Top accent bar */}
              <div
                className="h-[3px] w-full"
                style={{
                  background: `linear-gradient(90deg, ${offer.color}, transparent)`,
                }}
              />

              <div className="p-7">
                {/* Badge */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-black mb-5"
                  style={{
                    background: `${offer.color}20`,
                    color: offer.color,
                    border: `1px solid ${offer.color}35`,
                  }}
                >
                  {offer.badge}
                </span>

                {/* Emoji */}
                <motion.div
                  className="text-6xl mb-4 leading-none"
                  animate={{ rotate: [0, 7, -7, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                >
                  {offer.emoji}
                </motion.div>

                {/* Title */}
                <h3
                  className="text-xl font-black mb-2"
                  style={{ color: offer.color }}
                >
                  {offer.titleAr}
                </h3>

                {/* Description */}
                <p className="text-white/55 text-sm leading-relaxed">
                  {offer.descriptionAr}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Limited-time strip + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <div className="flex items-center gap-2 px-5 py-3 glass border border-[#D62828]/30 rounded-2xl">
            <span className="w-2 h-2 rounded-full bg-[#D62828] animate-pulse shrink-0" />
            <span className="text-white/65 text-sm font-medium">
              عرض محدود — أيام الافتتاح فقط ⏳
            </span>
          </div>

          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 gradient-red text-white font-black text-lg rounded-2xl glow-red flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              اطلب دلوقتي وخد هداياك!
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
