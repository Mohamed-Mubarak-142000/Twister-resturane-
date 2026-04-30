"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import gsap from "gsap";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { DELIVERY_ZONES } from "@/constants/categories";
import { BRAND } from "@/constants/brand";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { saveOrderAction } from "@/app/actions/saveOrder";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

type Stage = "form" | "redirecting" | "awaiting" | "success";

const schema = z.object({
  name: z.string().min(2, "الاسم مطلوب — حرفين على الأقل"),
  phone: z
    .string()
    .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
    .max(15, "رقم الهاتف طويل جداً")
    .regex(/^[0-9+\s\-]+$/, "أدخل رقم هاتف صحيح"),
  address: z.string().min(5, "العنوان مطلوب"),
  area: z.string().min(1, "يرجى اختيار المنطقة"),
  landmark: z.string().optional(),
  paymentMethod: z.enum(["cash", "card"]),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CONFETTI_COLORS = ["#D62828", "#F4B400", "#ffffff", "#22C55E", "#7C3AED"];

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("form");
  const [orderId] = useState(() => `TW-${Date.now().toString().slice(-6)}`);
  const [savedData, setSavedData] = useState<FormData | null>(null);
  const [dotCount, setDotCount] = useState(1);

  // GSAP refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const waIconRef = useRef<HTMLDivElement>(null);
  const successCardRef = useRef<HTMLDivElement>(null);
  const checkPathRef = useRef<SVGPathElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  const {
    items,
    couponCode,
    getSubtotal,
    getDiscount,
    getDeliveryFee,
    hasFreeFries,
    clearCart,
  } = useCartStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { paymentMethod: "cash" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedArea = watch("area");
  const deliveryFee = getDeliveryFee(selectedArea);
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = subtotal - discount + deliveryFee;

  // Redirect if cart is empty (only from form stage)
  useEffect(() => {
    if (items.length === 0 && stage === "form") router.push("/menu");
  }, [items.length, stage, router]);

  // Animated dots while redirecting
  useEffect(() => {
    if (stage !== "redirecting") return;
    const iv = setInterval(() => setDotCount((d) => (d % 3) + 1), 500);
    return () => clearInterval(iv);
  }, [stage]);

  // ── GSAP: redirecting overlay ─────────────────────────────
  useEffect(() => {
    if (stage !== "redirecting") return;

    const ctx = gsap.context(() => {
      // Overlay fade-in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: "power2.out" },
      );
      // WhatsApp icon bounce-in
      gsap.fromTo(
        waIconRef.current,
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          delay: 0.15,
          ease: "back.out(1.7)",
        },
      );
      // Continuous pulse
      gsap.to(waIconRef.current, {
        scale: 1.1,
        duration: 0.85,
        delay: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    const timer = setTimeout(() => setStage("awaiting"), 3200);
    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [stage]);

  // ── GSAP: success modal ───────────────────────────────────
  useEffect(() => {
    if (stage !== "success") return;

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(
        successCardRef.current,
        { opacity: 0, scale: 0.82, y: 48 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.5)" },
      );

      // Checkmark stroke draw
      if (checkPathRef.current) {
        const len = checkPathRef.current.getTotalLength?.() ?? 80;
        gsap.set(checkPathRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(checkPathRef.current, {
          strokeDashoffset: 0,
          duration: 0.65,
          delay: 0.45,
          ease: "power2.out",
        });
      }

      // Confetti burst (radial scatter)
      if (confettiRef.current) {
        const pieces = Array.from(
          confettiRef.current.children,
        ) as HTMLElement[];
        const total = pieces.length;
        pieces.forEach((el, i) => {
          const angle = (i / total) * Math.PI * 2;
          const dist = 90 + Math.random() * 110;
          gsap.fromTo(
            el,
            { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 },
            {
              opacity: 0,
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist - 80,
              scale: 0,
              rotate: Math.random() * 400,
              duration: 1.1 + Math.random() * 0.4,
              delay: 0.3 + i * 0.04,
              ease: "power2.out",
            },
          );
        });
      }
    });

    return () => ctx.revert();
  }, [stage]);

  // ── Build WhatsApp message ────────────────────────────────
  const buildMessage = useCallback(
    (data: FormData): string => {
      const zoneLabel =
        DELIVERY_ZONES.find((z) => z.id === data.area)?.nameAr ?? data.area;

      const lines: (string | null)[] = [
        `🍕 *طلب جديد — ${orderId}*`,
        "",
        `👤 *الاسم:* ${data.name}`,
        `📱 *الهاتف:* ${data.phone}`,
        `📍 *المنطقة:* ${zoneLabel}`,
        `🏠 *العنوان:* ${data.address}`,
        data.landmark ? `🏢 *علامة:* ${data.landmark}` : null,
        "",
        "🛍️ *الطلبات:*",
      ];

      items.forEach((item) => {
        lines.push(
          `• ${item.nameAr}${item.selectedSize ? ` (${item.selectedSize.nameAr})` : ""} × ${item.quantity} — ${item.totalPrice} ج`,
        );
        if (item.selectedExtras?.length) {
          lines.push(
            `  ↳ ${item.selectedExtras.map((e) => e.nameAr).join("، ")}`,
          );
        }
      });

      if (hasFreeFries()) lines.push("🎉 بطاطس هدية مجاناً");
      if (couponCode) lines.push(`🏷️ كوبون: ${couponCode} (خصم ${discount} ج)`);

      lines.push(
        "",
        `💳 *الدفع:* ${data.paymentMethod === "cash" ? "كاش عند الاستلام" : "بطاقة"}`,
      );
      if (data.notes) lines.push(`📝 *ملاحظات:* ${data.notes}`);

      lines.push("", `💰 *المجموع الفرعي:* ${subtotal} ج`);
      if (discount > 0) lines.push(`🏷️ *خصم:* −${discount} ج`);
      lines.push(
        `🚚 *التوصيل:* ${deliveryFee === 0 ? "مجاناً 🎉" : `${deliveryFee} ج`}`,
        `✅ *الإجمالي: ${total} ج*`,
        "",
        "شكراً لاختياركم تويستر! 🙏",
      );

      return encodeURIComponent(lines.filter(Boolean).join("\n"));
    },
    [
      items,
      orderId,
      discount,
      couponCode,
      subtotal,
      deliveryFee,
      total,
      hasFreeFries,
    ],
  );

  // ── Submit ────────────────────────────────────────────────
  const onSubmit = async (data: FormData) => {
    setSavedData(data);

    // 1. Save order to CSV — await so we can surface failures to the user
    const saveResult = await saveOrderAction({
      id: orderId,
      timestamp: new Date().toISOString(),
      name: data.name,
      phone: data.phone,
      area: DELIVERY_ZONES.find((z) => z.id === data.area)?.nameAr ?? data.area,
      address: data.address,
      landmark: data.landmark ?? "",
      items: items.map((i) => `${i.nameAr} ×${i.quantity}`).join(" | "),
      subtotal,
      discount,
      delivery: deliveryFee,
      total,
      payment: data.paymentMethod,
      notes: data.notes ?? "",
      freeFries: hasFreeFries(),
      coupon: couponCode ?? "",
    });

    if (!saveResult.success) {
      toast.warning(
        `⚠️ تعذّر حفظ الطلب في النظام — سيُرسَل عبر واتساب بشكل طبيعي. (${saveResult.error ?? "خطأ غير معروف"})`,
        { duration: 8000 },
      );
    }

    // 2. Open WhatsApp (always — primary submission channel)
    window.open(
      `https://wa.me/${BRAND.whatsapp}?text=${buildMessage(data)}`,
      "_blank",
    );

    // 3. Show redirecting overlay
    setStage("redirecting");
  };

  const onConfirmSent = () => setStage("success");
  const onGoBack = () => setStage("form");
  const onFinish = () => {
    clearCart();
    reset();
    router.push("/");
  };

  if (items.length === 0 && stage === "form") return null;

  return (
    <>
      {/* ════════════════════════════════════════════
          STAGE: form
      ════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {stage === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.45 } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
            className="min-h-screen pt-24 pb-20"
          >
            <div className="container-brand max-w-5xl">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-white mb-2">
                  إتمام الطلب 📦
                </h1>
                <p className="text-white/40">
                  ادخل بياناتك وهنبعت طلبك على واتساب في ثواني
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid lg:grid-cols-5 gap-8">
                  {/* ── Form fields (3 cols) ── */}
                  <div className="lg:col-span-3 space-y-5">
                    {/* Personal info */}
                    <FormCard
                      title="البيانات الشخصية"
                      icon={<User className="w-5 h-5 text-[#D62828]" />}
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField label="الاسم *" error={errors.name?.message}>
                          <Input
                            {...register("name")}
                            placeholder="اسمك الكامل"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#D62828]/50"
                          />
                        </FormField>
                        <FormField
                          label="رقم الهاتف *"
                          error={errors.phone?.message}
                        >
                          <Input
                            {...register("phone")}
                            placeholder="01xxxxxxxxx"
                            type="tel"
                            dir="ltr"
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-left focus:border-[#D62828]/50"
                          />
                        </FormField>
                      </div>
                    </FormCard>

                    {/* Delivery */}
                    <FormCard
                      title="بيانات التوصيل"
                      icon={<MapPin className="w-5 h-5 text-[#D62828]" />}
                    >
                      <div className="space-y-4">
                        <FormField
                          label="المنطقة *"
                          error={errors.area?.message}
                        >
                          <select
                            {...register("area")}
                            className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D62828]/50 transition-colors"
                          >
                            <option value="" className="bg-[#1a1a1a]">
                              اختار منطقتك
                            </option>
                            {DELIVERY_ZONES.map((z) => (
                              <option
                                key={z.id}
                                value={z.id}
                                className="bg-[#1a1a1a]"
                              >
                                {z.nameAr} — توصيل {z.deliveryFee} ج (
                                {z.estimatedTime})
                              </option>
                            ))}
                          </select>
                        </FormField>

                        <FormField
                          label="العنوان بالتفصيل *"
                          error={errors.address?.message}
                        >
                          <Textarea
                            {...register("address")}
                            placeholder="الشارع، رقم البيت، الدور، الشقة..."
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none h-24 focus:border-[#D62828]/50"
                          />
                        </FormField>

                        <FormField label="علامة مميزة" hint="(اختياري)">
                          <Input
                            {...register("landmark")}
                            placeholder="بجانب مسجد، أمام سوبرماركت..."
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#D62828]/50"
                          />
                        </FormField>
                      </div>
                    </FormCard>

                    {/* Payment */}
                    <FormCard
                      title="طريقة الدفع"
                      icon={<CreditCard className="w-5 h-5 text-[#D62828]" />}
                    >
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          {
                            value: "cash",
                            label: "كاش عند الاستلام",
                            icon: "💵",
                            disabled: false,
                          },
                          {
                            value: "card",
                            label: "بطاقة (قريباً)",
                            icon: "💳",
                            disabled: true,
                          },
                        ].map(({ value, label, icon, disabled }) => (
                          <label
                            key={value}
                            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all select-none ${
                              disabled
                                ? "opacity-40 cursor-not-allowed border-white/5"
                                : "border-white/10 hover:border-[#D62828]/40"
                            }`}
                          >
                            <input
                              type="radio"
                              value={value}
                              {...register("paymentMethod")}
                              disabled={disabled}
                              className="accent-[#D62828]"
                            />
                            <span className="text-xl">{icon}</span>
                            <span className="text-white/70 text-sm font-medium">
                              {label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </FormCard>

                    {/* Notes */}
                    <FormCard
                      title="ملاحظات إضافية"
                      hint="(اختياري)"
                      icon={
                        <MessageCircle className="w-5 h-5 text-[#D62828]" />
                      }
                    >
                      <Textarea
                        {...register("notes")}
                        placeholder="أي تعليمات خاصة للتوصيل أو الطلب..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none h-20 focus:border-[#D62828]/50"
                      />
                    </FormCard>
                  </div>

                  {/* ── Order summary (2 cols) ── */}
                  <div className="lg:col-span-2">
                    <div className="glass rounded-2xl p-6 border border-white/5 sticky top-24 space-y-5">
                      <h2 className="text-white font-bold text-lg">
                        ملخص الطلب
                      </h2>

                      {/* Items list */}
                      <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-start gap-3">
                            <div className="w-9 h-9 glass rounded-lg flex items-center justify-center text-lg shrink-0">
                              🍕
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium leading-tight truncate">
                                {item.nameAr}
                              </p>
                              {item.selectedSize && (
                                <p className="text-white/30 text-xs">
                                  {item.selectedSize.nameAr}
                                </p>
                              )}
                              <p className="text-white/30 text-xs">
                                ×{item.quantity}
                              </p>
                            </div>
                            <p className="text-[#F4B400] text-sm font-bold shrink-0">
                              {item.totalPrice} ج
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Free fries badge */}
                      {hasFreeFries() && (
                        <div className="p-3 bg-[#F4B400]/10 border border-[#F4B400]/20 rounded-xl text-center">
                          <p className="text-[#F4B400] text-sm font-bold">
                            🎉 بطاطس هدية مجاناً!
                          </p>
                        </div>
                      )}

                      {/* Totals */}
                      <div className="space-y-2 text-sm border-t border-white/5 pt-4">
                        <div className="flex justify-between text-white/50">
                          <span>المجموع الفرعي</span>
                          <span>{subtotal} ج</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-400">
                            <span>خصم الكوبون</span>
                            <span>−{discount} ج</span>
                          </div>
                        )}
                        <div className="flex justify-between text-white/50">
                          <span>التوصيل</span>
                          <span>
                            {deliveryFee === 0
                              ? "مجاناً 🎉"
                              : `${deliveryFee} ج`}
                          </span>
                        </div>
                        <div className="flex justify-between text-white font-black text-lg pt-1 border-t border-white/5">
                          <span>الإجمالي</span>
                          <span className="text-[#F4B400]">{total} ج</span>
                        </div>
                      </div>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        className="w-full py-4 gradient-red text-white font-black text-lg rounded-2xl glow-red flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait transition-opacity"
                      >
                        {isSubmitting ? (
                          <span className="animate-pulse">جاري الإعداد...</span>
                        ) : (
                          <>
                            <WhatsAppIcon className="w-5 h-5" />
                            أرسل الطلب على واتساب
                          </>
                        )}
                      </motion.button>

                      <p className="text-white/20 text-xs text-center leading-relaxed">
                        هيتفتح واتساب بتفاصيل طلبك — ابعت الرسالة ثم عُد هنا
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          STAGE: redirecting  (GSAP-only, no Framer)
      ════════════════════════════════════════════ */}
      {stage === "redirecting" && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#070707]/98 backdrop-blur-xl"
          style={{ opacity: 0 }}
        >
          {/* WhatsApp icon */}
          <div ref={waIconRef} className="mb-8" style={{ opacity: 0 }}>
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{ background: "rgba(37,211,102,0.12)" }}
            >
              <WhatsAppIcon
                className="w-18 h-18"
                style={{ color: "#25D366", width: 72, height: 72 }}
              />
            </div>
          </div>

          <h2 className="text-white font-black text-2xl mb-3 text-center">
            جاري فتح واتساب{".".repeat(dotCount)}
          </h2>
          <p className="text-white/40 text-center max-w-xs leading-relaxed">
            ستُفتح نافذة واتساب — أرسل الرسالة ثم عُد هنا لتأكيد طلبك
          </p>

          {/* Pulse dots */}
          <div className="mt-10 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-[#25D366]/50"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════
          STAGE: awaiting confirmation
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {stage === "awaiting" && (
          <motion.div
            key="awaiting"
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#070707] p-5"
          >
            <div className="w-full max-w-md text-center">
              {/* Icon */}
              <div
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: "rgba(37,211,102,0.1)" }}
              >
                <WhatsAppIcon
                  style={{ color: "#25D366", width: 56, height: 56 }}
                />
              </div>

              <h2 className="text-white font-black text-3xl mb-3">
                هل أرسلت الطلب؟
              </h2>
              <p className="text-white/40 mb-8 leading-relaxed">
                بعد ما تبعت الرسالة على واتساب، اضغط على الزر هنا لتأكيد طلبك
              </p>

              {/* Mini order summary */}
              {savedData && (
                <div className="glass rounded-2xl p-4 border border-white/8 mb-7 text-right space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/30">رقم الطلب</span>
                    <span className="text-[#F4B400] font-black">{orderId}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/30">الاسم</span>
                    <span className="text-white font-medium">
                      {savedData.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/30">المنطقة</span>
                    <span className="text-white/70">
                      {
                        DELIVERY_ZONES.find((z) => z.id === savedData.area)
                          ?.nameAr
                      }
                    </span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-sm">الإجمالي</span>
                    <span className="text-[#F4B400] font-black text-xl">
                      {total} ج
                    </span>
                  </div>
                </div>
              )}

              {/* Confirm sent */}
              <motion.button
                onClick={onConfirmSent}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-5 bg-[#25D366] hover:bg-[#1db954] text-white font-black text-xl rounded-2xl shadow-2xl shadow-[#25D366]/25 flex items-center justify-center gap-3 mb-4 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6" />
                نعم، لقد أرسلت الطلب ✅
              </motion.button>

              {/* Go back link */}
              <button
                onClick={onGoBack}
                className="text-white/25 hover:text-white/50 text-sm transition-colors"
              >
                ↩ لا، أريد العودة والتعديل
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          STAGE: success modal  (GSAP-only)
      ════════════════════════════════════════════ */}
      {stage === "success" && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#070707]/95 backdrop-blur-xl p-4">
          <div
            ref={successCardRef}
            className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 text-center relative overflow-hidden"
            style={{ opacity: 0, transform: "scale(0.82) translateY(48px)" }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-500/6 rounded-full blur-3xl" />
            </div>

            {/* Confetti pieces */}
            <div
              ref={confettiRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-sm"
                  style={{
                    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                  }}
                />
              ))}
            </div>

            {/* Animated checkmark */}
            <div className="relative mx-auto mb-6 w-24 h-24">
              <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
                {/* Track circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="3"
                  opacity="0.15"
                />
                {/* Progress circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="3"
                  strokeDasharray="264"
                  strokeDashoffset="66"
                  opacity="0.4"
                />
              </svg>
              {/* Check path (GSAP draws this) */}
              <svg
                viewBox="0 0 96 96"
                className="w-full h-full absolute inset-0"
              >
                <path
                  ref={checkPathRef}
                  d="M 28 50 L 42 64 L 68 32"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="text-white font-black text-3xl mb-2">
              تم استلام طلبك! 🎉
            </h2>
            <p className="text-white/50 mb-6 leading-relaxed">
              فريق تويستر استلم طلبك وهيبدأ التحضير دلوقتي
            </p>

            {/* Order ID */}
            <div className="inline-flex items-center gap-2 glass-red px-4 py-2 rounded-xl border border-[#D62828]/20 mb-6">
              <span className="text-white/40 text-sm">رقم الطلب</span>
              <span className="text-[#F4B400] font-black text-lg">
                {orderId}
              </span>
            </div>

            {/* Delivery estimate */}
            <div className="glass rounded-2xl p-5 border border-white/5 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#F4B400]" />
                <span className="text-white/50 text-sm">
                  وقت التوصيل المتوقع
                </span>
              </div>
              <div className="text-[#F4B400] font-black text-5xl tracking-tight">
                ٣٠ — ٤٥
              </div>
              <div className="text-white/30 text-sm mt-1">دقيقة</div>
            </div>

            {/* Order details */}
            {savedData && (
              <div className="text-right space-y-2 mb-6 text-sm border-t border-white/5 pt-5">
                <div className="flex justify-between">
                  <span className="text-white/30">المنطقة</span>
                  <span className="text-white/70">
                    {
                      DELIVERY_ZONES.find((z) => z.id === savedData.area)
                        ?.nameAr
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/30">الدفع</span>
                  <span className="text-white/70">
                    {savedData.paymentMethod === "cash"
                      ? "كاش عند الاستلام"
                      : "بطاقة"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/30">الإجمالي</span>
                  <span className="text-[#F4B400] font-bold text-base">
                    {total} ج
                  </span>
                </div>
              </div>
            )}

            {/* Finish button */}
            <motion.button
              onClick={onFinish}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 gradient-red text-white font-black text-lg rounded-2xl glow-red"
            >
              العودة للرئيسية 🏠
            </motion.button>

            <p className="text-white/20 text-xs mt-3">
              استمتع بطلبك! شكراً لاختياركم تويستر 🍕
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────

function FormCard({
  title,
  icon,
  hint,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl p-6 border border-white/5">
      <h2 className="text-white font-bold text-base mb-5 flex items-center gap-2">
        {icon}
        {title}
        {hint && (
          <span className="text-white/30 font-normal text-sm">{hint}</span>
        )}
      </h2>
      {children}
    </div>
  );
}

function FormField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-white/70 text-sm mb-2 block">
        {label}{" "}
        {hint && <span className="text-white/30 font-normal">{hint}</span>}
      </Label>
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
          ⚠ {error}
        </p>
      )}
    </div>
  );
}

function WhatsAppIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
