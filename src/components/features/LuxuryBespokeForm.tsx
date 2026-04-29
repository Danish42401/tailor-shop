"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Scissors, 
  Send, 
  Ruler,
  HelpCircle,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { siteSettings } from "@/data/products";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { FormData } from "@/types";

const MEASUREMENT_FIELDS = [
  { id: "fullLength", label: "1. Length", en: "From shoulder to desired dress length", ar: "من الكتف إلى طول الفستان المطلوب" },
  { id: "chestWidth", label: "2. Chest", en: "Around the fullest part of the chest", ar: "حول أوسع جزء من الصدر" },
  { id: "waistWidth", label: "3. Waist", en: "Around the natural waist", ar: "حول الخصر الطبيعي" },
  { id: "shoulderWidth", label: "4. Shoulder", en: "From one shoulder end to the other", ar: "من نهاية كتف إلى نهاية الكتف الآخر" },
  { id: "hipWidth", label: "5. Hip Width", en: "Around the widest part of the hips", ar: "حول أوسع جزء من الوركين" },
  { id: "sleeveLength", label: "6. Sleeve Length", en: "From shoulder to sleeve end", ar: "من الكتف إلى نهاية الكم" },
  { id: "armOpening", label: "7. Arm Opening", en: "Around the arm where sleeve joins", ar: "حول فتحة الإبط حيث يثبت الكم" },
  { id: "neckCollar", label: "8. Neck/Collar", en: "Width of the neckline", ar: "عرض فتحة الرقبة" },
  { id: "neckDepthFront", label: "9. Front Neck Depth", en: "Depth of the neckline (front)", ar: "عمق فتحة الرقبة (أمام)" },
  { id: "neckDepthBack", label: "10. Back Neck Depth", en: "Depth of the neckline (back)", ar: "عمق فتحة الرقبة (خلف)" },
];

export default function LuxuryBespokeForm() {
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    phoneNumber: "",
    unit: "inch",
    measurements: {
      fullLength: "",
      chestWidth: "",
      waistWidth: "",
      shoulderWidth: "",
      hipWidth: "",
      sleeveLength: "",
      armOpening: "",
      neckCollar: "",
      neckDepthFront: "",
      neckDepthBack: ""
    },
    notes: ""
  });
  
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bespoke_studio_draft_v3");
    if (saved) {
        try {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(JSON.parse(saved));
        } catch(e) {
            console.error("Failed to load bespoke draft", e);
        }
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("bespoke_studio_draft_v3", JSON.stringify(formData));
    }
  }, [formData, isMounted]);

  const handleUnitToggle = () => {
    const newUnit = formData.unit === "inch" ? "cm" : "inch";
    const factor = newUnit === "cm" ? 2.54 : 1 / 2.54;
    
    const newMeasurements = { ...formData.measurements };
    MEASUREMENT_FIELDS.forEach(field => {
      const val = newMeasurements[field.id];
      if (val) {
        newMeasurements[field.id] = (parseFloat(val) * factor).toFixed(1);
      }
    });

    setFormData({ ...formData, unit: newUnit, measurements: newMeasurements });
  };

  const handleSubmit = () => {
    if (!formData.customerName || !formData.phoneNumber) {
        alert("Please provide your Name and WhatsApp number.");
        return;
    }
    
    setIsSubmitting(true);
    const link = generateWhatsAppLink(siteSettings.whatsappNumber, [], 0, {
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        notes: `${formData.notes} (Units: ${formData.unit})`,
        measurements: formData.measurements
    });
    
    setTimeout(() => {
        window.open(link, "_blank");
        setIsSubmitting(false);
    }, 800);
  };

  const getTip = (fieldId: string | null) => {
    switch(fieldId) {
        case 'fullLength': return { en: "Stand straight while measuring length.", ar: "قف بشكل مستقيم أثناء قياس الطول." };
        case 'chestWidth': return { en: "Keep the tape slightly loose for breathing room.", ar: "اترك شريط القياس فضفاضاً قليلاً لسهولة التنفس." };
        case 'waistWidth': return { en: "Measure at the narrowest part of your torso.", ar: "قس عند أضيق جزء من جذعک." };
        default: return { en: "Use a soft measuring tape for accuracy.", ar: "استخدم شريط قياس ناعم لضمان الدقة." };
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 p-4 md:p-8 font-['Inter'] selection:bg-[#c9a84c]/30">
      <div className="max-w-4xl mx-auto">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20">
                <Scissors className="text-[#c9a84c]" size={24} />
              </div>
              <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] font-black tracking-tight text-white">
                Emirates <span className="text-[#c9a84c]">deep collection</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium tracking-[0.2em] uppercase text-[10px] pl-1">{siteSettings.shopAddress}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
                onClick={handleUnitToggle}
                className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
                Unit: {formData.unit.toUpperCase()}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <div className="glass-card rounded-[2.5rem] p-8 border-white/5 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#c9a84c] ml-1">Client Name / اسم العميل</label>
                      <input 
                          type="text"
                          placeholder="e.g. Fatima Ahmed"
                          className="w-full glass-input rounded-2xl py-4 px-6 outline-none font-bold text-lg focus:ring-2 focus:ring-[#c9a84c]/20"
                          value={formData.customerName}
                          onChange={e => setFormData({...formData, customerName: e.target.value})}
                      />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-[#c9a84c] ml-1">WhatsApp / واتساب</label>
                      <div className="relative">
                          <input 
                              type="tel"
                              placeholder="+971 -- --- ----"
                              className="w-full glass-input rounded-2xl py-4 px-12 outline-none font-bold text-lg focus:ring-2 focus:ring-[#c9a84c]/20"
                              value={formData.phoneNumber}
                              onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                          />
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                      </div>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/10 group hover:border-[#c9a84c]/30 transition-all min-h-[300px] relative">
                <Image 
                  src="https://res.cloudinary.com/dyxnglxdj/image/upload/v1777440354/Gemini_Generated_Image_h7s5ysh7s5ysh7s5_ogy8dh.png" 
                  alt="Measurement Guide" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/80 via-transparent to-transparent flex items-end p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c9a84c]">Measurement Guide Picture</p>
                </div>
            </div>

            <div className="glass-card rounded-[2.5rem] p-8 bg-[#c9a84c]/5 border-[#c9a84c]/20 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center">
                        <HelpCircle className="text-[#0a0f1e]" size={16} />
                    </div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c]">Tailor&apos;s Tip / نصيحة الخياط</h3>
                </div>
                <p className="text-sm font-bold text-white mb-1">{getTip(activeField).en}</p>
                <p className="text-sm font-medium text-slate-400 text-right" dir="rtl">{getTip(activeField).ar}</p>
            </div>
          </div>

          <div className="glass-card rounded-[3rem] p-6 md:p-12 border-white/5 shadow-2xl space-y-8">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <Ruler className="text-[#c9a84c]" size={20} />
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white text-center flex-1">Order Form / نموذج الطلب</h2>
            </div>

            <div className="space-y-6">
                {MEASUREMENT_FIELDS.map((field) => (
                    <div 
                        key={field.id}
                        className={`group p-6 rounded-3xl border transition-all duration-500 ${activeField === field.id ? 'border-[#c9a84c] bg-[#c9a84c]/5 ring-4 ring-[#c9a84c]/5' : 'border-white/5 bg-white/[0.01]'}`}
                        onMouseEnter={() => setActiveField(field.id)}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <div className="space-y-1">
                                <h4 className="text-sm font-black text-white group-hover:text-[#c9a84c] transition-colors">{field.label}</h4>
                                <p className="text-[10px] font-medium text-slate-500">{field.en}</p>
                                <p className="text-[10px] font-medium text-slate-400 text-right" dir="rtl">{field.ar}</p>
                            </div>
                            <div className="relative min-w-[120px]">
                                <input 
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none font-black text-xl text-center focus:border-[#c9a84c] transition-all"
                                    value={formData.measurements[field.id] || ""}
                                    onFocus={() => setActiveField(field.id)}
                                    onChange={e => setFormData({
                                        ...formData,
                                        measurements: {...formData.measurements, [field.id]: e.target.value}
                                    })}
                                />
                                <span className="absolute -bottom-5 left-0 w-full text-center text-[8px] font-black text-slate-600 uppercase tracking-widest">{formData.unit}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-8 space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c] ml-1">Additional Notes / ملاحظات إضافية</label>
                <textarea 
                    rows={4}
                    placeholder="Embroidery details, fabric choice, or special requests..."
                    className="w-full glass-input rounded-[2rem] py-6 px-8 outline-none font-medium text-base leading-relaxed focus:ring-2 focus:ring-[#c9a84c]/20"
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                />
            </div>

            <div className="pt-8">
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-6 rounded-3xl luxury-gradient text-[#0a0f1e] font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(201,168,76,0.2)] disabled:opacity-50 group"
                >
                    {isSubmitting ? "Processing..." : (
                        <>
                            Submit Order via WhatsApp
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center pb-12 space-y-4">
          <div className="flex items-center justify-center gap-4 opacity-30">
            <CheckCircle2 size={14} />
            <span className="text-[8px] font-black uppercase tracking-[0.4em]">Abu Dhabi Elite Tailoring</span>
          </div>
          <p className="text-slate-800 text-[10px] font-black uppercase tracking-[0.5em]">Emirates Deep Collection • 2026</p>
        </footer>
      </div>
      
      <style jsx global>{`
        .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .glass-input {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            color: white;
            transition: all 0.3s ease;
        }
        .luxury-gradient {
            background: linear-gradient(135deg, #e5c05b 0%, #c9a84c 50%, #b3913d 100%);
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
      `}</style>
    </div>
  );
}
