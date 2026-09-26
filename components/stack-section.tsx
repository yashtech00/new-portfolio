"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type StackSectionProps = {
  id?: string;
  zIndex?: number;
  title: string;
  label?: string;
  description?: string;
  children: ReactNode;
};

export function StackSection({
  id,
  title,
  label,
  description,
  children,
}: StackSectionProps) {
  // Format label to ensure clean category display with cyan dot
  const cleanLabel = label ? label.replace(/^\(|\)$/g, "").trim() : "";

  return (
    <section
      id={id}
      className="relative w-full border-t border-[var(--glass-border)] bg-[var(--surface)]/90 backdrop-blur-[1px] transition-colors duration-300"
    >
      {/* Sticky Large Section Heading */}
      <div className="sticky top-0 z-20 w-full bg-[var(--surface)]/95 backdrop-blur-md py-4 sm:py-5 md:py-6 border-b border-[var(--glass-border)] transition-colors duration-300">
        <div className="container-page flex items-center justify-between">
          <h2 className="display-font text-[var(--ink)] font-semibold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none select-none">
            {title}
          </h2>
          {cleanLabel && (
            <span className="hidden md:inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[var(--teal)] opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
              {cleanLabel}
            </span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative w-full">
        {/* Section metadata / eyebrow & description */}
        {(label || description) && (
          <div className="w-full border-b border-[var(--glass-border)] bg-[var(--surface-container-low)]/30">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="container-page flex flex-col md:flex-row justify-between items-start gap-4 md:gap-12 py-7 md:py-10"
            >
              {cleanLabel && (
                <div className="md:w-1/3">
                  <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--teal)] tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
                    {cleanLabel}
                  </span>
                </div>
              )}
              {description && (
                <div className={cleanLabel ? "md:w-2/3 lg:w-1/2" : "w-full"}>
                  <p className="text-[var(--on-surface-variant)] text-base sm:text-lg leading-relaxed">
                    {description}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Section content (cards, timeline, projects, etc.) */}
        <div className="container-page pt-8 md:pt-12 pb-16 md:pb-24">
          {children}
        </div>
      </div>
    </section>
  );
}
