// lib/requireUser.ts
import { redirect } from "next/navigation";
import { createReadonlyServerClient } from "@/lib/supabaseServer";

export async function requireUser() {
  const supabase = await createReadonlyServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");
  return user;
}