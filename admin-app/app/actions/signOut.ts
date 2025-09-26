// app/actions/signOut.ts
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabaseServer'

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/sign-in')
}
