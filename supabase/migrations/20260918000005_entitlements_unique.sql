-- ============================================================
-- Constraint de unicidade em entitlements (1 por usuário/produto)
-- ============================================================

alter table public.entitlements
  add constraint entitlements_user_product_unique unique (user_id, product_id);
