import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasProductAccess } from "@/lib/entitlements";

const PRODUCT_SLUG = "high-converting-pages";

/**
 * downloadPage(pageId) — fluxo seguro:
 * 1. identificar usuário;
 * 2. verificar autenticação;
 * 3. verificar entitlement;
 * 4. verificar página publicada + arquivo;
 * 5. gerar signed URL;
 * 6. registrar download;
 * 7. devolver acesso temporário.
 */
export async function POST(request: NextRequest) {
  let pageId: string;
  try {
    const body = await request.json();
    pageId = body?.pageId;
  } catch {
    return NextResponse.json({ error: "Corpo inválido" }, { status: 400 });
  }
  if (!pageId) {
    return NextResponse.json({ error: "pageId obrigatório" }, { status: 400 });
  }

  // 1. identificar usuário + 2. autenticação
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  // 3. entitlement
  const hasAccess = await hasProductAccess(user.id, PRODUCT_SLUG);
  if (!hasAccess) {
    return NextResponse.json(
      { error: "Você não possui acesso a este conteúdo" },
      { status: 403 }
    );
  }

  // 4. página publicada + arquivo
  const admin = createAdminClient();
  const { data: page } = await admin
    .from("pages")
    .select("id, slug, status, zip_path")
    .eq("id", pageId)
    .single();

  if (!page) {
    return NextResponse.json({ error: "Página não encontrada" }, { status: 404 });
  }
  if (page.status !== "published") {
    return NextResponse.json(
      { error: "Página não publicada" },
      { status: 404 }
    );
  }
  if (!page.zip_path) {
    return NextResponse.json(
      { error: "Arquivo em preparação" },
      { status: 404 }
    );
  }

  // 5. signed URL
  const { data: signed, error: signError } = await admin.storage
    .from("page-files")
    .createSignedUrl(page.zip_path, 60);
  if (signError || !signed) {
    return NextResponse.json(
      { error: "Não foi possível gerar o link" },
      { status: 500 }
    );
  }

  // 6. registrar download
  await admin
    .from("downloads")
    .insert({ user_id: user.id, page_id: page.id, download_type: "page" });

  // 7. acesso temporário
  return NextResponse.json({ url: signed.signedUrl });
}
