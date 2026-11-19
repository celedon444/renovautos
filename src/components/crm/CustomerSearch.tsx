"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { searchCustomers } from "@/actions/customers";
import { Search, Car, Phone, Loader2, User } from "lucide-react";

type SearchResult = Awaited<ReturnType<typeof searchCustomers>>[0];

interface CustomerSearchProps {
  placeholder?: string;
  onSelect?: (customer: SearchResult) => void;
  navigateTo?: "customer" | "vehicle";
}

export default function CustomerSearch({
  placeholder = "Buscar por placa, nombre o teléfono...",
  onSelect,
  navigateTo = "customer",
}: CustomerSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    startTransition(async () => {
      const data = await searchCustomers(debouncedQuery);
      setResults(data);
      setOpen(true);
    });
  }, [debouncedQuery]);

  const handleSelect = (customer: SearchResult) => {
    setOpen(false);
    setQuery("");

    if (onSelect) {
      onSelect(customer);
      return;
    }

    if (navigateTo === "vehicle" && customer.vehicles[0]) {
      router.push(`/admin/vehiculos/${customer.vehicles[0].plate}`);
    } else {
      router.push(`/admin/clientes/${customer.id}`);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        {isPending ? (
          <Loader2 className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-brand-500" />
        ) : (
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
        )}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-surface-border bg-surface-elevated pl-10 pr-4 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 max-h-80 overflow-y-auto rounded-xl border border-surface-border bg-surface-elevated shadow-2xl">
          {results.map((customer) => (
            <button
              key={customer.id}
              onClick={() => handleSelect(customer)}
              className="flex w-full items-start gap-3 p-3.5 text-left border-b border-surface-border/50 last:border-0 hover:bg-surface transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 font-bold text-xs mt-0.5">
                <User className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white text-sm truncate">{customer.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-steel-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-steel-500" />
                    <span>{customer.phone}</span>
                  </span>
                  {customer.vehicles.map((v) => (
                    <span key={v.id} className="flex items-center gap-1 font-mono font-bold text-brand-400">
                      <Car className="h-3 w-3" />
                      <span>{v.plate}</span>
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {open && results.length === 0 && query.length >= 2 && !isPending && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 rounded-xl border border-surface-border bg-surface-elevated p-4 text-center text-xs text-steel-400 shadow-2xl">
          No se encontró ningún cliente o vehículo con esa placa.
        </div>
      )}
    </div>
  );
}
