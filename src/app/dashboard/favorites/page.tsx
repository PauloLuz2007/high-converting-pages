import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Favorite } from "@/lib/types";

export default async function FavoritesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("favorites")
    .select("id, pages(id, slug, name, description, version)")
    .order("created_at", { ascending: false });

  const favorites = (data ?? []) as unknown as Favorite[];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Favoritos</h1>
      <p className="text-gray-500 mb-6">Suas páginas favoritas.</p>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((f) => {
            const page = f.pages;
            if (!page) return null;
            return (
              <Link
                key={f.id}
                href={`/dashboard/pages/${page.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition"
              >
                <h2 className="font-semibold">{page.name}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {page.description}
                </p>
                <span className="inline-block mt-3 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                  v{page.version}
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">Você ainda não tem favoritos.</p>
      )}
    </div>
  );
}
