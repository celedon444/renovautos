"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Car,
  TrendingUp,
  Calendar,
  Wrench,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "./LogoutButton";

const NAV_GROUPS = [
  {
    label: "Operaciones",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
      { label: "Órdenes de Trabajo", href: "/admin/ordenes", icon: ClipboardList },
      { label: "Citas Web", href: "/admin/citas", icon: Calendar },
    ],
  },
  {
    label: "Taller & Clientes",
    items: [
      { label: "Clientes", href: "/admin/clientes", icon: Users },
      { label: "Vehículos (Placas)", href: "/admin/vehiculos", icon: Car },
    ],
  },
  {
    label: "Administración",
    items: [
      { label: "Finanzas & Flujo", href: "/admin/finanzas", icon: TrendingUp },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col border-r border-surface-border bg-surface-elevated md:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-surface-border px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 shadow-md shadow-brand-500/20">
          <Wrench suppressHydrationWarning className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-white leading-tight">Taller Junior</p>
          <p className="text-xs text-steel-400">Santa Marta · Sistema</p>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-steel-500">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-brand-500/15 text-brand-400 font-semibold"
                          : "text-steel-400 hover:bg-steel-800/60 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon suppressHydrationWarning className={cn("h-4 w-4", active ? "text-brand-400" : "text-steel-500")} />
                        <span>{item.label}</span>
                      </div>
                      {active && <ChevronRight suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer con botón de salir */}
      <div className="border-t border-surface-border p-3 space-y-2">
        <LogoutButton />
        <p className="text-center text-[10px] text-steel-600">
          Taller Junior v1.0 · Santa Marta
        </p>
      </div>
    </aside>
  );
}
