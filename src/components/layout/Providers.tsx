"use client";

import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useUIStore } from "@/store/uiStore";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { WhatsAppCTA } from "@/components/shared/WhatsAppCTA";
import { CartFAB } from "@/components/shared/CartFAB";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { CursorGlow } from "@/components/shared/CursorGlow";
import { AmbientParticles } from "@/components/shared/AmbientParticles";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const { isLoading, setLoading } = useUIStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <CursorGlow />
      <AmbientParticles />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppCTA />
      <CartFAB />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            border: "1px solid rgba(214,40,40,0.3)",
            color: "#fff",
            fontFamily: "var(--font-cairo)",
          },
        }}
      />
    </>
  );
}
