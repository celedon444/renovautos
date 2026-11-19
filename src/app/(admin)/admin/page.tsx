import Link from "next/link";
import { getFinancialSummary } from "@/actions/expenses";
import { getWorkOrders } from "@/actions/workorders";
import { getAppointments } from "@/actions/appointments";
import { formatCOP, ORDER_STATUS_CONFIG } from "@/lib/utils";
import {
  Car,
  Wrench,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Plus,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dashboard Taller" };

export default async function AdminDashboardPage() {
  const [finances, { orders }, appointments] = await Promise.all([
    getFinancialSummary(),
    getWorkOrders("ALL", 1, 6),
    getAppointments("PENDING"),
  ]);

  return (
    <div className="space-y-6">
      {/* Top Banner / Saludo */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-surface-border pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>¡Hola, Kilmer!</span>
            <span className="text-sm font-normal text-brand-400 border border-brand-500/20 bg-brand-500/10 px-2.5 py-0.5 rounded-full">
              Santa Marta
            </span>
          </h1>
          <p className="text-xs text-steel-400 mt-1">
            Resumen operativo y financiero de tu taller hoy.
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/ordenes/nueva"
            className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 active:scale-95"
          >
            <Plus suppressHydrationWarning className="h-4 w-4 stroke-[3]" />
            <span>Nueva Orden</span>
          </Link>
          <Link
            href="/admin/vehiculos"
            className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-elevated px-3.5 py-2.5 text-sm font-medium text-steel-200 transition-colors hover:border-brand-500/40 hover:text-white"
          >
            <Car suppressHydrationWarning className="h-4 w-4 text-brand-400" />
            <span>Buscar Placa</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {/* En Taller */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4">
          <div className="flex items-center justify-between text-steel-400 text-xs">
            <span>En taller</span>
            <Wrench suppressHydrationWarning className="h-4 w-4 text-blue-400" />
          </div>
          <p className="mt-2 text-2xl font-black text-white">{finances.activeOrders}</p>
          <p className="text-[11px] text-steel-500 mt-0.5">Órdenes activas</p>
        </div>

        {/* Listos para entrega */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4">
          <div className="flex items-center justify-between text-steel-400 text-xs">
            <span>Listos</span>
            <CheckCircle2 suppressHydrationWarning className="h-4 w-4 text-green-400" />
          </div>
          <p className="mt-2 text-2xl font-black text-green-400">{finances.readyOrders}</p>
          <p className="text-[11px] text-steel-500 mt-0.5">Por retirar / cobrar</p>
        </div>

        {/* Ingresos Mes */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4">
          <div className="flex items-center justify-between text-steel-400 text-xs">
            <span>Ingresos Mes</span>
            <TrendingUp suppressHydrationWarning className="h-4 w-4 text-green-400" />
          </div>
          <p className="mt-2 text-lg sm:text-xl font-black text-white truncate">
            {formatCOP(finances.totalIncome)}
          </p>
          <p className="text-[11px] text-green-400 mt-0.5">Cobrado</p>
        </div>

        {/* Gastos Mes */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4">
          <div className="flex items-center justify-between text-steel-400 text-xs">
            <span>Gastos Mes</span>
            <TrendingDown suppressHydrationWarning className="h-4 w-4 text-red-400" />
          </div>
          <p className="mt-2 text-lg sm:text-xl font-black text-white truncate">
            {formatCOP(finances.totalExpenses)}
          </p>
          <p className="text-[11px] text-red-400 mt-0.5">Repuestos y fijos</p>
        </div>

        {/* Utilidad Neta */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1 rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-transparent p-4">
          <div className="flex items-center justify-between text-brand-400 text-xs font-semibold">
            <span>Utilidad Real</span>
            <DollarSign suppressHydrationWarning className="h-4 w-4" />
          </div>
          <p className="mt-2 text-xl font-black text-brand-400 truncate">
            {formatCOP(finances.netProfit)}
          </p>
          <p className="text-[11px] text-steel-400 mt-0.5">Ganancia libre</p>
        </div>
      </div>

      {/* Main Grid: Órdenes activas + Citas pendientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Órdenes en Curso (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Wrench suppressHydrationWarning className="h-4 w-4 text-brand-400" />
              <span>Vehículos en Taller</span>
            </h2>
            <Link
              href="/admin/ordenes"
              className="text-xs text-brand-400 hover:underline flex items-center gap-0.5"
            >
              <span>Ver todas</span>
              <ChevronRight suppressHydrationWarning className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-surface-border p-8 text-center bg-surface-elevated/40">
                <Car suppressHydrationWarning className="mx-auto h-8 w-8 text-steel-600 mb-2" />
                <p className="text-sm font-medium text-steel-400">No hay vehículos en taller en este momento.</p>
                <Link
                  href="/admin/ordenes/nueva"
                  className="mt-3 inline-block rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white"
                >
                  + Ingresar Vehículo
                </Link>
              </div>
            ) : (
              orders.map((order) => {
                const statusCfg = ORDER_STATUS_CONFIG[order.status];
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
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusCfg.badgeBg}`}>
                            {statusCfg.emoji} {statusCfg.label}
                          </span>
                        </div>
                        <p className="text-xs text-steel-400 truncate mt-0.5">
                          {order.vehicle.brand} {order.vehicle.model} · {order.vehicle.customer.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-3">
                      <p className="text-sm font-black text-white">{formatCOP(order.totalAmount)}</p>
                      <p className="text-[10px] text-steel-500">{order.orderNumber}</p>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Solicitudes de Citas Web (1 col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Calendar suppressHydrationWarning className="h-4 w-4 text-brand-400" />
              <span>Citas desde la Web</span>
            </h2>
            <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-xs font-semibold text-brand-400">
              {appointments.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {appointments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-surface-border p-6 text-center bg-surface-elevated/40">
                <Sparkles suppressHydrationWarning className="mx-auto h-6 w-6 text-steel-600 mb-1" />
                <p className="text-xs text-steel-400">No hay citas pendientes de confirmación.</p>
              </div>
            ) : (
              appointments.slice(0, 4).map((appt) => (
                <div
                  key={appt.id}
                  className="p-3.5 rounded-xl border border-surface-border bg-surface-elevated space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-white">{appt.customerName}</p>
                      <p className="text-[11px] text-steel-400">{appt.customerPhone}</p>
                    </div>
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium">
                      Pendiente
                    </span>
                  </div>

                  <div className="text-[11px] text-steel-300 bg-surface p-2 rounded-lg">
                    <p className="font-semibold text-brand-400">{appt.serviceType}</p>
                    {appt.vehiclePlate && (
                      <p className="text-steel-400 font-mono mt-0.5">Placa: {appt.vehiclePlate}</p>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${appt.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${appt.customerName}, te escribo desde Taller Junior en Santa Marta respecto a tu solicitud de cita para ${appt.serviceType}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-green-600/90 py-1.5 text-xs font-bold text-white hover:bg-green-600 transition-colors"
                  >
                    <span>Contactar por WhatsApp</span>
                    <ArrowUpRight suppressHydrationWarning className="h-3 w-3" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
