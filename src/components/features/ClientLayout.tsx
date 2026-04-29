"use client";

import { useCart } from "@/hooks/useCart";
import { BottomNav, DesktopHeader, MobileHeader } from "@/components/features/Navigation";
import { CartDrawer } from "@/components/features/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        <LayoutContent>{children}</LayoutContent>
      </CartProvider>
    </LanguageProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { totalItems } = useCart();
  const { isRTL } = useLanguage();

  return (
    <div className={isRTL ? "font-arabic" : "font-sans"}>
      <MobileHeader />
      <DesktopHeader cartCount={totalItems} />
      <main className="pb-24 pt-20 md:pt-24 min-h-screen">
        {children}
      </main>
      <BottomNav cartCount={totalItems} />
      <CartDrawer />
    </div>
  );
}
