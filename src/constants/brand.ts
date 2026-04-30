import type { NavLink } from "@/types";

export const BRAND = {
  name: "Twister Crepes & Pizza",
  nameAr: "تويستر كريبس وبيتزا",
  taglineAr: "طعم خرافي في كل لقمة",
  taglineEn: "Legendary Taste in Every Bite",
  phone: "+201233326848",
  whatsapp: "201233326848",
  email: "info@twisterpizza.com",
  address: "القاهرة، مصر",
  mapUrl: "https://maps.google.com",
  instagram: "https://instagram.com/twisterpizza",
  facebook: "https://www.facebook.com/profile.php?id=61562935904884",
  tiktok: "https://tiktok.com/@twisterpizza",
  workingHours: {
    ar: "يومياً من ١٢ ظهراً حتى ٣ صباحاً",
    en: "Daily 12 PM – 3 AM",
  },
} as const;

export const COLORS = {
  red: "#D62828",
  gold: "#F4B400",
  dark: "#0F0F0F",
  white: "#FFFFFF",
} as const;

export const NAV_LINKS: NavLink[] = [
  { labelAr: "الرئيسية", labelEn: "Home", href: "/" },
  { labelAr: "المنيو", labelEn: "Menu", href: "/menu" },
  { labelAr: "العروض", labelEn: "Offers", href: "/offers" },
  { labelAr: "المناطق", labelEn: "Zones", href: "/contact#zones" },
  { labelAr: "تقييمات", labelEn: "Reviews", href: "/reviews" },
  { labelAr: "اتصل بنا", labelEn: "Contact", href: "/contact" },
];

export const DELIVERY_FEE_BASE = 15;
export const FREE_DELIVERY_THRESHOLD = 150;
export const FREE_FRIES_THRESHOLD = 100;
export const TAX_RATE = 0;

export const COUPON_CODES: Record<string, number> = {
  TWISTER10: 10,
  WELCOME15: 15,
  FIRST20: 20,
  THURSDAY15: 15,
  FAMILY25: 25,
};
