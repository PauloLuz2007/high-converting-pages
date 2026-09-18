import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Page } from "@/lib/types";

export default async function LibraryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("id, slug, name, description, status, version, categories(name)")
    .eq("status", "published")
    .order("slug");

  const pages = (data ?? []) as unknown as Page[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Biblioteca</h1>
      <p className="text-gray-500 mb-6">
        Páginas publicadas disponíveis no catálogo.
      </p>

      {pages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((page) => (
            <Link
              key={page.id}
              href={`/dashboard/pages/${page.slug}`}
              className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition"
            >
              <h2 className="font-semibold">{page.name}</h2>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {page.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
                  {page.categories?.name ?? "Sem categoria"}
                </span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
                  v{page.version}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nenhuma página publicada ainda.</p>
      )}
    </div>
  );
}
