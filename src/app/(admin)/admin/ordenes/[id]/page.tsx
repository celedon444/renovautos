import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkOrderDetail } from "@/actions/workorders";
import OrderStatusStepper from "@/components/ordenes/OrderStatusStepper";
import OrderItemsEditor from "@/components/ordenes/OrderItemsEditor";
import PhotoUploader from "@/components/ordenes/PhotoUploader";
import WhatsAppUpdateButton from "@/components/ordenes/WhatsAppUpdateButton";
import PaymentPanel from "@/components/ordenes/PaymentPanel";
import { formatCOP, formatDate, ORDER_STATUS_CONFIG } from "@/lib/utils";
import {
  Car,
  User,
  Phone,
  Gauge,
  Fuel,
  ExternalLink,
  ArrowLeft,
  Wrench,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await getWorkOrderDetail(id);
  if (!order) notFound();

  const { vehicle, items, photos, payments } = order;
  const { customer } = vehicle;
  const cfg = ORDER_STATUS_CONFIG[order.status];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Bar Navigation & Actions */}
      <div className="flex items-center justify-between border-b border-surface-border pb-4 flex-wrap gap-2">
        <Link
          href="/admin/ordenes"
          className="flex items-center gap-2 text-xs font-semibold text-steel-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a Órdenes</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/estado/${order.publicToken}`}
            target="_blank"
            className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface px-3 py-1.5 text-xs font-semibold text-brand-400 hover:border-brand-500/40 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Ver Portal Cliente</span>
          </Link>
        </div>
      </div>

      {/* Main Order Header Card */}
      <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-2xl font-black text-white">
                {order.orderNumber}
              </span>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${cfg.badgeBg}`}>
                {cfg.emoji} {cfg.label}
              </span>
            </div>
            <p className="text-xs text-steel-400 mt-1">
              Ingresó el {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-steel-400">Total Presupuestado:</p>
            <p className="text-2xl font-black text-brand-400">{formatCOP(order.totalAmount)}</p>
          </div>
        </div>

        {/* Info Grid: Auto & Cliente */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-surface-border pt-4">
          <div className="rounded-xl bg-surface p-3.5 border border-surface-border space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-steel-500">Vehículo:</span>
              <Link
                href={`/admin/vehiculos/${vehicle.plate}`}
                className="font-mono text-sm font-black text-brand-400 hover:underline"
              >
                {vehicle.plate}
              </Link>
            </div>
            <p className="text-xs font-bold text-white">
              {vehicle.brand} {vehicle.model} ({vehicle.year})
            </p>
            <div className="flex items-center gap-3 text-[11px] text-steel-400 pt-1">
              {order.mileageIn && (
                <span className="flex items-center gap-1">
                  <Gauge className="h-3 w-3 text-steel-500" />
                  <span>{order.mileageIn.toLocaleString("es-CO")} km</span>
                </span>
              )}
              {order.fuelLevel && (
                <span className="flex items-center gap-1">
                  <Fuel className="h-3 w-3 text-steel-500" />
                  <span>Tanque: {order.fuelLevel}</span>
                </span>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-surface p-3.5 border border-surface-border space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-steel-500">Cliente:</span>
              <Link
                href={`/admin/clientes/${customer.id}`}
                className="text-xs font-bold text-white hover:text-brand-400"
              >
                Ver Perfil
              </Link>
            </div>
            <p className="text-xs font-bold text-white truncate">{customer.name}</p>
            <p className="text-[11px] text-steel-400 flex items-center gap-1 pt-1">
              <Phone className="h-3 w-3 text-steel-500" />
              <span>{customer.phone}</span>
            </p>
          </div>
        </div>

        {/* Falla reportada y Diagnóstico */}
        <div className="rounded-xl bg-surface p-3.5 border border-surface-border text-xs space-y-2">
          <div>
            <span className="font-bold text-brand-400 uppercase tracking-wide text-[10px]">
              Falla Reportada por Cliente:
            </span>
            <p className="text-steel-200 mt-0.5">{order.symptoms}</p>
          </div>
          {order.mechanicNotes && (
            <div className="pt-2 border-t border-surface-border/60">
              <span className="font-bold text-steel-400 uppercase tracking-wide text-[10px]">
                Notas Internas (Privadas):
              </span>
              <p className="text-steel-400 mt-0.5">{order.mechanicNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Control de Estado con 1 Toque */}
      <OrderStatusStepper orderId={order.id} currentStatus={order.status} />

      {/* Botón WhatsApp de Actualización en Vivo */}
      <WhatsAppUpdateButton
        customerPhone={customer.phone}
        customerName={customer.name}
        vehiclePlate={vehicle.plate}
        orderNumber={order.orderNumber}
        status={order.status}
        totalAmount={order.totalAmount}
        publicToken={order.publicToken}
      />

      {/* Editor de Presupuesto / Mano de Obra y Repuestos */}
      <OrderItemsEditor
        workOrderId={order.id}
        items={items}
        subtotalParts={order.subtotalParts}
        subtotalLabor={order.subtotalLabor}
        totalCostParts={order.totalCostParts}
        totalAmount={order.totalAmount}
        discount={order.discount}
      />

      {/* Registro de Fotos de Evidencia */}
      <PhotoUploader workOrderId={order.id} photos={photos} />

      {/* Panel de Pagos y Abonos */}
      <PaymentPanel
        workOrderId={order.id}
        totalAmount={order.totalAmount}
        paidAmount={order.paidAmount}
        paymentStatus={order.paymentStatus}
        payments={payments}
      />
    </div>
  );
}
