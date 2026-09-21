type SectionHeaderProps = {
  title: string;
  label?: string;
  description?: string;
};

export function SectionHeader({ title, label, description }: SectionHeaderProps) {
  return (
    <div className="w-full">
      <div className="container-page pt-6">
        <h2 className="display-font text-[#0b1c2c] font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none select-none">
          {title}
        </h2>
      </div>

      {(label || description) && (
        <div className="w-full border-t border-[rgba(11,28,44,0.08)] mt-6">
          <div className="container-page flex flex-col md:flex-row justify-between items-start gap-6 md:gap-12 py-8 md:py-12">
            {label && (
              <div className="md:w-1/3">
                <span className="label-eyebrow text-xs font-bold text-[#0e8f8b] tracking-widest uppercase">
                  {label}
                </span>
              </div>
            )}
            {description && (
              <div className={label ? "md:w-2/3 lg:w-1/2" : "w-full"}>
                <p className="text-[#44474c] text-base md:text-lg lg:text-xl leading-relaxed">
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
