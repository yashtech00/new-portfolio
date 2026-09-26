"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { NormalizedProject } from "@/lib/types/project";
import { viewportOnce } from "@/lib/motion";

export function ProjectRow({
  project,
  reverse = false,
}: {
  project: NormalizedProject;
  reverse?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-3xl bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-[var(--teal)]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] shadow-xs"
    >
      <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Project Content Column */}
        <div
          className={`min-w-0 md:col-span-6 lg:col-span-6 flex flex-col justify-center ${
            reverse ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Label / Rank */}
          <div className="flex items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-[var(--teal)] bg-[var(--surface-container-high)] border border-[var(--outline-variant)] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
              {project.featuredOrder === 1 ||
              project.featuredOrder === 2 ||
              project.featuredOrder === 3
                ? `Top Project · #${project.featuredOrder}`
                : "Featured Project"}
            </span>
          </div>

          {/* Title */}
          <h3 className="display-font text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[var(--ink)] mb-3 leading-tight">
            {project.title}
          </h3>

          {/* Short Bio */}
          <p className="text-[var(--on-surface-variant)] text-sm sm:text-base leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Detailed Narrative & Tech Metadata Box */}
          <div className="bg-[var(--surface-container-low)] border border-[var(--glass-border)] rounded-2xl p-5 sm:p-6 mb-6">
            <p className="text-[var(--on-surface-variant)] text-xs sm:text-sm leading-relaxed mb-4">
              {project.longDescription}
            </p>
            
            {/* Tech Metadata Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md border border-[var(--outline-variant)] text-[var(--teal-strong)] dark:text-[var(--teal)] bg-[var(--surface-container-high)]/70 hover:border-[var(--teal)] transition-colors uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--teal)] hover:bg-[var(--teal-strong)] text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:-translate-y-0.5"
              >
                <span>Live Preview</span>
                <ExternalLink
                  size={14}
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </a>
            )}
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] hover:border-[var(--teal)] hover:text-[var(--teal)] text-[var(--ink)] text-xs sm:text-sm font-medium transition-all duration-200 shadow-2xs hover:-translate-y-0.5"
              >
                <Github size={14} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Media / Visual Showcase Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`min-w-0 md:col-span-6 lg:col-span-6 h-[320px] sm:h-[380px] md:h-[440px] ${
            reverse ? "md:order-1" : "md:order-2"
          }`}
        >
          <div className="w-full h-full rounded-2xl overflow-hidden border border-[var(--glass-border)] bg-[var(--surface-container-low)] p-2 transition-transform duration-500 group-hover:border-[var(--teal)]/30">
            <MediaScroller images={project.images} video={project.video} />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

export function MediaScroller({
  images,
  video,
}: {
  images: string[];
  video?: string;
}) {
  const imgs = (images ?? []).filter((img) => img && img.trim() !== "");
  const rawItems: { type: "image" | "video"; src: string }[] = [
    ...imgs.map((src) => ({ type: "image" as const, src })),
    ...(video ? [{ type: "video" as const, src: video }] : []),
  ];

  if (rawItems.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--surface-container-low)] text-[var(--on-surface-variant)] text-xs font-mono">
        No visual media available
      </div>
    );
  }

  // Single media item display with smooth hover zoom
  if (rawItems.length === 1) {
    const item = rawItems[0];
    return (
      <div className="relative w-full h-full overflow-hidden rounded-xl bg-[var(--surface-container)] border border-[var(--glass-border)] group/media">
        {item.type === "video" ? (
          <video
            src={item.src}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/media:scale-[1.025]"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <img
            src={item.src}
            alt="Project visual"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/media:scale-[1.025]"
          />
        )}
      </div>
    );
  }

  const sequence =
    rawItems.length === 2
      ? [...rawItems, ...rawItems]
      : rawItems;

  const duration = Math.max(10, sequence.length * 2.8);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-[var(--surface-container-low)] group/stream">
      {/* Continuous vertical scroll */}
      <div
        className="animate-vertical-scroll flex flex-col will-change-transform"
        style={{ animationDuration: `${duration}s` }}
      >
        {/* Set 1 */}
        <div className="flex flex-col gap-3 pb-3">
          {sequence.map((item, index) => (
            <div
              key={`item-1-${index}`}
              className="w-full h-[200px] sm:h-[230px] md:h-[250px] shrink-0 rounded-xl overflow-hidden border border-[var(--glass-border)] relative bg-[var(--surface-container)]"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={item.src}
                  alt="Project visual"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              )}
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicate for infinite seamless loop) */}
        <div className="flex flex-col gap-3 pb-3" aria-hidden="true">
          {sequence.map((item, index) => (
            <div
              key={`item-2-${index}`}
              className="w-full h-[200px] sm:h-[230px] md:h-[250px] shrink-0 rounded-xl overflow-hidden border border-[var(--glass-border)] relative bg-[var(--surface-container)]"
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={item.src}
                  alt="Project visual"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Top and Bottom Fade Gradients */}
      <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[var(--surface-container-low)] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--surface-container-low)] to-transparent pointer-events-none z-10" />
    </div>
  );
}

export function ViewAllProjectsLink() {
  return (
    <div className="flex justify-center pt-8">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-3 border border-[var(--outline-variant)] hover:border-[var(--teal)] hover:text-[var(--teal)] text-[var(--ink)] px-8 py-3.5 rounded-full text-sm font-semibold transition-all shadow-xs bg-[var(--surface-container-lowest)] hover:-translate-y-0.5"
      >
        <span>View All Projects &amp; Experiments</span>
        <ArrowUpRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </div>
  );
}
