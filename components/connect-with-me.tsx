"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: Github, href: "https://github.com/yashtech00", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yash00tech", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/yashgtech00", label: "Twitter" },
];

export const ConnectWithMe = () => {
  return (
    <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] bg-[var(--ink)] text-[var(--surface)] overflow-hidden p-8 sm:p-12 lg:p-16 border border-[var(--ink)] shadow-[0_24px_50px_rgba(11,28,44,0.12)]"
          style={{ backgroundColor: "#0b1c2c", color: "#fcf9f3" }}
        >
          {/* Subtle Ambient Radial Highlights */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(14,143,139,0.18)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(140,244,238,0.08)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Pitch */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--secondary-container)]">
                LET&apos;S WORK TOGETHER
              </span>

              <h3 className="display-font text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--surface)] leading-tight">
                Have a project, product, or idea worth building?
              </h3>

              <p className="text-[var(--surface-dim)] text-base sm:text-lg leading-relaxed max-w-xl">
                I help startups and enterprises build scalable web applications, modern architectures,
                and seamless digital products with clean, maintainable engineering.
              </p>
            </div>

            {/* Right Column: CTA & Socials */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-6">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="mailto:yashgtech00@gmail.com"
                className="inline-flex items-center gap-3 bg-[var(--teal)] hover:bg-[var(--teal-strong)] text-white text-base font-semibold px-8 py-4 rounded-full transition-all shadow-md group"
              >
                <Mail size={18} />
                Get in touch
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>

              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }, i) => (
                  <Link
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-11 h-11 rounded-full border border-white/20 bg-white/5 text-[var(--surface)] hover:text-[var(--secondary-container)] hover:border-[var(--secondary-container)] transition-all flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
  );
};
