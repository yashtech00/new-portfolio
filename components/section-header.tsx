type SectionHeaderProps = {
  title: string;
  label?: string;
  description?: string;
};

export function SectionHeader({ title, label, description }: SectionHeaderProps) {
  return (
    <div>
      <span className="text-white/70 font-semibold text-[72px] md:text-[120px] leading-none">
        {title}
      </span>
        {(label || description) && (
          <div className="w-full flex flex-col md:flex-row justify-between items-start gap-8 px-6 md:px-12 py-20 border-t border-neutral-800">
            {label && (
              <div className="md:w-1/3">
                <h2 className="text-sm text-neutral-400 mt-2 tracking-widest uppercase">
                  {label}
                </h2>
              </div>
            )}
            {description && (
              <div className={label ? "md:w-2/3 lg:w-1/2" : "w-full"}>
                <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
                  {description}
                </p>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
