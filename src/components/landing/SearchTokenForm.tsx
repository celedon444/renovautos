"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchTokenForm() {
  const [token, setToken] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = token.trim().toUpperCase();
    if (clean) {
      router.push(`/estado/${clean}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-surface-border bg-surface-elevated p-2 sm:p-2.5 shadow-2xl flex items-center gap-2"
    >
      <Search suppressHydrationWarning className="h-4 w-4 text-steel-500 ml-2 shrink-0" />
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="¿Tienes tu código? Ej: TJ-7K9P-2M4X"
        className="w-full bg-transparent text-xs text-white placeholder:text-steel-600 focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white hover:bg-brand-600 transition-colors shadow-md shadow-brand-500/20"
      >
        Consultar
      </button>
    </form>
  );
}
