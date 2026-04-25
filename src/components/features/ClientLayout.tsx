"use client";

import { useCart } from "@/hooks/useCart";
import { BottomNav, DesktopHeader, MobileHeader } from "@/components/features/Navigation";
import { CartDrawer } from "@/components/features/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <LayoutContent>{children}</LayoutContent>
    </CartProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { totalItems } = useCart();

  return (
    <>
      <MobileHeader />
      <DesktopHeader cartCount={totalItems} />
      <main className="pb-24 pt-20 md:pt-24 min-h-screen">
        {children}
      </main>
      <BottomNav cartCount={totalItems} />
      <CartDrawer />
    </>
  );
}
