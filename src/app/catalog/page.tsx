"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/lib/data-service";
import { Star, ShoppingBag, Plus, Search, X } from "lucide-react";
import { Category } from "@/types";
import { ProductCardSkeleton, CategoryTabSkeleton } from "@/components/ui/Skeleton";
import { useLanguage } from "@/context/LanguageContext";

export default function Catalog() {
  const { products, isLoading } = useProducts();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { addToCart, setIsCartOpen, totalItems } = useCart();

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto min-h-screen">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            {t("catalog.title").split(" ")[0]} <span className="text-amber-600">{t("catalog.title").split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md">{t("catalog.desc")}</p>
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors" size={20} />
          <input 
            type="text"
            placeholder={t("catalog.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      {isLoading ? <CategoryTabSkeleton /> : (
        <div className="flex gap-2 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
          {["all", "mom-daughter", "frocks", "abaya", "accessories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as Category)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl shadow-slate-900/10"
                  : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700 hover:border-amber-600/30"
              }`}
            >
              {cat.replace("-", " & ")}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-5 group hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500">
              <Link href={`/product/${p.id}`} className="block aspect-square bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] mb-6 relative overflow-hidden group">
                {p.icon && p.icon.startsWith("http") ? (
                  <Image 
                    src={p.icon} 
                    alt={p.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover rounded-[1.5rem] group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-7xl">
                    {p.icon || "👗"}
                  </div>
                )}
                {p.stockStatus === "low-stock" && (
                  <div className="absolute bottom-4 left-4 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-lg">
                    Only few left
                  </div>
                )}
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-colors duration-500 flex items-center justify-center">
                  <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">{t("catalog.view_details")}</span>
                </div>
              </Link>
              <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">{p.category}</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                    <Star size={12} className="text-amber-500" fill="currentColor" /> {p.rating}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-amber-600 transition-colors line-clamp-1">{p.name}</h3>
                <p className="text-slate-400 text-xs mb-6 line-clamp-2 leading-relaxed font-medium">{p.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black font-playfair tracking-tight text-slate-900 dark:text-white">AED {p.price}</span>
                  <button 
                    onClick={() => { addToCart(p); }}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-2xl hover:scale-110 active:scale-95 transition-all shadow-xl shadow-slate-900/10"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 opacity-50 flex flex-col items-center justify-center gap-4">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300">
            <ShoppingBag size={48} strokeWidth={1} />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-bold text-slate-900 dark:text-white">{t("catalog.no_results")}</p>
            <p className="text-sm font-medium">Try adjusting your search or category filters</p>
          </div>
        </div>
      )}

      {/* Floating Cart Button for Mobile */}
      {totalItems > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-24 right-6 bg-amber-600 text-white p-5 rounded-full shadow-2xl z-40 md:hidden animate-bounce border-4 border-white dark:border-slate-900"
        >
          <ShoppingBag size={24} />
          <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-amber-600">
            {totalItems}
          </span>
        </button>
      )}
    </div>
  );
}
