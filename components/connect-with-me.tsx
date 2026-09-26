"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, ArrowUpRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { viewportOnce } from "@/lib/motion";

const socialLinks = [
  { icon: Github, href: "https://github.com/yashtech00", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/yash00tech", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/yashgtech00", label: "Twitter" },
];

export const ConnectWithMe = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("yashgtech00@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl bg-[#0b1c2c] dark:bg-[var(--surface-container-lowest)] text-[#fcf9f3] dark:text-[var(--on-surface)] overflow-hidden p-8 sm:p-12 lg:p-16 border border-[#0b1c2c] dark:border-[var(--glass-border)] shadow-[0_24px_50px_rgba(0,0,0,0.12)]"
    >
      {/* Corner Blueprint Crosshairs */}
      <div className="absolute top-4 left-4 text-[var(--teal)]/40 pointer-events-none select-none text-xs font-mono">
        +
      </div>
      <div className="absolute top-4 right-4 text-[var(--teal)]/40 pointer-events-none select-none text-xs font-mono">
        +
      </div>
      <div className="absolute bottom-4 left-4 text-[var(--teal)]/40 pointer-events-none select-none text-xs font-mono">
        +
      </div>
      <div className="absolute bottom-4 right-4 text-[var(--teal)]/40 pointer-events-none select-none text-xs font-mono">
        +
      </div>

      {/* Subtle Ambient Radial Highlights */}
      <div
        className="absolute top-0 right-0 w-[450px] h-[450px] bg-[radial-gradient(circle,rgba(18,135,132,0.18)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(140,244,238,0.06)_0%,transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Editorial Heading & Pitch */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--teal)]">
              AVAILABLE FOR COLLABORATION
            </span>
          </div>

          <h3 className="display-font text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#fcf9f3] dark:text-[var(--ink)] leading-[1.08]">
            Let&apos;s build something <span className="italic font-normal text-[var(--teal)]">useful</span>.
          </h3>

          <p className="text-[#a5b2bb] dark:text-[var(--on-surface-variant)] text-base sm:text-lg leading-relaxed max-w-xl">
            Whether you&apos;re building a new digital product, scaling existing infrastructure, or
            need architectural consulting — I&apos;m always open to exploring high-impact projects.
          </p>

          <div className="pt-2">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--teal)] hover:underline cursor-pointer bg-white/5 dark:bg-[var(--surface-container-high)] border border-white/10 dark:border-[var(--outline-variant)] px-3 py-1.5 rounded-lg transition-colors"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? "Email copied to clipboard!" : "yashgtech00@gmail.com"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: High-Impact CTAs & Socials */}
        <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-6">
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href="mailto:yashgtech00@gmail.com"
            className="group inline-flex items-center gap-3 bg-[var(--teal)] hover:bg-[var(--teal-strong)] text-white text-base font-semibold px-8 py-4 rounded-full transition-all shadow-md"
          >
            <Mail size={18} />
            <span>Initiate Conversation</span>
            <ArrowUpRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full border border-white/15 dark:border-[var(--glass-border)] bg-white/5 dark:bg-[var(--surface-container-low)] text-[#fcf9f3] dark:text-[var(--ink)] hover:text-[var(--teal)] hover:border-[var(--teal)] transition-all flex items-center justify-center hover:-translate-y-0.5"
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
