// ============================================================
// BRAND & PRODUCT TYPES
// ============================================================

export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: MenuCategory;
  tags?: string[];
  calories?: number;
  isPopular?: boolean;
  isNew?: boolean;
  isOffer?: boolean;
  extras?: Extra[];
  sizes?: Size[];
  spicyLevel?: 0 | 1 | 2 | 3;
  rating?: number;
  reviewCount?: number;
}

export type MenuCategory =
  | "pizza"
  | "stromboli"
  | "burger"
  | "souri"
  | "crepes-chicken"
  | "crepes-meat"
  | "crepes-fries"
  | "crepes-mix"
  | "twister-specials"
  | "additions";

export interface CategoryInfo {
  id: MenuCategory;
  nameAr: string;
  nameEn: string;
  icon: string;
  image: string;
  color: string;
}

export interface Extra {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
}

export interface Size {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
}

// ============================================================
// CART TYPES
// ============================================================

export interface CartItem {
  id: string;
  menuItemId: string;
  nameAr: string;
  nameEn: string;
  image: string;
  category: MenuCategory;
  price: number;
  quantity: number;
  selectedSize?: Size;
  selectedExtras?: Extra[];
  spicyLevel?: number;
  notes?: string;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
  notes: string;
  isOpen: boolean;
}

// ============================================================
// ORDER / CHECKOUT TYPES
// ============================================================

export interface DeliveryZone {
  id: string;
  nameAr: string;
  nameEn: string;
  deliveryFee: number;
  minOrder: number;
  estimatedTime: string;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  area: string;
  landmark?: string;
  paymentMethod: "cash" | "card";
  notes?: string;
}

// ============================================================
// OFFERS TYPES
// ============================================================

export interface Offer {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  discountPercent?: number;
  discountAmount?: number;
  expiresAt?: Date;
  code?: string;
  badge?: string;
  color: string;
}

// ============================================================
// REVIEWS TYPES
// ============================================================

export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  commentAr: string;
  commentEn?: string;
  date: string;
  platform?: "google" | "facebook" | "website";
  verified?: boolean;
}

// ============================================================
// UI TYPES
// ============================================================

export interface NavLink {
  labelAr: string;
  labelEn: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
