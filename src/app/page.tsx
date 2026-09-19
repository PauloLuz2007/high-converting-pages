import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <header className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <span className="font-display font-bold text-lg tracking-tight">
          50<span className="text-primary">.</span>Pages
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm text-muted hover:text-foreground transition"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition"
          >
            Criar conta
          </Link>
        </div>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted mb-6">
          Biblioteca de páginas de alta conversão
        </span>
        <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05]">
          50 páginas prontas para converter mais
        </h1>
        <p className="mt-6 text-lg text-muted max-w-xl">
          Landing pages, componentes e efeitos testados para alta conversão.
          Acesse, personalize e publique em minutos.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition"
          >
            Começar agora
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-subtle transition"
          >
            Entrar na dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
