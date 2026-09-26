"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ProjectRow } from "@/components/project-display";
import { normalizeProject, type NormalizedProject } from "@/lib/types/project";
import { seedProjects } from "@/lib/data/seed-projects";

const fallbackProjects: NormalizedProject[] = seedProjects.map((p, i) =>
  normalizeProject({
    id: i + 1,
    title: p.title,
    description: p.description,
    longDescription: p.longDescription,
    images: p.images,
    github: p.github,
    demo: p.demo,
    tech: p.tech,
    video: p.video,
    featuredOrder: p.featuredOrder,
  })
);

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<NormalizedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data.map(normalizeProject));
        } else {
          setProjects(fallbackProjects);
        }
      })
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="bg-[var(--surface)] text-[var(--on-surface)] min-h-screen"
      style={{ backgroundColor: "#fcf9f3", color: "#1c1c18" }}
    >
      <Navbar />
      <div className="container-page py-16">
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--on-surface-variant)] hover:text-[var(--teal-strong)] transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="label-eyebrow">Archive &amp; Builds</span>
          </div>
          <h1 className="display-font text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--ink)] mt-3">
            All Projects
          </h1>
          <p className="text-[var(--on-surface-variant)] mt-3 text-lg md:text-xl max-w-2xl leading-relaxed">
            Everything I&apos;ve built — client engagements, production web apps, tools &amp; experiments.
          </p>
        </div>

        {loading ? (
          <p className="text-[var(--on-surface-variant)] text-center py-20 font-mono text-sm">
            Loading projects...
          </p>
        ) : projects.length === 0 ? (
          <p className="text-[var(--on-surface-variant)] text-center py-20 font-mono text-sm">
            No projects found.
          </p>
        ) : (
          <div className="space-y-16 md:space-y-24">
            {projects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
