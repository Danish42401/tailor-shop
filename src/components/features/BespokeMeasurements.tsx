"use client";

import React, { useState } from "react";
import { 
  ArrowUpDown, 
  ArrowLeftRight, 
  Maximize, 
  Minimize, 
  MoveRight, 
  RotateCcw, 
  User,
  Scissors,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { MeasurementDiagram } from "./MeasurementDiagram";

interface Props {
  measurements: any;
  onChange: (field: string, value: string) => void;
}

const MEASUREMENT_FIELDS = [
  { id: "fullLength", icon: <ArrowUpDown size={18} />, num: 1 },
  { id: "chestWidth", icon: <ArrowLeftRight size={18} />, num: 2 },
  { id: "waistWidth", icon: <ArrowLeftRight size={18} />, num: 3 },
  { id: "hipWidth", icon: <ArrowLeftRight size={18} />, num: 4 },
  { id: "shoulderWidth", icon: <ArrowLeftRight size={18} />, num: 5 },
  { id: "sleeveLength", icon: <MoveRight size={18} />, num: 6 },
  { id: "armOpening", icon: <RotateCcw size={18} />, num: 7 },
  { id: "neckCollar", icon: <User size={18} />, num: 8 },
  { id: "neckDepthFront", icon: <ChevronDown size={18} />, num: 9 },
  { id: "neckDepthBack", icon: <ChevronUp size={18} />, num: 10 },
];

export const BespokeMeasurements: React.FC<Props> = ({ measurements, onChange }) => {
  const [activeField, setActiveField] = useState<string | null>(null);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Sticky Diagram for Mobile */}
      <div className="w-full md:w-1/2 sticky top-20 z-10 md:static">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
          <MeasurementDiagram activeField={activeField} />
          <div className="mt-4 flex justify-center gap-2 overflow-x-auto py-2 no-scrollbar">
            {MEASUREMENT_FIELDS.map((f) => (
              <div 
                key={f.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                  activeField === f.id 
                    ? "bg-amber-500 text-white scale-110 shadow-lg shadow-amber-500/30" 
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                }`}
              >
                {f.num}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Grid */}
      <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
        {MEASUREMENT_FIELDS.map((field) => (
          <div 
            key={field.id} 
            className={`relative group transition-all p-4 rounded-3xl border ${
              activeField === field.id 
                ? "border-amber-500 bg-amber-50/50 dark:bg-amber-900/10 ring-4 ring-amber-500/5" 
                : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`flex items-center justify-center w-8 h-8 rounded-xl font-black text-sm ${
                activeField === field.id ? "bg-amber-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
              }`}>
                {field.num}
              </span>
              <span className={activeField === field.id ? "text-amber-500" : "text-slate-300"}>
                {field.icon}
              </span>
            </div>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Inches"
              className="w-full bg-transparent border-none p-0 focus:ring-0 font-black text-xl placeholder:text-slate-200 dark:placeholder:text-slate-700"
              value={measurements[field.id] || ""}
              onFocus={() => setActiveField(field.id)}
              onBlur={() => setActiveField(null)}
              onChange={(e) => onChange(field.id, e.target.value)}
            />
          </div>
        ))}
        
        {/* Extra Notes for Measurement */}
        <div className="col-span-2 space-y-3 mt-4">
          <div className="flex items-center gap-2 text-slate-400 px-2">
            <Scissors size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Other Details</span>
          </div>
          <input 
            type="text"
            placeholder="e.g. Loose fit from arms..."
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-amber-500 font-bold"
            value={measurements.other || ""}
            onChange={(e) => onChange("other", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
