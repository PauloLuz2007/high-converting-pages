import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/signout-button";

const NAV = [
  { href: "/dashboard", label: "Visão geral" },
  { href: "/dashboard/library", label: "Biblioteca" },
  { href: "/dashboard/components", label: "Componentes" },
  { href: "/dashboard/effects", label: "Efeitos" },
  { href: "/dashboard/favorites", label: "Favoritos" },
  { href: "/dashboard/account", label: "Conta" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // defesa extra (o middleware já protege /dashboard/*)
  if (!user) redirect("/login");

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <aside className="w-60 shrink-0 border-r border-gray-200 bg-white flex flex-col">
        <div className="px-5 py-4 text-sm font-bold border-b border-gray-100">
          50 High-Converting Pages
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6">
          <span className="text-sm text-gray-500">Dashboard</span>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-600">{user.email}</span>
            <SignOutButton />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
