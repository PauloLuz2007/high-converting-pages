# Arquitetura

Visão geral da fundação técnica do **high-converting-pages**.

## Frontend

- **Next.js 16 (App Router)** com `src/` e import alias `@/*`.
- **TypeScript** em todo o código.
- **Tailwind CSS v4** (config via CSS, `@import "tailwindcss"`).
- Estrutura de rotas:

```
src/app/
  (auth)/
    login/
    signup/
    forgot-password/
  dashboard/            # protegida
    layout.tsx          # sidebar + topbar
    page.tsx            # /dashboard
    library/
    pages/[slug]/
    components/
    effects/
    favorites/
    account/
  lib/                  # client supabase, helpers
  components/           # UI compartilhada
```

## Auth

- Supabase Auth com **email/password** (Google OAuth fica para depois).
- Middleware de proteção: usuário não autenticado não acessa `/dashboard/*`.
- Sessão gerenciada pelo `@supabase/ssr` (cookies).

## Database (Postgres via Supabase)

Tabelas iniciais (todas com `id`, `created_at`, `updated_at`; `deleted_at` onde fizer sentido):

| Tabela        | Propósito                                          |
|---------------|----------------------------------------------------|
| profiles      | dados do usuário (1:1 com `auth.users`)            |
| products      | produtos (ex.: "50 High-Converting Pages")         |
| categories    | categorias do catálogo                             |
| pages         | páginas de alta conversão                          |
| components    | componentes reutilizáveis                          |
| effects       | efeitos visuais                                    |
| page_assets   | assets associados a uma página                     |
| entitlements  | acesso do usuário a um produto                     |
| downloads     | registro de downloads                              |
| favorites     | favoritos do usuário                               |
| subscriptions | assinatura / vínculo com a Cakto                   |

Schema completo em `supabase/migrations/`.

## RLS (Row Level Security)

RLS habilitado em todas as tabelas. Regras básicas:

- Páginas/componentes/effects **publicados** → visíveis para usuário autenticado.
- `favorites`, `downloads`, `entitlements` → cada usuário vê **somente os seus**.
- Sem entitlement → sem acesso a arquivos protegidos.

A autorização acontece no servidor/Supabase (nunca confiar só na interface).

## Storage

Buckets separados:

| Bucket          | Visibilidade        |
|-----------------|---------------------|
| page-previews   | pública (previews)  |
| page-files      | privada (signed URL)|
| component-files | privada            |
| effect-files    | privada            |
| public-assets   | pública            |

Arquivos premium **não** têm URL pública permanente — usam **signed URLs** e o download é registrado.

## Entitlements

Regra de negócio (preparada para Cakto):

```
Cakto → webhook → backend → entitlement
```

Abstração interna (webhook da Cakto ainda NÃO implementado):

- `grantProductAccess(userId, productId)`
- `revokeProductAccess(userId, productId)`
- `hasProductAccess(userId, productId)`

## Downloads

Fluxo seguro (`downloadPage(pageId)`):

1. identificar usuário;
2. verificar autenticação;
3. verificar entitlement;
4. verificar página publicada;
5. gerar signed URL;
6. registrar download;
7. devolver acesso temporário.

Sem entitlement → `403`.

## Integração futura com a Cakto

- Webhook de confirmação de compra → cria/atualiza `entitlements` e `subscriptions`.
- A estrutura de dados já suporta `source`, `external_reference`, `status`.
