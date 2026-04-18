"use client";

import { useCart } from "@/hooks/useCart";
import { BottomNav, DesktopHeader } from "@/components/features/Navigation";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { totalItems } = useCart();

  return (
    <>
      <DesktopHeader cartCount={totalItems} />
      <main className="pb-24 md:pt-24 min-h-screen">
        {children}
      </main>
      <BottomNav cartCount={totalItems} />
    </>
  );
}
