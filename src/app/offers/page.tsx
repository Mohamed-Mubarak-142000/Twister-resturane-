"use client";

import { motion } from "framer-motion";
import { Sparkles, Trophy, Zap } from "lucide-react";
import { OFFERS } from "@/data/offers";
import Link from "next/link";

const CARD_EMOJIS = ["🍕", "🍟", "🛵"] as const;

export default function OffersPage() {
  return (
    <div
      className="min-h-screen pt-24 pb-20"
      style={{
        background:
          "linear-gradient(180deg, #0F0F0F 0%, #160303 40%, #0F0F0F 100%)",
      }}
    >
      {/* Hero */}
      <div className="relative py-16 overflow-hidden text-center">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(214,40,40,0.18) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="container-brand relative z-10">
          {/* Grand Opening badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F4B400]/40 bg-[#F4B400]/8">
              <Trophy className="w-4 h-4 text-[#F4B400]" />
              <span className="text-[#F4B400] font-black text-sm tracking-widest uppercase">
                Grand Opening — عرض الافتتاح الكبير
              </span>
              <Sparkles className="w-4 h-4 text-[#F4B400]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-7xl mb-4"
          >
            🎉
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight"
          >
            عروض الافتتاح
            <span className="block text-gradient-red-gold mt-1">
              هدايا لكل الناس! 🎁
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-lg max-w-lg mx-auto"
          >
            عروض حصرية لأيام الافتتاح — استفد قبل ما الوقت يخلص
          </motion.p>
        </div>
      </div>

      <div className="container-brand">
        {/* Offer cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.35 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative rounded-3xl overflow-hidden cursor-default"
              style={{
                background: `linear-gradient(145deg, ${offer.color}14 0%, rgba(15,15,15,0.97) 60%)`,
                border: `1px solid ${offer.color}28`,
              }}
            >
              {/* Hover glow */}
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

              <div className="p-8">
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
                  className="text-7xl mb-5 leading-none"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  {CARD_EMOJIS[i]}
                </motion.div>

                {/* Title */}
                <h2
                  className="text-2xl font-black mb-3"
                  style={{ color: offer.color }}
                >
                  {offer.titleAr}
                </h2>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed">
                  {offer.descriptionAr}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Limited-time callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative rounded-3xl overflow-hidden p-8 sm:p-10 mb-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(214,40,40,0.15) 0%, rgba(244,180,0,0.07) 100%)",
            border: "1px solid rgba(214,40,40,0.25)",
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D62828] animate-pulse" />
            <span className="text-[#D62828] font-black text-sm tracking-widest uppercase">
              عرض محدود — أيام الافتتاح فقط
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#D62828] animate-pulse" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-white mb-3">
            استفد بكل العروض دلوقتي ⏳
          </h3>
          <p className="text-white/50 text-base mb-8 max-w-md mx-auto">
            العروض دي مش هتتكرر — يوم الافتتاح فرصة واحدة بس!
          </p>

          <Link href="/menu">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 gradient-red text-white font-black text-xl rounded-2xl glow-red inline-flex items-center gap-2"
            >
              <Zap className="w-6 h-6" />
              اطلب دلوقتي وخد هداياك!
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
