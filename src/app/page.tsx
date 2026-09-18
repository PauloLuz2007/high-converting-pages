import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        50 High-Converting Pages
      </h1>
      <p className="text-lg text-gray-600 max-w-xl">
        Biblioteca de páginas de alta conversão, componentes e efeitos.
        Acesse sua dashboard para explorar o catálogo.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Entrar
        </Link>
        <Link
          href="/signup"
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium hover:bg-gray-50"
        >
          Criar conta
        </Link>
      </div>
    </main>
  );
}
