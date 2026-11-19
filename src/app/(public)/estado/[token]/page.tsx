import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getWorkOrderByPublicToken } from "@/actions/workorders";
import { formatCOP, formatDate, ORDER_STATUS_CONFIG, buildWhatsAppLink } from "@/lib/utils";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import {
  Wrench,
  CheckCircle2,
  Clock,
  Car,
  MessageCircle,
  Camera,
  Package,
  ShieldCheck,
  ChevronRight,
  Phone,
  MapPin,
  ArrowLeft,
  Sparkles,
  BadgeCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ token: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const order = await getWorkOrderByPublicToken(token);
  return {
    title: order
      ? `Estado de ${order.vehicle.plate} (${order.orderNumber}) | Taller Junior`
      : "Seguimiento de Vehículo | Taller Junior",
  };
}

const PUBLIC_STEPS = [
  { key: "RECEIVED", label: "Recibido", icon: "🚗" },
  { key: "DIAGNOSING", label: "En Diagnóstico", icon: "🔍" },
  { key: "QUOTE_SENT", label: "Cotizado", icon: "📋" },
  { key: "IN_REPAIR", label: "En Reparación", icon: "🔧" },
  { key: "READY", label: "Listo", icon: "🎉" },
];

export default async function PublicTrackingPage({ params }: Props) {
  const { token } = await params;
  const order = await getWorkOrderByPublicToken(token);
  if (!order) notFound();

  const { vehicle, items, photos, payments } = order;
  const cfg = ORDER_STATUS_CONFIG[order.status];
  const currentStep = cfg.step;

  const partsItems = items.filter((i) => i.type === "PART" || i.type === "OTHER");
  const laborItems = items.filter((i) => i.type === "LABOR");

  return (
    <div className="min-h-screen bg-[#0b0d13] text-steel-100 pb-20 selection:bg-brand-500 selection:text-white">
      {/* ── Top Header ── */}
      <header className="border-b border-surface-border/60 bg-[#0b0d13]/85 px-4 py-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-steel-400 hover:text-white transition-colors group"
          >
            <ArrowLeft suppressHydrationWarning className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Inicio</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-orange-600 shadow-sm">
              <Wrench suppressHydrationWarning className="h-4 w-4 text-white" />
            </div>
            <span className="font-black text-white text-xs">Taller Junior</span>
          </div>

          <a
            href={buildWhatsAppLink(
              process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567",
              `Hola Junior, tengo una consulta sobre mi vehículo ${vehicle.plate} (Orden ${order.orderNumber})`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-green-500/10 border border-green-500/30 px-3 py-1.5 text-xs font-bold text-green-400 hover:bg-green-500/20 transition-colors"
          >
            <MessageCircle suppressHydrationWarning className="h-3.5 w-3.5" />
            <span>Consultar</span>
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {/* Banner de Estado Principal con Placa */}
        <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-b from-brand-500/15 via-surface-elevated to-surface-elevated p-6 text-center space-y-3.5 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/20 border border-brand-500/40 px-4 py-1 text-xs font-black text-brand-400 font-mono tracking-wider shadow-inner">
            PLACA: {vehicle.plate}
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {vehicle.brand} {vehicle.model} {vehicle.year && `(${vehicle.year})`}
            </h1>
            <p className="text-xs text-steel-400 font-medium">
              Orden N° <span className="font-mono text-white font-bold">{order.orderNumber}</span> · Ingreso al taller: {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="pt-1 flex items-center justify-center">
            <span className={`text-xs font-black px-4 py-1.5 rounded-full border shadow-lg flex items-center gap-2 ${cfg.badgeBg}`}>
              <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
              <span>{cfg.emoji} Estado: {cfg.label}</span>
            </span>
          </div>
        </div>

        {/* Línea de Tiempo Visual Interactiva */}
        <div className="rounded-3xl border border-surface-border bg-surface-elevated p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-surface-border/60 pb-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-steel-300 flex items-center gap-2">
              <Clock suppressHydrationWarning className="h-4 w-4 text-brand-400" />
              <span>Línea de Tiempo del Vehículo</span>
            </h2>
            <span className="text-[11px] font-bold text-brand-400">Paso {Math.min(currentStep, 5)} de 5</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 text-center pt-1">
            {PUBLIC_STEPS.map((step, idx) => {
              const stepIndex = idx + 1;
              const isPast = currentStep > stepIndex;
              const isCurrent = currentStep === stepIndex || (step.key === "READY" && currentStep >= 6);

              return (
                <div key={step.key} className="flex flex-col items-center gap-2">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-base transition-all ${
                      isCurrent
                        ? "bg-gradient-to-br from-brand-500 to-orange-600 text-white shadow-lg shadow-brand-500/40 scale-105"
                        : isPast
                        ? "bg-green-500/20 text-green-400 border border-green-500/30 font-bold"
                        : "bg-surface border border-surface-border text-steel-600 opacity-60"
                    }`}
                  >
                    {isPast ? <CheckCircle2 suppressHydrationWarning className="h-5 w-5 stroke-[2.5]" /> : step.icon}
                  </div>
                  <span
                    className={`text-[10px] font-bold leading-tight ${
                      isCurrent ? "text-brand-400" : isPast ? "text-white" : "text-steel-600"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Diagnóstico y Falla Reportada */}
        <div className="rounded-3xl border border-surface-border bg-surface-elevated p-5 sm:p-6 space-y-3 shadow-xl">
          <h3 className="text-xs font-black uppercase tracking-wider text-steel-300 flex items-center gap-2">
            <Wrench suppressHydrationWarning className="h-4 w-4 text-brand-400" />
            <span>Motivo de Ingreso & Diagnóstico Técnico</span>
          </h3>

          <div className="rounded-2xl bg-surface p-4 border border-surface-border text-xs space-y-3">
            <div>
              <p className="text-[10px] font-bold uppercase text-steel-500">Síntomas reportados:</p>
              <p className="text-white font-medium mt-1 leading-relaxed">{order.symptoms}</p>
            </div>
            {order.diagnosis && (
              <div className="pt-2.5 border-t border-surface-border/60">
                <p className="text-[10px] font-bold uppercase text-brand-400">Diagnóstico de Junior Celedón:</p>
                <p className="text-steel-200 mt-1 leading-relaxed">{order.diagnosis}</p>
              </div>
            )}
            {order.workDone && (
              <div className="pt-2.5 border-t border-surface-border/60">
                <p className="text-[10px] font-bold uppercase text-green-400">Trabajos Efectuados:</p>
                <p className="text-steel-200 mt-1 leading-relaxed">{order.workDone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Fotos de Evidencia (Transparencia con el cliente) */}
        {photos.length > 0 && (
          <div className="rounded-3xl border border-surface-border bg-surface-elevated p-5 sm:p-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-steel-300 flex items-center gap-2">
                <Camera suppressHydrationWarning className="h-4 w-4 text-brand-400" />
                <span>Fotos de Evidencia ({photos.length})</span>
              </h3>
              <span className="text-[10px] text-brand-400 font-semibold">Toca una foto para ampliar</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              {photos.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-surface-border overflow-hidden bg-surface aspect-square block group relative shadow-md"
                >
                  <img
                    src={p.url}
                    alt={p.caption ?? "Evidencia mecánica"}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {p.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-[#0b0d13]/90 text-[10px] text-white truncate font-medium">
                      {p.caption}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Presupuesto y Desglose Transparente */}
        {items.length > 0 && (
          <div className="rounded-3xl border border-surface-border bg-surface-elevated overflow-hidden shadow-xl">
            <div className="p-5 border-b border-surface-border flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-steel-300 flex items-center gap-2">
                <Package suppressHydrationWarning className="h-4 w-4 text-brand-400" />
                <span>Desglose de Repuestos y Mano de Obra</span>
              </h3>
              <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-bold text-steel-400 border border-surface-border">
                {items.length} ítems
              </span>
            </div>

            <div className="divide-y divide-surface-border/60 text-xs">
              {/* Repuestos */}
              {partsItems.map((item) => (
                <div key={item.id} className="p-4 flex justify-between gap-3 hover:bg-surface/30 transition-colors">
                  <div>
                    <p className="font-bold text-white">
                      {item.description} {item.brand && `(${item.brand})`}
                    </p>
                    <p className="text-[11px] text-steel-400 mt-0.5">
                      Repuesto · {item.quantity} {item.unit ?? "unid"} × {formatCOP(item.unitPrice)}
                    </p>
                  </div>
                  <span className="font-bold text-white text-right">{formatCOP(item.totalPrice)}</span>
                </div>
              ))}

              {/* Mano de Obra */}
              {laborItems.map((item) => (
                <div key={item.id} className="p-4 flex justify-between gap-3 bg-surface/20 hover:bg-surface/40 transition-colors">
                  <div>
                    <p className="font-bold text-white">{item.description}</p>
                    <p className="text-[11px] text-brand-400 mt-0.5 font-medium">Mano de obra certificada</p>
                  </div>
                  <span className="font-bold text-white text-right">{formatCOP(item.totalPrice)}</span>
                </div>
              ))}
            </div>

            {/* Total Box */}
            <div className="bg-surface p-5 border-t border-surface-border space-y-2">
              <div className="flex justify-between items-baseline text-base font-black text-white">
                <span>Total de la Orden:</span>
                <span className="text-brand-400 text-xl font-mono">{formatCOP(order.totalAmount)}</span>
              </div>
              {order.paidAmount > 0 && (
                <div className="flex justify-between text-xs text-green-400 font-semibold">
                  <span>Abono Registrado:</span>
                  <span>-{formatCOP(order.paidAmount)}</span>
                </div>
              )}
              {order.totalAmount - order.paidAmount > 0 && order.paidAmount > 0 && (
                <div className="flex justify-between text-xs font-bold text-brand-400 pt-2 border-t border-surface-border">
                  <span>Saldo Pendiente al Retirar:</span>
                  <span className="font-mono text-sm">{formatCOP(order.totalAmount - order.paidAmount)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Acciones para el cliente: Autorización directa por WhatsApp */}
        <div className="rounded-3xl border border-surface-border bg-surface-elevated p-6 space-y-4 text-center shadow-xl">
          <div className="space-y-1">
            <h4 className="text-sm font-black text-white">¿Deseas autorizar la reparación o consultar algo?</h4>
            <p className="text-xs text-steel-400">
              Escríbele directamente a Junior con tu confirmación en un toque:
            </p>
          </div>

          <a
            href={buildWhatsAppLink(
              process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567",
              `¡Hola Junior! He revisado el estado de mi vehículo ${vehicle.plate} (Orden ${order.orderNumber}) en el portal y autorizo el presupuesto de ${formatCOP(order.totalAmount)}. Procedamos con el trabajo.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 py-4 text-sm font-black text-white shadow-xl shadow-green-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle suppressHydrationWarning className="h-5 w-5" />
            <span>Aprobar Presupuesto por WhatsApp</span>
          </a>
        </div>

        {/* Footer del taller */}
        <div className="text-center space-y-1.5 text-xs text-steel-500 pt-4">
          <p className="font-bold text-steel-400">Taller Junior · Mecánica de Confianza en Santa Marta</p>
          <p className="flex items-center justify-center gap-1.5 text-[11px]">
            <MapPin suppressHydrationWarning className="h-3.5 w-3.5 text-steel-500" />
            <span>Calle Principal # 12-34 · Lun a Sáb: 8:00 AM - 6:00 PM</span>
          </p>
          <p className="text-[10px] text-steel-600">Garantía certificada de 30 días o 1.000 km en mano de obra.</p>
        </div>
      </main>

      {/* Floating WhatsApp con placa y orden */}
      <FloatingWhatsApp
        message={`Hola Junior, estoy consultando mi orden ${order.orderNumber} para el vehículo con placa ${vehicle.plate}.`}
      />
    </div>
  );
}
