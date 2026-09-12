import { SectionHeader } from "@/components/section-header";
import { ReactNode } from "react";

type StackSectionProps = {
  id?: string;
  zIndex: number;
  title: string;
  label?: string;
  description?: string;
  children: ReactNode;
};

export function StackSection({
  id,
  zIndex,
  title,
  label,
  description,
  children,
}: StackSectionProps) {
  return (
    <section id={id} className="relative w-full bg-black" style={{ zIndex }}>
      {/* Header pins while scrolling through this section's content */}
      <div
        className="sticky top-0 bg-black shadow-[0_-20px_50px_rgba(0,0,0,1)]"
        style={{ zIndex }}
      >
        <div className="p-5 pb-0">
          <SectionHeader title={title} label={label} description={description} />
        </div>
      </div>

      {/* Full content scrolls naturally — next section covers only after this ends */}
      <div className="relative bg-black" style={{ zIndex }}>
        {children}
      </div>
    </section>
  );
}
