"use client";

import { Layers, Layout, Cpu } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Full-Stack Development",
    icon: Layers,
    description:
      "From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.",
    competencies: [
      { id: "01", name: "React, Node.js, Express.js" },
      { id: "02", name: "REST APIs, Firebase, Docker" },
      { id: "03", name: "Git, GitHub, Postman" },
    ],
  },
  {
    id: "02",
    title: "UI/UX & Frontend",
    icon: Layout,
    description:
      "Good design feels effortless. I design and develop responsive, intuitive interfaces that work smoothly across devices, with a strong focus on clarity, accessibility, and performance.",
    competencies: [
      { id: "01", name: "NextJs, TailwindCSS, GSAP" },
      { id: "02", name: "Figma → Pixel-perfect code" },
      { id: "03", name: "HTML, CSS, JavaScript" },
    ],
  },
  {
    id: "03",
    title: "Optimization",
    icon: Cpu,
    description:
      "I focus on building systems that stay reliable as things scale. From handling data efficiently to designing clean architecture, I apply core computer science principles.",
    competencies: [
      { id: "01", name: "Data Structures & Algorithms" },
      { id: "02", name: "DBMS, OOP, OS Fundamentals" },
      { id: "03", name: "Scalable systems & data pipelines" },
    ],
  },
];

export const WhatIDo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <div
            key={service.id}
            className="relative flex flex-col justify-between p-6 sm:p-8 bg-[var(--surface-container-lowest)] border border-dashed border-[var(--teal)]/35 transition-all duration-300 hover:border-[var(--teal)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] group"
          >
            {/* Corner Crosshairs */}
            <div className="absolute -top-[5.5px] -left-[5.5px] text-[var(--teal)] pointer-events-none">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M5.5 0V11M0 5.5H11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
            <div className="absolute -top-[5.5px] -right-[5.5px] text-[var(--teal)] pointer-events-none">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M5.5 0V11M0 5.5H11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
            <div className="absolute -bottom-[5.5px] -left-[5.5px] text-[var(--teal)] pointer-events-none">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M5.5 0V11M0 5.5H11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
            <div className="absolute -bottom-[5.5px] -right-[5.5px] text-[var(--teal)] pointer-events-none">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M5.5 0V11M0 5.5H11"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </div>

            {/* Top Content */}
            <div>
              {/* Header: Number and Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[var(--teal)] font-mono font-bold text-base tracking-tight">
                  ({service.id})
                </span>
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-container-high)]/70 dark:bg-[var(--surface-container-high)]/50 flex items-center justify-center text-[var(--teal)] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-8 text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[var(--on-surface-variant)]">
                {service.description}
              </p>
            </div>

            {/* Bottom Content: Key Competencies */}
            <div className="mt-8 pt-6 border-t border-dashed border-[var(--teal)]/20">
              <span className="text-[11px] font-mono font-medium tracking-widest uppercase text-[var(--on-surface-variant)]/80 block mb-4">
                KEY COMPETENCIES
              </span>
              <div className="space-y-3">
                {service.competencies.map((comp) => (
                  <div key={comp.id} className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-[var(--teal)] shrink-0 pt-0.5">
                      {comp.id}
                    </span>
                    <span className="text-sm font-medium text-[var(--ink)] leading-snug">
                      {comp.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
