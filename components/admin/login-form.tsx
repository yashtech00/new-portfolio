"use client";

import { useState } from "react";

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm mx-auto bg-[var(--surface-container-lowest)] border border-[var(--glass-border)] rounded-2xl p-8 shadow-sm"
    >
      <h1 className="display-font text-2xl font-bold text-[var(--ink)] mb-1">Admin Login</h1>
      <p className="text-[var(--on-surface-variant)] text-sm mb-6">Enter password to manage projects</p>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full bg-[var(--surface-container-low)] border border-[var(--outline-variant)] rounded-xl px-4 py-3 text-[var(--ink)] mb-4 outline-none focus:border-[var(--teal)] transition-colors"
        required
      />

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--teal)] hover:bg-[var(--teal-strong)] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors shadow-xs"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
