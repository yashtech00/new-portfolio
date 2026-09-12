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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">All Projects ({projects.length})</h2>
        <button
          onClick={onSeed}
          className="text-xs text-neutral-400 hover:text-orange-400 border border-white/10 px-3 py-1.5 rounded-lg transition"
        >
          Seed defaults
        </button>
      </div>

      {projects.length === 0 ? (
        <p className="text-neutral-500 text-sm">No projects yet. Add one or seed defaults.</p>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-start justify-between gap-4 bg-black/30 border border-white/10 rounded-xl p-4"
            >
              <div className="min-w-0">
                <p className="text-white font-medium truncate">{project.title}</p>
                <p className="text-neutral-500 text-xs mt-1">
                  {project.featured ? "Featured" : "Hidden"} · Order {project.order}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onEdit(project)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(project._id)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition"
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
