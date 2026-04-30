"use client";

import { siteSettings } from "@/data/products";
import { Phone, MapPin, Clock, MessageSquare, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="px-6 py-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
          {t("contact.title")} <span className="text-amber-600">{t("contact.title_accent")}</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
          {t("contact.desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Map Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
              <MapPin size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t("contact.location.title")}</h3>
              <p className="text-slate-500 font-medium">{siteSettings.shopAddress}</p>
            </div>
          </div>
          
          <div className="flex-1 min-h-[300px] bg-slate-50 dark:bg-slate-800 rounded-3xl mb-8 relative group">
            <iframe 
              src="https://maps.google.com/maps?q=24.2843889,54.6597222&z=17&output=embed" 
              className="absolute inset-0 w-full h-full rounded-3xl grayscale invert dark:invert-0 dark:grayscale-0 opacity-80 group-hover:opacity-100 transition-opacity border-0"
              loading="lazy"
            ></iframe>
          </div>

          <a 
            href="https://www.google.com/maps/place/24%C2%B017'03.8%22N+54%C2%B039'35.0%22E/@24.2843889,54.6597222,17z" 
            target="_blank"
            className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {t("contact.location.cta")} <ExternalLink size={18} />
          </a>
        </div>

        {/* Info Cards */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-bold">{t("contact.info.title")}</h3>
            </div>
            <a 
              href={`tel:+${siteSettings.whatsappNumber}`}
              className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white hover:text-amber-600 transition-colors block mb-2"
            >
              +{siteSettings.whatsappNumber.slice(0,3)} {siteSettings.whatsappNumber.slice(3,5)} {siteSettings.whatsappNumber.slice(5,8)} {siteSettings.whatsappNumber.slice(8)}
            </a>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Direct Line / واتساب</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold">{t("contact.hours.title")}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-900 dark:text-white">{t("contact.hours.days")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-600">{t("contact.hours.friday")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-600 rounded-[4rem] p-12 md:p-24 text-center text-white shadow-2xl shadow-amber-900/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10">
          <MessageSquare size={64} className="mx-auto mb-8 opacity-50" />
          <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tighter uppercase">{t("contact.cta.title")}</h2>
          <p className="text-amber-100 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto">
            {t("contact.cta.desc")}
          </p>
          <a 
            href={`https://wa.me/${siteSettings.whatsappNumber}`}
            target="_blank"
            className="inline-flex items-center gap-4 bg-white text-amber-700 px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-110 active:scale-95 transition-all shadow-2xl"
          >
            {t("contact.cta.button")} <MessageSquare size={20} fill="currentColor" />
          </a>
        </div>
      </div>
    </div>
  );
}
