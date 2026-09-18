import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Abstração de entitlement.
 *
 * Regra de negócio (futuro): Cakto → webhook → backend → entitlement.
 * O webhook da Cakto ainda NÃO está implementado; estas funções são o ponto
 * único de integração para quando ele existir.
 */

async function getProductBySlug(slug: string) {
  const admin = createAdminClient();
  const { data } = await admin
    .from("products")
    .select("id")
    .eq("slug", slug)
    .single();
  return data;
}

export async function hasProductAccess(
  userId: string,
  productSlug: string
): Promise<boolean> {
  const product = await getProductBySlug(productSlug);
  if (!product) return false;

  const admin = createAdminClient();
  const { data } = await admin
    .from("entitlements")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", product.id)
    .eq("status", "active")
    .maybeSingle();

  return !!data;
}

export async function grantProductAccess(
  userId: string,
  productSlug: string,
  opts: {
    source?: string;
    externalReference?: string;
    expiresAt?: string;
  } = {}
): Promise<string> {
  const product = await getProductBySlug(productSlug);
  if (!product) throw new Error(`Produto não encontrado: ${productSlug}`);

  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("entitlements")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", product.id)
    .maybeSingle();

  const payload = {
    user_id: userId,
    product_id: product.id,
    status: "active",
    source: opts.source ?? "manual",
    external_reference: opts.externalReference ?? null,
    started_at: new Date().toISOString(),
    expires_at: opts.expiresAt ?? null,
  };

  if (existing) {
    const { error } = await admin
      .from("entitlements")
      .update(payload)
      .eq("id", existing.id);
    if (error) throw error;
    return existing.id;
  }

  const { data, error } = await admin
    .from("entitlements")
    .insert(payload)
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

export async function revokeProductAccess(
  userId: string,
  productSlug: string
): Promise<void> {
  const product = await getProductBySlug(productSlug);
  if (!product) throw new Error(`Produto não encontrado: ${productSlug}`);

  const admin = createAdminClient();
  const { error } = await admin
    .from("entitlements")
    .update({ status: "revoked" })
    .eq("user_id", userId)
    .eq("product_id", product.id);

  if (error) throw error;
}
