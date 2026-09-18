-- ============================================================
-- high-converting-pages — schema inicial
-- ============================================================

-- helper: atualiza updated_at automaticamente
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- profiles (1:1 com auth.users)
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  full_name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- products
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- pages
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  preview_desktop_url text,
  preview_mobile_url text,
  zip_path text,
  html_path text,
  status text not null default 'draft',
  version text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- components
create table public.components (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  category text,
  preview_url text,
  file_path text,
  version text,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- effects
create table public.effects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  category text,
  preview_url text,
  file_path text,
  version text,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- page_assets (append-only)
create table public.page_assets (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  asset_type text not null,
  file_path text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- entitlements
create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  status text not null default 'active',
  source text,
  external_reference text,
  started_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- downloads (append-only)
create table public.downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  page_id uuid references public.pages(id) on delete set null,
  download_type text,
  created_at timestamptz not null default now()
);

-- favorites
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  page_id uuid not null references public.pages(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, page_id)
);

-- subscriptions
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text,
  external_id text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- triggers updated_at
create trigger trg_profiles_updated before update on public.profiles for each row execute function public.set_updated_at();
create trigger trg_products_updated before update on public.products for each row execute function public.set_updated_at();
create trigger trg_categories_updated before update on public.categories for each row execute function public.set_updated_at();
create trigger trg_pages_updated before update on public.pages for each row execute function public.set_updated_at();
create trigger trg_components_updated before update on public.components for each row execute function public.set_updated_at();
create trigger trg_effects_updated before update on public.effects for each row execute function public.set_updated_at();
create trigger trg_entitlements_updated before update on public.entitlements for each row execute function public.set_updated_at();
create trigger trg_subscriptions_updated before update on public.subscriptions for each row execute function public.set_updated_at();
