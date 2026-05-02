"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useProducts } from "@/lib/data-service";
import { useCart } from "@/hooks/useCart";
import { siteSettings } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Star, 
  ShoppingBag, 
  ChevronLeft, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Plus, 
  Minus,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { products, isLoading } = useProducts();
  const { addToCart, cart, updateQuantity } = useCart();
  const { t, language } = useLanguage();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  const product = products.find(p => p.id === id);
  const cartItem = cart.find(item => item.id === id);

  const SIZE_MAPPING: Record<string, string> = {
    "XS": "18-20",
    "S": "22-24",
    "M": "26-28",
    "L": "30-32",
    "XL": "34-36",
    "XXL": "38-40",
    "XXXL": "42-44"
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-slate-100 dark:bg-slate-800 animate-pulse rounded-[3rem]" />
          <div className="space-y-8 py-8">
            <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
            <div className="h-12 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
            <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-24 w-full bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300">
            <ShoppingBag size={48} />
        </div>
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="text-slate-500 mb-8">The item you are looking for might have been moved or removed.</p>
            <Link href="/catalog" className="bg-amber-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-amber-900/20">
                Back to Boutique
            </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, qty, SIZE_MAPPING[selectedSize]);
    setSizeError(false);
  };

  const handleWhatsAppInquiry = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    const message = `Hi, I'm interested in the *${product.name}* (Size: ${SIZE_MAPPING[selectedSize]}). Can we discuss the customization and price?`;
    window.open(`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    setSizeError(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-amber-600 font-bold mb-12 transition-colors group"
      >
        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ChevronLeft size={20} />
        </div>
        {t("product.back")}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Image Gallery */}
        <div className="space-y-6">
          <div className="aspect-[4/5] bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 overflow-hidden relative group">
            {product.icon && product.icon.startsWith("http") ? (
              <Image 
                src={product.icon} 
                alt={product.name} 
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10rem]">
                {product.icon || "👗"}
              </div>
            )}
            
            {product.isPair && (
                <div className="absolute top-8 left-8 bg-amber-600 text-white text-xs font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl">
                    {t("product.exclusive_pair")}
                </div>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-600 mb-4 block">{t(`cat.${product.category}`)}</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 uppercase leading-tight">
                {product.name}
            </h1>
            <div className="flex items-center gap-6">
                <span className="text-3xl font-black font-playfair text-amber-600 uppercase">{t("product.price_on_request")}</span>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center gap-1.5 text-amber-500 font-black">
                    <Star size={20} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="text-slate-400 font-medium text-sm ml-1">({t("product.bespoke_choice")})</span>
                </div>
            </div>
          </div>

          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-10">
            {product.description || t("product.default_desc")}
          </p>

          {/* Size Selector */}
          <div className="mb-10 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">{t("product.select_size")}</h3>
              {sizeError && <span className="text-[10px] font-bold text-red-500 uppercase">{t("product.size_error")}</span>}
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {Object.keys(SIZE_MAPPING).map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={`h-12 rounded-xl text-xs font-black transition-all border ${
                    selectedSize === size
                      ? "bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-900/20"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-600/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={() => router.push(`/custom?productId=${product.id}&productName=${encodeURIComponent(product.name)}`)}
              className="w-full py-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-amber-600/50 hover:text-amber-600 transition-all flex items-center justify-center gap-2"
            >
              <Ruler size={16} /> {t("product.custom_size")}
            </button>
          </div>

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-amber-600 shadow-sm">
                    <ShieldCheck size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-xs">{t("product.authentic.title")}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{t("product.authentic.desc")}</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-amber-600 shadow-sm">
                    <Clock size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-xs">{t("product.ready.title")}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{t("product.ready.desc")}</p>
                </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-2 h-16 sm:w-40 justify-between">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-12 h-12 rounded-xl hover:bg-white dark:hover:bg-slate-900 flex items-center justify-center transition-all"
                >
                    <Minus size={18} />
                </button>
                <span className="font-black text-xl w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-12 h-12 rounded-xl hover:bg-white dark:hover:bg-slate-900 flex items-center justify-center transition-all"
                >
                    <Plus size={18} />
                </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className={`flex-1 rounded-2xl font-black uppercase tracking-widest text-sm sm:text-xs h-16 flex items-center justify-center gap-3 transition-all shadow-xl ${
                  sizeError ? "bg-red-50 dark:bg-red-900/10 border-2 border-red-500/20 text-red-500" : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                  {t("product.add_to_cart")} <ShoppingBag size={20} />
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-16 h-16 bg-green-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-green-900/20 shrink-0"
              >
                  <MessageSquare size={24} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Products Section could go here */}
    </div>
  );
}
