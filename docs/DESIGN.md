# Design System

Identidade visual do **high-converting-pages**. Usar os mesmos tokens e fontes
em todas as páginas (landing, dashboard e as 50 páginas da biblioteca).

## Fontes

Carregadas via `next/font/google` em `src/app/layout.tsx`:

| Papel            | Fonte           | Variável CSS        | Utility       |
|------------------|-----------------|---------------------|---------------|
| Títulos / marca  | Space Grotesk   | `--font-space-grotesk` | `font-display` |
| Texto / UI       | Inter           | `--font-inter`      | `font-sans` (default) |

Uso:

```tsx
<h1 className="font-display font-bold tracking-tight">Título</h1>
<p className="text-muted">Corpo em Inter (padrão do body).</p>
```

Dica: títulos em Space Grotesk ficam melhores com `tracking-tight`
(letter-spacing negativo leve).

## Cores

Definidas em `src/app/globals.css` (`@theme`). Todas geram utilities
(`bg-*`, `text-*`, `border-*`).

| Token                  | Hex       | Uso                              |
|------------------------|-----------|----------------------------------|
| `background`           | `#fafafa` | fundo geral                      |
| `foreground`           | `#0a0a0a` | texto principal                  |
| `primary`              | `#4f46e5` | acento (CTAs, ativo)             |
| `primary-hover`        | `#4338ca` | hover do acento                  |
| `primary-foreground`   | `#ffffff` | texto sobre o acento             |
| `primary-subtle`       | `#eef2ff` | fundo de destaque leve           |
| `muted`                | `#6b7280` | texto secundário                 |
| `subtle`               | `#f4f4f5` | fundo de hover/superfícies       |
| `border`               | `#e5e7eb` | bordas                           |
| `surface`              | `#ffffff` | cards / painéis                  |

Exemplos:

```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary-hover">CTA</button>
<div className="rounded-xl border border-border bg-surface p-5">Card</div>
<span className="text-muted">Texto secundário</span>
```

## Convenções

- **Raio (border-radius)**: `rounded-lg` (8px) em botões/inputs, `rounded-xl`
  (12px) em cards.
- **Espaçamento**: escala padrão do Tailwind; seções com `p-6` no conteúdo da
  dashboard.
- **Sombras**: manter leve (`shadow-sm`) para cards em hover, se necessário.

## Aplicação nas 50 páginas

Cada página da biblioteca deve importar o CSS global (herdado do App Router) e
usar `font-display` nos títulos + a paleta de tokens acima, para manter a
identidade consistente entre a dashboard e o conteúdo entregue.
