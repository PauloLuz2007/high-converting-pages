"use client";

import { useState } from "react";

export default function DownloadButton({
  pageId,
  hasFile,
}: {
  pageId: string;
  hasFile: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `Erro (${res.status})`);
        return;
      }
      window.open(data.url, "_blank");
    } catch {
      setError("Falha na requisição");
    } finally {
      setLoading(false);
    }
  }

  if (!hasFile) {
    return (
      <span className="text-sm text-gray-400">Arquivo em preparação</span>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover disabled:opacity-50"
      >
        {loading ? "Gerando..." : "Baixar"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
