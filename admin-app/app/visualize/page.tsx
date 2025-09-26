"use client";

import { useState } from "react";

/**
 * Minimal client-side form that POSTs to /api/visualize
 * and shows the returned composite_url.
 */
export default function VisualizePage() {
  const [roomUrl, setRoomUrl] = useState("");
  const [placements, setPlacements] = useState("[]"); // JSON string
  const [result, setResult] = useState<{ url?: string; error?: string; jobId?: string }>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult({});

    try {
      const parsedPlacements = placements.trim() ? JSON.parse(placements) : [];

      const res = await fetch("/api/visualize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_image_url: roomUrl,
          placements: parsedPlacements,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      setResult({ url: data.composite_url, jobId: data.job_id });
    } catch (err: any) {
      setResult({ error: err.message || "Something went wrong" });
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Visualize</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <div className="mb-1 font-medium">Room image URL</div>
          <input
            className="w-full rounded border px-3 py-2"
            placeholder="https://res.cloudinary.com/…/room.jpg"
            value={roomUrl}
            onChange={(e) => setRoomUrl(e.target.value)}
          />
        </label>

        <label className="block">
          <div className="mb-1 font-medium">Placements (JSON array)</div>
          <textarea
            className="w-full rounded border px-3 py-2 font-mono text-sm"
            rows={4}
            placeholder='[{"sku":"SOFA-123","x":10,"y":20}]'
            value={placements}
            onChange={(e) => setPlacements(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="rounded bg-black text-white px-4 py-2"
        >
          Submit
        </button>
      </form>

      {result.error && (
        <p className="text-red-600">Error: {result.error}</p>
      )}

      {result.url && (
        <div className="space-y-2">
          <div className="font-medium">Composite URL</div>
          <a
            href={result.url}
            className="text-blue-600 underline break-all"
            target="_blank"
            rel="noreferrer"
          >
            {result.url}
          </a>
          {result.jobId && <div className="text-sm text-gray-500">job_id: {result.jobId}</div>}
        </div>
      )}
    </main>
  );
}
