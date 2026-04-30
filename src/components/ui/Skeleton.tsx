"use client";

import React from "react";

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-5 animate-pulse">
      <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-[1.5rem] mb-6" />
      <div className="px-2 space-y-4">
        <div className="flex justify-between">
          <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800 rounded-full" />
          <div className="h-3 w-10 bg-slate-100 dark:bg-slate-800 rounded-full" />
        </div>
        <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-lg" />
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-lg" />
        <div className="flex justify-between items-center pt-4">
          <div className="h-8 w-24 bg-slate-100 dark:bg-slate-800 rounded-lg" />
          <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export const CategoryTabSkeleton = () => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-8 no-scrollbar">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-10 w-32 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse flex-shrink-0" />
      ))}
    </div>
  );
};
