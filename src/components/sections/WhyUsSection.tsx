"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2, Clock, Truck, Leaf, ChefHat, Star } from "lucide-react";
import { DELIVERY_ZONES } from "@/constants/categories";
import { getTotalReviewCount, toArabicNumerals } from "@/utils/menu";

const ZONE_COUNT = DELIVERY_ZONES.length;
const TOTAL_REVIEWS = getTotalReviewCount();

const FEATURES = [
  {
    icon: ChefHat,
    titleAr: "طهاة محترفون",
    descriptionAr: "فريق متخصص بخبرة أكثر من ١٠ سنوات في المطبخ الإيطالي",
    color: "#D62828",
  },
  {
    icon: Leaf,
    titleAr: "مكونات طازجة ١٠٠٪",
    descriptionAr: "كل حاجة بتتعمل بمكونات طازجة يومياً — مفيش حاجة مجمدة",
    color: "#22C55E",
  },
  {
    icon: Clock,
    titleAr: "توصيل في ٣٠ دقيقة",
    descriptionAr: "أكلك يوصلك طازج وساخن في أقل من نص ساعة أو أكلك مجاناً",
    color: "#F4B400",
  },
  {
    icon: Truck,
    titleAr: "توصيل على أوسع نطاق",
    descriptionAr: `بنوصل لأكتر من ${toArabicNumerals(ZONE_COUNT)} مناطق في القاهرة والجيزة`,
    color: "#7C3AED",
  },
  {
    icon: Star,
    titleAr: "أعلى تقييم في المنطقة",
    descriptionAr: `+${toArabicNumerals(TOTAL_REVIEWS)} تقييم بخمس نجوم على جوجل وفيسبوك`,
    color: "#F4B400",
  },
  {
    icon: CheckCircle2,
    titleAr: "ضمان الرضا",
    descriptionAr: "مش عاجبك؟ نعيد لك فلوسك أو نبعتلك بديل فوري",
    color: "#D62828",
  },
];

export function WhyUsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#D62828]/3 rounded-full blur-3xl" />
      </div>

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[#D62828] text-sm font-bold tracking-widest uppercase mb-3 block">
            ليه تختار
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            إيه اللي بيميزنا؟
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            مش بس أكل لذيذ — ده تجربة متكاملة من أول ما بتطلب لحد ما بتاكل
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.titleAr}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 card-hover"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>

                <h3 className="text-white font-bold text-lg mb-2">
                  {feature.titleAr}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {feature.descriptionAr}
                </p>

                {/* Bottom accent */}
                <div
                  className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
