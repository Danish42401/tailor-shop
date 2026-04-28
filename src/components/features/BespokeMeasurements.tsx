"use client";

import React from "react";
import { Scissors } from "lucide-react";

interface Props {
  measurements: any;
  onChange: (field: string, value: string) => void;
}

const MicroIcon = ({ type }: { type: string }) => {
  const baseClass = "w-12 h-12 text-slate-400 dark:text-slate-600 shrink-0";
  const strokeColor = "currentColor";
  const highlightColor = "#f59e0b"; // Amber-500
  
  const FrockBase = () => (
    <path
      d="M14 8 Q20 7 26 8 L28 14 L34 22 L31 25 L27 18 L27 46 Q20 48 13 46 L13 18 L9 25 L6 22 L12 14 Z"
      fill="none"
      stroke={strokeColor}
      strokeWidth="1.5"
    />
  );

  switch (type) {
    case "fullLength":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase />
          <line x1="20" y1="8" x2="20" y2="47" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="8" r="2" fill={highlightColor} />
          <circle cx="20" cy="47" r="2" fill={highlightColor} />
        </svg>
      );
    case "chestWidth":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase />
          <line x1="13" y1="19" x2="27" y2="19" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "waistWidth":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase />
          <line x1="13" y1="26" x2="27" y2="26" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "hipWidth":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase />
          <line x1="12" y1="36" x2="28" y2="36" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "shoulderWidth":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase />
          <line x1="14" y1="9" x2="26" y2="9" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "sleeveLength":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase />
          <line x1="26" y1="9" x2="33" y2="21" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case "armOpening":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase />
          <ellipse cx="33" cy="22" rx="4" ry="2" transform="rotate(-30 33 22)" stroke={highlightColor} strokeWidth="3" fill="none" />
        </svg>
      );
    case "neckCollar":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase />
          <path d="M16 8 Q20 10 24 8" stroke={highlightColor} strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "neckDepthFront":
      return (
        <svg viewBox="0 0 40 50" className={baseClass}>
          <FrockBase />
          <line x1="20" y1="8" x2="20" y2="13" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M18 11 L20 13 L22 11" stroke={highlightColor} strokeWidth="2" fill="none" />
        </svg>
      );
    case "neckDepthBack":
      return (
        <svg viewBox="0 0 40 50" className={baseClass} style={{ opacity: 0.6 }}>
          <FrockBase />
          <line x1="25" y1="7" x2="25" y2="10" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

const MEASUREMENT_FIELDS = [
  { id: "fullLength" },
  { id: "chestWidth" },
  { id: "waistWidth" },
  { id: "hipWidth" },
  { id: "shoulderWidth" },
  { id: "sleeveLength" },
  { id: "armOpening" },
  { id: "neckCollar" },
  { id: "neckDepthFront" },
  { id: "neckDepthBack" },
];

export const BespokeMeasurements: React.FC<Props> = ({ measurements, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {MEASUREMENT_FIELDS.map((field) => (
        <div 
          key={field.id} 
          className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 transition-all focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:bg-white dark:focus-within:bg-slate-800"
        >
          {/* Visual Symbol */}
          <MicroIcon type={field.id} />
          
          {/* Direct Input */}
          <div className="flex-1">
            <input
              type="text"
              inputMode="decimal"
              placeholder="Inches"
              className="w-full bg-transparent border-none p-0 focus:ring-0 font-black text-2xl placeholder:text-slate-300 dark:placeholder:text-slate-700"
              value={measurements[field.id] || ""}
              onChange={(e) => onChange(field.id, e.target.value)}
            />
          </div>
        </div>
      ))}
      
      {/* Extra Notes */}
      <div className="sm:col-span-2 flex items-center gap-4 p-4 rounded-3xl bg-slate-100/50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-700 mt-4">
        <div className="w-12 h-12 flex items-center justify-center text-slate-400">
          <Scissors size={24} />
        </div>
        <input 
          type="text"
          placeholder="Other specific details..."
          className="w-full bg-transparent border-none p-0 focus:ring-0 font-bold text-lg placeholder:text-slate-400"
          value={measurements.other || ""}
          onChange={(e) => onChange("other", e.target.value)}
        />
      </div>
    </div>
  );
};
