"use client";

import HalftoneFlow from "@/components/ui/halftone-flow";

export default function HalftoneFlowDemo() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-xl bg-[#fcf9f3] border border-[#0b1c2c]/10">
      <HalftoneFlow className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-2xl font-semibold tracking-tight text-[#0b1c2c]">
          Halftone Flow
        </span>
      </div>
    </div>
  );
}
