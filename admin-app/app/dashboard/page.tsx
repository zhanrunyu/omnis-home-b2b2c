// app/dashboard/page.tsx
import { requireUser } from '@/lib/requireUser'

export default async function DashboardPage() {
  const user = await requireUser()

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="text-muted-foreground">
        Signed in as <strong>{user.email}</strong>
      </p>
    </div>
  )
}
