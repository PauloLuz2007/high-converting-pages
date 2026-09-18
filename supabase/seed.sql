-- ============================================================
-- Seed (somente desenvolvimento)
-- ============================================================

-- categorias
insert into public.categories (slug, name, description) values
  ('sales', 'Sales', 'Páginas de venda direta'),
  ('lead-generation', 'Lead Generation', 'Captura de leads'),
  ('vsl', 'VSL', 'Video Sales Letter'),
  ('webinar-event', 'Webinar / Evento', 'Inscrição em webinar/evento'),
  ('high-ticket', 'High Ticket', 'Oferta de alto valor');

-- produto
insert into public.products (slug, name, description, status) values
  ('high-converting-pages', '50 High-Converting Pages', 'Biblioteca de 50 páginas de alta conversão, componentes e efeitos.', 'active');

-- 3 páginas de teste (P003 propositalmente em 'draft' para testar o caso "não publicada")
insert into public.pages (slug, name, description, category_id, status, version) values
  ('p001', 'P001 — Landing de Venda', 'Página fictícia de teste — venda direta (arquivo em preparação).',
    (select id from public.categories where slug = 'sales'), 'published', '1.0.0'),
  ('p002', 'P002 — Captura de Lead', 'Página fictícia de teste — captura de lead (arquivo em preparação).',
    (select id from public.categories where slug = 'lead-generation'), 'published', '1.0.0'),
  ('p003', 'P003 — Webinar', 'Página fictícia de teste — inscrição em webinar (arquivo em preparação).',
    (select id from public.categories where slug = 'webinar-event'), 'draft', '0.9.0');
