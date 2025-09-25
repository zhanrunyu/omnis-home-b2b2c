'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // init once on the client
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com'
    if (typeof window !== 'undefined' && key) {
      posthog.init(key, { api_host: host, autocapture: true, capture_pageview: true })
    }
  }, [])

  // capture page views on route changes (App Router)
  useEffect(() => {
    if (!pathname) return
    posthog.capture('$pageview', { $current_url: window.location.href })
  }, [pathname, searchParams])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
