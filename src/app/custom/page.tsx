"use client";

import { useState } from "react";
import { siteSettings } from "@/data/products";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { Ruler, Send, CheckCircle2, Info } from "lucide-react";
import { CustomOrderRequest } from "@/types";

export default function CustomOrder() {
  const [formData, setFormData] = useState<CustomOrderRequest>({
    customerName: "",
    phoneNumber: "",
    measurements: {
      length: "",
      shoulder: "",
      chest: "",
      waist: "",
      other: "",
    },
    notes: "",
    preferredFabric: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = generateWhatsAppLink(siteSettings.whatsappNumber, [], 0, formData);
    window.open(link, "_blank");
  };

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex p-4 bg-amber-100 dark:bg-amber-900/30 rounded-3xl text-amber-600 mb-6">
          <Ruler size={40} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Bespoke <span className="text-amber-600">Tailoring</span></h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Create something unique. Provide your measurements below, and our master tailors in Dubai will bring your vision to life.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <input 
              required
              type="text"
              placeholder="e.g. Fatima Ahmed"
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-amber-500 transition-all font-bold"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">WhatsApp Number</label>
            <input 
              required
              type="tel"
              placeholder="e.g. +971 50 XXX XXXX"
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-amber-500 transition-all font-bold"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            />
          </div>
        </div>

        {/* Measurements */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <CheckCircle2 className="text-amber-500" size={20} />
            <h2 className="text-xl font-bold tracking-tight uppercase tracking-widest">Measurements (Optional)</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['length', 'shoulder', 'chest', 'waist'].map((m) => (
              <div key={m} className="space-y-2 text-center">
                <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400">{m}</label>
                <input 
                  type="text"
                  placeholder="Inches"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-2 text-center focus:ring-1 focus:ring-amber-500 font-bold text-sm"
                  value={(formData.measurements as any)[m]}
                  onChange={(e) => setFormData({
                    ...formData, 
                    measurements: { ...formData.measurements, [m]: e.target.value }
                  })}
                />
              </div>
            ))}
          </div>
          
          <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
            <Info className="text-amber-600 shrink-0" size={18} />
            <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
              Don't worry if you don't know your measurements. We will guide you on WhatsApp or you can visit our shop for a professional fitting.
            </p>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Design Details / Fabric Choice</label>
            <textarea 
              rows={5}
              placeholder="Describe your dream outfit... (e.g. Red silk frock with gold lace, tea-length, for 5 year old)"
              className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-[2rem] py-5 px-8 focus:ring-2 focus:ring-amber-500 transition-all font-medium leading-relaxed"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 hover:bg-amber-600 dark:hover:bg-amber-500 dark:hover:text-white transition-all active:scale-95 shadow-2xl"
        >
          Send Design to Designer <Send size={20} />
        </button>
      </form>

      <div className="mt-20 text-center text-slate-400 text-sm font-medium">
        📍 Visit us at Deira, Dubai for physical fabric selection and live measurements.
      </div>
    </div>
  );
}
