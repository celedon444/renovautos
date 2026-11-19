"use client";

import { Wrench, Phone } from "lucide-react";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-surface-border bg-surface-elevated/80 px-6 backdrop-blur-md md:flex">
      <div className="flex items-center gap-2">
        <span className="rounded-md bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-400 border border-brand-500/20">
          Modo Taller Unipersonal
        </span>
        <span className="text-xs text-steel-400">Santa Marta, Colombia</span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="text-xs font-medium text-steel-400 hover:text-brand-400 transition-colors"
        >
          Ver Landing Page ↗
        </Link>
        <div className="flex items-center gap-2 text-xs text-steel-400 border-l border-surface-border pl-4">
          <Phone suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400" />
          <span>+57 302 544 9422</span>
        </div>
      </div>
    </header>
  );
}
