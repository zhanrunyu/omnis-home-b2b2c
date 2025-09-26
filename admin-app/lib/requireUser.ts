// lib/requireUser.ts
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";

export async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user ?? null;

  if (!user) {
    // Not signed in → go to sign-in
    redirect("/sign-in");
  }
  return user;
}
