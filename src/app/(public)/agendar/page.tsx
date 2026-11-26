"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createAppointmentAction, type AppointmentState } from "@/actions/appointments";
import { buildWhatsAppLink } from "@/lib/utils";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import {
  Wrench,
  Calendar,
  User,
  Phone,
  Car,
  CheckCircle2,
  Loader2,
  ArrowRight,
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  Clock,
  Sparkles,
  MapPin,
} from "lucide-react";

const SERVICES = [
  "Mantenimiento Preventivo (Cambio de Aceite y Filtros)",
  "Diagnóstico Computarizado / Scanner Multimarca",
  "Sistema de Frenos (Discos, Pastillas y Líquido)",
  "Suspensión, Amortiguadores y Dirección",
  "Embrague / Kit de Clutch Completo",
  "Reparación de Motor / Eliminación de Fugas de Aceite",
  "Sistema Eléctrico, Alternador y Batería",
  "Revisión General / Inspección Preventiva de Viaje",
  "Otro Servicio Especializado",
];

const initialState: AppointmentState = {};

export default function AgendarCitaPage() {
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    service: string;
    plate: string;
    date: string;
  } | null>(null);

  const [state, formAction, isPending] = useActionState(
    async (prev: AppointmentState, formData: FormData) => {
      const res = await createAppointmentAction(prev, formData);
      if (res.success) {
        setSubmittedData({
          name: formData.get("customerName") as string,
          phone: formData.get("customerPhone") as string,
          service: formData.get("serviceType") as string,
          plate: formData.get("vehiclePlate") as string,
          date: formData.get("preferredDate") as string,
        });
      }
      return res;
    },
    initialState
  );

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
            <span>Volver al Inicio</span>
          </Link>
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/logo-horizontal-dark.png"
              alt="Renovautos"
              width={160}
              height={38}
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {/* Banner Fotográfico Automotriz */}
        <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-surface-elevated shadow-2xl">
          <div className="relative h-44 sm:h-52 w-full">
            <Image
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
              alt="Mecánica Automotriz en Santa Marta"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-[#0b0d13]/60 to-transparent" />
            
            <div className="absolute bottom-4 left-5 right-5 space-y-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 border border-brand-500/40 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-brand-400 backdrop-blur-md">
                <Sparkles suppressHydrationWarning className="h-3 w-3" />
                Atención Directa por Kilmer Primiento
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Agenda tu Turno en el Taller
              </h1>
              <p className="text-[11px] sm:text-xs text-steel-300">
                Santa Marta · Diagnóstico claro, presupuesto previo y garantía certificada
              </p>
            </div>
          </div>
        </div>

        {submittedData ? (
          /* Estado de Éxito */
          <div className="rounded-3xl border border-green-500/30 bg-surface-elevated p-6 sm:p-8 text-center space-y-5 shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/20 text-green-400 border border-green-500/30">
              <CheckCircle2 suppressHydrationWarning className="h-9 w-9" />
            </div>

            <div className="space-y-1.5">
              <span className="rounded-full bg-green-500/15 text-green-400 px-3 py-1 text-xs font-bold border border-green-500/20">
                ¡Solicitud Registrada en el Sistema!
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white pt-2">
                ¡Gracias, {submittedData.name}!
              </h2>
              <p className="text-xs text-steel-400 max-w-md mx-auto leading-relaxed">
                Hemos reservado tu solicitud de atención. Para confirmar el horario exacto y coordinar la recepción de tu vehículo, presiona el botón directo de WhatsApp:
              </p>
            </div>

            {/* Resumen de la cita */}
            <div className="rounded-2xl bg-surface p-4 border border-surface-border text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-surface-border/60 pb-2">
                <span className="text-steel-400">Servicio:</span>
                <span className="font-bold text-white text-right">{submittedData.service}</span>
              </div>
              <div className="flex justify-between border-b border-surface-border/60 pb-2">
                <span className="text-steel-400">Placa / Auto:</span>
                <span className="font-mono font-bold text-brand-400">{submittedData.plate || "A convenir"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-steel-400">Fecha Estimada:</span>
                <span className="font-bold text-white">{submittedData.date}</span>
              </div>
            </div>

            <a
              href={buildWhatsAppLink(
                process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573025449422",
                `¡Hola Kilmer! Acabo de registrar una solicitud de cita en su sitio web:\n\n👤 *Nombre:* ${submittedData.name}\n🚗 *Vehículo / Placa:* ${submittedData.plate || "No especificada"}\n🔧 *Servicio:* ${submittedData.service}\n📅 *Fecha Deseada:* ${submittedData.date}\n\n¿Me confirmas disponibilidad para llevar el vehículo?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md mx-auto flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 py-4 text-sm font-black text-white shadow-xl shadow-green-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle suppressHydrationWarning className="h-5 w-5" />
              <span>Confirmar Turno por WhatsApp Ahora</span>
            </a>

            <p className="text-[11px] text-steel-500">
              O si prefieres, te escribiremos en breve a tu número de WhatsApp ({submittedData.phone}).
            </p>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-block text-xs font-semibold text-steel-400 hover:text-white transition-colors"
              >
                ← Volver a la página principal
              </Link>
            </div>
          </div>
        ) : (
          /* Formulario de Agendamiento */
          <div className="rounded-3xl border border-surface-border bg-surface-elevated p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-surface-border/60 pb-4">
              <div>
                <h2 className="text-base font-black text-white">Datos de tu Solicitud</h2>
                <p className="text-[11px] text-steel-400">Completa este breve formulario en menos de 1 minuto</p>
              </div>
              <span className="rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/30 text-[10px] font-bold px-2.5 py-1">
                Paso Único
              </span>
            </div>

            <form action={formAction} className="space-y-4">
              {state.error && (
                <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-3.5 text-xs text-red-400 font-medium">
                  {state.error}
                </div>
              )}

              {/* Nombre */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-steel-200">
                  Tu Nombre Completo <span className="text-brand-500">*</span>
                </label>
                <div className="relative">
                  <User suppressHydrationWarning className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
                  <input
                    name="customerName"
                    required
                    placeholder="Ej: Carlos Restrepo"
                    className="w-full rounded-2xl border border-surface-border bg-surface pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Teléfono WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-steel-200">
                  Número de WhatsApp <span className="text-brand-500">*</span>
                </label>
                <div className="relative">
                  <Phone suppressHydrationWarning className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
                  <input
                    name="customerPhone"
                    type="tel"
                    required
                    placeholder="Ej: 300 123 4567 (para enviarte fotos y avances)"
                    className="w-full rounded-2xl border border-surface-border bg-surface pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Placa y Vehículo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-steel-200">Placa del Auto (Opcional)</label>
                  <div className="relative">
                    <Car suppressHydrationWarning className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
                    <input
                      name="vehiclePlate"
                      placeholder="Ej: ABC-123"
                      className="w-full rounded-2xl border border-surface-border bg-surface pl-10 pr-3 py-3 text-xs sm:text-sm font-mono uppercase font-bold text-brand-400 placeholder:text-steel-600 focus:border-brand-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-steel-200">Marca / Modelo</label>
                  <input
                    name="vehicleBrand"
                    placeholder="Ej: Renault Duster / Toyota Corolla"
                    className="w-full rounded-2xl border border-surface-border bg-surface px-4 py-3 text-xs sm:text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Servicio Requerido */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-steel-200">
                  Servicio Requerido <span className="text-brand-500">*</span>
                </label>
                <select
                  name="serviceType"
                  required
                  className="w-full rounded-2xl border border-surface-border bg-surface px-4 py-3 text-xs sm:text-sm text-white focus:border-brand-500 focus:outline-none transition-colors"
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-surface-elevated text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fecha Preferida */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-steel-200">
                  Fecha Preferida de Atención <span className="text-brand-500">*</span>
                </label>
                <div className="relative">
                  <Calendar suppressHydrationWarning className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
                  <input
                    name="preferredDate"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-2xl border border-surface-border bg-surface pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Motivo / Síntomas */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-steel-200">
                  Detalles o Síntomas del Vehículo (Opcional)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Ej: Siento un chirrido al frenar, o quiero cambio de aceite y filtros de 10.000 km..."
                  className="w-full rounded-2xl border border-surface-border bg-surface px-4 py-3 text-xs sm:text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Garantías en el formulario */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-steel-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400" />
                  <span>Sin anticipos obligatorios</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock suppressHydrationWarning className="h-3.5 w-3.5 text-green-400" />
                  <span>Respuesta rápida en WhatsApp</span>
                </div>
              </div>

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-orange-600 py-4 text-sm font-black text-white shadow-xl shadow-brand-500/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 suppressHydrationWarning className="h-4 w-4 animate-spin" />
                    <span>Registrando turno en el taller...</span>
                  </>
                ) : (
                  <>
                    <Calendar suppressHydrationWarning className="h-4 w-4" />
                    <span>Confirmar y Enviar Solicitud</span>
                    <ArrowRight suppressHydrationWarning className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Bloque de Confianza Inferior */}
        <div className="rounded-3xl border border-surface-border/60 bg-surface/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel-400">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-brand-400 border border-surface-border">
              <MapPin suppressHydrationWarning className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-white">Renovautos Santa Marta</p>
              <p className="text-[11px]">Calle 156 #7-15 · Lun a Sáb: 8:00 AM - 6:00 PM</p>
            </div>
          </div>
          <a
            href="https://wa.me/573025449422?text=Hola%20Kilmer,%20quiero%20hacer%20una%20consulta%20mecánica"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:underline font-bold flex items-center gap-1"
          >
            <MessageCircle suppressHydrationWarning className="h-3.5 w-3.5" />
            Escribir directo al WhatsApp
          </a>
        </div>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}
