import type { Offer } from "@/types";

export const OFFERS: Offer[] = [
  {
    id: "opening-pizza",
    titleAr: "بيتزا هدية كل ساعة 🍕",
    titleEn: "Free Pizza Every Hour",
    descriptionAr:
      "كل ساعة من بعد المغرب لحد وقت العشا — بيتزا هدية مجانية! يوم الافتتاح فقط",
    descriptionEn:
      "Every hour from after Maghrib until dinner time — free pizza! Opening day only.",
    image: "/images/offers/grand-opening.jpg",
    badge: "يوم الافتتاح",
    color: "#D62828",
  },
  {
    id: "free-fries",
    titleAr: "بطاطس هدية مع كل طلب 🍟",
    titleEn: "Free Fries with Every Order",
    descriptionAr: "أي طلب تعمله — باكيت بطاطس هدية منا تلقائياً بدون أي كود",
    descriptionEn:
      "Any order gets 1 free pack of fries automatically — no code needed.",
    image: "/images/offers/free-fries.jpg",
    badge: "مع كل طلب",
    color: "#F4B400",
  },
  {
    id: "free-delivery",
    titleAr: "توصيل مجاني 🛵",
    titleEn: "Free Delivery",
    descriptionAr: "توصيل مجاني خلال أيام الافتتاح الأولى على جميع الطلبات",
    descriptionEn: "Free delivery on all orders during the first opening days.",
    image: "/images/offers/delivery.jpg",
    badge: "أيام الافتتاح",
    color: "#22C55E",
  },
];
