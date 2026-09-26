"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Works", href: "#projects", id: "projects" },
  { label: "About", href: "#about", id: "about" },
  { label: "Journey", href: "#timeline", id: "timeline" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[var(--surface)]/85 backdrop-blur-md border-b border-[var(--glass-border)] shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-page flex justify-between items-center py-3.5 sm:py-4 transition-all duration-300">
        {/* Left: Role tagline / Name */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-tight text-[var(--ink)] shrink-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--teal)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--teal)]" />
          </span>
          <span className="tracking-wide">YASH GUPTA</span>
          <span className="hidden sm:inline text-xs font-normal text-[var(--on-surface-variant)]">
            / SDE &amp; Analyst
          </span>
        </Link>

        {/* Right: Nav links & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <nav className="flex items-center gap-1 sm:gap-3 md:gap-5 overflow-x-auto py-1">
            {navLinks.map(({ label, href, id }) => {
              const isActive = activeSection === id;
              return (
                <Link
                  key={label}
                  href={href}
                  className={`relative px-2 py-1 text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-[var(--ink)]"
                      : "text-[var(--on-surface-variant)] hover:text-[var(--ink)]"
                  }`}
                >
                  <span>{label}</span>
                  {/* Subtle active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--teal)] shadow-[0_0_8px_var(--teal)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="h-4 w-px bg-[var(--outline-variant)]/60 hidden sm:block shrink-0" />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};