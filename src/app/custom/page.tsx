"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LuxuryBespokeForm from "@/components/features/LuxuryBespokeForm";

function CustomOrderContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const productName = searchParams.get("productName");

  return <LuxuryBespokeForm productId={productId || undefined} productName={productName || undefined} />;
}

export default function CustomOrder() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center text-white">Loading Bespoke Studio...</div>}>
      <CustomOrderContent />
    </Suspense>
  );
}
