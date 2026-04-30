"use client";

import { useUIStore } from "@/store/uiStore";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const { isLoading } = useUIStore();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0F0F0F] flex flex-col items-center justify-center gap-8"
        >
          {/* Spinning pizza */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative w-32 h-32"
          >
            <div className="absolute inset-0 animate-spin-slow text-7xl flex items-center justify-center">
              🍕
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full animate-pulse-glow" />
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl font-black text-white mb-2">
              <span className="text-gradient-red-gold">تويستر</span>
            </h1>
            <p className="text-sm text-white/50 tracking-widest">
              CREPES & PIZZA
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-1/2 bg-gradient-to-r from-[#D62828] to-[#F4B400] rounded-full"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 0.6, duration: 1.5, repeat: Infinity }}
            className="text-white/40 text-sm"
          >
            جاري التحميل...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
