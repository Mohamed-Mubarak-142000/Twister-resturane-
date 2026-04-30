"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tag,
  MapPin,
  ClipboardList,
  BarChart3,
  Ticket,
  Image,
  Bell,
  LogOut,
  Menu,
  TrendingUp,
  ShoppingBag,
  Users,
  Star,
} from "lucide-react";
import { MENU_ITEMS } from "@/data/menu";
import { OFFERS } from "@/data/offers";

const STATS = [
  {
    icon: ShoppingBag,
    label: "طلبات اليوم",
    value: "47",
    trend: "+12٪",
    color: "#D62828",
  },
  {
    icon: TrendingUp,
    label: "إيرادات اليوم",
    value: "4,850 ج",
    trend: "+8٪",
    color: "#F4B400",
  },
  {
    icon: Users,
    label: "عملاء جدد",
    value: "23",
    trend: "+5٪",
    color: "#7C3AED",
  },
  {
    icon: Star,
    label: "متوسط التقييم",
    value: "4.9 ⭐",
    trend: "ثابت",
    color: "#22C55E",
  },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "لوحة التحكم", id: "dashboard" },
  { icon: UtensilsCrossed, label: "المنتجات", id: "products" },
  { icon: Tag, label: "العروض", id: "offers" },
  { icon: MapPin, label: "المناطق", id: "zones" },
  { icon: ClipboardList, label: "الطلبات", id: "orders" },
  { icon: BarChart3, label: "التحليلات", id: "analytics" },
  { icon: Ticket, label: "الكوبونات", id: "coupons" },
  { icon: Image, label: "البانرات", id: "banners" },
  { icon: Bell, label: "الإشعارات", id: "notifications" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Simple auth guard (replace with real auth)
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 w-full max-w-sm border border-white/10"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-2xl font-black text-white">لوحة الإدارة</h1>
            <p className="text-white/40 text-sm mt-1">ادخل الباسورد للمتابعة</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="الباسورد"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 mb-4 focus:outline-none focus:border-[#D62828]/50 text-left"
            onKeyDown={(e) =>
              e.key === "Enter" && password === "admin123" && setAuthed(true)
            }
          />
          <button
            onClick={() => password === "admin123" && setAuthed(true)}
            className="w-full py-3 gradient-red text-white font-bold rounded-xl"
          >
            دخول
          </button>
          <p className="text-white/20 text-xs text-center mt-4">
            الباسورد: admin123
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0A0A0A]" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-[#141414] border-l border-white/5 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🍕</span>
            <div>
              <div className="text-lg font-black text-gradient-red-gold">
                تويستر
              </div>
              <div className="text-xs text-white/30">لوحة الإدارة</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? "gradient-red text-white"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => setAuthed(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            خروج
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 glass rounded-xl text-white/60"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-white font-bold text-lg">
              {NAV_ITEMS.find((i) => i.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/40 text-sm">المتجر مفتوح</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "products" && <ProductsView />}
          {activeTab === "offers" && <OffersView />}
          {activeTab === "orders" && <OrdersView />}
          {activeTab === "analytics" && <AnalyticsView />}
          {activeTab === "coupons" && <CouponsView />}
          {["zones", "banners", "notifications"].includes(activeTab) && (
            <ComingSoonView
              label={NAV_ITEMS.find((i) => i.id === activeTab)?.label ?? ""}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, label, value, trend, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-5 border border-white/5"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <span className="text-green-400 text-xs font-bold">{trend}</span>
            </div>
            <div className="text-white font-black text-2xl">{value}</div>
            <div className="text-white/40 text-sm mt-1">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent orders placeholder */}
      <div className="glass rounded-2xl p-6 border border-white/5">
        <h2 className="text-white font-bold mb-4">آخر الطلبات</h2>
        <div className="space-y-3">
          {["أحمد محمد", "سارة عبدالرحمن", "محمود علي", "نور الهدى"].map(
            (name, i) => (
              <div
                key={name}
                className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 gradient-red rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{name}</p>
                    <p className="text-white/30 text-xs">منذ {i + 1} دقيقة</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-[#F4B400] font-bold text-sm">
                    {[85, 120, 95, 150][i]} ج
                  </p>
                  <span className="text-xs px-2 py-0.5 bg-green-400/10 text-green-400 rounded-full">
                    جديد
                  </span>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function ProductsView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-sm">{MENU_ITEMS.length} منتج</p>
        <button className="px-4 py-2 gradient-red text-white text-sm font-bold rounded-xl">
          + إضافة منتج
        </button>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {MENU_ITEMS.slice(0, 12).map((item) => (
          <div
            key={item.id}
            className="glass rounded-2xl p-4 border border-white/5 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl shrink-0">
              🍕
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm truncate">
                {item.nameAr}
              </p>
              <p className="text-[#F4B400] text-sm font-bold">{item.price} ج</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="text-white/30 hover:text-blue-400 text-xs transition-colors">
                تعديل
              </button>
              <button className="text-white/30 hover:text-red-400 text-xs transition-colors">
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OffersView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-sm">{OFFERS.length} عرض</p>
        <button className="px-4 py-2 gradient-red text-white text-sm font-bold rounded-xl">
          + إضافة عرض
        </button>
      </div>
      {OFFERS.map((offer) => (
        <div
          key={offer.id}
          className="glass rounded-2xl p-5 border border-white/5 flex items-center gap-4"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `${offer.color}15` }}
          >
            🎉
          </div>
          <div className="flex-1">
            <p className="text-white font-bold">{offer.titleAr}</p>
            <p className="text-white/40 text-sm">{offer.descriptionAr}</p>
          </div>
          {offer.code && (
            <span className="glass-red px-3 py-1 rounded-lg text-[#F4B400] text-sm font-bold border border-[#F4B400]/20 shrink-0">
              {offer.code}
            </span>
          )}
          <button className="text-white/30 hover:text-blue-400 text-sm transition-colors shrink-0">
            تعديل
          </button>
        </div>
      ))}
    </div>
  );
}

function OrdersView() {
  const orders = [
    {
      id: "#1047",
      name: "أحمد محمد",
      total: 120,
      status: "جديد",
      time: "5 دقائق",
    },
    {
      id: "#1046",
      name: "سارة عبدالرحمن",
      total: 85,
      status: "جاري التحضير",
      time: "15 دقيقة",
    },
    {
      id: "#1045",
      name: "محمود علي",
      total: 200,
      status: "جاري التوصيل",
      time: "30 دقيقة",
    },
    {
      id: "#1044",
      name: "نور الهدى",
      total: 95,
      status: "تم التسليم",
      time: "45 دقيقة",
    },
  ];

  const statusColors: Record<string, string> = {
    جديد: "bg-blue-400/10 text-blue-400",
    "جاري التحضير": "bg-yellow-400/10 text-yellow-400",
    "جاري التوصيل": "bg-orange-400/10 text-orange-400",
    "تم التسليم": "bg-green-400/10 text-green-400",
  };

  return (
    <div className="glass rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h2 className="text-white font-bold">الطلبات الحالية</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5 text-white/30 text-sm">
              <th className="text-right px-5 py-3">رقم الطلب</th>
              <th className="text-right px-5 py-3">العميل</th>
              <th className="text-right px-5 py-3">الإجمالي</th>
              <th className="text-right px-5 py-3">الحالة</th>
              <th className="text-right px-5 py-3">منذ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-white/3 hover:bg-white/2 transition-colors"
              >
                <td className="px-5 py-4 text-[#F4B400] font-bold text-sm">
                  {order.id}
                </td>
                <td className="px-5 py-4 text-white text-sm">{order.name}</td>
                <td className="px-5 py-4 text-white font-bold">
                  {order.total} ج
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-white/40 text-sm">
                  {order.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsView() {
  const data = [
    { day: "السبت", orders: 42, revenue: 4200 },
    { day: "الأحد", orders: 38, revenue: 3800 },
    { day: "الاثنين", orders: 55, revenue: 5500 },
    { day: "الثلاثاء", orders: 61, revenue: 6100 },
    { day: "الأربعاء", orders: 48, revenue: 4800 },
    { day: "الخميس", orders: 78, revenue: 7800 },
    { day: "الجمعة", orders: 65, revenue: 6500 },
  ];
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6 border border-white/5">
        <h2 className="text-white font-bold mb-6">الإيرادات — آخر ٧ أيام</h2>
        <div className="flex items-end gap-3 h-48">
          {data.map(({ day, revenue }) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-white/40 text-xs">{revenue} ج</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(revenue / maxRevenue) * 160}px` }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="w-full gradient-red rounded-t-lg min-h-1"
              />
              <span className="text-white/40 text-xs">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CouponsView() {
  const coupons = [
    { code: "TWISTER20", discount: "20٪", uses: 47, active: true },
    { code: "THURSDAY15", discount: "15٪", uses: 23, active: true },
    { code: "FAMILY25", discount: "25٪", uses: 12, active: false },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-sm">{coupons.length} كوبون</p>
        <button className="px-4 py-2 gradient-red text-white text-sm font-bold rounded-xl">
          + إنشاء كوبون
        </button>
      </div>
      {coupons.map((coupon) => (
        <div
          key={coupon.code}
          className="glass rounded-2xl p-5 border border-white/5 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="glass-red px-4 py-2 rounded-xl border border-[#F4B400]/20">
              <span className="text-[#F4B400] font-black tracking-wider">
                {coupon.code}
              </span>
            </div>
            <div>
              <p className="text-white font-bold">{coupon.discount} خصم</p>
              <p className="text-white/40 text-xs">{coupon.uses} استخدام</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold ${coupon.active ? "bg-green-400/10 text-green-400" : "bg-white/5 text-white/30"}`}
            >
              {coupon.active ? "فعال" : "موقوف"}
            </span>
            <button className="text-white/30 hover:text-blue-400 text-sm">
              تعديل
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ComingSoonView({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="text-6xl">🚧</div>
      <h2 className="text-white font-black text-2xl">{label}</h2>
      <p className="text-white/40">قريباً — جاري التطوير</p>
    </div>
  );
}
