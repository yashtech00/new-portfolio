"use client";

import { useState } from "react";
import type { Project } from "@/lib/types/project";

const emptyForm = {
  title: "",
  description: "",
  longDescription: "",
  images: [] as string[],
  video: "",
  github: "#",
  demo: "#",
  tech: "",
  featured: true,
  order: 0,
};

interface ProjectFormProps {
  editing?: Project | null;
  onSaved: () => void;
  onCancelEdit?: () => void;
}

export function ProjectForm({ editing, onSaved, onCancelEdit }: ProjectFormProps) {
  const [form, setForm] = useState(() =>
    editing
      ? {
          title: editing.title,
          description: editing.description,
          longDescription: editing.longDescription,
          images: editing.images ?? [],
          video: editing.video ?? "",
          github: editing.github,
          demo: editing.demo,
          tech: editing.tech.join(", "),
          featured: editing.featured,
          order: editing.order,
        }
      : emptyForm
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File, type: "image" | "video") => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("type", type);

    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url as string;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    setError("");
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadFile(file, "image");
        urls.push(url);
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
    } catch {
      setError("Image upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file, "video");
      setForm((prev) => ({ ...prev, video: url }));
    } catch {
      setError("Video upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      description: form.description,
      longDescription: form.longDescription,
      images: form.images,
      video: form.video,
      github: form.github,
      demo: form.demo,
      tech: form.tech.split(",").map((t) => t.trim()).filter(Boolean),
      featured: form.featured,
      order: form.order,
    };

    try {
      const url = editing ? `/api/projects/${editing._id}` : "/api/projects";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");

      setForm(emptyForm);
      onSaved();
      onCancelEdit?.();
    } catch {
      setError("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] rounded-2xl p-6 space-y-4 shadow-xs"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[var(--glass-border)]">
        <h2 className="text-xl font-bold text-[var(--ink)] display-font">
          {editing ? "Edit Project" : "Add Project"}
        </h2>
        {editing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm text-[var(--on-surface-variant)] hover:text-[var(--teal)] font-medium"
          >
            Cancel edit
          </button>
        )}
      </div>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl px-4 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--teal)] transition-colors"
        required
      />

      <input
        placeholder="Short description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl px-4 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--teal)] transition-colors"
        required
      />

      <textarea
        placeholder="Long description"
        value={form.longDescription}
        onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
        rows={4}
        className="w-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl px-4 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--teal)] transition-colors resize-none"
        required
      />

      <input
        placeholder="Tech stack (comma separated)"
        value={form.tech}
        onChange={(e) => setForm({ ...form, tech: e.target.value })}
        className="w-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl px-4 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--teal)] transition-colors"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="GitHub URL"
          value={form.github}
          onChange={(e) => setForm({ ...form, github: e.target.value })}
          className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl px-4 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--teal)] transition-colors"
        />
        <input
          placeholder="Demo URL"
          value={form.demo}
          onChange={(e) => setForm({ ...form, demo: e.target.value })}
          className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl px-4 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--teal)] transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          placeholder="Order"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl px-4 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--teal)] transition-colors"
        />
        <label className="flex items-center gap-2 text-[var(--on-surface-variant)] text-sm px-2 font-medium">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="accent-[var(--teal)]"
          />
          Featured on homepage
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-[var(--on-surface-variant)] font-medium">Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          disabled={uploading}
          className="text-sm text-[var(--on-surface-variant)]"
        />
        {form.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {form.images.map((url, i) => (
              <div key={i} className="relative group">
                <img src={url} alt="" className="w-20 h-14 object-cover rounded border border-[var(--glass-border)]" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-[var(--on-surface-variant)] font-medium">Video (optional)</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          disabled={uploading}
          className="text-sm text-[var(--on-surface-variant)]"
        />
        {form.video && (
          <p className="text-xs text-[var(--teal)] font-mono truncate">Video uploaded ✓</p>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="w-full bg-[var(--teal)] hover:bg-[var(--teal-strong)] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition shadow-xs"
      >
        {saving ? "Saving..." : uploading ? "Uploading..." : editing ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
