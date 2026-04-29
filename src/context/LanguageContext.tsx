"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.boutique": "Boutique",
    "nav.bespoke": "Bespoke",
    "nav.contact": "Contact",
    "hero.title": "Emirates Deep Collection",
    "hero.subtitle": "For You & Yours",
    "hero.desc": "Discover Abu Dhabi's finest bespoke tailoring. From royal children's frocks to designer abayas, we craft perfection in every stitch.",
    "hero.cta.explore": "Explore Collection",
    "hero.cta.bespoke": "Bespoke Request",
    "catalog.title": "The Collection",
    "catalog.desc": "Browse our latest handcrafted designs from Abu Dhabi.",
    "catalog.search": "Search designs...",
    "catalog.no_results": "No results found",
    "catalog.view_details": "View Details",
    "cart.title": "Your Selection",
    "cart.empty": "Selection is empty",
    "cart.total": "Estimated Total",
    "cart.cta": "Discuss on WhatsApp",
    "summary.title": "Order Summary",
    "summary.desc": "Review your bespoke selection",
    "summary.confirm": "Confirm & Open WhatsApp",
    "footer.rights": "Emirates Deep Collection • 2026",
    "footer.tagline": "Abu Dhabi Elite Tailoring"
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.boutique": "البوتيك",
    "nav.bespoke": "طلب خاص",
    "nav.contact": "اتصل بنا",
    "hero.title": "إمارات ديب كوليكشن",
    "hero.subtitle": "لك ولأحبائك",
    "hero.desc": "اكتشفي أرقى أنواع الخياطة الرفيعة في أبوظبي. من فساتين الأطفال الملكية إلى العبايات الراقية، نصنع الكمال في كل غرزة.",
    "hero.cta.explore": "استكشف المجموعة",
    "hero.cta.bespoke": "طلب تفصيل خاص",
    "catalog.title": "المجموعة",
    "catalog.desc": "تصفح أحدث تصاميمنا المصنوعة يدوياً في أبوظبي.",
    "catalog.search": "البحث عن التصاميم...",
    "catalog.no_results": "لم يتم العثور على نتائج",
    "catalog.view_details": "عرض التفاصيل",
    "cart.title": "اختياراتك",
    "cart.empty": "القائمة فارغة",
    "cart.total": "الإجمالي التقديري",
    "cart.cta": "مناقشة عبر واتساب",
    "summary.title": "ملخص الطلب",
    "summary.desc": "راجع اختياراتك الخاصة",
    "summary.confirm": "تأكيد وفتح واتساب",
    "footer.rights": "إمارات ديب كوليكشن • ٢٠٢٦",
    "footer.tagline": "نخبة الخياطة في أبوظبي"
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("preferred_language") as Language;
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("preferred_language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const isRTL = language === "ar";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
