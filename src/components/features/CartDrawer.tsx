"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { siteSettings } from "@/data/products";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { ShoppingBag, X, Minus, Plus, Trash2, Send } from "lucide-react";
import { OrderSummaryModal } from "./OrderSummaryModal";
import { useLanguage } from "@/context/LanguageContext";

export const CartDrawer = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const { t } = useLanguage();
  const [showSummary, setShowSummary] = useState(false);

  const handleWhatsAppOrder = () => {
    const link = generateWhatsAppLink(siteSettings.whatsappNumber, cart, totalPrice);
    window.open(link, "_blank");
    setShowSummary(false);
  };

  return (
    <>
      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]" 
          onClick={() => setIsCartOpen(false)} 
        />
      )}

      {/* Cart Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-[101] transition-transform duration-500 transform ${isCartOpen ? "translate-x-0" : "translate-x-full"} flex flex-col`}>
        <div className="p-8 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-amber-600" />
            <h2 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">{t("cart.title")}</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full text-slate-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
              <ShoppingBag size={64} strokeWidth={1} />
              <p className="font-bold">{t("cart.empty")}</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-24 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-3xl overflow-hidden flex-shrink-0 relative">
                  {item.icon && item.icon.startsWith("http") ? (
                    <Image 
                      src={item.icon} 
                      alt={item.name} 
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span>{item.icon || "👗"}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm mb-1 text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                  <p className="text-amber-600 font-black text-sm mb-3">AED {item.price}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg px-2 text-slate-900 dark:text-white">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-amber-600"><Minus size={14} /></button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-amber-600"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-slate-400 uppercase tracking-widest text-[10px]">{t("cart.total")}</span>
            <span className="text-3xl font-black font-playfair text-slate-900 dark:text-white">AED {totalPrice.toFixed(2)}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={() => setShowSummary(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            {t("cart.cta")} <Send size={18} />
          </button>
        </div>
      </div>

      <OrderSummaryModal 
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        onConfirm={handleWhatsAppOrder}
        cart={cart}
        totalPrice={totalPrice}
      />
    </>
  );
};
