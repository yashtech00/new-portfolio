import { ReactNode } from "react";

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
  return (
    <section
      id={id}
      className="relative w-full border-t border-[var(--glass-border)] bg-[var(--surface)]/80 backdrop-blur-[0.5px] transition-colors duration-300"
    >
      {/* Sticky Large Section Heading ONLY */}
      <div
        className="sticky top-0 z-20 w-full bg-[var(--surface)]/95 backdrop-blur-md py-4 sm:py-6 border-b border-[var(--glass-border)] transition-colors duration-300"
      >
        <div className="container-page">
          <h2 className="display-font text-[var(--ink)] font-semibold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none select-none">
            {title}
          </h2>
        </div>
      </div>

      {/* Full content scrolls naturally underneath */}
      <div className="relative w-full">
        {/* Section metadata / eyebrow & description (NOT sticky) */}
        {(label || description) && (
          <div className="w-full border-b border-[var(--glass-border)]">
            <div className="container-page flex flex-col md:flex-row justify-between items-start gap-4 md:gap-12 py-8 md:py-12">
              {label && (
                <div className="md:w-1/3">
                  <span className="label-eyebrow text-xs font-bold text-[var(--teal)] tracking-widest uppercase">
                    {label}
                  </span>
                </div>
              )}
              {description && (
                <div className={label ? "md:w-2/3 lg:w-1/2" : "w-full"}>
                  <p className="text-[var(--on-surface-variant)] text-base md:text-lg lg:text-xl leading-relaxed">
                    {description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section content (cards, timeline, projects, etc.) inside container-page */}
        <div className="container-page pt-8 md:pt-12 pb-16 md:pb-24">
          {children}
        </div>
      </div>
    </section>
  );
}
