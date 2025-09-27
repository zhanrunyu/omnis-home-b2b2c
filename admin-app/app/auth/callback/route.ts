// app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { createWritableServerClient } from "@/lib/supabaseServer";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code") ?? url.searchParams.get("token_hash");

  if (!code) {
    return NextResponse.redirect(new URL("/sign-in?error=missing_code", request.url));
  }

  const supabase = await createWritableServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/sign-in?error=${encodeURIComponent(error.message)}`, request.url)
    );
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}