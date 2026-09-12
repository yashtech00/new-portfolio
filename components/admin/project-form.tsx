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
      className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          {editing ? "Edit Project" : "Add Project"}
        </h2>
        {editing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm text-neutral-400 hover:text-white"
          >
            Cancel edit
          </button>
        )}
      </div>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-orange-500"
        required
      />

      <input
        placeholder="Short description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-orange-500"
        required
      />

      <textarea
        placeholder="Long description"
        value={form.longDescription}
        onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
        rows={4}
        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-orange-500 resize-none"
        required
      />

      <input
        placeholder="Tech stack (comma separated)"
        value={form.tech}
        onChange={(e) => setForm({ ...form, tech: e.target.value })}
        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-orange-500"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          placeholder="GitHub URL"
          value={form.github}
          onChange={(e) => setForm({ ...form, github: e.target.value })}
          className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-orange-500"
        />
        <input
          placeholder="Demo URL"
          value={form.demo}
          onChange={(e) => setForm({ ...form, demo: e.target.value })}
          className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-orange-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          placeholder="Order"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-orange-500"
        />
        <label className="flex items-center gap-2 text-neutral-300 text-sm px-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="accent-orange-500"
          />
          Featured on homepage
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-neutral-400">Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          disabled={uploading}
          className="text-sm text-neutral-400"
        />
        {form.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {form.images.map((url, i) => (
              <div key={i} className="relative group">
                <img src={url} alt="" className="w-20 h-14 object-cover rounded border border-white/10" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-neutral-400">Video (optional)</label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          disabled={uploading}
          className="text-sm text-neutral-400"
        />
        {form.video && (
          <p className="text-xs text-green-400 truncate">Video uploaded ✓</p>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={saving || uploading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
      >
        {saving ? "Saving..." : uploading ? "Uploading..." : editing ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
