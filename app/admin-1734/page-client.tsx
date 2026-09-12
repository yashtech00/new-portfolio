"use client";

import { useCallback, useEffect, useState } from "react";
import { LoginForm } from "@/components/admin/login-form";
import { ProjectForm } from "@/components/admin/project-form";
import { ProjectList } from "@/components/admin/project-list";
import type { Project } from "@/lib/types/project";

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <LoginForm onSuccess={() => setAuthenticated(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Project Admin</h1>
            <p className="text-neutral-500 text-sm mt-1">Manage portfolio projects</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-neutral-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg transition"
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
