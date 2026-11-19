"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createAppointmentAction, type AppointmentState } from "@/actions/appointments";
import { buildWhatsAppLink } from "@/lib/utils";
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
} from "lucide-react";

const SERVICES = [
  "Mantenimiento Preventivo (Cambio de Aceite y Filtros)",
  "Diagnóstico Computarizado / Scanner",
  "Sistema de Frenos (Discos, Pastillas, Líquido)",
  "Suspensión, Amortiguadores y Dirección",
  "Embrague / Kit de Clutch",
  "Reparación de Motor / Fugas de Aceite",
  "Sistema Eléctrico y Batería",
  "Revisión de Viaje / Inspección General",
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
    <div className="min-h-screen bg-surface text-steel-100 pb-16">
      {/* Header */}
      <header className="border-b border-surface-border bg-surface-elevated/80 px-4 py-4 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-steel-400 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Inicio</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500">
              <Wrench className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white text-xs">Taller Junior</span>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 pt-6 space-y-6">
        <div className="text-center space-y-2">
          <span className="rounded-full bg-brand-500/15 border border-brand-500/30 px-3 py-1 text-xs font-bold text-brand-400">
            Agenda tu Visita al Taller
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Agenda tu Cita en Santa Marta
          </h1>
          <p className="text-xs text-steel-400 max-w-md mx-auto">
            Evita esperas. Déjanos tus datos y nos pondremos en contacto contigo por WhatsApp para confirmar tu horario.
          </p>
        </div>

        {submittedData ? (
          <div className="rounded-2xl border border-green-500/30 bg-surface-elevated p-6 text-center space-y-4 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">¡Solicitud Recibida con Éxito!</h2>
              <p className="text-xs text-steel-400 mt-1">
                Gracias, <strong className="text-white">{submittedData.name}</strong>. Para confirmar tu cupo de inmediato, haz clic en el botón a continuación:
              </p>
            </div>

            <a
              href={buildWhatsAppLink(
                process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567",
                `¡Hola Junior! Acabo de agendar una cita en su página web:\n\n👤 *Nombre:* ${submittedData.name}\n🚗 *Vehículo / Placa:* ${submittedData.plate || "No especificada"}\n🔧 *Servicio:* ${submittedData.service}\n📅 *Fecha Deseada:* ${submittedData.date}\n\n¿Tienen disponibilidad para confirmar mi atención?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-green-600 py-4 text-sm font-bold text-white shadow-xl shadow-green-600/30 transition-all hover:bg-green-700 active:scale-95"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Confirmar por WhatsApp con Junior</span>
            </a>

            <Link
              href="/"
              className="inline-block text-xs text-steel-500 hover:text-white transition-colors"
            >
              Volver a la página principal
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 sm:p-6 shadow-2xl">
            <form action={formAction} className="space-y-4">
              {state.error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                  {state.error}
                </div>
              )}

              {/* Nombre */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-steel-300">
                  Nombre Completo <span className="text-brand-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
                  <input
                    name="customerName"
                    required
                    placeholder="Tu nombre y apellido"
                    className="w-full rounded-xl border border-surface-border bg-surface pl-10 pr-4 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Teléfono WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-steel-300">
                  Número de WhatsApp <span className="text-brand-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
                  <input
                    name="customerPhone"
                    type="tel"
                    required
                    placeholder="Ej: 300 123 4567"
                    className="w-full rounded-xl border border-surface-border bg-surface pl-10 pr-4 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Placa y Vehículo */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-steel-300">Placa (Opcional)</label>
                  <input
                    name="vehiclePlate"
                    placeholder="ABC-123"
                    className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm font-mono text-center uppercase font-bold text-brand-400 placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-steel-300">Marca / Modelo</label>
                  <input
                    name="vehicleBrand"
                    placeholder="Ej: Renault Logan"
                    className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Servicio Requerido */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-steel-300">
                  Servicio Requerido <span className="text-brand-500">*</span>
                </label>
                <select
                  name="serviceType"
                  required
                  className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-xs sm:text-sm text-white focus:border-brand-500 focus:outline-none"
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
                <label className="text-xs font-semibold text-steel-300">
                  Fecha Deseada de Atención <span className="text-brand-500">*</span>
                </label>
                <input
                  name="preferredDate"
                  type="date"
                  required
                  suppressHydrationWarning
                  className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              {/* Descripción adicional */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-steel-300">
                  Síntomas del Auto / Detalles Adicionales
                </label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Describe lo que le sucede al carro (ruidos, fugas, kilometraje para mantenimiento)..."
                  className="w-full rounded-xl border border-surface-border bg-surface p-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-500 py-4 text-sm font-black text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-600 active:scale-95 disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Enviando solicitud...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar y Agendar Cita</span>
                    <ArrowRight className="h-4 w-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
