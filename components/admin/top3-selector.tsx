"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/types/project";

interface Top3SelectorProps {
  projects: Project[];
  onUpdated?: () => void;
}

export function Top3Selector({ projects, onUpdated }: Top3SelectorProps) {
  const [slot1, setSlot1] = useState<string>("");
  const [slot2, setSlot2] = useState<string>("");
  const [slot3, setSlot3] = useState<string>("");

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Sync slots whenever projects list is updated or loaded
  useEffect(() => {
    if (!projects || projects.length === 0) return;
    const p1 = projects.find((p) => p.featuredOrder === 1);
    const p2 = projects.find((p) => p.featuredOrder === 2);
    const p3 = projects.find((p) => p.featuredOrder === 3);

    setSlot1(p1?._id ?? "");
    setSlot2(p2?._id ?? "");
    setSlot3(p3?._id ?? "");
  }, [projects]);

  // Validation: Check for duplicates among selected slots
  const nonBlankSlots = [
    { position: 1, id: slot1 },
    { position: 2, id: slot2 },
    { position: 3, id: slot3 },
  ].filter((s) => s.id !== "");

  const hasDuplicates =
    nonBlankSlots.length > 0 &&
    new Set(nonBlankSlots.map((s) => s.id)).size !== nonBlankSlots.length;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (hasDuplicates) {
      setStatusMsg({
        type: "error",
        text: "Duplicate project selected. Each position must have a distinct project.",
      });
      return;
    }

    if (nonBlankSlots.length === 0) {
      setStatusMsg({
        type: "error",
        text: "Please select at least one project for Top 3.",
      });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        slots: nonBlankSlots.map((s) => ({
          position: s.position,
          projectId: s.id,
        })),
      };

      const res = await fetch("/api/projects/top3", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to update Top 3 projects");
      }

      setStatusMsg({
        type: "success",
        text: "Top 3 projects saved successfully!",
      });

      onUpdated?.();
    } catch (err) {
      setStatusMsg({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save Top 3",
      });
    } finally {
      setSaving(false);
    }
  };

  const slots = [
    { num: 1, value: slot1, setter: setSlot1 },
    { num: 2, value: slot2, setter: setSlot2 },
    { num: 3, value: slot3, setter: setSlot3 },
  ];

  return (
    <div className="bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] rounded-2xl p-6 shadow-xs">
      <div className="mb-4 pb-3 border-b border-[var(--glass-border)]">
        <h2 className="text-xl font-bold text-[var(--ink)] display-font">
          TOP 3 PROJECTS
        </h2>
        <p className="text-[var(--on-surface-variant)] text-xs mt-1">
          Select projects for homepage positions #1, #2, and #3. The submitted slots are the single source of truth.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-3">
          {slots.map(({ num, value, setter }) => (
            <div key={num} className="flex items-center gap-3">
              <span className="w-8 shrink-0 text-sm font-mono font-bold text-[var(--teal)]">
                #{num}
              </span>
              <select
                value={value}
                onChange={(e) => {
                  setter(e.target.value);
                  setStatusMsg(null);
                }}
                className="w-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl px-4 py-2.5 text-[var(--ink)] outline-none focus:border-[var(--teal)] transition-colors text-sm"
              >
                <option value="">-- Select Project --</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {hasDuplicates && (
          <p className="text-red-600 text-xs font-mono font-medium">
            ⚠ Duplicate project selected. Each position must have a distinct project.
          </p>
        )}

        {statusMsg && (
          <p
            className={`text-xs font-mono font-medium ${
              statusMsg.type === "success" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {statusMsg.type === "success" ? "✓ " : "✕ "}
            {statusMsg.text}
          </p>
        )}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving || hasDuplicates || projects.length === 0}
            className="bg-[var(--teal)] hover:bg-[var(--teal-strong)] disabled:opacity-50 text-white font-semibold py-2.5 px-6 rounded-xl transition text-sm shadow-xs"
          >
            {saving ? "Saving..." : "Save Top 3"}
          </button>
        </div>
      </form>
    </div>
  );
}
