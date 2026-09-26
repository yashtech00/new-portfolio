"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { StaggerTestimonials } from "./ui/stagger-testimonials";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import { fadeUp, viewportOnce, staggerContainer } from "@/lib/motion";

const aboutTechnicalTags = [
  "FULL_STACK_ARCHITECTURE",
  "AI_SYSTEMS",
  "SYSTEM_DESIGN",
  "PERFORMANCE_OPTIMIZATION",
  "MICROSERVICES",
];

export default function AboutSection() {
  const [stats, setStats] = useState<any>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col text-[var(--on-surface)]">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 pb-14">
        
        {/* LEFT CONTENT: Personal Narrative & Editorial Statement */}
        <div className="flex flex-col text-left max-w-2xl">
          {/* Technical Metadata Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            {aboutTechnicalTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-[var(--teal)] bg-[var(--surface-container-high)] border border-[var(--outline-variant)] rounded-full uppercase"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Large Editorial Statement */}
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="display-font text-2xl sm:text-3xl lg:text-[32px] font-medium leading-snug tracking-tight text-[var(--ink)] mb-6"
          >
            Engineering scalable software with a deep curiosity for how distributed systems operate at scale.
          </motion.h3>

          {/* Short Personal Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--on-surface-variant)] text-base sm:text-lg leading-relaxed mb-6 space-y-4"
          >
            <p>
              I hold a B.Tech in Information Technology and work as an SDE Analyst at{" "}
              <span className="text-[var(--ink)] font-semibold">KPMG India</span>. My journey spans
              building full-stack production platforms, architecting containerized systems with Docker,
              and developing AI-integrated tools that eliminate operational bottlenecks.
            </p>
            <p>
              I believe great engineering is not about complexity for its own sake — it&apos;s about
              translating ambiguous business requirements into resilient, testable, and maintainable
              systems that perform reliably under real-world loads.
            </p>
          </motion.div>

          {/* Core Strengths Blueprint Box */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 p-6 rounded-2xl bg-[var(--surface-container-lowest)] border border-dashed border-[var(--teal)]/35 shadow-xs"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-[var(--teal)]">
                ENGINEERING COMPETENCIES
              </h4>
              <span className="text-[11px] font-mono text-[var(--on-surface-variant)]">
                PRODUCTION FOCUS
              </span>
            </div>

            <ul className="text-[var(--on-surface-variant)] space-y-2.5 text-sm sm:text-[15px]">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0" />
                <span className="text-[var(--ink)] font-medium">Full-Stack Architecture:</span>
                <span>TypeScript, Next.js, Node.js, Express, React</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0" />
                <span className="text-[var(--ink)] font-medium">System Design &amp; Scalability:</span>
                <span>REST APIs, Docker, microservices, caching</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0" />
                <span className="text-[var(--ink)] font-medium">AI &amp; Automation:</span>
                <span>LLM workflows, retrieval-augmented systems, automated pipelines</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] shrink-0" />
                <span className="text-[var(--ink)] font-medium">Databases &amp; Storage:</span>
                <span>PostgreSQL, MongoDB, Redis, Cloudflare R2 / AWS S3</span>
              </li>
            </ul>
          </motion.div>

          {/* Social CTA */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-4"
          >
            <Link
              href="https://www.linkedin.com/in/yash00tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-[var(--teal)] text-white font-medium px-6 py-3 rounded-full hover:bg-[var(--teal-strong)] transition-all shadow-sm hover:-translate-y-0.5 text-sm"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </div>

        {/* RIGHT SIDE (Visual Photographic Carousel) */}
        <div className="flex w-full lg:w-[45%] justify-center items-center">
          <StaggerTestimonials />
        </div>
      </div>

      {/* STATS & GITHUB CALENDAR */}
      <div className="flex flex-col items-center pb-12">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full"
        >
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] hover:border-[var(--teal)]/40 rounded-2xl p-6 transition-all shadow-xs"
          >
            <p className="display-font text-4xl sm:text-5xl font-bold text-[var(--ink)]">
              {stats ? `${stats.repos}+` : "25+"}
            </p>
            <p className="text-[var(--on-surface-variant)] text-xs font-mono uppercase tracking-widest mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
              Public Repositories
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] hover:border-[var(--teal)]/40 rounded-2xl p-6 transition-all shadow-xs"
          >
            <p className="display-font text-4xl sm:text-5xl font-bold text-[var(--ink)]">
              {stats ? `${stats.followers}+` : "50+"}
            </p>
            <p className="text-[var(--on-surface-variant)] text-xs font-mono uppercase tracking-widest mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
              Developer Network
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] hover:border-[var(--teal)]/40 rounded-2xl p-6 transition-all shadow-xs"
          >
            <p className="display-font text-4xl sm:text-5xl font-bold text-[var(--ink)]">3+</p>
            <p className="text-[var(--on-surface-variant)] text-xs font-mono uppercase tracking-widest mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
              Years Engineering
            </p>
          </motion.div>
        </motion.div>

        {/* GitHub Contribution Calendar Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] rounded-2xl p-6 md:p-8 w-full shadow-xs overflow-x-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-[var(--ink)] font-mono tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--teal)]" />
              GITHUB CONTRIBUTION STREAM
            </h3>
            <span className="text-xs font-mono text-[var(--on-surface-variant)]">
              @yashtech00
            </span>
          </div>

          <div className="flex justify-center overflow-x-auto py-2">
            <GitHubCalendar
              username="yashtech00"
              blockSize={13}
              blockMargin={4}
              fontSize={12}
              colorScheme={mounted && resolvedTheme === "dark" ? "dark" : "light"}
              theme={{
                light: ["#ebe8e2", "#8cf4ee", "#20b2aa", "#0e8f8b", "#006a67"],
                dark: ["#1c2833", "#0e6b66", "#14958f", "#26c4ba", "#5eead4"],
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}