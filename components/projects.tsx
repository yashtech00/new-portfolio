"use client";

import { useEffect, useState } from "react";
import { ProjectRow, ViewAllProjectsLink } from "@/components/project-display";
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

export const Projects = () => {
  const [projects, setProjects] = useState<NormalizedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects?featured=true")
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

  if (loading) {
    return (
      <div className="text-[var(--on-surface)]">
        <p className="text-[var(--on-surface-variant)] text-center py-20 font-mono text-sm">
          Loading selected projects...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16 md:space-y-24 text-[var(--on-surface)]">
      {projects.map((project, index) => (
        <ProjectRow
          key={project.id}
          project={project}
          reverse={index % 2 !== 0}
        />
      ))}
      <ViewAllProjectsLink />
    </div>
  );
};
