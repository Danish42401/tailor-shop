"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Ruler, Phone, Globe } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/context/LanguageContext";

export const BottomNav = ({ cartCount }: { cartCount: number }) => {
  const pathname = usePathname();
  const { setIsCartOpen } = useCart();
  const { t } = useLanguage();

  const navItems = [
    { name: t("nav.home"), icon: Home, href: "/" },
    { name: t("nav.boutique"), icon: ShoppingBag, href: "/catalog" },
    { name: "Cart", icon: ShoppingBag, onClick: () => setIsCartOpen(true) },
    { name: t("nav.bespoke"), icon: Ruler, href: "/custom" },
    { name: t("nav.contact"), icon: Phone, href: "/contact" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 px-4 py-3 flex justify-between items-center md:hidden">
      {navItems.map((item) => {
        const isActive = item.href ? pathname === item.href : false;
        const Icon = item.icon;
        
        const content = (
          <div className="relative">
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            {item.name === "Cart" && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        );

        if (item.onClick) {
          return (
            <button
              key={item.name}
              onClick={item.onClick}
              className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400"
            >
              {content}
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {item.name}
              </span>
            </button>
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href!}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-amber-600" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {content}
            <span className="text-[10px] font-medium uppercase tracking-wider">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export const MobileHeader = () => {
  const { setIsCartOpen, totalItems } = useCart();
  const { language, setLanguage } = useLanguage();
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 md:hidden px-6 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
          <span className="text-amber-600">EMIRATES</span> DEEP
        </Link>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black uppercase text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700"
          >
            {language === "en" ? "AR" : "EN"}
          </button>
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="p-2 text-slate-900 dark:text-white relative"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-amber-600 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export const DesktopHeader = ({ cartCount }: { cartCount: number }) => {
  const { setIsCartOpen } = useCart();
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 hidden md:block px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
          <span className="text-amber-600">EMIRATES</span> DEEP COLLECTION
        </Link>
        
        <div className="flex items-center gap-8 font-semibold text-sm uppercase tracking-widest text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-amber-600 transition-colors">{t("nav.home")}</Link>
          <Link href="/catalog" className="hover:text-amber-600 transition-colors">{t("nav.boutique")}</Link>
          <Link href="/custom" className="hover:text-amber-600 transition-colors">{t("nav.bespoke")}</Link>
          <Link href="/contact" className="hover:text-amber-600 transition-colors">{t("nav.contact")}</Link>
          
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
          
          <button 
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="flex items-center gap-2 hover:text-amber-600 transition-colors group"
          >
            <Globe size={16} className="text-slate-400 group-hover:text-amber-600 transition-colors" />
            <span className="text-[11px] font-black">{language === "en" ? "العربية" : "ENGLISH"}</span>
          </button>

          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative p-2 text-slate-900 dark:text-white hover:text-amber-600 transition-colors"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
