"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Star, ChevronDown, Sparkles, Flame } from "lucide-react";
import { BRAND } from "@/constants/brand";
import { DELIVERY_ZONES } from "@/constants/categories";
import { getTotalReviewCount, toArabicNumerals } from "@/utils/menu";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HeroSection() {
  const totalReviews = getTotalReviewCount();
  const reviewStat = `+${toArabicNumerals(totalReviews)}`;
  const zonesStat = `${toArabicNumerals(DELIVERY_ZONES.length)}+`;

  const sectionRef = useRef<HTMLElement>(null);
  const curtainLeftRef = useRef<HTMLDivElement>(null);
  const curtainRightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const foodRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Opening curtain animation
      const tl = gsap.timeline({ delay: 2.8 });

      tl.to([curtainLeftRef.current, curtainRightRef.current], {
        scaleX: 0,
        duration: 1.2,
        ease: "power4.inOut",
        stagger: 0.05,
      })
        .from(
          contentRef.current,
          { opacity: 0, y: 60, duration: 1, ease: "power3.out" },
          "-=0.6",
        )
        .from(
          foodRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotation: -20,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        );

      // Parallax on scroll
      gsap.to(foodRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(glowRef.current, {
        scale: 1.3,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(214,40,40,0.18) 0%, transparent 65%), #0F0F0F",
      }}
    >
      {/* Curtains */}
      <div
        ref={curtainLeftRef}
        className="absolute inset-0 z-30 bg-[#0F0F0F] origin-left"
        style={{ transformOrigin: "left center" }}
      />
      <div
        ref={curtainRightRef}
        className="absolute inset-0 z-30 bg-[#0F0F0F] origin-right"
        style={{ transformOrigin: "right center" }}
      />

      {/* Background glow blob */}
      <div
        ref={glowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(214,40,40,0.15) 0%, rgba(244,180,0,0.05) 50%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Main content */}
      <div className="container-brand relative z-10 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div
            ref={contentRef}
            className="text-center lg:text-right order-2 lg:order-1"
          >
            {/* Offer badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-red px-4 py-2 rounded-full mb-6"
            >
              <Flame className="w-4 h-4 text-[#D62828] animate-pulse" />
              <span className="text-[#F4B400] text-sm font-bold">
                عرض الافتتاح — خصم ٢٠٪
              </span>
              <Sparkles className="w-4 h-4 text-[#F4B400]" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 3.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4"
            >
              <span className="block text-white">طعم</span>
              <span className="block text-gradient-red-gold text-glow-red">
                خرافي
              </span>
              <span className="block text-white/90 text-4xl sm:text-5xl lg:text-6xl">
                في كل لقمة
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.7 }}
              className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              بيتزا طازجة، كريبات فاخرة، وبرجر أنجوس — كل حاجة بتتعمل بأيدي
              محترفين ومكونات أحسن نوع. التوصيل سريع لبابك! 🍕
            </motion.p>

            {/* Stars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6 }}
              className="flex items-center gap-3 justify-center lg:justify-start mb-8"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#F4B400] text-[#F4B400]"
                  />
                ))}
              </div>
              <span className="text-white/70 text-sm">+٥٠٠ تقييم ممتاز</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 gradient-red text-white font-black text-lg rounded-2xl glow-red flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>شوف المنيو</span>
                  <span className="text-2xl">🍕</span>
                </motion.button>
              </Link>

              <motion.a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass border border-white/10 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-2 hover:border-[#D62828]/50 transition-colors w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 text-[#25D366]" />
                اطلب دلوقتي
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.9, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/5"
            >
              {[
                { value: reviewStat, label: "تقييم ممتاز" },
                { value: "٣٠ دق", label: "متوسط التوصيل" },
                { value: zonesStat, label: "مناطق التوصيل" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black text-gradient-red-gold">
                    {value}
                  </div>
                  <div className="text-white/40 text-xs mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Food visual */}
          <div
            ref={foodRef}
            className="order-1 lg:order-2 flex items-center justify-center relative"
          >
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-[#D62828]/20"
            />

            {/* Inner glow ring */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#D62828]/5 animate-pulse-glow" />

            {/* Main pizza emoji / image */}
            <div className="relative z-10 text-center">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-[10rem] sm:text-[13rem] leading-none select-none"
                style={{ filter: "drop-shadow(0 0 40px rgba(214,40,40,0.5))" }}
              >
                🍕
              </motion.div>

              {/* Steam particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-4 text-2xl"
                  style={{ left: `${20 + i * 20}%` }}
                  animate={{
                    y: [-10, -50, -90],
                    opacity: [0, 0.6, 0],
                    scale: [0.8, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut",
                  }}
                >
                  💨
                </motion.div>
              ))}
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute top-8 right-0 glass-red px-3 py-2 rounded-xl text-center"
            >
              <div className="text-[#F4B400] font-black text-sm">خصم ٢٠٪</div>
              <div className="text-white/50 text-xs">على أول طلب</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-12 left-0 glass px-3 py-2 rounded-xl text-center"
            >
              <div className="text-white font-black text-sm">🚀 توصيل سريع</div>
              <div className="text-white/50 text-xs">٣٠ دقيقة أو أقل</div>
            </motion.div>

            {/* Floating food items */}
            {[
              { emoji: "🍔", pos: "top-0 left-8", delay: 0 },
              { emoji: "🥞", pos: "bottom-0 right-8", delay: 1 },
              { emoji: "🍟", pos: "top-1/3 left-0", delay: 2 },
            ].map(({ emoji, pos, delay }) => (
              <motion.div
                key={emoji}
                className={`absolute ${pos} text-3xl sm:text-4xl`}
                animate={{ y: [0, -12, 0], rotate: [0, 10, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs tracking-widest">اسحب للأسفل</span>
        <ChevronDown className="w-5 h-5 animate-scroll-bounce" />
      </motion.div>
    </section>
  );
}
