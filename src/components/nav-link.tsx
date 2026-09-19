"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={`rounded-lg px-3 py-2 text-sm transition ${
        isActive
          ? "bg-primary-subtle text-primary font-medium"
          : "text-muted hover:bg-subtle hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
