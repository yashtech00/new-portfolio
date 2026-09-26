"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-low)] opacity-0 shrink-0"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative group flex items-center justify-center w-9 h-9 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-low)] hover:bg-[var(--surface-container)] hover:border-[var(--teal)] text-[var(--on-surface)] hover:text-[var(--teal)] transition-all duration-200 shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--teal)] cursor-pointer shadow-2xs"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 group-hover:-rotate-12 text-[var(--teal)]" />
        ) : (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 group-hover:rotate-45 text-[var(--teal)]" />
        )}
      </div>
    </button>
  );
}
