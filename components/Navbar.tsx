'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Works', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--glass-border)] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-page flex justify-between items-center py-4">
        {/* Left: Role tagline / Name */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-semibold tracking-tight text-[var(--ink)] shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--teal)] transition-transform group-hover:scale-125" />
          <span className="tracking-wide">YASH GUPTA</span>
          <span className="hidden sm:inline text-xs font-normal text-[var(--on-surface-variant)]">
            / Full Stack &amp; Analyst
          </span>
        </Link>

        {/* Right: Nav links & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <nav className="flex items-center gap-2.5 sm:gap-5 md:gap-7 overflow-x-auto py-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs sm:text-sm font-medium tracking-wide text-[var(--on-surface-variant)] hover:text-[var(--teal)] transition-colors duration-200 whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="h-4 w-px bg-[var(--outline-variant)]/60 hidden sm:block shrink-0" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};