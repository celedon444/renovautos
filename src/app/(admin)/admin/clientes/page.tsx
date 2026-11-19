import Link from "next/link";
import { getCustomers } from "@/actions/customers";
import CustomerSearch from "@/components/crm/CustomerSearch";
import { Plus, Car, Phone, ChevronRight, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Clientes | Taller Junior" };

export default async function ClientesPage() {
  const { customers, total } = await getCustomers(1, 40);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Directorio de Clientes</h1>
          <p className="text-xs text-steel-400 mt-0.5">{total} clientes registrados en Santa Marta</p>
        </div>

        <Link
          href="/admin/clientes/nuevo"
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 active:scale-95"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Nuevo Cliente</span>
        </Link>
      </div>

      {/* Buscador Universal */}
      <CustomerSearch placeholder="Buscar por placa, nombre de cliente o teléfono..." />

      {/* Lista de Clientes */}
      <div className="space-y-2">
        {customers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-surface-border p-8 text-center bg-surface-elevated/40">
            <Users className="mx-auto h-8 w-8 text-steel-600 mb-2" />
            <p className="text-sm font-medium text-steel-400">No hay clientes registrados aún.</p>
            <Link
              href="/admin/clientes/nuevo"
              className="mt-3 inline-block rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white"
            >
              + Crear Primer Cliente
            </Link>
          </div>
        ) : (
          customers.map((c) => (
            <Link
              key={c.id}
              href={`/admin/clientes/${c.id}`}
              className="flex items-center justify-between p-4 rounded-xl border border-surface-border bg-surface-elevated transition-all hover:border-brand-500/40 hover:bg-steel-900/60"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 font-bold text-base">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-white text-sm truncate">{c.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-steel-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-steel-500" />
                      <span>{c.phone}</span>
                    </span>
                    {c.vehicles.map((v) => (
                      <span key={v.plate} className="flex items-center gap-1 font-mono font-bold text-brand-400">
                        <Car className="h-3 w-3" />
                        <span>{v.plate}</span>
                        <span className="text-[10px] font-normal text-steel-500 font-sans">
                          ({v.brand} {v.model})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 pl-3">
                <span className="hidden sm:inline-block text-[11px] text-steel-500">
                  {formatDate(c.createdAt)}
                </span>
                <ChevronRight className="h-4 w-4 text-steel-500" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
