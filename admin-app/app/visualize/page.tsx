// app/visualize/page.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { requireUser } from '@/lib/requireUser' // NOTE: can't call from client, see note below

export default function VisualizePage() {
  // This page is a quick stub for now; we’ll protect at the layout level or with dev bypass.
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<string | null>(null)

  function handleStub() {
    // Pretend we sent a job and got a composite image back:
    setResult('/globe.svg') // uses Next.js starter public icon as a placeholder
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-semibold mb-4">Visualize (stub)</h1>
      <div className="space-y-3">
        <input
          className="w-full border rounded px-3 py-2 bg-background"
          placeholder="Paste room image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="px-3 py-2 rounded bg-primary text-primary-foreground" onClick={handleStub}>
          Create composite (stub)
        </button>
      </div>

      {result && (
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-2">Result:</p>
          {/* Using next/image for the placeholder */}
          <Image src={result} alt="composite" width={100} height={100} />
        </div>
      )}
    </div>
  )
}
