"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/constants/brand";
import { DELIVERY_ZONES } from "@/constants/categories";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D62828]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F4B400]/3 rounded-full blur-3xl" />
      </div>

      <div className="container-brand relative z-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <span className="text-4xl">🍕</span>
              <div>
                <div className="text-2xl font-black text-gradient-red-gold">
                  تويستر
                </div>
                <div className="text-xs text-white/40 tracking-widest">
                  CREPES & PIZZA
                </div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              طعم خرافي في كل لقمة — البيتزا والكريبات الأشهى في مصر، مكونات
              طازجة وتوصيل سريع.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { text: "IG", href: BRAND.instagram, label: "Instagram" },
                { text: "FB", href: BRAND.facebook, label: "Facebook" },
              ].map(({ text, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:border-white/20 transition-colors text-xs font-bold"
                  aria-label={label}
                >
                  {text}
                </motion.a>
              ))}
              {/* TikTok */}
              <motion.a
                href={BRAND.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm font-bold"
                aria-label="TikTok"
              >
                𝕋
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-5 text-base">روابط سريعة</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#F4B400] text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D62828]" />
                    {link.labelAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery Zones */}
          <div>
            <h3 className="text-white font-bold mb-5 text-base">
              مناطق التوصيل
            </h3>
            <ul className="space-y-2">
              {DELIVERY_ZONES.slice(0, 6).map((zone) => (
                <li
                  key={zone.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-white/50">{zone.nameAr}</span>
                  <span className="text-[#F4B400] font-medium">
                    {zone.deliveryFee} ج
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-5 text-base">تواصل معنا</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-start gap-3 text-white/50 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-[#D62828] shrink-0" />
                  <span className="text-sm">{BRAND.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/50">
                <MapPin className="w-4 h-4 mt-0.5 text-[#D62828] shrink-0" />
                <span className="text-sm">{BRAND.address}</span>
              </li>
              <li className="flex items-start gap-3 text-white/50">
                <Clock className="w-4 h-4 mt-0.5 text-[#F4B400] shrink-0" />
                <span className="text-sm">{BRAND.workingHours.ar}</span>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1ebe5c] text-white text-sm font-bold rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              اطلب على واتساب
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-white/30 text-sm">
            © {year} تويستر كريبس وبيتزا. جميع الحقوق محفوظة.
          </p>
          <p className="text-white/20 text-xs">صُنع بـ ❤️ في مصر</p>
        </div>
      </div>
    </footer>
  );
}
