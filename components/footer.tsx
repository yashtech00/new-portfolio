"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { TextHoverEffect } from "@/components/ui/hover-footer";

function Footer() {
  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Journey", id: "timeline" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const handleScroll = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: <Github size={18} />, href: "https://github.com/yashtech00", label: "GitHub" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/yash00tech", label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: "https://x.com/yashgtech00", label: "Twitter" },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden bg-[var(--surface-container-low)] border-t border-[var(--glass-border)] pt-14 pb-8"
      style={{ backgroundColor: "#f6f3ed" }}
    >
      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-10">
          
          <div className="lg:col-span-6 max-w-sm">
            <h2 className="display-font text-2xl md:text-3xl font-bold text-[var(--ink)] mb-3">
              Yash Gupta
            </h2>
            <p className="text-[var(--on-surface-variant)] text-sm md:text-base leading-relaxed">
              Full-Stack Developer &amp; Analyst focused on engineering scalable, high-performance
              applications and solving real-world business problems with clean architecture.
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--teal-strong)] mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="text-[var(--on-surface-variant)] hover:text-[var(--teal-strong)] transition-colors text-sm text-left font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--teal-strong)] mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3 text-[var(--on-surface-variant)] text-sm">
              <a
                href="mailto:yashgtech00@gmail.com"
                className="flex items-center gap-2.5 hover:text-[var(--teal-strong)] transition-colors"
              >
                <Mail size={15} className="text-[var(--teal)]" />
                <span>yashgtech00@gmail.com</span>
              </a>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[var(--teal)]" />
                <span>+91 7879758136</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin size={15} className="text-[var(--teal)]" />
                <span>Gurgaon, Haryana, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block h-24 w-full mb-4 pointer-events-none opacity-80">
          <TextHoverEffect text="YASH" />
        </div>

        <div className="border-t border-[var(--glass-border)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 text-[var(--on-surface-variant)]">
            {socialLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="w-9 h-9 rounded-full border border-[var(--glass-border)] bg-[var(--surface-container)] flex items-center justify-center hover:text-[var(--teal)] hover:border-[var(--teal)] transition-colors"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <p className="text-[var(--on-surface-variant)] text-xs font-mono">
            © {new Date().getFullYear()} Yash Gupta. Built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
