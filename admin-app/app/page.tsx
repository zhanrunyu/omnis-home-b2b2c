'use client'

import posthog from 'posthog-js'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Hello OMNIS HOME 🚀</h1>
        <button
          onClick={() => posthog.capture('test_button_clicked', { source: 'homepage' })}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send Test Event
        </button>
      </div>
    </main>
  )
}
