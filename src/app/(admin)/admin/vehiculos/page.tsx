import Link from "next/link";
import { getAllVehicles } from "@/actions/vehicles";
import CustomerSearch from "@/components/crm/CustomerSearch";
import { Car, User, Wrench, ChevronRight, Droplet } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vehículos y Placas | Taller Junior" };

export default async function VehiculosPage() {
  const vehicles = await getAllVehicles();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Hojas de Vida por Placa</h1>
          <p className="text-xs text-steel-400 mt-0.5">
            Trazabilidad técnica automotriz: historial de reparaciones y aceites.
          </p>
        </div>
      </div>

      {/* Buscador Rápido de Placa */}
      <CustomerSearch
        placeholder="Escribe la placa (ej: ABC-123) o nombre de cliente..."
        navigateTo="vehicle"
      />

      {/* Lista de Vehículos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {vehicles.map((v) => (
          <Link
            key={v.id}
            href={`/admin/vehiculos/${v.plate}`}
            className="flex flex-col justify-between p-4 rounded-xl border border-surface-border bg-surface-elevated transition-all hover:border-brand-500/40 hover:bg-steel-900/60"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-black text-brand-400 tracking-wider">
                  {v.plate}
                </span>
                <span className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-semibold text-steel-400 border border-surface-border">
                  {v._count.workOrders} visitas
                </span>
              </div>

              <p className="text-sm font-bold text-white mt-1">
                {v.brand} {v.model} ({v.year})
              </p>

              <p className="text-xs text-steel-400 mt-1 flex items-center gap-1.5">
                <User className="h-3 w-3 text-steel-500" />
                <span>{v.customer.name}</span>
              </p>

              {v.oilType && (
                <p className="text-xs text-brand-400 mt-2 flex items-center gap-1">
                  <Droplet className="h-3 w-3" />
                  <span>{v.oilType}</span>
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs text-steel-500">
              <span>Ver hoja de vida</span>
              <ChevronRight className="h-3.5 w-3.5 text-steel-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
