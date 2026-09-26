"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { viewportOnce } from "@/lib/motion";

const timelineData = [
  {
    date: "2026 — PRESENT",
    title: "Software Development Engineer",
    role: "Analyst",
    company: "KPMG India Advisory Services",
    description: [
      "Architecting enterprise-grade digital solutions utilizing modern full-stack architectures to drive digital transformation for global clients.",
      "Designing resilient, distributed system architectures focused on high availability, security, and seamless scalability.",
      "Optimizing full-stack performance through backend refactoring, caching strategies, and frontend rendering efficiency.",
      "Delivering production-ready systems aligned with rigorous enterprise compliance and reliability benchmarks.",
    ],
    location: "Gurgaon, Haryana, India",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQXUZtP38YGUs-QFwavW8X8myS0voS8vtVEQ&s",
  },
  {
    date: "2025",
    title: "Full Stack Developer & Project Lead",
    role: "Project Lead",
    company: "One Aim IT Solutions",
    description: [
      "Engineered AI-integrated platforms, leveraging automated workflows to enhance operational efficiency and user engagement.",
      "Implemented modular microservices architectures to ensure clean separation of concerns and maintainability.",
      "Streamlined deployment lifecycles by containerizing complex environments using Docker, reducing environment overhead.",
    ],
    location: "Remote / India",
    image: "/oneaim.jpeg",
  },
  {
    date: "2024",
    title: "Bachelor of Technology — Information Technology",
    role: "Graduate",
    company: "Jabalpur Engineering College",
    description: [
      "Graduated with core focus on computer science, algorithms, database systems, and distributed computing.",
      "Collaborated on full-stack integrations connecting React frontends with robust Node.js/Express API services.",
      "Executed performance tuning, database indexing, and query optimizations for multi-user client prototypes.",
    ],
    location: "Jabalpur, Madhya Pradesh, India",
    image: "/jec.jpeg",
  },
];

export default function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full text-[var(--on-surface)]">
      {/* Background Static Track Line */}
      <div
        className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-[var(--outline-variant)]/40 md:-translate-x-1/2"
        aria-hidden="true"
      />

      {/* Dynamic Animated Scroll Progress Line */}
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[var(--teal)] via-[var(--teal)] to-[var(--teal-strong)] md:-translate-x-1/2 origin-top shadow-[0_0_8px_rgba(18,135,132,0.4)]"
        aria-hidden="true"
      />

      <div className="space-y-14 md:space-y-20">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className="relative flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-start md:items-center gap-6 md:gap-10 pl-12 md:pl-0"
            >
              {/* Desktop Left Side */}
              <div className="hidden md:flex w-full justify-end">
                {isLeft ? (
                  <TimelineCard item={item} />
                ) : (
                  <TimelineImage item={item} />
                )}
              </div>

              {/* Center Timeline Node + Date Badge */}
              <div className="absolute left-0 md:relative md:left-auto flex flex-col items-center justify-center z-10 -translate-x-[7px] md:translate-x-0 gap-2">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.4 }}
                  className="relative flex items-center justify-center w-4 h-4 rounded-full bg-[var(--teal)] ring-4 ring-[var(--surface)] shadow-[0_0_12px_rgba(18,135,132,0.4)] shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white dark:bg-[#0d151d]" />
                </motion.div>
                <span className="hidden md:inline-block text-[10px] font-mono font-bold tracking-wider text-[var(--teal)] bg-[var(--surface-container-high)] border border-[var(--outline-variant)] px-2.5 py-0.5 rounded-full shadow-2xs whitespace-nowrap">
                  {item.date}
                </span>
              </div>

              {/* Mobile and Desktop Right Side */}
              <div className="w-full flex justify-start">
                <div className="md:hidden w-full mb-2">
                  <span className="inline-block text-xs font-mono font-bold text-[var(--teal)] bg-[var(--surface-container-high)] border border-[var(--outline-variant)] px-3 py-1 rounded-full mb-3">
                    {item.date}
                  </span>
                  <TimelineCard item={item} />
                </div>

                <div className="hidden md:block w-full">
                  {!isLeft ? (
                    <TimelineCard item={item} />
                  ) : (
                    <TimelineImage item={item} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= TIMELINE CARD ================= */

function TimelineCard({ item }: { item: (typeof timelineData)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] p-6 md:p-7 shadow-xs hover:border-[var(--teal)]/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-all"
    >
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="display-font text-xl md:text-2xl font-semibold text-[var(--ink)] leading-snug">
          {item.title}
        </h3>
        <p className="text-[var(--teal-strong)] dark:text-[var(--teal)] text-sm font-semibold tracking-wide">
          {item.company}
        </p>
        <p className="text-[var(--on-surface-variant)] text-xs font-mono pt-0.5">
          📍 {item.location}
        </p>
      </div>

      <ul className="text-sm text-[var(--on-surface-variant)] space-y-2">
        {item.description.map((d: string, i: number) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="text-[var(--teal)] font-bold mt-0.5 shrink-0">—</span>
            <span className="leading-relaxed">{d}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ================= TIMELINE IMAGE ================= */

function TimelineImage({ item }: { item: (typeof timelineData)[0] }) {
  if (!item.image) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-[var(--surface-container-low)] shadow-xs group"
    >
      <div className="relative h-44 sm:h-48 overflow-hidden bg-[var(--surface-container)]">
        <img
          src={item.image}
          alt={item.company}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-4 py-2.5 bg-[var(--surface-container-lowest)] border-t border-[var(--glass-border)] flex items-center justify-between">
        <p className="text-xs text-[var(--on-surface-variant)] font-mono truncate font-medium">
          {item.company}
        </p>
        <span className="text-[10px] font-mono text-[var(--teal)] uppercase font-semibold">
          Verified
        </span>
      </div>
    </motion.div>
  );
}