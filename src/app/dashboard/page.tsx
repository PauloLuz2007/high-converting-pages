import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ count: pageCount }, { count: favCount }, { count: downloadCount }] =
    await Promise.all([
      supabase
        .from("pages")
        .select("*", { count: "exact", head: true })
        .eq("status", "published"),
      supabase
        .from("favorites")
        .select("*", { count: "exact", head: true }),
      supabase
        .from("downloads")
        .select("*", { count: "exact", head: true }),
    ]);

  const stats = [
    { label: "Páginas publicadas", value: pageCount ?? 0 },
    { label: "Favoritos", value: favCount ?? 0 },
    { label: "Downloads", value: downloadCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Visão geral</h1>
      <p className="text-gray-500 mb-6">
        Bem-vindo, {user?.email}. Explore o catálogo abaixo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="text-3xl font-bold">{s.value}</div>
            <div className="text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <Link
        href="/dashboard/library"
        className="inline-block rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
      >
        Acessar biblioteca
      </Link>
    </div>
  );
}
