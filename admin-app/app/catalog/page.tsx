// app/catalog/page.tsx
import { requireUser } from '@/lib/requireUser'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default async function CatalogPage() {
  await requireUser()

  const rows: Array<{ sku: string; name: string }> = [] // fill later

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Catalog</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-muted-foreground">
                No products yet.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((r) => (
              <TableRow key={r.sku}>
                <TableCell>{r.sku}</TableCell>
                <TableCell>{r.name}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
