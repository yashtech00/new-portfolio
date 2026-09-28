"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, Bot, Cloud } from "lucide-react";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const stackCategories = [
  {
    number: "01",
    name: "FRONTEND",
    icon: Code2,
    description: "Modern component architecture, client-side state, and type-safe interfaces.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Query",
      "Framer Motion",
    ],
  },
  {
    number: "02",
    name: "BACKEND & SYSTEMS",
    icon: Server,
    description: "Server runtimes, RESTful architecture, session security, and realtime streams.",
    skills: [
      "Node.js",
      "Express.js",
      "Hono",
      "REST APIs",
      "JWT & Auth",
      "WebSockets",
      "Microservices",
    ],
  },
  {
    number: "03",
    name: "DATABASES & CACHING",
    icon: Database,
    description: "Relational modeling, document stores, ORM schemas, and low-latency cache layers.",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Mongoose",
      "Redis",
      "Indexing & Tuning",
    ],
  },
  {
    number: "04",
    name: "AI & WORKFLOWS",
    icon: Bot,
    description: "Large language models, semantic retrieval, prompt pipelines, and agentic workflows.",
    skills: [
      "Gemini API",
      "LangChain",
      "Hugging Face",
      "Vector Embeddings",
      "Prompt Systems",
      "Evaluation Pipelines",
    ],
  },
  {
    number: "05",
    name: "CLOUD & INFRASTRUCTURE",
    icon: Cloud,
    description: "Containerization, global edge distribution, asset storage, and deployment pipelines.",
    skills: [
      "Docker",
      "Docker Compose",
      "Vercel",
      "Render",
      "Cloudflare",
      "Cloudflare R2",
      "CI / CD",
    ],
  },
];

export const TechStack = () => {
  return (
    <div className="w-full">
      <motion.div
        variants={staggerContainer(0.08, 0.04)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {stackCategories.map((cat, idx) => {
          const Icon = cat.icon;
          const isSpan = idx === 3; // or let it flow naturally in 3 cols
          return (
            <motion.div
              key={cat.name}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] hover:border-[var(--teal)]/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] transition-all group ${
                isSpan ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Corner Crosshairs */}
              <div className="absolute top-2.5 left-2.5 text-[var(--teal)]/30 group-hover:text-[var(--teal)] text-[10px] font-mono pointer-events-none select-none transition-colors">
                +
              </div>
              <div className="absolute top-2.5 right-2.5 text-[var(--teal)]/30 group-hover:text-[var(--teal)] text-[10px] font-mono pointer-events-none select-none transition-colors">
                +
              </div>
              <div className="absolute bottom-2.5 left-2.5 text-[var(--teal)]/30 group-hover:text-[var(--teal)] text-[10px] font-mono pointer-events-none select-none transition-colors">
                +
              </div>
              <div className="absolute bottom-2.5 right-2.5 text-[var(--teal)]/30 group-hover:text-[var(--teal)] text-[10px] font-mono pointer-events-none select-none transition-colors">
                +
              </div>

              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[var(--teal)] tracking-wider">
                    ({cat.number})
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[var(--surface-container-high)]/70 flex items-center justify-center text-[var(--teal)] group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[var(--ink)] tracking-tight font-mono mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-[var(--on-surface-variant)] leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--glass-border)]">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-mono font-medium rounded-md border border-[var(--outline-variant)] bg-[var(--surface-container-high)]/50 text-[var(--ink)] group-hover:border-[var(--teal)]/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
