// app/sign-in/page.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabaseClient' // browser helper
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const supabase = createClient()
    const redirectTo = `${location.origin}/auth/callback?next=/dashboard`

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
    });

    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

      {sent ? (
        <p className="text-sm text-muted-foreground">
          Check your inbox for the magic link.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button className="w-full" type="submit">
            Send magic link
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      )}

      <p className="text-xs text-muted-foreground mt-6">
        Tip: If email isn’t set up yet, use the temporary dev bypass (see below)
        so you can keep building.
      </p>
    </div>
  )
}
