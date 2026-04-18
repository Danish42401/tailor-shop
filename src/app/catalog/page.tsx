"use client";

import { useState, useEffect } from "react";
import { siteSettings } from "@/data/products";
import { useCart } from "@/hooks/useCart";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { getProductsFromSheet } from "@/lib/data-service";
import { Star, ShoppingBag, Plus, Minus, X, Trash2, Send, Loader2 } from "lucide-react";
import { Category, Product } from "@/types";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cart, addToCart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  useEffect(() => {
    async function loadData() {
      const data = await getProductsFromSheet();
      setProducts(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredProducts = products.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  const handleWhatsAppOrder = () => {
    const link = generateWhatsAppLink(siteSettings.whatsappNumber, cart, totalPrice);
    window.open(link, "_blank");
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-amber-600" size={48} />
        <p className="font-bold text-slate-400">Loading Boutique Collection...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
        {["all", "mom-daughter", "frocks", "abaya", "accessories"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as Category)}
            className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl shadow-slate-900/10"
                : "bg-white dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700"
            }`}
          >
            {cat.replace("-", " & ")}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => (
            <div key={p.id} className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-5 group">
              <div className="aspect-square bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center text-7xl mb-6 relative overflow-hidden">
                {p.icon}
                {p.stockStatus === "low-stock" && (
                  <div className="absolute bottom-4 left-4 bg-red-100 text-red-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    Only few left
                  </div>
                )}
              </div>
              <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">{p.category}</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-400">
                    <Star size={12} className="text-amber-500" fill="currentColor" /> {p.rating}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-amber-600 transition-colors">{p.name}</h3>
                <p className="text-slate-400 text-xs mb-6 line-clamp-2 leading-relaxed">{p.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black font-playfair tracking-tight">AED {p.price}</span>
                  <button 
                    onClick={() => { addToCart(p); setIsCartOpen(true); }}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-2xl hover:scale-110 active:scale-95 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 opacity-50">
          <ShoppingBag size={64} className="mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-bold">No items found in this category</p>
        </div>
      )}

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]" onClick={() => setIsCartOpen(false)} />
      )}

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-[101] transition-transform duration-500 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        <div className="p-8 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-amber-600" />
            <h2 className="text-2xl font-black tracking-tighter">Your Selection</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
              <ShoppingBag size={64} strokeWidth={1} />
              <p className="font-bold">Selection is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-24 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                  <p className="text-amber-600 font-black text-sm mb-3">AED {item.price}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg px-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-amber-600"><Minus size={14} /></button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-amber-600"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">Estimated Total</span>
            <span className="text-3xl font-black font-playfair">AED {totalPrice.toFixed(2)}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            Discuss on WhatsApp <Send size={18} />
          </button>
        </div>
      </div>

      {/* Floating Cart Button for Mobile */}
      {!isCartOpen && totalItems > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-24 right-6 bg-amber-600 text-white p-5 rounded-full shadow-2xl z-40 md:hidden animate-bounce"
        >
          <ShoppingBag size={24} />
          <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
            {totalItems}
          </span>
        </button>
      )}
    </div>
  );
}
