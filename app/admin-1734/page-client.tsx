"use client";

import { useCallback, useEffect, useState } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { ProjectForm } from "@/components/admin/project-form";
import { ProjectList } from "@/components/admin/project-list";
import type { Project } from "@/lib/types/project";
import Link from "next/link";

export default function AdminPageClient() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/admin/me");
    const data = await res.json();
    setAuthenticated(data.authenticated);
  }, []);

  const fetchProjects = useCallback(async () => {
    const res = await fetch("/api/projects");
    if (res.ok) {
      setProjects(await res.json());
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authenticated) fetchProjects();
  }, [authenticated, fetchProjects]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchProjects();
    if (editing?._id === id) setEditing(null);
  };

  const handleSeed = async () => {
    const res = await fetch("/api/projects?seed=true", { method: "PUT" });
    const data = await res.json();
    alert(data.message || data.error);
    fetchProjects();
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center">
        <p className="text-[var(--on-surface-variant)] font-mono text-sm">Loading admin console...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center px-6">
        <LoginForm onSuccess={() => setAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--on-surface)] px-6 md:px-12 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--glass-border)]">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-xs text-[var(--on-surface-variant)] hover:text-[var(--teal)] font-medium">
                ← Back to Portfolio
              </Link>
            </div>
            <h1 className="display-font text-3xl font-bold text-[var(--ink)] mt-1">Project Admin</h1>
            <p className="text-[var(--on-surface-variant)] text-sm mt-0.5">Manage portfolio projects &amp; case studies</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-[var(--ink)] hover:text-[var(--teal)] border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] px-4 py-2 rounded-full transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProjectForm
            key={editing?._id ?? "new"}
            editing={editing}
            onSaved={fetchProjects}
            onCancelEdit={() => setEditing(null)}
          />
          <ProjectList
            projects={projects}
            onEdit={setEditing}
            onDelete={handleDelete}
            onSeed={handleSeed}
          />
        </div>
      </div>
    </div>
  );
}
