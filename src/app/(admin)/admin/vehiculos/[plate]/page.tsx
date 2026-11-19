import { notFound } from "next/navigation";
import Link from "next/link";
import { getVehicleHistory } from "@/actions/vehicles";
import { formatCOP, formatDate, ORDER_STATUS_CONFIG } from "@/lib/utils";
import {
  Car,
  User,
  Phone,
  Droplet,
  Plus,
  ArrowLeft,
  Wrench,
  Gauge,
  Camera,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ plate: string }>;
}

export default async function VehicleHistoryPage({ params }: Props) {
  const { plate } = await params;
  const vehicle = await getVehicleHistory(plate);
  if (!vehicle) notFound();

  const totalFacturado = vehicle.workOrders.reduce((acc, o) => acc + o.totalAmount, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <Link
          href="/admin/vehiculos"
          className="flex items-center gap-2 text-xs font-semibold text-steel-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a Vehículos</span>
        </Link>
        <Link
          href={`/admin/ordenes/nueva?plate=${vehicle.plate}`}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 active:scale-95"
        >
          <Plus className="h-3.5 w-3.5 stroke-[3]" />
          <span>Nueva Orden para este Auto</span>
        </Link>
      </div>

      {/* Ficha Técnica Principal */}
      <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl font-black text-brand-400 tracking-wider">
                {vehicle.plate}
              </span>
              <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-bold text-steel-300 border border-surface-border">
                {vehicle.year}
              </span>
            </div>
            <h1 className="text-xl font-bold text-white mt-1">
              {vehicle.brand} {vehicle.model}
            </h1>
          </div>

          <div className="rounded-xl bg-surface p-3 border border-surface-border flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-brand-500/15 flex items-center justify-center text-brand-400">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-steel-500">Propietario:</p>
              <Link
                href={`/admin/clientes/${vehicle.customer.id}`}
                className="text-sm font-bold text-white hover:text-brand-400 transition-colors"
              >
                {vehicle.customer.name}
              </Link>
              <p className="text-xs text-steel-400">{vehicle.customer.phone}</p>
            </div>
          </div>
        </div>

        {/* Especificaciones Clave */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-surface-border pt-4">
          <div className="rounded-xl bg-surface p-3 border border-surface-border">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-400 mb-1">
              <Droplet className="h-3.5 w-3.5" />
              <span>Aceite Motor</span>
            </div>
            <p className="text-sm font-bold text-white truncate">
              {vehicle.oilType ?? "No especificado"}
            </p>
          </div>

          <div className="rounded-xl bg-surface p-3 border border-surface-border">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-steel-400 mb-1">
              <Wrench className="h-3.5 w-3.5" />
              <span>Cilindraje / Motor</span>
            </div>
            <p className="text-sm font-bold text-white truncate">
              {vehicle.engineType ?? "Estándar"}
            </p>
          </div>

          <div className="rounded-xl bg-surface p-3 border border-surface-border">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-steel-400 mb-1">
              <Car className="h-3.5 w-3.5" />
              <span>Transmisión</span>
            </div>
            <p className="text-sm font-bold text-white truncate">
              {vehicle.transmission ?? "Manual"}
            </p>
          </div>

          <div className="rounded-xl bg-surface p-3 border border-surface-border">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-steel-400 mb-1">
              <Gauge className="h-3.5 w-3.5" />
              <span>Visitas / Gasto</span>
            </div>
            <p className="text-sm font-bold text-white truncate">
              {vehicle.workOrders.length} | {formatCOP(totalFacturado)}
            </p>
          </div>
        </div>

        {vehicle.notes && (
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3.5 text-xs text-amber-300 flex items-start gap-2.5">
            <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <p className="font-bold">Observación Técnica Permanente:</p>
              <p className="mt-0.5">{vehicle.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Historial Cronológico de Órdenes */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Wrench className="h-4 w-4 text-brand-400" />
          <span>Historial de Visitas y Reparaciones ({vehicle.workOrders.length})</span>
        </h2>

        {vehicle.workOrders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-surface-border p-8 text-center bg-surface-elevated/40">
            <p className="text-sm text-steel-400">Este vehículo no tiene visitas registradas aún.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {vehicle.workOrders.map((order) => {
              const cfg = ORDER_STATUS_CONFIG[order.status];
              return (
                <div
                  key={order.id}
                  className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-black text-white">
                          {order.orderNumber}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badgeBg}`}>
                          {cfg.emoji} {cfg.label}
                        </span>
                      </div>
                      <p className="text-xs text-steel-400 mt-1">
                        Ingreso: {formatDate(order.createdAt)}
                        {order.mileageIn && ` · ${order.mileageIn.toLocaleString("es-CO")} km`}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="text-base font-black text-white">{formatCOP(order.totalAmount)}</p>
                      <Link
                        href={`/admin/ordenes/${order.id}`}
                        className="rounded-lg bg-surface border border-surface-border p-2 text-steel-400 hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Falla reportada y trabajo realizado */}
                  <div className="rounded-xl bg-surface p-3 text-xs space-y-1.5 border border-surface-border">
                    <p className="text-steel-300">
                      <span className="font-bold text-brand-400">Falla:</span> {order.symptoms}
                    </p>
                    {order.workDone && (
                      <p className="text-steel-300">
                        <span className="font-bold text-green-400">Trabajo realizado:</span> {order.workDone}
                      </p>
                    )}
                  </div>

                  {/* Repuestos Usados */}
                  {order.items.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-semibold text-steel-500">Repuestos:</span>
                      {order.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-surface px-2 py-0.5 text-[11px] text-steel-300 border border-surface-border"
                        >
                          {item.description}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Fotos de Evidencia */}
                  {order.photos.length > 0 && (
                    <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                      {order.photos.map((p) => (
                        <a
                          key={p.id}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-14 w-14 shrink-0 rounded-lg overflow-hidden border border-surface-border relative group"
                        >
                          <img
                            src={p.url}
                            alt={p.caption ?? "Foto evidencia"}
                            className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
