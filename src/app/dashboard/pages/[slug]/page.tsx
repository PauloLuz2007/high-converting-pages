import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DownloadButton from "@/components/download-button";
import type { Page } from "@/lib/types";

export default async function PageDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("pages")
    .select("id, slug, name, description, status, version, preview_desktop_url, zip_path, categories(name)")
    .eq("slug", slug)
    .single();

  const page = data as unknown as Page;
  if (!page) notFound();

  const hasPreview = !!page.preview_desktop_url;
  const hasFile = !!page.zip_path;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">{page.name}</h1>
      <p className="text-gray-500 mb-6">{page.description}</p>

      <dl className="grid grid-cols-2 gap-4 rounded-xl border border-gray-200 bg-white p-5 mb-6 text-sm">
        <div>
          <dt className="text-gray-500">Categoria</dt>
          <dd className="font-medium">{page.categories?.name ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Status</dt>
          <dd className="font-medium">{page.status}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Versão</dt>
          <dd className="font-medium">v{page.version}</dd>
        </div>
        <div>
          <dt className="text-gray-500">Estilo</dt>
          <dd className="font-medium">—</dd>
        </div>
      </dl>

      <div className="flex items-center gap-3">
        {hasPreview ? (
          <a
            href={page.preview_desktop_url ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Visualizar
          </a>
        ) : (
          <span className="text-sm text-gray-400">Preview em preparação</span>
        )}
        <DownloadButton pageId={page.id} hasFile={hasFile} />
      </div>
    </div>
  );
}
