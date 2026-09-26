"use client";

import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/yash00tech", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/yashtech00", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/yashgtech00", label: "Twitter" },
];

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 0.96]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.85]);

  return (
    <motion.section
      style={{ scale, opacity }}
      className="relative min-h-[calc(100dvh-68px)] flex items-center overflow-hidden py-12 lg:py-0 bg-transparent text-[var(--on-surface)]"
    >
      {/* Subtle Teal Ambient Glow (Editorial & Soft) */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(18,135,132,0.08)_0%,transparent_70%)] -top-40 -left-20" />
        <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,0,0,0.05)_0%,transparent_70%)] bottom-0 right-0" />
      </div>

      {/* Main Grid */}
      <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
        
        {/* Left Column (Editorial Typography & CTAs) */}
        <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="label-eyebrow tracking-widest text-xs font-bold text-[var(--teal)]">
              Full-Stack Developer &amp; Analyst
            </span>
            <span className="h-px w-8 bg-[var(--outline-variant)]" />
            <span className="text-xs text-[var(--on-surface-variant)] font-mono">
              KPMG INDIA
            </span>
          </motion.div>

          {/* Headline (Editorial display font) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="display-font text-5xl sm:text-6xl md:text-7xl xl:text-[82px] font-medium leading-[1.04] tracking-tight text-[var(--ink)]"
          >
            Building thoughtful{" "}
            <span className="italic font-normal text-[var(--teal)]">digital experiences</span>{" "}
            &amp; scalable systems.
          </motion.h1>

          {/* Short Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[var(--on-surface-variant)] text-lg md:text-xl leading-relaxed max-w-xl"
          >
            I architect and build robust, high-performance web applications using modern
            full-stack technologies — currently an Analyst at{" "}
            <span className="text-[var(--ink)] font-semibold">KPMG India</span>,
            available for select freelance projects and technical consulting worldwide.
          </motion.p>

          {/* CTAs & Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 bg-[var(--teal)] text-white text-sm font-semibold tracking-wide px-7 py-3.5 rounded-full hover:bg-[var(--teal-strong)] transition-all duration-200 shadow-sm"
              >
                View Projects
                <ArrowUpRight size={16} />
              </Link>

              <Link
                href="mailto:yashgtech00@gmail.com"
                className="inline-flex items-center justify-center gap-2 border border-[var(--outline-variant)] text-[var(--ink)] text-sm font-semibold tracking-wide px-7 py-3.5 rounded-full hover:border-[var(--teal)] hover:text-[var(--teal)] transition-all duration-200"
              >
                Contact Me
              </Link>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 sm:ml-4 sm:border-l sm:border-[var(--outline-variant)] sm:pl-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--glass-border)] bg-[var(--surface-container-low)] text-[var(--ink)] hover:text-[var(--teal)] hover:border-[var(--teal)] transition-colors"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column (Editorial Photo & Frame) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
            {/* Subtle background decorative card */}
            <div className="absolute -inset-3 bg-[var(--surface-container-high)] rounded-[2rem] -rotate-2 -z-10 border border-[var(--glass-border)] opacity-60" />
            
            {/* Main Portrait Container */}
            <div className="relative rounded-[1.75rem] overflow-hidden border border-[var(--glass-border)] bg-[var(--surface-container-lowest)] shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
              <div className="relative h-[380px] sm:h-[420px] overflow-hidden bg-gradient-to-b from-[var(--surface-container-low)] to-[var(--surface)]">
                <img
                  src="/yash-nobg.png"
                  alt="Yash Gupta"
                  className="relative z-10 w-full h-[125%] object-cover object-top filter contrast-[1.02]"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                  }}
                />
              </div>

              {/* Status Banner */}
              <div className="glass-panel mx-3 mb-3 p-3 flex items-center gap-3 border border-[var(--glass-border)] bg-[var(--surface-container-lowest)]/85 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--teal)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--teal)]" />
                </span>
                <p className="text-xs text-[var(--on-surface-variant)] font-mono">
                  Currently building{" "}
                  <span className="text-[var(--ink)] font-semibold">Scalable Digital Products</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};
