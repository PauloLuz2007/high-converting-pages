-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.pages enable row level security;
alter table public.components enable row level security;
alter table public.effects enable row level security;
alter table public.page_assets enable row level security;
alter table public.entitlements enable row level security;
alter table public.downloads enable row level security;
alter table public.favorites enable row level security;
alter table public.subscriptions enable row level security;

-- profiles: usuário vê/edita apenas o próprio
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = user_id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = user_id);

-- products: autenticado consulta
create policy "products_select" on public.products
  for select using (auth.role() = 'authenticated');

-- categories: autenticado consulta
create policy "categories_select" on public.categories
  for select using (auth.role() = 'authenticated');

-- pages: autenticado consulta apenas publicadas
create policy "pages_select_published" on public.pages
  for select using (auth.role() = 'authenticated' and status = 'published');

-- components: autenticado consulta apenas publicados
create policy "components_select_published" on public.components
  for select using (auth.role() = 'authenticated' and status = 'published');

-- effects: autenticado consulta apenas publicados
create policy "effects_select_published" on public.effects
  for select using (auth.role() = 'authenticated' and status = 'published');

-- page_assets: autenticado consulta assets de páginas publicadas
create policy "page_assets_select" on public.page_assets
  for select using (
    auth.role() = 'authenticated'
    and exists (
      select 1 from public.pages p
      where p.id = page_id and p.status = 'published'
    )
  );

-- entitlements: usuário vê somente os seus
create policy "entitlements_select_own" on public.entitlements
  for select using (auth.uid() = user_id);

-- downloads: usuário vê somente os seus
create policy "downloads_select_own" on public.downloads
  for select using (auth.uid() = user_id);
create policy "downloads_insert_own" on public.downloads
  for insert with check (auth.uid() = user_id);

-- favorites: usuário vê/cria/remove somente os seus
create policy "favorites_select_own" on public.favorites
  for select using (auth.uid() = user_id);
create policy "favorites_insert_own" on public.favorites
  for insert with check (auth.uid() = user_id);
create policy "favorites_delete_own" on public.favorites
  for delete using (auth.uid() = user_id);

-- subscriptions: usuário vê somente as suas
create policy "subscriptions_select_own" on public.subscriptions
  for select using (auth.uid() = user_id);
