"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Ruler, Phone, Menu } from "lucide-react";

export const BottomNav = ({ cartCount }: { cartCount: number }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Shop", icon: ShoppingBag, href: "/catalog" },
    { name: "Bespoke", icon: Ruler, href: "/custom" },
    { name: "Contact", icon: Phone, href: "/contact" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-50 px-6 py-3 flex justify-between items-center md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-amber-600" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            <div className="relative">
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {item.name === "Shop" && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
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
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 md:hidden px-6 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
          <span className="text-amber-600">KIDS</span>CHOICE
        </Link>
        <Link href="/catalog" className="p-2 text-slate-900 dark:text-white">
          <ShoppingBag size={20} />
        </Link>
      </div>
    </header>
  );
};

export const DesktopHeader = ({ cartCount }: { cartCount: number }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 hidden md:block px-12 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white flex items-center gap-2">
          <span className="text-amber-600">KIDS</span>CHOICE
        </Link>
        
        <div className="flex items-center gap-8 font-semibold text-sm uppercase tracking-widest text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <Link href="/catalog" className="hover:text-amber-600 transition-colors">Boutique</Link>
          <Link href="/custom" className="hover:text-amber-600 transition-colors">Bespoke</Link>
          <Link href="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
          
          <Link href="/catalog" className="relative p-2 text-slate-900 dark:text-white">
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
