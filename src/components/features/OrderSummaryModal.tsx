"use client";

import React from "react";
import Image from "next/image";
import { X, Send, ShoppingBag, Ruler, CheckCircle2 } from "lucide-react";
import { CartItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cart: CartItem[];
  totalPrice: number;
}

export const OrderSummaryModal = ({ isOpen, onClose, onConfirm, cart, totalPrice }: Props) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-600/10 flex items-center justify-center text-amber-600">
                <CheckCircle2 size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-black tracking-tighter">{t("summary.title")}</h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("summary.desc")}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8">
          {/* Items List */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">{t("cart.title")}</h3>
            <div className="grid gap-4">
                {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-2xl shadow-sm relative overflow-hidden">
                            {item.icon && item.icon.startsWith("http") ? (
                                <Image 
                                    src={item.icon} 
                                    alt={item.name} 
                                    fill
                                    className="object-cover"
                                />
                            ) : (item.icon || "👗")}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-sm">{item.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-xs text-slate-500 font-medium">Qty: {item.quantity}</p>
                              {item.selectedSize && (
                                <>
                                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                                  <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">{t("product.size_label")}: {item.selectedSize}</p>
                                </>
                              )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>

          {/* Policy Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-[2rem] bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 flex gap-4">
                <Ruler className="text-amber-600 shrink-0" size={20} />
                <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-1">{t("summary.tailoring.title")}</h4>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">{t("summary.tailoring.desc")}</p>
                </div>
            </div>
            <div className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex gap-4">
                <ShoppingBag className="text-slate-400 shrink-0" size={20} />
                <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-1">{t("summary.fitting.title")}</h4>
                    <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">{t("summary.fitting.desc")}</p>
                </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{t("cart.total")}</p>
            <h3 className="text-xl font-black font-playfair uppercase text-amber-500">{t("cart.total_request")}</h3>
          </div>
          <button 
            onClick={onConfirm}
            className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-amber-900/40"
          >
            {t("summary.confirm")} <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
