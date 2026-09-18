# Setup

Passo a passo para clonar, configurar e desenvolver.

## GitHub

1. Clone (repositório privado):

```bash
git clone https://github.com/<owner>/high-converting-pages.git
cd high-converting-pages
```

2. Branch padrão: `main`.

3. CI: `.github/workflows/ci.yml` roda `install`, `lint`, `typecheck` e `build` a cada push.

## Supabase

1. O projeto está vinculado ao ref registrado em `docs/PROJECT-IDENTITY.md`.

2. Vincular localmente (se ainda não estiver):

```bash
supabase init
supabase link --project-ref <project_ref>
```

3. Aplicar schema (migrations versionadas):

```bash
supabase db push --dry-run   # confere o diff
supabase db push             # aplica
```

4. Seed de desenvolvimento:

```bash
# manual (exemplo)
psql "$DATABASE_URL" -f supabase/seed.sql
```

## Environment

Crie `.env.local` (copie de `.env.example`):

```bash
cp .env.example .env.local
```

Preencha:

- `NEXT_PUBLIC_SUPABASE_URL` → `https://<project_ref>.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon key do projeto (painel Supabase → Settings → API)

A `service_role` key **não** vai no frontend.

## Local development

```bash
npm install
npm run dev
```

Fluxos a validar manualmente:

1. signup
2. login
3. dashboard protegida (não autenticado → redirect)
4. usuário sem entitlement
5. página publicada
6. página não publicada
7. favorite
8. download sem entitlement (403)
9. download com entitlement
10. signed URL
11. RLS (testar select entre usuários diferentes)

## Verificações de qualidade

```bash
npm run lint          # ESLint
npx tsc --noEmit      # typecheck
npm run build         # build de produção
```
