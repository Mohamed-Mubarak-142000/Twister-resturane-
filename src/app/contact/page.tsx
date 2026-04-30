"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { BRAND } from "@/constants/brand";
import { DELIVERY_ZONES } from "@/constants/categories";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div className="relative py-16 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D62828]/8 to-transparent pointer-events-none" />
        <div className="container-brand relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-black text-white mb-4"
          >
            تواصل معنا 📞
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg"
          >
            إحنا موجودين ٢٤/٧ — تواصل بأي طريقة بتحبها
          </motion.p>
        </div>
      </div>

      <div className="container-brand">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact cards */}
          <div className="space-y-4">
            {[
              {
                icon: Phone,
                title: "اتصل بينا",
                value: BRAND.phone,
                action: `tel:${BRAND.phone}`,
                color: "#D62828",
                sub: "متاح ١٢ ظهر – ٣ صباحاً",
              },
              {
                icon: MessageCircle,
                title: "واتساب",
                value: BRAND.phone,
                action: `https://wa.me/${BRAND.whatsapp}`,
                color: "#25D366",
                sub: "أسرع طريقة للتواصل",
              },
              {
                icon: MapPin,
                title: "العنوان",
                value: BRAND.address,
                action: BRAND.mapUrl,
                color: "#F4B400",
                sub: "القاهرة، مصر",
              },
              {
                icon: Clock,
                title: "أوقات العمل",
                value: BRAND.workingHours.ar,
                action: null,
                color: "#7C3AED",
                sub: "يومياً بدون استثناء",
              },
            ].map(({ icon: Icon, title, value, action, color, sub }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all"
              >
                {action ? (
                  <a
                    href={action}
                    target={action.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-0.5">{title}</p>
                      <p className="text-white font-bold text-base">{value}</p>
                      <p className="text-white/30 text-xs mt-0.5">{sub}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs mb-0.5">{title}</p>
                      <p className="text-white font-bold text-base">{value}</p>
                      <p className="text-white/30 text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-5 border border-white/5"
            >
              <p className="text-white/50 text-sm mb-4">
                تابعنا على السوشيال ميديا
              </p>
              <div className="flex gap-3">
                {[
                  {
                    href: BRAND.instagram,
                    label: "Instagram",
                    color: "#E1306C",
                    text: "IG",
                  },
                  {
                    href: BRAND.facebook,
                    label: "Facebook",
                    color: "#1877F2",
                    text: "FB",
                  },
                ].map(({ href, label, color, text }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:scale-110 transition-transform font-bold text-sm"
                    style={{ borderColor: `${color}30`, color }}
                    aria-label={label}
                  >
                    {text}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Map placeholder + Zones */}
          <div className="space-y-4">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl overflow-hidden border border-white/5 h-64 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D62828]/5 to-[#F4B400]/3" />
              <div className="text-center relative z-10">
                <MapPin className="w-12 h-12 text-[#D62828] mx-auto mb-3" />
                <p className="text-white/70 font-bold">القاهرة، مصر</p>
                <a
                  href={BRAND.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block px-5 py-2 gradient-red text-white text-sm font-bold rounded-xl"
                >
                  فتح الخريطة
                </a>
              </div>
            </motion.div>

            {/* Zones */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-5 border border-white/5"
              id="zones"
            >
              <h3 className="text-white font-bold mb-4">مناطق التوصيل</h3>
              <div className="grid grid-cols-2 gap-2">
                {DELIVERY_ZONES.map((zone) => (
                  <div
                    key={zone.id}
                    className="flex items-center justify-between px-3 py-2.5 bg-white/3 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D62828]" />
                      <span className="text-white/70 text-sm">
                        {zone.nameAr}
                      </span>
                    </div>
                    <span className="text-[#F4B400] text-sm font-bold">
                      {zone.deliveryFee} ج
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <a
            href={`https://wa.me/${BRAND.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-black text-xl rounded-2xl transition-colors shadow-2xl shadow-[#25D366]/30 inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              تواصل على واتساب دلوقتي
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
