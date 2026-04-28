"use client";

import React from "react";

interface Props {
  activeField: string | null;
}

export const MeasurementDiagram: React.FC<Props> = ({ activeField }) => {
  const getColor = (field: string) => (activeField === field ? "#f59e0b" : "#94a3b8");
  const getStrokeWidth = (field: string) => (activeField === field ? 3 : 1.5);

  return (
    <div className="relative w-full aspect-[3/4] max-w-[300px] mx-auto bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 flex items-center justify-center border border-slate-100 dark:border-slate-800">
      <svg
        viewBox="0 0 200 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Frock Silhouette */}
        <path
          d="M70 40 Q100 35 130 40 L140 70 L170 110 L155 125 L135 90 L135 230 Q100 240 65 230 L65 90 L45 125 L30 110 L60 70 Z"
          fill="currentColor"
          className="text-slate-200 dark:text-slate-700 opacity-30"
        />

        {/* 1. Full Length */}
        <line x1="100" y1="40" x2="100" y2="235" stroke={getColor("fullLength")} strokeWidth={getStrokeWidth("fullLength")} strokeDasharray="4 2" />
        <circle cx="100" cy="40" r="3" fill={getColor("fullLength")} />
        <circle cx="100" cy="235" r="3" fill={getColor("fullLength")} />
        <text x="105" y="140" fill={getColor("fullLength")} fontSize="10" fontWeight="bold">1</text>

        {/* 2. Chest Width */}
        <line x1="65" y1="95" x2="135" y2="95" stroke={getColor("chestWidth")} strokeWidth={getStrokeWidth("chestWidth")} />
        <text x="95" y="90" fill={getColor("chestWidth")} fontSize="10" fontWeight="bold">2</text>

        {/* 3. Waist Width */}
        <line x1="65" y1="130" x2="135" y2="130" stroke={getColor("waistWidth")} strokeWidth={getStrokeWidth("waistWidth")} />
        <text x="95" y="125" fill={getColor("waistWidth")} fontSize="10" fontWeight="bold">3</text>

        {/* 4. Hip Width */}
        <line x1="60" y1="180" x2="140" y2="180" stroke={getColor("hipWidth")} strokeWidth={getStrokeWidth("hipWidth")} />
        <text x="95" y="175" fill={getColor("hipWidth")} fontSize="10" fontWeight="bold">4</text>

        {/* 5. Shoulder Width */}
        <line x1="70" y1="45" x2="130" y2="45" stroke={getColor("shoulderWidth")} strokeWidth={getStrokeWidth("shoulderWidth")} />
        <text x="95" y="40" fill={getColor("shoulderWidth")} fontSize="10" fontWeight="bold">5</text>

        {/* 6. Sleeve Length */}
        <line x1="130" y1="45" x2="165" y2="105" stroke={getColor("sleeveLength")} strokeWidth={getStrokeWidth("sleeveLength")} />
        <text x="155" y="70" fill={getColor("sleeveLength")} fontSize="10" fontWeight="bold">6</text>

        {/* 7. Arm Opening */}
        <ellipse cx="165" cy="110" rx="10" ry="5" transform="rotate(-30 165 110)" stroke={getColor("armOpening")} strokeWidth={getStrokeWidth("armOpening")} />
        <text x="175" y="125" fill={getColor("armOpening")} fontSize="10" fontWeight="bold">7</text>

        {/* 8. Neck/Collar */}
        <path d="M80 40 Q100 50 120 40" stroke={getColor("neckCollar")} strokeWidth={getStrokeWidth("neckCollar")} fill="none" />
        <text x="95" y="60" fill={getColor("neckCollar")} fontSize="10" fontWeight="bold">8</text>

        {/* 9. Neck Depth Front */}
        <line x1="100" y1="40" x2="100" y2="65" stroke={getColor("neckDepthFront")} strokeWidth={getStrokeWidth("neckDepthFront")} />
        <text x="105" y="60" fill={getColor("neckDepthFront")} fontSize="8" fontWeight="bold">9</text>

        {/* 10. Neck Depth Back */}
        <line x1="125" y1="35" x2="125" y2="50" stroke={getColor("neckDepthBack")} strokeWidth={getStrokeWidth("neckDepthBack")} />
        <text x="130" y="45" fill={getColor("neckDepthBack")} fontSize="8" fontWeight="bold">10</text>
      </svg>
    </div>
  );
};
