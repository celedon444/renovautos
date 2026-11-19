import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getWorkOrderByPublicToken } from "@/actions/workorders";
import { formatCOP, ORDER_STATUS_CONFIG } from "@/lib/utils";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ScrollToTop from "@/components/ui/ScrollToTop";
import {
  Car,
  Wrench,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowLeft,
  Camera,
  DollarSign,
  FileText,
  Phone,
  Star,
  Shield,
} from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_STEPS = [
  { key: "RECEIVED",      label: "Recibido",      emoji: "🚗", step: 1 },
  { key: "DIAGNOSING",    label: "Diagnóstico",   emoji: "🔍", step: 2 },
  { key: "QUOTE_SENT",    label: "Cotización",    emoji: "📋", step: 3 },
  { key: "APPROVED",      label: "Aprobado",      emoji: "👍", step: 4 },
  { key: "IN_REPAIR",     label: "Reparando",     emoji: "🔧", step: 4 },
  { key: "QUALITY_CHECK", label: "Calidad",       emoji: "🔎", step: 5 },
  { key: "READY",         label: "Listo",         emoji: "🎉", step: 6 },
  { key: "DELIVERED",     label: "Entregado",     emoji: "✅", step: 7 },
];

export default async function EstadoTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const order = await getWorkOrderByPublicToken(token);

  if (!order) notFound();

  const statusCfg = ORDER_STATUS_CONFIG[order.status];
  const currentStep = statusCfg.step;

  const totalPaid = order.payments.reduce((s, p) => s + p.amount, 0);
  const remaining = order.totalAmount - totalPaid;

  const receptionPhotos = order.photos.filter((p) => p.stage === "INTAKE");
  const progressPhotos  = order.photos.filter((p) => p.stage === "IN_PROGRESS");
  const deliveryPhotos  = order.photos.filter((p) => p.stage === "COMPLETED");

  const whatsappPhone = order.vehicle.customer.phone.replace(/\D/g, "");
  const whatsappMsg = encodeURIComponent(
    `Hola, soy ${order.vehicle.customer.name} y quisiera consultar el estado de mi vehículo ${order.vehicle.plate} (Orden ${order.orderNumber}).`
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* ─── HERO HEADER ─── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1400&q=80"
            alt="Taller mecánico"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-8 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft suppressHydrationWarning className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/30">
              <Wrench suppressHydrationWarning className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Taller Junior</p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin suppressHydrationWarning className="h-3 w-3" />
                Santa Marta, Colombia
              </p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            Seguimiento en <span className="text-brand-400">Tiempo Real</span>
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            Monitorea el estado de tu vehículo en el taller desde cualquier lugar.
          </p>

          {/* Vehicle Card */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 backdrop-blur-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 border border-brand-500/20">
                <Car suppressHydrationWarning className="h-7 w-7 text-brand-400" />
              </div>
              <div>
                <p className="font-mono font-black text-xl text-white tracking-widest">
                  {order.vehicle.plate}
                </p>
                <p className="text-slate-300 text-sm font-medium">
                  {order.vehicle.brand} {order.vehicle.model}
                  {order.vehicle.year ? ` · ${order.vehicle.year}` : ""}
                  {order.vehicle.color ? ` · ${order.vehicle.color}` : ""}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  Propietario:{" "}
                  <span className="text-slate-200">{order.vehicle.customer.name}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1.5">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusCfg.badgeBg}`}
              >
                <span>{statusCfg.emoji}</span>
                {statusCfg.label}
              </span>
              <p className="text-xs text-slate-500 font-mono">{order.orderNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="mx-auto max-w-4xl px-4 pb-16 space-y-6">

        {/* PROGRESS TRACKER */}
        <section className="rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-5 sm:p-6">
          <h2 className="text-base font-bold text-white mb-5 flex items-center gap-2">
            <Clock suppressHydrationWarning className="h-4 w-4 text-brand-400" />
            Progreso del Trabajo
          </h2>

          {order.status === "CANCELLED" ? (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center">
              <p className="text-red-400 font-bold">❌ Orden Cancelada</p>
              <p className="text-xs text-slate-400 mt-1">Contáctanos para más información.</p>
            </div>
          ) : (
            <>
              {/* Step bar */}
              <div className="relative flex items-center justify-between mb-2">
                <div className="absolute left-0 right-0 h-1 bg-slate-700 rounded-full top-4 z-0" />
                <div
                  className="absolute left-0 h-1 bg-brand-500 rounded-full top-4 z-0 transition-all duration-700"
                  style={{ width: `${Math.min(100, (currentStep / 7) * 100)}%` }}
                />
                {STATUS_STEPS.map((s) => {
                  const done   = currentStep > s.step;
                  const active = currentStep === s.step;
                  return (
                    <div
                      key={s.key}
                      className="relative z-10 flex flex-col items-center gap-1.5"
                      style={{ flex: 1 }}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm transition-all duration-300 ${
                          done
                            ? "border-brand-500 bg-brand-500 text-white"
                            : active
                            ? "border-brand-400 bg-brand-400/20 text-brand-300 ring-4 ring-brand-400/20"
                            : "border-slate-600 bg-slate-800 text-slate-500"
                        }`}
                      >
                        {done ? (
                          <CheckCircle2 suppressHydrationWarning className="h-4 w-4" />
                        ) : (
                          <span className="text-xs">{s.emoji}</span>
                        )}
                      </div>
                      <span
                        className={`text-[9px] sm:text-[10px] font-semibold text-center leading-tight hidden sm:block ${
                          done || active ? "text-slate-200" : "text-slate-500"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Mobile label */}
              <div className="sm:hidden text-center mt-4">
                <p className="text-xs text-slate-400">Estado actual:</p>
                <p className="text-sm font-bold text-brand-400 mt-0.5">
                  {statusCfg.emoji} {statusCfg.label}
                </p>
              </div>

              {order.mechanicNotes && (
                <div className="mt-5 rounded-xl border border-slate-700 bg-slate-800/60 p-4">
                  <p className="text-xs font-semibold text-brand-400 mb-1 flex items-center gap-1.5">
                    <Wrench suppressHydrationWarning className="h-3.5 w-3.5" />
                    Nota del Mecánico
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">{order.mechanicNotes}</p>
                </div>
              )}

              {order.symptoms && (
                <div className="mt-3 rounded-xl border border-slate-700 bg-slate-800/40 p-4">
                  <p className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                    <FileText suppressHydrationWarning className="h-3.5 w-3.5" />
                    Falla Reportada
                  </p>
                  <p className="text-sm text-slate-300 italic">"{order.symptoms}"</p>
                </div>
              )}
            </>
          )}
        </section>

        {/* BUDGET */}
        {order.items.length > 0 && (
          <section className="rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-5 sm:p-6">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign suppressHydrationWarning className="h-4 w-4 text-green-400" />
              Presupuesto Transparente
            </h2>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-700/50 bg-slate-800/60 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          item.type === "PART"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : item.type === "LABOR"
                            ? "bg-brand-500/10 text-brand-400 border-brand-500/20"
                            : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        }`}
                      >
                        {item.type === "PART"
                          ? "Repuesto"
                          : item.type === "LABOR"
                          ? "M.O."
                          : "Servicio"}
                      </span>
                      <p className="text-sm font-medium text-slate-200 truncate">
                        {item.description}
                      </p>
                    </div>
                    {item.brand && (
                      <p className="text-xs text-slate-500 mt-0.5">{item.brand}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">{formatCOP(item.totalPrice)}</p>
                    {item.quantity > 1 && (
                      <p className="text-[10px] text-slate-500">
                        {item.quantity} × {formatCOP(item.unitPrice)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-slate-700/60 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total</span>
                <span className="font-bold text-white">{formatCOP(order.totalAmount)}</span>
              </div>
              {totalPaid > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Pagado</span>
                  <span className="font-bold text-green-400">{formatCOP(totalPaid)}</span>
                </div>
              )}
              {remaining > 0 && (
                <div className="flex justify-between text-sm rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-2">
                  <span className="text-amber-400 font-semibold">Saldo Pendiente</span>
                  <span className="font-black text-amber-400">{formatCOP(remaining)}</span>
                </div>
              )}
              {remaining <= 0 && totalPaid > 0 && (
                <div className="flex justify-between text-sm rounded-xl bg-green-500/10 border border-green-500/20 px-3 py-2">
                  <span className="text-green-400 font-semibold">✅ Saldo cancelado</span>
                  <span className="font-black text-green-400">¡Gracias!</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PHOTOS */}
        {order.photos.length > 0 && (
          <section className="rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-5 sm:p-6">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Camera suppressHydrationWarning className="h-4 w-4 text-brand-400" />
              Evidencia Fotográfica
            </h2>

            {receptionPhotos.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  📷 Recepción
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {receptionPhotos.map((photo) => (
                    <a key={photo.id} href={photo.url} target="_blank" rel="noopener noreferrer">
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 hover:border-brand-500 transition-colors">
                        <Image
                          src={photo.url}
                          alt={photo.caption ?? "Foto recepción"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {photo.caption && (
                        <p className="text-[10px] text-slate-500 mt-1 text-center truncate">
                          {photo.caption}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {progressPhotos.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  🔧 Proceso
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {progressPhotos.map((photo) => (
                    <a key={photo.id} href={photo.url} target="_blank" rel="noopener noreferrer">
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 hover:border-brand-500 transition-colors">
                        <Image
                          src={photo.url}
                          alt={photo.caption ?? "Foto proceso"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {photo.caption && (
                        <p className="text-[10px] text-slate-500 mt-1 text-center truncate">
                          {photo.caption}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {deliveryPhotos.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  ✅ Entrega
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {deliveryPhotos.map((photo) => (
                    <a key={photo.id} href={photo.url} target="_blank" rel="noopener noreferrer">
                      <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-700 hover:border-brand-500 transition-colors">
                        <Image
                          src={photo.url}
                          alt={photo.caption ?? "Foto entrega"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {photo.caption && (
                        <p className="text-[10px] text-slate-500 mt-1 text-center truncate">
                          {photo.caption}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* CONTACT & TRUST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <section className="rounded-2xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-5">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Phone suppressHydrationWarning className="h-4 w-4 text-brand-400" />
              ¿Tienes preguntas?
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Escríbenos por WhatsApp y te respondemos de inmediato.
            </p>
            <a
              href={`https://wa.me/${whatsappPhone}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-2.5 text-sm font-bold text-white hover:bg-green-500 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escribir por WhatsApp
            </a>
          </section>

          <section className="rounded-2xl border border-brand-500/20 bg-brand-500/5 backdrop-blur-sm p-5">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Shield suppressHydrationWarning className="h-4 w-4 text-brand-400" />
              Garantía Taller Junior
            </h2>
            <div className="space-y-2">
              {[
                "Repuestos con garantía del fabricante",
                "Mano de obra garantizada 30 días",
                "Fotos de todo el proceso",
                "Presupuesto aprobado antes de trabajar",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-300">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  suppressHydrationWarning
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="text-xs text-slate-400 ml-1">5.0 · Santa Marta</span>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="text-center pt-4 pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm font-medium text-slate-300 hover:border-brand-500/40 hover:text-white transition-colors"
          >
            <ArrowLeft suppressHydrationWarning className="h-4 w-4" />
            Volver al Inicio
          </Link>
          <p className="text-xs text-slate-600 mt-4">
            Taller Junior © 2025 · Santa Marta, Colombia
          </p>
        </div>
      </div>

      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}
