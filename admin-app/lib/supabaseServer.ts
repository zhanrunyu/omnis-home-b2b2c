// lib/supabaseServer.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Use in Route Handlers / Server Actions (places allowed to mutate cookies).
 * NOTE: The factory itself is async because in Next 15 `cookies()` can be async.
 */
export async function createWritableServerClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        // Next 15 supports the (name, value, options) signature
        cookieStore.set(name, value, options);
      },
      remove(name: string, options: CookieOptions) {
        // Clear by setting empty value; maxAge=0 also works if you prefer
        cookieStore.set(name, "", options);
      },
    },
  });
}

/**
 * Use in Server Components (RSC) where cookies are read-only.
 */
export async function createReadonlyServerClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      // no set/remove in read-only contexts
    },
  });
}