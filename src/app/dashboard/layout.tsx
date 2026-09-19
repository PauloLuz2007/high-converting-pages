import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/signout-button";
import NavLink from "@/components/nav-link";

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

  if (!user) redirect("/login");

  return (
    <div className="flex h-screen bg-background text-foreground">
      <aside className="w-60 shrink-0 border-r border-border bg-surface flex flex-col">
        <div className="px-5 py-4 font-display font-bold text-lg tracking-tight border-b border-border">
          50<span className="text-primary">.</span>Pages
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border bg-surface flex items-center justify-between px-6">
          <span className="text-sm text-muted">Dashboard</span>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted">{user.email}</span>
            <SignOutButton />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
