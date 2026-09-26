"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { NormalizedProject } from "@/lib/types/project";

export function ProjectRow({
  project,
  reverse = false,
}: {
  project: NormalizedProject;
  reverse?: boolean;
}) {
  return (
    <div
      className="group rounded-[2rem] bg-white border border-[rgba(11,28,44,0.08)] p-8 sm:p-10 lg:p-12 transition-all duration-300 hover:border-[#0e8f8b]/40 hover:shadow-[0_16px_40px_rgba(11,28,44,0.06)] shadow-xs"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`min-w-0 ${reverse ? "md:order-2" : ""}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="label-eyebrow text-xs font-bold text-[#0e8f8b] tracking-widest uppercase">
              {project.featuredOrder === 1 ||
              project.featuredOrder === 2 ||
              project.featuredOrder === 3
                ? `Top Project · #${project.featuredOrder}`
                : "Project"}
            </span>
          </div>

          <h3 className="display-font text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0b1c2c] mb-4 leading-tight">
            {project.title}
          </h3>

          <p className="text-[#44474c] text-base md:text-lg leading-relaxed mb-6">
            {project.description}
          </p>

          <div
            className="bg-[#f6f3ed] border border-[rgba(11,28,44,0.08)] rounded-2xl p-6 mb-6"
            style={{ backgroundColor: "#f6f3ed" }}
          >
            <p className="text-[#44474c] text-sm leading-relaxed">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono font-medium rounded-full border border-[#c4c6cc] text-[#006a67] bg-[#ebe8e2]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c4c6cc] bg-white hover:border-[#0e8f8b] hover:text-[#0e8f8b] text-[#0b1c2c] text-sm font-medium transition-colors shadow-2xs"
              >
                <Github size={16} /> GitHub Code
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0e8f8b] hover:bg-[#006a67] text-white text-sm font-medium transition-colors shadow-sm"
              >
                <ExternalLink size={16} /> Live Preview
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`min-w-0 relative h-[360px] sm:h-[400px] md:h-auto ${reverse ? "md:order-1" : ""}`}
        >
          <div
            className="w-full h-full md:absolute md:inset-0 rounded-[1.5rem] overflow-hidden border border-[rgba(11,28,44,0.08)] bg-[#f6f3ed] p-2 flex flex-col"
            style={{ backgroundColor: "#f6f3ed" }}
          >
            <MediaScroller images={project.images} video={project.video} />
          </div>
        </motion.div>
      </div>
    </div>
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
      <div className="w-full h-full flex items-center justify-center rounded-xl border border-[rgba(11,28,44,0.08)] bg-[#f6f3ed] text-[#44474c] text-sm font-mono">
        No media available
      </div>
    );
  }

  // If only 1 media item, display it cleanly filling the card naturally
  if (rawItems.length === 1) {
    const item = rawItems[0];
    return (
      <div className="relative w-full h-full overflow-hidden rounded-xl bg-[#f0eee8] border border-[rgba(11,28,44,0.08)]">
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
          />
        )}
      </div>
    );
  }

  // Ensure enough items in the stream so the loop is seamless and filled
  const sequence =
    rawItems.length === 2
      ? [...rawItems, ...rawItems]
      : rawItems;

  // Consistent linear scroll velocity: ~2.8s per item in the sequence
  const duration = Math.max(10, sequence.length * 2.8);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-[#f6f3ed]">
      {/* Continuous GPU-accelerated vertical marquee track */}
      <div
        className="animate-vertical-scroll flex flex-col will-change-transform"
        style={{ animationDuration: `${duration}s` }}
      >
        {/* Set 1 */}
        <div className="flex flex-col gap-4 pb-4">
          {sequence.map((item, index) => (
            <div
              key={`item-1-${index}`}
              className="w-full h-[220px] sm:h-[250px] md:h-[270px] shrink-0 rounded-xl overflow-hidden border border-[rgba(11,28,44,0.08)] relative bg-[#f0eee8]"
              style={{ backgroundColor: "#f0eee8" }}
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

        {/* Set 2 (Identical duplicate for seamless bottom-to-top infinite loop) */}
        <div className="flex flex-col gap-4 pb-4" aria-hidden="true">
          {sequence.map((item, index) => (
            <div
              key={`item-2-${index}`}
              className="w-full h-[220px] sm:h-[250px] md:h-[270px] shrink-0 rounded-xl overflow-hidden border border-[rgba(11,28,44,0.08)] relative bg-[#f0eee8]"
              style={{ backgroundColor: "#f0eee8" }}
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
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f6f3ed] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f6f3ed] to-transparent pointer-events-none z-10" />
    </div>
  );
}

export function ViewAllProjectsLink() {
  return (
    <div className="flex justify-center pt-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-3 border border-[#c4c6cc] hover:border-[#0e8f8b] hover:text-[#0e8f8b] text-[#0b1c2c] px-8 py-3.5 rounded-full font-medium transition-all shadow-xs bg-white"
        style={{ backgroundColor: "#ffffff" }}
      >
        View All Projects &amp; Experiments →
      </Link>
    </div>
  );
}
