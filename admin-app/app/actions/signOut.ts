// app/actions/signOut.ts
'use server'

import { redirect } from 'next/navigation'
import { createWritableServerClient } from "@/lib/supabaseServer";

export async function signOut() {
  const supabase = await createWritableServerClient()
  await supabase.auth.signOut()
  redirect('/sign-in')
}
