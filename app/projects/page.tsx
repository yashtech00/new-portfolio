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
    image: p.images,
    github: p.github,
    demo: p.demo,
    tech: p.tech,
    video: p.video,
  })
);

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<NormalizedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.map(normalizeProject));
        } else {
          setProjects(fallbackProjects);
        }
      })
      .catch(() => setProjects(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <Link
            href="/"
            className="text-sm text-neutral-400 hover:text-white transition mb-6 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold mt-4">All Projects</h1>
          <p className="text-neutral-400 mt-3 text-lg">
            Everything I&apos;ve built — side projects, tools & experiments.
          </p>
        </div>

        {loading ? (
          <p className="text-neutral-500 text-center py-20">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-neutral-500 text-center py-20">No projects yet.</p>
        ) : (
          <div className="space-y-32">
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
