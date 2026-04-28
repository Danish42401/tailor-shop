"use client";

import React, { useState, useEffect } from "react";
import { 
  Scissors, 
  User, 
  Maximize2, 
  Camera, 
  Send, 
  ChevronRight, 
  ChevronLeft,
  Ruler,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { siteSettings } from "@/data/products";
import { generateWhatsAppLink } from "@/lib/whatsapp";

// --- Types ---
interface Measurements {
  fullLength: string;
  chestWidth: string;
  waistWidth: string;
  hipWidth: string;
  shoulderWidth: string;
  sleeveLength: string;
  armOpening: string;
  neckCollar: string;
  neckDepthFront: string;
  neckDepthBack: string;
  [key: string]: string;
}

interface FormData {
  customerName: string;
  phoneNumber: string;
  unit: "inch" | "cm";
  measurements: Measurements;
  notes: string;
  referenceImage: string | null;
}

// --- Micro-Diagram Component ---
const SilhouetteDiagram = ({ activeField, onPartClick }: { activeField: string | null, onPartClick: (field: string) => void }) => {
  const highlight = "#c9a84c";
  const dim = "rgba(255, 255, 255, 0.1)";
  
  const parts = [
    { id: "fullLength", d: "M20 5 L20 45", type: "line" },
    { id: "chestWidth", d: "M13 18 L27 18", type: "line" },
    { id: "waistWidth", d: "M14 25 L26 25", type: "line" },
    { id: "shoulderWidth", d: "M14 8 L26 8", type: "line" },
  ];

  return (
    <div className="relative w-full max-w-[280px] aspect-[3/4] mx-auto p-4 bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center">
      <svg viewBox="0 0 40 50" className="w-full h-full text-white/20">
        {/* Silhouette Body */}
        <path
          d="M14 8 Q20 7 26 8 L28 14 L34 22 L31 25 L27 18 L27 46 Q20 48 13 46 L13 18 L9 25 L6 22 L12 14 Z"
          fill="currentColor"
          className="transition-colors duration-500"
        />
        
        {/* Interactive Highlight Lines */}
        {parts.map(p => (
          <path
            key={p.id}
            d={p.d}
            stroke={activeField === p.id ? highlight : dim}
            strokeWidth={activeField === p.id ? "3" : "1.5"}
            className="cursor-pointer hover:stroke-[#c9a84c] transition-all"
            onClick={() => onPartClick(p.id)}
          />
        ))}
      </svg>
      <div className="absolute top-4 left-4 flex flex-col gap-1">
        <div className="w-3 h-3 rounded-full bg-[#c9a84c] animate-ping" />
        <span className="text-[10px] font-black uppercase tracking-tighter text-[#c9a84c]">Interactive Mode</span>
      </div>
    </div>
  );
};

export default function LuxuryBespokeForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    phoneNumber: "",
    unit: "inch",
    measurements: {
      fullLength: "", chestWidth: "", waistWidth: "", hipWidth: "",
      shoulderWidth: "", sleeveLength: "", armOpening: "", 
      neckCollar: "", neckDepthFront: "", neckDepthBack: ""
    },
    notes: "",
    referenceImage: null
  });
  const [activeField, setActiveField] = useState<string | null>(null);

  // Auto-save logic
  useEffect(() => {
    const saved = localStorage.getItem("bespoke_draft");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("bespoke_draft", JSON.stringify(formData));
  }, [formData]);

  const handleUnitToggle = () => {
    const newUnit = formData.unit === "inch" ? "cm" : "inch";
    const factor = newUnit === "cm" ? 2.54 : 1 / 2.54;
    
    const newMeasurements = { ...formData.measurements };
    Object.keys(newMeasurements).forEach(key => {
      if (newMeasurements[key]) {
        newMeasurements[key] = (parseFloat(newMeasurements[key]) * factor).toFixed(1);
      }
    });

    setFormData({ ...formData, unit: newUnit, measurements: newMeasurements });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    const link = generateWhatsAppLink(siteSettings.whatsappNumber, [], 0, {
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        notes: `${formData.notes} (Units: ${formData.unit})`,
        measurements: formData.measurements
    } as any);
    window.open(link, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 p-4 md:p-12 font-['Inter']">
      <div className="max-w-5xl mx-auto">
        
        {/* Luxury Header */}
        <header className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/10 mb-6 group hover:border-[#c9a84c] transition-all">
            <Scissors className="text-[#c9a84c] group-hover:rotate-45 transition-transform" size={40} />
          </div>
          <h1 className="text-4xl md:text-7xl font-['Playfair_Display'] font-black tracking-tighter shimmer-text mb-4">
            Bespoke Tailoring
          </h1>
          <p className="text-slate-500 font-medium tracking-wide uppercase text-xs">Dubai Master Craftsmanship</p>
        </header>

        {/* Progress Indicator */}
        <div className="flex justify-between items-center max-w-md mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />
          {[1, 2, 3].map(i => (
            <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border transition-all duration-500 ${step >= i ? 'step-active border-[#c9a84c] text-white' : 'bg-[#0a0f1e] border-white/10 text-slate-600'}`}>
              {i}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="glass-card rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          
          {/* Step 1: Identity */}
          {step === 1 && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c9a84c] ml-1">Client Full Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. Fatima Ahmed"
                    className="w-full glass-input rounded-2xl py-5 px-8 outline-none font-bold text-xl"
                    value={formData.customerName}
                    onChange={e => setFormData({...formData, customerName: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c9a84c] ml-1">WhatsApp Contact</label>
                  <input 
                    type="tel"
                    placeholder="+971 -- --- ----"
                    className="w-full glass-input rounded-2xl py-5 px-8 outline-none font-bold text-xl"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="p-8 rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center gap-4 hover:border-[#c9a84c]/30 transition-all cursor-pointer">
                <Camera size={32} className="text-slate-600" />
                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Attach Inspiration Photo</p>
              </div>
            </div>
          )}

          {/* Step 2: Dimensions */}
          {step === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-right-4">
              <div>
                <SilhouetteDiagram activeField={activeField} onPartClick={setActiveField} />
                <div className="mt-8 flex items-center justify-center gap-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${formData.unit === 'inch' ? 'text-[#c9a84c]' : 'text-slate-600'}`}>INCH</span>
                  <button onClick={handleUnitToggle} className="w-14 h-7 rounded-full bg-white/5 border border-white/10 p-1 flex items-center relative transition-all">
                    <div className={`w-5 h-5 rounded-full bg-[#c9a84c] transition-all duration-300 ${formData.unit === 'cm' ? 'translate-x-7' : 'translate-x-0'}`} />
                  </button>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${formData.unit === 'cm' ? 'text-[#c9a84c]' : 'text-slate-600'}`}>CM</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 h-fit max-h-[500px] overflow-y-auto no-scrollbar pr-2">
                {Object.keys(formData.measurements).map(key => (
                  <div key={key} className={`p-4 rounded-2xl border transition-all ${activeField === key ? 'border-[#c9a84c] bg-[#c9a84c]/5 ring-4 ring-[#c9a84c]/5' : 'border-white/5'}`}>
                    <label className="text-[9px] font-black uppercase tracking-tighter text-slate-500 mb-2 block">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input 
                      type="number"
                      className="w-full bg-transparent border-none p-0 outline-none font-black text-2xl text-white"
                      placeholder="0.0"
                      value={formData.measurements[key]}
                      onFocus={() => setActiveField(key)}
                      onChange={e => setFormData({
                        ...formData, 
                        measurements: {...formData.measurements, [key]: e.target.value}
                      })}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Aesthetics */}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in zoom-in-95">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c9a84c] ml-1">Design Notes & Fabric Choice</label>
                <textarea 
                  rows={6}
                  placeholder="Describe the silhouette, embroidery details, and fabric preference..."
                  className="w-full glass-input rounded-[2.5rem] py-8 px-10 outline-none font-medium text-lg leading-relaxed"
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              {/* Summary Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-start gap-6">
                <AlertCircle className="text-[#c9a84c] shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm font-bold">Review your details</p>
                  <p className="text-xs text-slate-500 leading-relaxed">By sending this request, our designer will contact you within 24 hours to confirm the fabric availability and schedule a video consultation if needed.</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-16 flex flex-col md:flex-row gap-4">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="flex-1 py-6 rounded-2xl border border-white/10 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
              >
                <ChevronLeft size={16} /> Previous
              </button>
            )}
            
            {step < 3 ? (
              <button 
                onClick={nextStep}
                disabled={step === 1 && (!formData.customerName || !formData.phoneNumber)}
                className="flex-[2] bg-white text-slate-900 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2 hover:bg-[#c9a84c] hover:text-white transition-all disabled:opacity-30"
              >
                Next Step <ChevronRight size={16} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="flex-[2] luxury-gradient text-slate-900 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)] sticky bottom-4 md:static"
              >
                Launch Design Request <Send size={18} />
              </button>
            )}
          </div>

        </div>

        <footer className="mt-12 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">
          Dubai • Deira • Boutique Excellence
        </footer>

      </div>
    </div>
  );
}
