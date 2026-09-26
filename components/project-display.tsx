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
      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
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
          className={`min-w-0 ${reverse ? "md:order-1" : ""}`}
        >
          <div
            className="w-full rounded-[1.5rem] overflow-hidden border border-[rgba(11,28,44,0.08)] bg-[#f6f3ed] p-2 min-w-0"
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
  const items: { type: "image" | "video"; src: string }[] = [
    ...imgs.map((src) => ({ type: "image" as const, src })),
    ...(video ? [{ type: "video" as const, src: video }] : []),
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-[220px] rounded-xl border border-[rgba(11,28,44,0.08)] bg-[#f6f3ed] flex items-center justify-center text-[#44474c] text-sm font-mono">
        No media available
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="min-w-[280px] sm:min-w-[340px] h-[220px] sm:h-[260px] rounded-xl overflow-hidden border border-[rgba(11,28,44,0.08)] group relative bg-[#f0eee8]"
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
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            )}
          </div>
        ))}
      </motion.div>
      {/* Side Fade Gradients */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
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
