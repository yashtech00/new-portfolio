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
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

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
    { icon: <Github size={20} />, href: "https://github.com/yashtech00" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/yash00tech" },
    { icon: <Twitter size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-[#0B0B0C] relative rounded-3xl overflow-hidden m-6 border border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
        
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          
          {/* LEFT - Branding */}
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">
              Yash Gupta
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Full-Stack Developer focused on building scalable, high-performance
              applications and solving real-world business problems with clean architecture.
            </p>
          </div>

          {/* RIGHT - Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="text-neutral-400 hover:text-white transition text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Contact
            </h4>

            <div className="flex flex-col gap-3 text-neutral-400 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>yashgupta.dev@gmail.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-8" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* SOCIAL */}
          <div className="flex gap-6 text-neutral-400">
            {socialLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                className="hover:text-white transition"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* COPYRIGHT */}
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Yash Gupta. Built with precision.
          </p>
        </div>
      </div>

      {/* BIG HOVER TEXT */}
      <div className="hidden lg:flex h-[20rem] -mt-32 -mb-24">
        <TextHoverEffect text="YASH" className="z-10" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default Footer;