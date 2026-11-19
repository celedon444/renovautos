import { notFound } from "next/navigation";
import Link from "next/link";
import { getCustomerWithHistory } from "@/actions/customers";
import VehicleForm from "@/components/crm/VehicleForm";
import { buildWhatsAppLink, formatCOP, formatDate, ORDER_STATUS_CONFIG } from "@/lib/utils";
import {
  Phone,
  Mail,
  MessageCircle,
  Car,
  Plus,
  ChevronRight,
  ArrowLeft,
  Wrench,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClienteDetailPage({ params }: Props) {
  const { id } = await params;
  const customer = await getCustomerWithHistory(id);
  if (!customer) notFound();

  const totalOrdenes = customer.vehicles.reduce(
    (acc, v) => acc + v._count.workOrders,
    0
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between border-b border-surface-border pb-4">
        <Link
          href="/admin/clientes"
          className="flex items-center gap-2 text-xs font-semibold text-steel-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Directorio</span>
        </Link>
        <span className="text-xs text-steel-500">
          Registrado el {formatDate(customer.createdAt)}
        </span>
      </div>

      {/* Customer Header Card */}
      <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-400 font-black text-2xl">
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-black text-white">{customer.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-xs text-steel-400 flex-wrap">
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-steel-500" />
                  <span>{customer.phone}</span>
                </span>
                {customer.email && (
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-steel-500" />
                    <span>{customer.email}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <a
            href={buildWhatsAppLink(
              customer.phone,
              `Hola ${customer.name.split(" ")[0]}, te escribo desde Taller Junior en Santa Marta 🔧`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-green-600/20 transition-all hover:bg-green-700 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat de WhatsApp</span>
          </a>
        </div>

        {customer.notes && (
          <div className="rounded-xl bg-surface p-3 text-xs text-steel-300 border border-surface-border">
            <p className="font-semibold text-brand-400 mb-0.5">Nota del mecánico:</p>
            <p>{customer.notes}</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-surface-border pt-4">
          <div className="text-center p-2 rounded-xl bg-surface">
            <p className="text-xs text-steel-500">Vehículos</p>
            <p className="text-lg font-black text-white">{customer.vehicles.length}</p>
          </div>
          <div className="text-center p-2 rounded-xl bg-surface">
            <p className="text-xs text-steel-500">Total Reparaciones</p>
            <p className="text-lg font-black text-white">{totalOrdenes}</p>
          </div>
          <div className="col-span-2 sm:col-span-1 text-center p-2 rounded-xl bg-surface">
            <p className="text-xs text-steel-500">Ciudad</p>
            <p className="text-sm font-bold text-brand-400">Santa Marta</p>
          </div>
        </div>
      </div>

      {/* Vehículos del Cliente */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Car className="h-4 w-4 text-brand-400" />
            <span>Vehículos Asociados ({customer.vehicles.length})</span>
          </h2>
        </div>

        {customer.vehicles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-surface-border p-6 text-center bg-surface-elevated/40">
            <Car className="mx-auto h-8 w-8 text-steel-600 mb-2" />
            <p className="text-sm font-medium text-steel-400">Este cliente aún no tiene vehículos registrados.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {customer.vehicles.map((v) => (
              <div
                key={v.id}
                className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      href={`/admin/vehiculos/${v.plate}`}
                      className="font-mono text-xl font-black text-brand-400 tracking-wider hover:underline flex items-center gap-2"
                    >
                      <span>{v.plate}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {v.brand} {v.model} ({v.year})
                    </p>
                    {v.oilType && (
                      <p className="text-xs text-brand-400 mt-1">
                        🛢 Aceite: <span className="font-medium text-white">{v.oilType}</span>
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/admin/ordenes/nueva?plate=${v.plate}`}
                    className="flex items-center gap-1 rounded-xl bg-brand-500/10 border border-brand-500/20 px-3 py-1.5 text-xs font-bold text-brand-400 hover:bg-brand-500 hover:text-white transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Crear Orden</span>
                  </Link>
                </div>

                {/* Últimas órdenes del vehículo */}
                {v.workOrders.length > 0 && (
                  <div className="border-t border-surface-border pt-3 space-y-2">
                    <p className="text-[11px] font-semibold text-steel-500 uppercase tracking-wide">
                      Últimos Trabajos:
                    </p>
                    {v.workOrders.map((order) => {
                      const cfg = ORDER_STATUS_CONFIG[order.status];
                      return (
                        <Link
                          key={order.id}
                          href={`/admin/ordenes/${order.id}`}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-surface hover:bg-steel-900 transition-colors text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-steel-300">
                              {order.orderNumber}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${cfg.badgeBg}`}>
                              {cfg.label}
                            </span>
                          </div>
                          <span className="font-bold text-white">
                            {formatCOP(order.totalAmount)}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Formulario para Agregar Otro Vehículo */}
      <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 sm:p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Plus className="h-4 w-4 text-brand-400" />
          <span>Agregar Vehículo a {customer.name.split(" ")[0]}</span>
        </h3>
        <VehicleForm customerId={customer.id} />
      </div>
    </div>
  );
}
