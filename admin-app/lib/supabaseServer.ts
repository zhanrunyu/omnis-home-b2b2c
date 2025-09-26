// lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function createClient() {
  // In Next 15 this can be Promise<ReadonlyRequestCookies> in some contexts
  const cookieStore = await cookies();

  // Read-only cookies in RSC/route helpers to avoid mutation errors
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // no set/remove here; mutate cookies only inside Server Actions or Route Handlers
      },
    }
  );
}