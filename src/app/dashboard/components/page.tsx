import { createClient } from "@/lib/supabase/server";
import type { CatalogItem } from "@/lib/types";

export default async function ComponentsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("components")
    .select("id, slug, name, description, category, preview_url, version")
    .eq("status", "published")
    .order("slug");

  const components = (data ?? []) as unknown as CatalogItem[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Componentes</h1>
      <p className="text-gray-500 mb-6">
        Componentes reutilizáveis disponíveis no catálogo.
      </p>

      {components.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <h2 className="font-semibold">{c.name}</h2>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {c.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs">
                {c.category && (
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
                    {c.category}
                  </span>
                )}
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
                  v{c.version}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nenhum componente publicado ainda.</p>
      )}
    </div>
  );
}
