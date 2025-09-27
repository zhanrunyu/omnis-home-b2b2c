import { Suspense } from "react";
import SignInClient from "./SignInClient";

export default function Page() {
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      {/* useSearchParams must be under a Suspense boundary */}
      <Suspense fallback={null}>
        <SignInClient />
      </Suspense>
    </main>
  );
}
