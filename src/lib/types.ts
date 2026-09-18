// Tipos do catálogo (espelham o schema em supabase/migrations).
// Substituir por `supabase gen types typescript` quando desejar tipos gerados.

export interface Category {
  name: string;
}

export interface Page {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: string;
  version: string | null;
  preview_desktop_url: string | null;
  preview_mobile_url: string | null;
  zip_path: string | null;
  html_path: string | null;
  categories: Category | null;
}

export interface CatalogItem {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string | null;
  preview_url: string | null;
  version: string | null;
}

export interface Favorite {
  id: string;
  pages: Page | null;
}

export interface Entitlement {
  id: string;
  status: string;
  source: string | null;
  started_at: string | null;
  expires_at: string | null;
  products: { slug: string; name: string } | null;
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}
