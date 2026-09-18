# high-converting-pages

Dashboard e biblioteca de páginas de alta conversão, componentes, efeitos e materiais complementares. Produto vendido via Cakto — o cliente compra, recebe acesso (entitlement) e navega por um catálogo de páginas prontas para download.

> Nome provisório do produto: **50 High-Converting Pages**.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Supabase** (Auth + Postgres + Storage)
- **ESLint** (config do Next)

## Pré-requisitos

- Node.js 20+
- npm
- Supabase CLI (`supabase`)

## Instalação

```bash
npm install
```

## Configuração de ambiente

Crie um `.env.local` na raiz (nunca versionado):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project_ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
```

Use `.env.example` como referência de quais variáveis são necessárias.

> **Nunca** coloque a `service_role` key no navegador, no código frontend, no
> GitHub, no README ou em commits.

## Iniciar (desenvolvimento)

```bash
npm run dev
```

Abra http://localhost:3000.

## Migrations (Supabase)

O schema é versionado em `supabase/migrations/`.

```bash
supabase db push           # aplica migrations no projeto vinculado
supabase db push --dry-run # visualiza o diff antes de aplicar
```

Para ver o estado do vínculo:

```bash
supabase projects list
```

## Seed (dados de desenvolvimento)

O seed de categorias e registros de teste vive em `supabase/seed.sql`.

## Lint / typecheck / build

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Testes

A cobertura de QA (signup, login, dashboard protegida, entitlement, download
protegido, RLS) está descrita em `docs/SETUP.md`.

## Documentação

- `docs/PROJECT-IDENTITY.md` — identidade, contas, URLs e refs.
- `docs/ARCHITECTURE.md` — arquitetura (frontend, auth, banco, storage, entitlements, downloads).
- `docs/SETUP.md` — setup completo (GitHub, Supabase, ambiente, dev local).
