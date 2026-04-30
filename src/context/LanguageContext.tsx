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
    "featured.title": "The Signature",
    "featured.title_accent": "Pairs",
    "featured.desc": "Our world-famous Mom & Daughter matching sets, handcrafted with love in Abu Dhabi.",
    "featured.view_all": "View All",
    "featured.empty": "Adding new exclusive designs soon...",
    "product.exclusive_pair": "Exclusive Pair",
    "trust.quality.title": "Premium Quality",
    "trust.quality.desc": "Handpicked fabrics and master tailoring to ensure your outfit lasts for generations.",
    "trust.fit.title": "Perfect Fit",
    "trust.fit.desc": "Expert measurements taken at our Baniyas East shop or through our online bespoke guide.",
    "trust.whatsapp.title": "WhatsApp Support",
    "trust.whatsapp.desc": "Direct line to our designers for real-time updates and customization requests.",
    "catalog.title": "The Collection",
    "catalog.desc": "Browse our latest handcrafted designs from Abu Dhabi.",
    "catalog.search": "Search designs...",
    "catalog.no_results": "No results found",
    "catalog.no_results_desc": "Try adjusting your search or category filters",
    "catalog.view_details": "View Details",
    "catalog.low_stock": "Only few left",
    "cat.all": "All",
    "cat.mom-daughter": "Mom & Daughter",
    "cat.frocks": "Frocks",
    "cat.abaya": "Abaya",
    "cat.accessories": "Accessories",
    "product.back": "Back to Collection",
    "product.bespoke_choice": "Bespoke Choice",
    "product.default_desc": "Indulge in the luxury of Emirates Deep Collection. This masterfully crafted piece represents the pinnacle of Abu Dhabi's bespoke tailoring tradition, combining premium fabrics with timeless elegance.",
    "product.authentic.title": "Authentic Bespoke",
    "product.authentic.desc": "Handcrafted in our Abu Dhabi Boutique",
    "product.ready.title": "Ready in 3-5 Days",
    "product.ready.desc": "Express tailoring available for urgent orders",
    "product.add_to_cart": "Add to Cart",
    "cart.title": "Your Selection",
    "cart.empty": "Selection is empty",
    "cart.total": "Estimated Total",
    "cart.cta": "Discuss on WhatsApp",
    "summary.title": "Order Summary",
    "summary.desc": "Review your bespoke selection",
    "summary.confirm": "Confirm & Open WhatsApp",
    "summary.tailoring.title": "Tailoring Note",
    "summary.tailoring.desc": "Our designers will confirm your exact measurements on WhatsApp before starting the craft.",
    "summary.fitting.title": "Fitting Session",
    "summary.fitting.desc": "Book a physical fitting at our Abu Dhabi Mall branch during the chat.",
    "contact.title": "Visit Our",
    "contact.title_accent": "Boutique",
    "contact.desc": "Step into our world of bespoke fashion. Our master tailors are waiting to welcome you in Abu Dhabi.",
    "contact.location.title": "Our Location",
    "contact.location.cta": "View on Google Maps",
    "contact.info.title": "Contact Us",
    "contact.hours.title": "Opening Hours",
    "contact.hours.days": "Sat - Thu: 10:00 AM - 10:00 PM",
    "contact.hours.friday": "Friday: 4:00 PM - 10:00 PM",
    "contact.cta.title": "Ready to start your bespoke journey?",
    "contact.cta.desc": "Chat directly with our design team for immediate assistance and bookings.",
    "contact.cta.button": "Open WhatsApp Chat",
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
    "featured.title": "التصاميم",
    "featured.title_accent": "المميزة",
    "featured.desc": "مجموعاتنا الشهيرة للأم والابنة، مصنوعة يدوياً بكل حب في أبوظبي.",
    "featured.view_all": "عرض الكل",
    "featured.empty": "سنضيف تصاميم حصرية جديدة قريباً...",
    "product.exclusive_pair": "طقم حصري",
    "trust.quality.title": "جودة متميزة",
    "trust.quality.desc": "أقمشة مختارة بعناية وخياطة متقنة لضمان استمرار ملابسك لأجيال.",
    "trust.fit.title": "مقاس مثالي",
    "trust.fit.desc": "قياسات دقيقة يتم أخذها في متجرنا في بني ياس شرق أو من خلال دليل التفصيل عبر الإنترنت.",
    "trust.whatsapp.title": "دعم واتساب",
    "trust.whatsapp.desc": "خط مباشر مع مصممينا للحصول على التحديثات في الوقت الفعلي وطلبات التخصيص.",
    "catalog.title": "المجموعة",
    "catalog.desc": "تصفح أحدث تصاميمنا المصنوعة يدوياً في أبوظبي.",
    "catalog.search": "البحث عن التصاميم...",
    "catalog.no_results": "لم يتم العثور على نتائج",
    "catalog.no_results_desc": "جرّب تعديل البحث أو فلاتر الفئات",
    "catalog.view_details": "عرض التفاصيل",
    "catalog.low_stock": "بقي القليل فقط",
    "cat.all": "الكل",
    "cat.mom-daughter": "الأم والابنة",
    "cat.frocks": "فساتين",
    "cat.abaya": "عبايات",
    "cat.accessories": "إكسسوارات",
    "product.back": "العودة إلى المجموعة",
    "product.bespoke_choice": "خيار التفصيل",
    "product.default_desc": "استمتعي بفخامة إمارات ديب كوليكشن. تمثل هذه القطعة المصنوعة ببراعة قمة تقاليد الخياطة الرفيعة في أبوظبي، حيث تجمع بين الأقمشة الفاخرة والأناقة الخالدة.",
    "product.authentic.title": "تفصيل أصيل",
    "product.authentic.desc": "مصنوع يدوياً في بوتيك أبوظبي",
    "product.ready.title": "جاهز خلال ٣-٥ أيام",
    "product.ready.desc": "خياطة سريعة متاحة للطلبات العاجلة",
    "product.add_to_cart": "إضافة إلى السلة",
    "cart.title": "اختياراتك",
    "cart.empty": "القائمة فارغة",
    "cart.total": "الإجمالي التقديري",
    "cart.cta": "مناقشة عبر واتساب",
    "summary.title": "ملخص الطلب",
    "summary.desc": "راجع اختياراتك الخاصة",
    "summary.confirm": "تأكيد وفتح واتساب",
    "summary.tailoring.title": "ملاحظة الخياطة",
    "summary.tailoring.desc": "سيقوم مصممونا بتأكيد قياساتك الدقيقة عبر واتساب قبل البدء في العمل.",
    "summary.fitting.title": "جلسة قياس",
    "summary.fitting.desc": "احجز موعداً للقياس الفعلي في فرعنا في أبوظبي مول خلال الدردشة.",
    "contact.title": "قم بزيارة",
    "contact.title_accent": "البوتيك",
    "contact.desc": "ادخل عالم الموضة الراقية. خياطونا المحترفون بانتظار الترحيب بك في أبوظبي.",
    "contact.location.title": "موقعنا",
    "contact.location.cta": "عرض على خرائط جوجل",
    "contact.info.title": "اتصل بنا",
    "contact.hours.title": "ساعات العمل",
    "contact.hours.days": "السبت - الخميس: ١٠:٠٠ صباحاً - ١٠:٠٠ مساءً",
    "contact.hours.friday": "الجمعة: ٤:٠٠ مساءً - ١٠:٠٠ مساءً",
    "contact.cta.title": "هل أنت مستعد لبدء رحلة التفصيل الخاصة بك؟",
    "contact.cta.desc": "تحدث مباشرة مع فريق التصميم لدينا للحصول على مساعدة فورية وحجوزات.",
    "contact.cta.button": "فتح دردشة واتساب",
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
