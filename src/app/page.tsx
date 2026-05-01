"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Ruler, ShoppingBag, ShieldCheck, Phone } from "lucide-react";
import { siteSettings } from "@/data/products";
import { useProducts } from "@/lib/data-service";
import { useLanguage } from "@/context/LanguageContext";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function Home() {
  const { products, isLoading } = useProducts();
  const { t } = useLanguage();
  const featuredPairs = products.filter(p => p.isPair).slice(0, 3);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 bg-slate-950 text-white overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1974&auto=format&fit=crop"
          alt="Luxury Boutique"
          fill
          priority
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <span className="inline-block bg-amber-600/20 text-amber-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-amber-500/30">
            {siteSettings.shopAddress}
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter uppercase">
            {t("hero.title")} <br/>
            <span className="text-amber-500">{t("hero.subtitle")}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-medium">
            {t("hero.desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              href="/catalog" 
              className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-amber-900/20"
            >
              {t("hero.cta.explore")} <ShoppingBag size={20} />
            </Link>
            <Link 
              href="/custom" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              {t("hero.cta.bespoke")} <Ruler size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">{t("featured.title")} <span className="text-amber-600">{t("featured.title_accent")}</span></h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md">{t("featured.desc")}</p>
          </div>
          <Link href="/catalog" className="hidden md:flex items-center gap-2 text-amber-600 font-bold hover:gap-4 transition-all">
            {t("featured.view_all")} <ArrowRight size={20} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <ProductCardSkeleton key={i} />)}
          </div>
        ) : featuredPairs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPairs.map((p) => (
              <div key={p.id} className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="aspect-[4/5] bg-slate-50 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-500 mb-8 overflow-hidden relative">
                  {p.icon && p.icon.startsWith("http") ? (
                    <Image 
                      src={p.icon} 
                      alt={p.name} 
                      width={400}
                      height={500}
                      className="w-full h-full object-cover rounded-[1.5rem]"
                    />
                  ) : (
                    <span>{p.icon || "👗"}</span>
                  )}
                  <div className="absolute top-6 right-6 bg-amber-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-amber-900/40">
                    {t("product.exclusive_pair")}
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{p.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-amber-600 font-playfair uppercase">{t("product.price_on_request")}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star size={16} fill="currentColor" /> {p.rating}
                    </div>
                  </div>
                  <Link href={`/product/${p.id}`} className="mt-6 w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold flex items-center justify-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-amber-600">
                    {t("catalog.view_details")} <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 font-bold italic">{t("featured.empty")}</p>
          </div>
        )}
      </section>

      {/* Trust Section */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
              <ShieldCheck size={32} />
            </div>
            <h4 className="text-xl font-bold">{t("trust.quality.title")}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t("trust.quality.desc")}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
              <Ruler size={32} />
            </div>
            <h4 className="text-xl font-bold">{t("trust.fit.title")}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t("trust.fit.desc")}</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
              <Phone size={32} />
            </div>
            <h4 className="text-xl font-bold">{t("trust.whatsapp.title")}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{t("trust.whatsapp.desc")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
