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
    <div>
      <div className="grid md:grid-cols-2 gap-16 items-center bg-neutral-900 p-10">
        <motion.div
          initial={{ opacity: 0, x: reverse ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={reverse ? "md:order-2" : ""}
        >
          <h2 className="text-4xl font-bold mb-4">{project.title}</h2>

          <div className="flex gap-3 mb-4">
            {project.github && project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                  <Github size={16} /> GitHub
                </button>
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                  <ExternalLink size={16} /> Demo
                </button>
              </a>
            )}
          </div>

          <p className="text-neutral-400 mb-6">{project.description}</p>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xl shadow-xl">
            <p className="text-neutral-300 text-sm leading-relaxed">
              {project.longDescription}
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full border border-purple-500/40 text-purple-300 bg-purple-500/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={reverse ? "md:order-1" : ""}
        >
          <MediaScroller images={project.images} video={project.video} />
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
      <div className="min-h-[200px] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-neutral-500 text-sm">
        No media yet
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="min-w-[300px] h-[200px] rounded-xl overflow-hidden border border-white/10 group"
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
                alt="project"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
              />
            )}
          </div>
        ))}
      </motion.div>
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-neutral-900 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-neutral-900 to-transparent pointer-events-none" />
    </div>
  );
}

export function ViewAllProjectsLink() {
  return (
    <div className="flex justify-center mt-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 border border-white/20 hover:border-orange-500/60 hover:bg-orange-500/10 text-white px-8 py-3 rounded-full transition"
      >
        View All Projects →
      </Link>
    </div>
  );
}
