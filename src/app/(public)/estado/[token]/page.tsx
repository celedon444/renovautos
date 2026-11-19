import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkOrderByPublicToken } from "@/actions/workorders";
import { formatCOP, formatDate, ORDER_STATUS_CONFIG, buildWhatsAppLink } from "@/lib/utils";
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
  { key: "READY", label: "Listo para Entrega", icon: "🎉" },
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
    <div className="min-h-screen bg-surface text-steel-100 pb-16">
      {/* Top Header */}
      <header className="border-b border-surface-border bg-surface-elevated/80 px-4 py-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 shadow-md shadow-brand-500/20">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-black text-white text-sm leading-tight">Taller Junior</p>
              <p className="text-[10px] text-steel-400">Santa Marta · Seguimiento en Vivo</p>
            </div>
          </Link>

          <a
            href={buildWhatsAppLink(
              process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567",
              `Hola Junior, tengo una consulta sobre mi vehículo ${vehicle.plate} (Orden ${order.orderNumber})`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-green-600/90 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Hablar con Mecánico</span>
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {/* Banner de Estado Principal */}
        <div className="rounded-3xl border border-brand-500/30 bg-gradient-to-b from-brand-500/15 via-surface-elevated to-surface-elevated p-6 text-center space-y-3 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-500/15 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 font-mono tracking-wider">
            PLACA: {vehicle.plate}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {vehicle.brand} {vehicle.model} ({vehicle.year})
          </h1>

          <div className="flex items-center justify-center gap-2">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${cfg.badgeBg}`}>
              {cfg.emoji} Estado Actual: {cfg.label}
            </span>
          </div>

          <p className="text-xs text-steel-400">
            Orden N° <span className="font-mono text-white font-bold">{order.orderNumber}</span> · Ingreso: {formatDate(order.createdAt)}
          </p>
        </div>

        {/* Línea de Tiempo Visual Interactiva */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 space-y-4 shadow-xl">
          <h2 className="text-xs font-bold uppercase tracking-wider text-steel-400 flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-400" />
            <span>Progreso del Servicio</span>
          </h2>

          <div className="grid grid-cols-5 gap-1.5 text-center">
            {PUBLIC_STEPS.map((step, idx) => {
              const stepIndex = idx + 1;
              const isPast = currentStep > stepIndex;
              const isCurrent = currentStep === stepIndex || (step.key === "READY" && currentStep >= 6);

              return (
                <div key={step.key} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl text-base transition-all ${
                      isCurrent
                        ? "bg-brand-500 text-white shadow-lg shadow-brand-500/40 scale-105"
                        : isPast
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-surface border border-surface-border text-steel-600 opacity-60"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="h-5 w-5 stroke-[2.5]" /> : step.icon}
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
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 space-y-3 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-steel-400 flex items-center gap-2">
            <Wrench className="h-4 w-4 text-brand-400" />
            <span>Falla Reportada & Diagnóstico</span>
          </h3>

          <div className="rounded-xl bg-surface p-3.5 border border-surface-border text-xs space-y-2">
            <div>
              <p className="text-[10px] font-bold uppercase text-steel-500">Motivo de Ingreso:</p>
              <p className="text-white mt-0.5">{order.symptoms}</p>
            </div>
            {order.diagnosis && (
              <div className="pt-2 border-t border-surface-border/60">
                <p className="text-[10px] font-bold uppercase text-brand-400">Diagnóstico del Técnico:</p>
                <p className="text-steel-200 mt-0.5">{order.diagnosis}</p>
              </div>
            )}
            {order.workDone && (
              <div className="pt-2 border-t border-surface-border/60">
                <p className="text-[10px] font-bold uppercase text-green-400">Trabajo Realizado:</p>
                <p className="text-steel-200 mt-0.5">{order.workDone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Fotos de Evidencia (Transparencia con el cliente) */}
        {photos.length > 0 && (
          <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 space-y-3 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-steel-400 flex items-center gap-2">
              <Camera className="h-4 w-4 text-brand-400" />
              <span>Fotos de Evidencia ({photos.length})</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photos.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-surface-border overflow-hidden bg-surface aspect-square block group relative"
                >
                  <img
                    src={p.url}
                    alt={p.caption ?? "Evidencia"}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {p.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/80 text-[10px] text-white truncate">
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
          <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden shadow-xl">
            <div className="p-4 border-b border-surface-border">
              <h3 className="text-xs font-bold uppercase tracking-wider text-steel-400 flex items-center gap-2">
                <Package className="h-4 w-4 text-brand-400" />
                <span>Desglose de Repuestos y Mano de Obra</span>
              </h3>
            </div>

            <div className="divide-y divide-surface-border text-xs">
              {/* Repuestos */}
              {partsItems.map((item) => (
                <div key={item.id} className="p-3.5 flex justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">
                      {item.description} {item.brand && `(${item.brand})`}
                    </p>
                    <p className="text-[11px] text-steel-400 mt-0.5">
                      {item.quantity} {item.unit ?? "unid"} × {formatCOP(item.unitPrice)}
                    </p>
                  </div>
                  <span className="font-bold text-white">{formatCOP(item.totalPrice)}</span>
                </div>
              ))}

              {/* Mano de Obra */}
              {laborItems.map((item) => (
                <div key={item.id} className="p-3.5 flex justify-between gap-3 bg-surface/30">
                  <div>
                    <p className="font-bold text-white">{item.description}</p>
                    <p className="text-[11px] text-steel-400 mt-0.5">Mano de obra especializada</p>
                  </div>
                  <span className="font-bold text-white">{formatCOP(item.totalPrice)}</span>
                </div>
              ))}
            </div>

            {/* Total Box */}
            <div className="bg-surface p-4 border-t border-surface-border space-y-2">
              <div className="flex justify-between text-base font-black text-white">
                <span>Total Cotizado:</span>
                <span className="text-brand-400 text-lg">{formatCOP(order.totalAmount)}</span>
              </div>
              {order.paidAmount > 0 && (
                <div className="flex justify-between text-xs text-green-400">
                  <span>Abonado:</span>
                  <span>-{formatCOP(order.paidAmount)}</span>
                </div>
              )}
              {order.totalAmount - order.paidAmount > 0 && order.paidAmount > 0 && (
                <div className="flex justify-between text-xs font-bold text-brand-400 pt-1 border-t border-surface-border">
                  <span>Saldo a Pagar:</span>
                  <span>{formatCOP(order.totalAmount - order.paidAmount)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Acciones para el cliente */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 space-y-3 text-center">
          <p className="text-xs text-steel-300">
            ¿Tienes alguna consulta o deseas autorizar este presupuesto?
          </p>

          <a
            href={buildWhatsAppLink(
              process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567",
              `¡Hola Junior! He revisado el estado de mi vehículo ${vehicle.plate} en el portal y autorizo el presupuesto de ${formatCOP(order.totalAmount)}. Procedamos con la reparación.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-3.5 text-sm font-bold text-white shadow-xl shadow-green-600/25 transition-all hover:bg-green-700 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Aprobar Presupuesto por WhatsApp</span>
          </a>
        </div>

        {/* Footer del taller */}
        <div className="text-center space-y-1 text-xs text-steel-500 pt-4">
          <p className="font-bold text-steel-400">Taller Junior · Mecánica de Confianza</p>
          <p className="flex items-center justify-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>Santa Marta, Magdalena, Colombia</span>
          </p>
          <p>Horario: Lunes a Sábado · 8:00 AM - 6:00 PM</p>
        </div>
      </main>
    </div>
  );
}
