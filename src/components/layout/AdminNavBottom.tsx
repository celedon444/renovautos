"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  TrendingUp,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Inicio",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Órdenes",
    href: "/admin/ordenes",
    icon: ClipboardList,
  },
  {
    label: "Nueva",
    href: "/admin/ordenes/nueva",
    icon: Plus,
    isAction: true,
  },
  {
    label: "Clientes",
    href: "/admin/clientes",
    icon: Users,
  },
  {
    label: "Finanzas",
    href: "/admin/finanzas",
    icon: TrendingUp,
  },
];

export default function AdminNavBottom() {
  const pathname = usePathname();

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center border-t border-surface-border bg-surface-elevated/95 backdrop-blur-md md:hidden">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.href, item.exact);

        if (item.isAction) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-1 flex-col items-center justify-center"
            >
              <span className="absolute -top-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 shadow-lg shadow-brand-500/40 transition-transform active:scale-95">
                <Icon suppressHydrationWarning className="h-7 w-7 text-white stroke-[2.5]" />
              </span>
              <span className="mt-7 text-[10px] font-semibold text-brand-400">
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors active:scale-95",
              active ? "text-brand-400" : "text-steel-400 hover:text-steel-200"
            )}
          >
            <Icon suppressHydrationWarning className={cn("h-5 w-5", active ? "text-brand-400" : "text-steel-500")} />
            <span className="text-[10px] font-medium leading-none">
              {item.label}
            </span>
            {active && (
              <span className="absolute top-0 h-0.5 w-6 rounded-full bg-brand-500" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
