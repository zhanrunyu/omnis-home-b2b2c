"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInClient() {
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo") ?? undefined;

  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // your magic-link call here, can include redirectTo if you use it
    // await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full rounded border px-3 py-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="rounded bg-black text-white px-4 py-2">
        Send magic link
      </button>
      {redirectTo && (
        <p className="text-xs text-gray-500">After login → {redirectTo}</p>
      )}
    </form>
  );
}