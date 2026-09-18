import { createClient } from "@/lib/supabase/server";
import type { Entitlement, Profile } from "@/lib/types";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profileData } = await supabase
    .from("profiles")
    .select("id, full_name, email, avatar_url, created_at")
    .eq("user_id", user!.id)
    .maybeSingle();

  const profile = profileData as unknown as Profile | null;

  const { data: entData } = await supabase
    .from("entitlements")
    .select("id, status, source, started_at, expires_at, products(slug, name)")
    .eq("status", "active");

  const entitlements = (entData ?? []) as unknown as Entitlement[];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Conta</h1>

      <div className="rounded-xl border border-gray-200 bg-white p-5 mb-6">
        <h2 className="font-semibold mb-3">Perfil</h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Nome</dt>
            <dd className="font-medium">{profile?.full_name || "—"}</dd>
          </div>
          <div>
            <dt className="text-gray-500">E-mail</dt>
            <dd className="font-medium">{profile?.email || user?.email}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold mb-3">Acessos (entitlements)</h2>
        {entitlements.length > 0 ? (
          <ul className="flex flex-col gap-2 text-sm">
            {entitlements.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
              >
                <span className="font-medium">
                  {e.products?.name ?? e.products?.slug ?? "Produto"}
                </span>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                  {e.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">
            Nenhum acesso ativo. Ao adquirir o produto, seu acesso aparecerá
            aqui automaticamente.
          </p>
        )}
      </div>
    </div>
  );
}
