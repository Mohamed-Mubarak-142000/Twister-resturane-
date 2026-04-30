"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "إيه مناطق التوصيل بتاعتكم؟",
    a: "بنوصل لأكتر من ٨ مناطق في القاهرة — مدينة نصر، مصر الجديدة، العبور، الشروق، الرحاب، مدينتي، القاهرة الجديدة، وعين شمس. وبنضيف مناطق جديدة باستمرار!",
  },
  {
    q: "قد إيه وقت التوصيل؟",
    a: "متوسط وقت التوصيل ٣٠-٤٥ دقيقة حسب منطقتك. وبنضمن إن أكلك يوصلك طازج وساخن.",
  },
  {
    q: "فيه حد أدنى للطلب؟",
    a: "الحد الأدنى للطلب ٨٠ جنيه في معظم المناطق، و١٠٠-١٢٠ جنيه في المناطق البعيدة.",
  },
  {
    q: "إيه طرق الدفع المتاحة؟",
    a: "بنقبل كاش عند الاستلام دلوقتي. قريباً هنفتح الدفع بالكارت والمحافظ الإلكترونية.",
  },
  {
    q: "هل أكلكم مناسب لمرضى السكر؟",
    a: "عندنا خيارات صحية وبنقدر نعمل تعديلات على أي طلب. تواصل معنا على واتساب وهنساعدك تختار.",
  },
  {
    q: "ممكن أعمل طلب للمناسبات؟",
    a: "أكيد! بنقبل طلبات الكميات الكبيرة للمناسبات والحفلات. تواصل معنا على واتساب على الأقل ٢٤ ساعة مسبقاً.",
  },
  {
    q: "هل في عروض ثابتة؟",
    a: "آه! عندنا عروض الخميس كل أسبوع، وبطاطس هدية مع الطلبات اللي فوق ١٠٠ جنيه، وكمان عروض الافتتاح الخاصة.",
  },
];

export function FAQSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-20 relative">
      <div className="container-brand">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-[#D62828] text-sm font-bold tracking-widest uppercase mb-3 block">
            أسئلة شائعة
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            عندك سؤال؟
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            إجابات على الأسئلة الأكثر تكراراً من عملاؤنا
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass rounded-2xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-right"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-[#D62828] shrink-0" />
                  <span className="text-white font-medium text-sm sm:text-base">
                    {faq.q}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 mr-2"
                >
                  <ChevronDown className="w-5 h-5 text-white/40" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-3 mr-8">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
