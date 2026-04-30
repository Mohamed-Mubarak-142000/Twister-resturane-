"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CATEGORIES } from "@/constants/categories";
import { useUIStore } from "@/store/uiStore";

export function CategoriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { setActiveCategory } = useUIStore();

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Section header */}
      <div className="container-brand mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="text-[#D62828] text-sm font-bold tracking-widest uppercase mb-3 block">
            اختار من
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            أصناف المنيو
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            كل صنف بيتعمل بأحسن مكونات وبأيدي محترفين — جرب وحكم بنفسك
          </p>
        </motion.div>
      </div>

      {/* Categories grid */}
      <div className="container-brand">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/menu?category=${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className="group block"
              >
                <div
                  className="relative glass rounded-2xl p-5 text-center card-hover border border-white/5 hover:border-opacity-30 transition-all duration-300 overflow-hidden"
                  style={{
                    ["--hover-color" as string]: cat.color,
                  }}
                >
                  {/* Background gradient on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${cat.color}15 0%, transparent 70%)`,
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="text-5xl mb-3 relative z-10"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {cat.icon}
                  </motion.div>

                  {/* Name */}
                  <p className="text-white font-bold text-sm relative z-10 group-hover:text-white transition-colors">
                    {cat.nameAr}
                  </p>

                  {/* Bottom glow line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: cat.color }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
