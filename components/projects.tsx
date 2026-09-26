"use client";

import { useEffect, useState } from "react";
import { ProjectRow, ViewAllProjectsLink } from "@/components/project-display";
import { normalizeProject, type NormalizedProject } from "@/lib/types/project";
import { seedProjects } from "@/lib/data/seed-projects";

const fallbackProjects: NormalizedProject[] = seedProjects
  .filter((p) => p.featuredOrder != null)
  .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0))
  .map((p, i) =>
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

export const Projects = () => {
  const [projects, setProjects] = useState<NormalizedProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects?top3=true")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch top 3 projects");
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

  if (loading) {
    return (
      <div className="text-[var(--on-surface)]">
        <p className="text-[var(--on-surface-variant)] text-center py-20 font-mono text-sm">
          Loading selected projects...
        </p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-[var(--on-surface)] text-center py-12">
        <p className="text-[var(--on-surface-variant)] font-mono text-sm mb-6">
          No featured projects selected yet.
        </p>
        <ViewAllProjectsLink />
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

