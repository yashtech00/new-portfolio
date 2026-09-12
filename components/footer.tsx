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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { icon: <Github size={18} />, href: "https://github.com/yashtech00" },
    { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/yash00tech" },
    { icon: <Twitter size={18} />, href: "https://x.com/yashgtech00" },
  ];

  return (
    <footer className="bg-[#0B0B0C] relative overflow-hidden mx-4 md:mx-6 rounded-2xl border border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-10 pb-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold text-white mb-3">Yash Gupta</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Full-Stack Developer focused on building scalable, high-performance
              applications and solving real-world business problems with clean architecture.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Navigation</h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="text-neutral-400 hover:text-white transition text-sm text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contact</h4>
            <div className="flex flex-col gap-2.5 text-neutral-400 text-sm">
              <a
                href="mailto:yashgtech00@gmail.com"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail size={15} />
                <span>yashgtech00@gmail.com</span>
              </a>
              <div className="flex items-center gap-2">
                <Phone size={15} />
                <span>+91 7879758136</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} />
                <span>Gurgaon, Haryana, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block h-24 -mx-6 md:-mx-8 mb-2 pointer-events-none">
          <TextHoverEffect text="YASH" />
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex gap-5 text-neutral-400">
            {socialLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                {item.icon}
              </a>
            ))}
          </div>

          <p className="text-neutral-500 text-xs md:text-sm">
            © {new Date().getFullYear()} Yash Gupta. Built with precision.
          </p>
        </div>
      </div>

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 0%, #0F0F11 60%, #3ca2fa15 100%)",
        }}
      />
    </footer>
  );
}

export default Footer;
