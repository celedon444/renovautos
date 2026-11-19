import Link from "next/link";
import { getWorkOrders } from "@/actions/workorders";
import { formatCOP, formatDate, ORDER_STATUS_CONFIG } from "@/lib/utils";
import { Plus, Car, User, ChevronRight, Camera, Wrench } from "lucide-react";
import type { WorkOrderStatus } from "@prisma/client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Órdenes de Trabajo | Taller Junior" };

const STATUS_FILTERS: { label: string; value: WorkOrderStatus | "ALL" }[] = [
  { label: "Activas", value: "ALL" },
  { label: "Recibidos", value: "RECEIVED" },
  { label: "Diagnóstico", value: "DIAGNOSING" },
  { label: "En Reparación", value: "IN_REPAIR" },
  { label: "Listos", value: "READY" },
  { label: "Entregados", value: "DELIVERED" },
];

interface Props {
  searchParams: Promise<{ status?: WorkOrderStatus | "ALL" }>;
}

export default async function OrdenesPage({ searchParams }: Props) {
  const { status = "ALL" } = await searchParams;
  const { orders, total } = await getWorkOrders(status);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Órdenes de Trabajo</h1>
          <p className="text-xs text-steel-400 mt-0.5">{total} órdenes en vista</p>
        </div>

        <Link
          href="/admin/ordenes/nueva"
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 active:scale-95"
        >
          <Plus className="h-4 w-4 stroke-[3]" />
          <span>Nueva Orden</span>
        </Link>
      </div>

      {/* Filtros de Estado */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {STATUS_FILTERS.map((f) => (
          <Link
            key={f.value}
            href={`/admin/ordenes?status=${f.value}`}
            className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              status === f.value
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                : "border border-surface-border bg-surface-elevated text-steel-400 hover:text-white"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {/* Lista de Órdenes */}
      <div className="space-y-2.5">
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-surface-border p-8 text-center bg-surface-elevated/40">
            <Wrench className="mx-auto h-8 w-8 text-steel-600 mb-2" />
            <p className="text-sm font-medium text-steel-400">No hay órdenes en este filtro.</p>
            <Link
              href="/admin/ordenes/nueva"
              className="mt-3 inline-block rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white"
            >
              + Crear Nueva Orden
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            const cfg = ORDER_STATUS_CONFIG[order.status];
            return (
              <Link
                key={order.id}
                href={`/admin/ordenes/${order.id}`}
                className="flex items-center justify-between p-4 rounded-xl border border-surface-border bg-surface-elevated transition-all hover:border-brand-500/40 hover:bg-steel-900/60"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface border border-surface-border font-mono font-black text-brand-400 text-xs">
                    {order.vehicle.plate.slice(0, 3)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-white text-sm">
                        {order.vehicle.plate}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${cfg.badgeBg}`}>
                        {cfg.emoji} {cfg.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-xs text-steel-400 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Car className="h-3 w-3 text-steel-500" />
                        <span>{order.vehicle.brand} {order.vehicle.model}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3 text-steel-500" />
                        <span>{order.vehicle.customer.name}</span>
                      </span>
                      {order._count.photos > 0 && (
                        <span className="flex items-center gap-1 text-brand-400 font-semibold">
                          <Camera className="h-3 w-3" />
                          <span>{order._count.photos} fotos</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-3 flex items-center gap-3">
                  <div>
                    <p className="text-sm font-black text-white">{formatCOP(order.totalAmount)}</p>
                    <p className="text-[10px] text-steel-500 font-mono">{order.orderNumber}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-steel-500" />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
