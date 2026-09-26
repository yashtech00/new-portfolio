"use client";

import React from "react";
import { Mail, Github, Linkedin, Twitter, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Journey", href: "#timeline" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: <Github size={15} />, href: "https://github.com/yashtech00", label: "GitHub" },
    { icon: <Linkedin size={15} />, href: "https://linkedin.com/in/yash00tech", label: "LinkedIn" },
    { icon: <Twitter size={15} />, href: "https://x.com/yashgtech00", label: "Twitter" },
    { icon: <Mail size={15} />, href: "mailto:yashgtech00@gmail.com", label: "Email" },
  ];

  return (
    <footer className="relative w-full bg-[var(--surface-container-low)] border-t border-[var(--glass-border)] py-10 transition-colors duration-300">
      <div className="container-page flex flex-col gap-8">
        
        {/* Top Row: Identity & Quick Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--teal)]" />
              <span className="text-sm font-semibold tracking-wide text-[var(--ink)]">
                YASH GUPTA
              </span>
            </div>
            <p className="text-xs text-[var(--on-surface-variant)] font-mono">
              Full-Stack Developer &amp; Analyst · Gurgaon, India
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-[var(--on-surface-variant)] hover:text-[var(--teal)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Row: Minimalist Technical Details & Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[var(--glass-border)]">
          <div className="flex items-center gap-3">
            {socialLinks.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="w-8 h-8 rounded-full border border-[var(--glass-border)] bg-[var(--surface-container)] flex items-center justify-center text-[var(--on-surface-variant)] hover:text-[var(--teal)] hover:border-[var(--teal)] transition-all hover:-translate-y-0.5"
              >
                {item.icon}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[var(--on-surface-variant)]">
            <span>© {new Date().getFullYear()} Yash Gupta</span>
            <span className="text-[var(--teal)]">·</span>
            <span>Built with precision</span>
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-1 rounded hover:text-[var(--teal)] transition-colors cursor-pointer"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
