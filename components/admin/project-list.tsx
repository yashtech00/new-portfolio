"use client";

import type { Project } from "@/lib/types/project";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onSeed: () => void;
}

export function ProjectList({ projects, onEdit, onDelete, onSeed }: ProjectListProps) {
  return (
    <div className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] rounded-2xl p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--glass-border)]">
        <h2 className="text-xl font-bold text-[var(--ink)] display-font">All Projects ({projects.length})</h2>
        <button
          onClick={onSeed}
          className="text-xs text-[var(--on-surface-variant)] hover:text-[var(--teal)] border border-[var(--outline-variant)] bg-[var(--surface-container-low)] px-3 py-1.5 rounded-lg transition-colors font-mono"
        >
          Seed defaults
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-[var(--on-surface-variant)] text-sm font-mono">No projects yet. Add one or seed defaults.</p>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-start justify-between gap-4 bg-[var(--surface-container-low)] border border-[var(--glass-border)] rounded-xl p-4 transition-colors hover:border-[var(--teal)]/40"
            >
              <div className="min-w-0">
                <p className="text-[var(--ink)] font-semibold truncate text-sm">{project.title}</p>
                <p className="text-[var(--on-surface-variant)] text-xs mt-1 font-mono">
                  {project.featured ? "Featured" : "Hidden"} · Order {project.order}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onEdit(project)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-[var(--surface-container-high)] hover:bg-[var(--teal)] hover:text-white text-[var(--ink)] transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(project._id)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
