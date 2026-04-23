"use client";

import { useCart } from "@/hooks/useCart";
import { BottomNav, DesktopHeader, MobileHeader } from "@/components/features/Navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { totalItems } = useCart();

  return (
    <>
      <MobileHeader />
      <DesktopHeader cartCount={totalItems} />
      <main className="pb-24 pt-20 md:pt-24 min-h-screen">
        {children}
      </main>
      <BottomNav cartCount={totalItems} />
    </>
  );
}
