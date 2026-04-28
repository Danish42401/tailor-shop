"use client";

import React, { useState, useEffect } from "react";
import { 
  Scissors, 
  User, 
  Maximize2, 
  Camera, 
  Send, 
  Ruler,
  HelpCircle,
  AlertCircle,
  CheckCircle2,
  Phone
} from "lucide-react";
import { siteSettings } from "@/data/products";
import { generateWhatsAppLink } from "@/lib/whatsapp";

// --- Types ---
interface Measurements {
  chest: string;
  shoulder: string;
  frockLength: string;
  armhole: string;
  sleeveLength: string;
  waist: string;
  neckWidth: string;
  neckDepth: string;
  [key: string]: string;
}

interface FormData {
  customerName: string;
  phoneNumber: string;
  unit: "inch" | "cm";
  measurements: Measurements;
  notes: string;
}

// --- Interactive Silhouette Component ---
const SilhouetteStudio = ({ 
  activeField, 
  onPartClick, 
  unit 
}: { 
  activeField: string | null, 
  onPartClick: (field: string) => void,
  unit: string
}) => {
  const highlight = "#c9a84c";
  const dim = "rgba(255, 255, 255, 0.1)";
  const activeStrokeWidth = "3";
  const normalStrokeWidth = "1.5";

  // Detailed paths for a Frock/Kameez silhouette
  const parts = [
    { id: "frockLength", d: "M20 8 L20 46", label: "Full Length" },
    { id: "shoulder", d: "M12 9 L28 9", label: "Shoulder" },
    { id: "chest", d: "M11 18 L29 18", label: "Chest" },
    { id: "waist", d: "M13 26 L27 26", label: "Waist" },
    { id: "armhole", d: "M11 15 Q9 15 9 11 Q9 7 12 9", label: "Armhole" }, // Simple loop representaton
    { id: "sleeveLength", d: "M28 9 L34 22", label: "Sleeve" },
    { id: "neckWidth", d: "M16 8 Q20 10 24 8", label: "Neck Width" },
    { id: "neckDepth", d: "M20 8 L20 14", label: "Neck Depth" },
  ];

  return (
    <div className="relative w-full max-w-[320px] aspect-[3/4] mx-auto p-6 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center group/studio">
      <svg viewBox="0 0 40 50" className="w-full h-full">
        {/* Silhouette Base */}
        <path
          d="M14 8 Q20 7 26 8 L28 14 L34 22 L31 25 L27 18 L27 46 Q20 48 13 46 L13 18 L9 25 L6 22 L12 14 Z"
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
        
        {/* Measurement Lines */}
        {parts.map(p => (
          <g key={p.id} className="cursor-pointer" onClick={() => onPartClick(p.id)}>
            <path
              d={p.d}
              stroke={activeField === p.id ? highlight : dim}
              strokeWidth={activeField === p.id ? activeStrokeWidth : normalStrokeWidth}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-500"
            />
            {activeField === p.id && (
                <>
                    <circle cx={p.d.split(' ')[1].replace('M', '').split('L')[0]} cy={p.d.split(' ')[2].split('L')[0]} r="1" fill={highlight} className="animate-pulse" />
                    <text x="20" y="3" textAnchor="middle" className="text-[3px] fill-[#c9a84c] font-black uppercase tracking-widest">{p.label}</text>
                </>
            )}
          </g>
        ))}
      </svg>
      
      {/* Badge */}
      <div className="absolute top-6 left-6 flex flex-col gap-1">
        <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-ping" />
        <span className="text-[8px] font-black uppercase tracking-widest text-[#c9a84c]/60">Studio Mode</span>
      </div>

      {/* Unit Indicator */}
      <div className="absolute bottom-6 right-6 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-[#c9a84c]">
        {unit.toUpperCase()}
      </div>
    </div>
  );
};

export default function LuxuryBespokeForm() {
  const [formData, setFormData] = useState<FormData>({
    customerName: "",
    phoneNumber: "",
    unit: "inch",
    measurements: {
      chest: "",
      shoulder: "",
      frockLength: "",
      armhole: "",
      sleeveLength: "",
      waist: "",
      neckWidth: "",
      neckDepth: ""
    },
    notes: ""
  });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-save logic
  useEffect(() => {
    const saved = localStorage.getItem("bespoke_studio_draft");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Migrate old data if necessary or just reset
            if (parsed.measurements && parsed.measurements.chest !== undefined) {
                setFormData(parsed);
            }
        } catch(e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bespoke_studio_draft", JSON.stringify(formData));
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

  const MEASUREMENT_FIELDS = [
    { id: "chest", label: "Chest Size" },
    { id: "shoulder", label: "Shoulder Width" },
    { id: "frockLength", label: "Frock Length" },
    { id: "armhole", label: "Armhole Size" },
    { id: "sleeveLength", label: "Sleeve Length" },
    { id: "waist", label: "Waist Size" },
    { id: "neckWidth", label: "Neck Width" },
    { id: "neckDepth", label: "Neck Depth" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 p-4 md:p-8 font-['Inter'] selection:bg-[#c9a84c]/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Premium Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#c9a84c]/10 border border-[#c9a84c]/20">
                <Scissors className="text-[#c9a84c]" size={24} />
              </div>
              <h1 className="text-3xl md:text-5xl font-['Playfair_Display'] font-black tracking-tight text-white">
                Bespoke <span className="text-[#c9a84c]">Studio</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium tracking-[0.2em] uppercase text-[10px] pl-1">Dubai Luxury Tailoring Excellence</p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10">
            <button 
                onClick={handleUnitToggle}
                className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/5 active:scale-95"
            >
                Switch to {formData.unit === 'inch' ? 'Centimeters' : 'Inches'}
            </button>
          </div>
        </header>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Studio View */}
          <div className="lg:col-span-5 sticky top-8">
            <div className="glass-card rounded-[3rem] p-8 space-y-8 border-white/5 shadow-2xl overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c9a84c]/5 rounded-full blur-[80px]" />
              
              <SilhouetteStudio 
                activeField={activeField} 
                onPartClick={setActiveField} 
                unit={formData.unit}
              />

              {/* Dynamic Tip */}
              <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-2xl p-4 flex gap-4 items-center animate-in fade-in slide-in-from-bottom-2">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center shrink-0">
                    <HelpCircle className="text-[#0a0f1e]" size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c] mb-1">Tailor's Tip</p>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        {activeField ? `Measure your ${activeField.replace(/([A-Z])/g, ' $1')} loosely with a soft tape for a comfortable fit.` : "Tap any measurement field or diagram line to see exactly where to measure."}
                    </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Input Panel */}
          <div className="lg:col-span-7 space-y-8 pb-32 lg:pb-0">
            
            {/* 1. Identity Section */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 shadow-xl space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <User className="text-[#c9a84c]" size={18} />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">Client Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                        <input 
                            type="text"
                            placeholder="e.g. Fatima Ahmed"
                            className="w-full glass-input rounded-2xl py-4 px-6 outline-none font-bold text-lg focus:ring-2 focus:ring-[#c9a84c]/20"
                            value={formData.customerName}
                            onChange={e => setFormData({...formData, customerName: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">WhatsApp Number</label>
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

            {/* 2. Measurements Grid */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 shadow-xl space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <Ruler className="text-[#c9a84c]" size={18} />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">Precise Measurements</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {MEASUREMENT_FIELDS.map(field => (
                        <div 
                            key={field.id}
                            className={`p-4 rounded-2xl border transition-all duration-300 ${activeField === field.id ? 'border-[#c9a84c] bg-[#c9a84c]/5 shadow-[0_0_20px_rgba(201,168,76,0.1)]' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'}`}
                            onMouseEnter={() => setActiveField(field.id)}
                        >
                            <label className="text-[8px] font-black uppercase tracking-tighter text-slate-500 mb-2 block">{field.label}</label>
                            <div className="relative">
                                <input 
                                    type="number"
                                    step="0.1"
                                    placeholder="0.0"
                                    className="w-full bg-transparent border-none p-0 outline-none font-black text-2xl text-white placeholder:text-white/5"
                                    value={formData.measurements[field.id]}
                                    onFocus={() => setActiveField(field.id)}
                                    onChange={e => setFormData({
                                        ...formData,
                                        measurements: {...formData.measurements, [field.id]: e.target.value}
                                    })}
                                />
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] font-black text-slate-600 uppercase">{formData.unit}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Design Notes */}
            <div className="glass-card rounded-[2.5rem] p-8 border-white/5 shadow-xl space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                    <Scissors className="text-[#c9a84c]" size={18} />
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">Style Preferences</h2>
                </div>
                <textarea 
                    rows={4}
                    placeholder="Describe the silhouette, embroidery details, fabric preference or any special requests..."
                    className="w-full glass-input rounded-2xl py-6 px-8 outline-none font-medium text-base leading-relaxed focus:ring-2 focus:ring-[#c9a84c]/20"
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                />
                
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-dashed border-white/10 group hover:border-[#c9a84c]/50 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-[#c9a84c]">
                        <Camera size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Attach Inspiration Image</p>
                        <p className="text-[9px] text-slate-500">Coming soon: Upload directly to WhatsApp</p>
                    </div>
                </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 pb-12 lg:pb-0">
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-6 rounded-3xl luxury-gradient text-[#0a0f1e] font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(201,168,76,0.2)] disabled:opacity-50 group"
                >
                    {isSubmitting ? "Finalizing Design..." : (
                        <>
                            Launch Design Request
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                    )}
                </button>
                <div className="mt-6 flex items-center justify-center gap-6 opacity-40">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={12} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Master Crafted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 size={12} />
                        <span className="text-[8px] font-black uppercase tracking-widest">Dubai Certified</span>
                    </div>
                </div>
            </div>

          </div>

        </div>

        <footer className="mt-20 text-center pb-12">
          <p className="text-slate-700 text-[10px] font-black uppercase tracking-[0.5em]">Boutique Excellence • Since 1998</p>
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
        .glass-input:focus {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(201, 168, 76, 0.3);
        }
        .luxury-gradient {
            background: linear-gradient(135deg, #e5c05b 0%, #c9a84c 50%, #b3913d 100%);
        }
        .shimmer-text {
            background: linear-gradient(90deg, #fff 0%, #c9a84c 50%, #fff 100%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
            to { background-position: 200% center; }
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
