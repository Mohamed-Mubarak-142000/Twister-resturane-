"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Clock, Truck } from "lucide-react";
import { DELIVERY_ZONES } from "@/constants/categories";

export function DeliveryZonesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-[#D62828] text-sm font-bold tracking-widest uppercase mb-3 block">
            بنوصل إنت أينما كنت
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            مناطق التوصيل
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            شوف هل منطقتك موجودة — وبكام رسوم التوصيل
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DELIVERY_ZONES.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass rounded-2xl p-5 border border-white/5 hover:border-[#D62828]/30 card-hover transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 text-[#D62828] shrink-0 mt-0.5" />
                <h3 className="text-white font-bold text-base">
                  {zone.nameAr}
                </h3>
              </div>

              <div className="space-y-2 mr-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50 flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    رسوم التوصيل
                  </span>
                  <span className="text-[#F4B400] font-bold">
                    {zone.deliveryFee} ج
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">أقل طلب</span>
                  <span className="text-white/70">{zone.minOrder} ج</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    وقت التوصيل
                  </span>
                  <span className="text-white/70">{zone.estimatedTime}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Free delivery note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 p-5 glass-red rounded-2xl text-center"
        >
          <p className="text-[#F4B400] font-bold text-lg">
            🎉 توصيل مجاني عند طلب أكثر من ٢٠٠ ج!
          </p>
        </motion.div>
      </div>
    </section>
  );
}
