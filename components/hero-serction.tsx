"use client";

import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/yash00tech", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/yashtech00", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/yashgtech00", label: "Twitter" },
];

const technicalTags = [
  "FULL_STACK_ENGINEERING",
  "AI_SYSTEMS",
  "SCALABLE_WEB",
  "DISTRIBUTED_ARCHITECTURE",
];

export const HeroSection = () => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 0.97]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0.85]);

  return (
    <motion.section
      style={{ scale, opacity }}
      className="relative min-h-[calc(100dvh-68px)] flex items-center overflow-hidden py-10 lg:py-0 bg-transparent text-[var(--on-surface)]"
    >
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(18,135,132,0.08)_0%,transparent_70%)] -top-40 -left-20" />
        <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(11,28,44,0.04)_0%,transparent_70%)] bottom-0 right-0" />
      </div>

      <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
        
        {/* Left Column: Editorial Typography & Staggered Hierarchy */}
        <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-7 order-2 lg:order-1">
          
          {/* 1. Technical Eyebrow (0.0s) */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-[var(--teal)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] animate-pulse" />
              Full-Stack Developer &amp; Analyst
            </span>
            <span className="h-px w-6 bg-[var(--outline-variant)]" />
            <span className="text-[11px] text-[var(--on-surface-variant)] font-mono tracking-wider">
              KPMG INDIA
            </span>
          </motion.div>

          {/* 2. Large Editorial Headline (0.08s) */}
          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="display-font text-5xl sm:text-6xl md:text-7xl xl:text-[80px] font-medium leading-[1.03] tracking-tight text-[var(--ink)]"
          >
            Building thoughtful{" "}
            <span className="italic font-normal text-[var(--teal)]">digital experiences</span>{" "}
            &amp; scalable systems.
          </motion.h1>

          {/* 3. Supporting Statement (0.18s) */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-[var(--on-surface-variant)] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl"
          >
            I architect and engineer high-performance web applications using modern full-stack
            technologies currently an Analyst at{" "}
            <span className="text-[var(--ink)] font-semibold">KPMG India</span>, available for
            select engineering collaborations and architectural consulting.
          </motion.p>

          {/* 4. CTAs & Social Links (0.28s) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 bg-[var(--teal)] text-white text-sm font-semibold tracking-wide px-7 py-3.5 rounded-full hover:bg-[var(--teal-strong)] transition-all duration-200 shadow-sm"
              >
                <span>View Projects</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 border border-[var(--outline-variant)] text-[var(--ink)] text-sm font-semibold tracking-wide px-7 py-3.5 rounded-full hover:border-[var(--teal)] hover:text-[var(--teal)] transition-all duration-200 bg-[var(--surface-container-lowest)]/50"
              >
                Contact Me
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:ml-4 sm:border-l sm:border-[var(--outline-variant)] sm:pl-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--glass-border)] bg-[var(--surface-container-low)] text-[var(--ink)] hover:text-[var(--teal)] hover:border-[var(--teal)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon size={15} />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* 5. Technical Metadata Row (0.38s) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-2 text-[11px] font-mono text-[var(--on-surface-variant)]/80"
          >
            {technicalTags.map((tag, idx) => (
              <span key={tag} className="flex items-center gap-2">
                <span>{tag}</span>
                {idx < technicalTags.length - 1 && (
                  <span className="text-[var(--teal)] font-bold">·</span>
                )}
              </span>
            ))}
          </motion.div>

        </div>

        {/* Right Column: Editorial Photo & Blueprint Frame (0.25s) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.22, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2"
        >
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
            {/* Corner Blueprint Crosshairs on Frame */}
            <div className="absolute -top-2 -left-2 text-[var(--teal)] pointer-events-none select-none text-xs font-mono">
              +
            </div>
            <div className="absolute -top-2 -right-2 text-[var(--teal)] pointer-events-none select-none text-xs font-mono">
              +
            </div>
            <div className="absolute -bottom-2 -left-2 text-[var(--teal)] pointer-events-none select-none text-xs font-mono">
              +
            </div>
            <div className="absolute -bottom-2 -right-2 text-[var(--teal)] pointer-events-none select-none text-xs font-mono">
              +
            </div>

            {/* Subtle background decorative tilt card */}
            <div className="absolute -inset-3 bg-[var(--surface-container-high)] rounded-[2rem] -rotate-2 -z-10 border border-[var(--glass-border)] opacity-60" />
            
            {/* Main Portrait Container */}
            <div className="relative rounded-[1.75rem] overflow-hidden border border-[var(--glass-border)] bg-[var(--surface-container-lowest)] shadow-[0_16px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
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
