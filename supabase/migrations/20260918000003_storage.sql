-- ============================================================
-- Storage: buckets
--
-- buckets públicos: acesso por URL pública (previews, assets públicos).
-- buckets privados: SEM política de leitura → acesso somente via signed URL
--                   gerada no servidor (service role). Arquivos premium não
--                   têm URL pública permanente.
-- ============================================================

insert into storage.buckets (id, name, public)
values
  ('page-previews',   'page-previews',   true),
  ('page-files',      'page-files',      false),
  ('component-files', 'component-files', false),
  ('effect-files',    'effect-files',    false),
  ('public-assets',   'public-assets',   true)
on conflict (id) do nothing;
