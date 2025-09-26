// app/catalog/page.tsx
import { createClient } from "@/lib/supabaseServer";

export default async function CatalogPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, sku, price_cents, image_url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Catalog</h1>
        <div className="text-red-600">Supabase error: {error.message}</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Catalog</h1>
        <p>No products yet — add some in Supabase.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Catalog</h1>
      <div className="grid grid-cols-[80px_1fr_180px_120px] gap-3 text-sm font-medium px-2">
        <div>Img</div>
        <div>Name</div>
        <div>SKU</div>
        <div className="text-right">Price</div>
      </div>
      <div className="divide-y mt-2">
        {products.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-[80px_1fr_180px_120px] gap-3 items-center px-2 py-3"
          >
            <div>
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image_url}
                  alt={p.name ?? "product"}
                  className="h-12 w-12 object-cover rounded"
                />
              ) : (
                <div className="h-12 w-12 bg-gray-200 rounded" />
              )}
            </div>
            <div className="truncate">{p.name ?? "—"}</div>
            <div className="truncate">{p.sku ?? "—"}</div>
            <div className="text-right">
              {typeof p.price_cents === "number"
                ? `€${(p.price_cents / 100).toFixed(2)}`
                : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
