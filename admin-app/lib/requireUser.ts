// lib/requireUser.ts
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'

export async function requireUser() {
  // Optional dev bypass so you can build without SMTP:
  if (process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true') {
    return { id: 'dev-user', email: 'dev@omnis.home' }
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/sign-in')
  return user
}
