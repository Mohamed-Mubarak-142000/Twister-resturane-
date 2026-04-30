"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingBag, Sparkles } from "lucide-react";
import { BRAND } from "@/constants/brand";

// Pre-computed positions — stable across renders (no Math.random in JSX)
const FLOAT_POSITIONS = [
  { top: "15%", left: "5%" },
  { top: "72%", left: "22%" },
  { top: "30%", left: "39%" },
  { top: "65%", left: "56%" },
  { top: "20%", left: "73%" },
  { top: "80%", left: "90%" },
];

export function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="container-brand">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center py-16 px-8 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #D62828 0%, #9B1C1C 50%, #D62828 100%)",
          }}
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4B400]/10 to-transparent pointer-events-none" />

          {/* Floating elements */}
          {["🍕", "🍔", "🥞", "🍟", "⭐", "🔥"].map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl opacity-10"
              style={{
                top: FLOAT_POSITIONS[i].top,
                left: FLOAT_POSITIONS[i].left,
              }}
              animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0] }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              {emoji}
            </motion.div>
          ))}

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#F4B400]" />
              <span className="text-white/90 text-sm font-bold">
                اطلب دلوقتي وادفع عند الاستلام
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              جاهز تطلب؟
              <span className="block text-[#F4B400]">إحنا مستنيينك! 🚀</span>
            </h2>

            <p className="text-white/80 text-lg max-w-lg mx-auto mb-10">
              اختار من المنيو، واطلب على واتساب، وهيوصلك طازج وساخن في أقل من نص
              ساعة
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-[#D62828] font-black text-lg rounded-2xl flex items-center justify-center gap-2 shadow-2xl"
                >
                  <ShoppingBag className="w-5 h-5" />
                  شوف المنيو
                </motion.button>
              </Link>

              <motion.a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-black text-lg rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-2xl shadow-black/30"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                اطلب على واتساب
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
