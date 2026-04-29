"use client";

import React from "react";
import { Scissors } from "lucide-react";

import { Measurements } from "@/types";

interface Props {
  measurements: Measurements;
  onChange: (field: string, value: string) => void;
}

const FrockBase = ({ strokeColor }: { strokeColor: string }) => (
  <path
    d="M14 8 Q20 7 26 8 L28 14 L34 22 L31 25 L27 18 L27 46 Q20 48 13 46 L13 18 L9 25 L6 22 L12 14 Z"
    fill="none"
    stroke={strokeColor}
    strokeWidth="1.5"
  />
);

const MicroIcon = ({ type }: { type: string }) => {
  const baseClass = "w-16 h-16 text-slate-400 dark:text-slate-600 shrink-0 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl";
  const strokeColor = "currentColor";
  const highlightColor = "#f59e0b"; // Amber-500
  
  switch (type) {
    case "fullLength":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <line x1="20" y1="8" x2="20" y2="47" stroke={highlightColor} strokeWidth="4" strokeLinecap="round" />
          <circle cx="20" cy="8" r="2.5" fill={highlightColor} />
          <circle cx="20" cy="47" r="2.5" fill={highlightColor} />
        </svg>
      );
    case "chestWidth":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <line x1="13" y1="19" x2="27" y2="19" stroke={highlightColor} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "waistWidth":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <line x1="13" y1="26" x2="27" y2="26" stroke={highlightColor} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "hipWidth":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <line x1="12" y1="36" x2="28" y2="36" stroke={highlightColor} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "shoulderWidth":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <line x1="14" y1="9" x2="26" y2="9" stroke={highlightColor} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "sleeveLength":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <line x1="26" y1="9" x2="33" y2="21" stroke={highlightColor} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "armOpening":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <ellipse cx="33" cy="22" rx="5" ry="3" transform="rotate(-30 33 22)" stroke={highlightColor} strokeWidth="4" fill="none" />
        </svg>
      );
    case "neckCollar":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <path d="M16 8 Q20 11 24 8" stroke={highlightColor} strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "neckDepthFront":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <line x1="20" y1="8" x2="20" y2="15" stroke={highlightColor} strokeWidth="4" strokeLinecap="round" />
          <path d="M17 12 L20 15 L23 12" stroke={highlightColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "neckDepthBack":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase strokeColor={strokeColor} />
          <line x1="20" y1="6" x2="20" y2="10" stroke={highlightColor} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

const MEASUREMENT_FIELDS = [
  { id: "fullLength", label: "Full Length" },
  { id: "chestWidth", label: "Chest Width" },
  { id: "waistWidth", label: "Waist Width" },
  { id: "hipWidth", label: "Hip Width" },
  { id: "shoulderWidth", label: "Shoulder Width" },
  { id: "sleeveLength", label: "Sleeve Length" },
  { id: "armOpening", label: "Arm Opening" },
  { id: "neckCollar", label: "Neck/Collar" },
  { id: "neckDepthFront", label: "Front Neck Depth" },
  { id: "neckDepthBack", label: "Back Neck Depth" },
];

export const BespokeMeasurements: React.FC<Props> = ({ measurements, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MEASUREMENT_FIELDS.map((field) => (
          <div 
            key={field.id} 
            className="flex items-center gap-5 p-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
          >
            {/* 1. Large Visual Symbol */}
            <MicroIcon type={field.id} />
            
            {/* 2. Label and Input Field */}
            <div className="flex-1 space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-focus-within:text-amber-600 transition-colors">
                {field.label}
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.0"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl py-3 px-4 font-black text-2xl focus:ring-2 focus:ring-amber-500/20 transition-all text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-700"
                  value={measurements[field.id] || ""}
                  onChange={(e) => onChange(field.id, e.target.value)}
                />
                <span className="absolute right-4 text-xs font-bold text-slate-300 pointer-events-none">INCH</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Extra Details Field */}
      <div className="flex items-center gap-5 p-6 rounded-[2.5rem] bg-slate-50 dark:bg-slate-800/30 border-2 border-dashed border-slate-200 dark:border-slate-800 mt-6">
        <div className="w-16 h-16 flex items-center justify-center text-slate-400 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
          <Scissors size={32} />
        </div>
        <div className="flex-1 space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Additional Instructions</label>
          <input 
            type="text"
            placeholder="e.g. Any specific fit or style notes..."
            className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-lg text-slate-700 dark:text-slate-300 placeholder:text-slate-300"
            value={measurements.other || ""}
            onChange={(e) => onChange("other", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
