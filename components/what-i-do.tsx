"use client";

import { motion } from "framer-motion";
import { Layers, Server, Cpu, Cloud, GitBranch } from "lucide-react";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const engineeringDisciplines = [
  {
    id: "01",
    title: "Full-Stack Development",
    icon: Layers,
    description:
      "Architecting and shipping responsive, high-performance web applications with clean component boundaries, resilient state management, and end-to-end type safety.",
    competencies: [
      { id: "01", name: "React, Next.js, TypeScript, JavaScript" },
      { id: "02", name: "REST APIs, Authentication, State Management" },
      { id: "03", name: "Production Web Apps & Clean Architecture" },
    ],
  },
  {
    id: "02",
    title: "Backend & Systems",
    icon: Server,
    description:
      "Designing scalable server-side architectures, clean RESTful APIs, asynchronous message queues, and high-performance relational and NoSQL database schemas.",
    competencies: [
      { id: "01", name: "Node.js, Express, Hono, REST APIs" },
      { id: "02", name: "PostgreSQL, MongoDB, Prisma, Redis" },
      { id: "03", name: "API Architecture, Caching & Data Modeling" },
    ],
  },
  {
    id: "03",
    title: "AI Engineering",
    icon: Cpu,
    description:
      "Integrating large language models, retrieval pipelines, and automated multi-step AI workflows into reliable, user-facing product features.",
    competencies: [
      { id: "01", name: "LLM APIs, Gemini, LangChain, Embeddings" },
      { id: "02", name: "Prompt Systems & Evaluation Pipelines" },
      { id: "03", name: "AI Workflows & Product Automation" },
    ],
  },
  {
    id: "04",
    title: "Cloud & Infrastructure",
    icon: Cloud,
    description:
      "Containerizing services, orchestrating automated CI/CD deployment pipelines, and managing object storage and serverless edge functions.",
    competencies: [
      { id: "01", name: "Docker, Docker Compose, Microservices" },
      { id: "02", name: "Cloudflare, Cloudflare R2, Vercel, Render" },
      { id: "03", name: "CI/CD Pipelines & Production Deployment" },
    ],
  },
  {
    id: "05",
    title: "Product Engineering",
    icon: GitBranch,
    description:
      "Turning product requirements into complete, production-grade features across database models, backend logic, frontend interfaces, and deployment.",
    competencies: [
      { id: "01", name: "Schema Design to Full Production Release" },
      { id: "02", name: "Full System Ownership Across Stack Layers" },
      { id: "03", name: "Telemetry, Error Handling & UX Reliability" },
    ],
  },
];

export const WhatIDo = () => {
  return (
    <div className="flex flex-col gap-6">

      {/* Blueprint Cards Grid */}
      <motion.div
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {engineeringDisciplines.map((service) => {
          const Icon = service.icon;  
          return (
            <motion.div
              key={service.id}
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative flex flex-col justify-between p-6 sm:p-8 bg-[var(--surface-container-lowest)] border border-dashed border-[var(--teal)]/35 transition-colors duration-300 hover:border-[var(--teal)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] group cursor-default"
            >
              {/* Corner Crosshairs */}
              <div className="absolute -top-[5.5px] -left-[5.5px] text-[var(--teal)] pointer-events-none select-none">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M5.5 0V11M0 5.5H11"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
              <div className="absolute -top-[5.5px] -right-[5.5px] text-[var(--teal)] pointer-events-none select-none">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M5.5 0V11M0 5.5H11"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-[5.5px] -left-[5.5px] text-[var(--teal)] pointer-events-none select-none">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path
                    d="M5.5 0V11M0 5.5H11"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-[5.5px] -right-[5.5px] text-[var(--teal)] pointer-events-none select-none">
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
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface-container-high)]/70 dark:bg-[var(--surface-container-high)]/50 flex items-center justify-center text-[var(--teal)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
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
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
