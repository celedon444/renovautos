"use client";

import { useActionState, useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createWorkOrderAction } from "@/actions/workorders";
import { searchVehicleByPlate } from "@/actions/vehicles";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Car,
  User,
  Phone,
  Fuel,
  Gauge,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const FUEL_LEVELS = [
  { value: "EMPTY", label: "Vacío", emoji: "▱▱▱▱" },
  { value: "QUARTER", label: "1/4", emoji: "▰▱▱▱" },
  { value: "HALF", label: "1/2", emoji: "▰▰▱▱" },
  { value: "THREE_QUARTERS", label: "3/4", emoji: "▰▰▰▱" },
  { value: "FULL", label: "Lleno", emoji: "▰▰▰▰" },
];

function NuevaOrdenContent() {
  const searchParams = useSearchParams();
  const plateParam = searchParams.get("plate") ?? "";

  const [plate, setPlate] = useState(plateParam.toUpperCase());
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [searching, setSearching] = useState(false);
  const [fuelLevel, setFuelLevel] = useState("HALF");
  const debouncedPlate = useDebounce(plate, 350);

  useEffect(() => {
    if (debouncedPlate.length < 5) {
      setVehicleData(null);
      return;
    }
    setSearching(true);
    searchVehicleByPlate(debouncedPlate).then((data) => {
      setVehicleData(data);
      setSearching(false);
    });
  }, [debouncedPlate]);

  const [state, formAction, isPending] = useActionState(createWorkOrderAction, {});
  const router = useRouter();

  useEffect(() => {
    if (state.orderId) {
      router.push(`/admin/ordenes/${state.orderId}`);
    }
  }, [state.orderId, router]);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center gap-3 border-b border-surface-border pb-4">
        <Link
          href="/admin/ordenes"
          className="rounded-xl border border-surface-border bg-surface-elevated p-2 text-steel-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Nueva Orden de Ingreso</h1>
          <p className="text-xs text-steel-400 mt-0.5">Captura rápida táctil para celular en taller.</p>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="vehicleId" value={vehicleData?.id ?? ""} />
        <input type="hidden" name="fuelLevel" value={fuelLevel} />

        {/* PASO 1: Placa del Auto */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 space-y-3 shadow-xl">
          <label className="text-xs font-bold text-steel-300 flex items-center gap-1.5 uppercase tracking-wide">
            <Car className="h-4 w-4 text-brand-400" />
            <span>1. Placa del Vehículo</span>
          </label>

          <div className="relative">
            <input
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase().replace(/\s/g, ""))}
              placeholder="ABC-123"
              maxLength={8}
              className="w-full rounded-2xl border-2 border-brand-500/40 bg-surface px-4 py-4 text-center font-mono text-3xl font-black tracking-[0.25em] text-brand-400 placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
            />
            {searching && (
              <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-brand-500" />
            )}
          </div>

          {/* Resultado de búsqueda en tiempo real */}
          {vehicleData && (
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 text-green-400 font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Vehículo encontrado en el sistema</span>
              </div>
              <p className="font-bold text-white">
                {vehicleData.brand} {vehicleData.model} ({vehicleData.year})
              </p>
              <p className="text-steel-400">
                Propietario: <span className="text-steel-200">{vehicleData.customer.name}</span> ({vehicleData.customer.phone})
              </p>
              {vehicleData.oilType && (
                <p className="text-brand-400 font-medium">🛢 Aceite recomendado: {vehicleData.oilType}</p>
              )}
            </div>
          )}

          {plate.length >= 5 && !vehicleData && !searching && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-xs text-amber-300">
              <p className="font-bold">⚠️ Esta placa no está registrada aún.</p>
              <Link
                href="/admin/clientes/nuevo"
                className="inline-block mt-1 underline font-semibold text-brand-400"
              >
                + Registrar cliente y auto primero aquí
              </Link>
            </div>
          )}
        </div>

        {/* PASO 2: Kilometraje & Nivel de Combustible */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 space-y-4 shadow-xl">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-steel-300 flex items-center gap-1.5 uppercase tracking-wide">
              <Gauge className="h-4 w-4 text-brand-400" />
              <span>2. Kilometraje Actual (Km)</span>
            </label>
            <input
              name="mileageIn"
              type="number"
              min="0"
              placeholder="Ej: 85400"
              className="w-full rounded-xl border border-surface-border bg-surface px-4 py-3 text-lg font-bold text-white text-center focus:border-brand-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 pt-2 border-t border-surface-border">
            <label className="text-xs font-bold text-steel-300 flex items-center gap-1.5 uppercase tracking-wide">
              <Fuel className="h-4 w-4 text-brand-400" />
              <span>Nivel de Tanque de Gasolina</span>
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {FUEL_LEVELS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFuelLevel(f.value)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs transition-all active:scale-95 ${
                    fuelLevel === f.value
                      ? "border-brand-500 bg-brand-500/15 text-brand-400 font-bold"
                      : "border-surface-border bg-surface text-steel-500 hover:text-white"
                  }`}
                >
                  <span className="font-mono text-sm">{f.emoji}</span>
                  <span className="text-[10px]">{f.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PASO 3: Falla reportada y Notas */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 space-y-4 shadow-xl">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-steel-300 uppercase tracking-wide">
              3. Falla Reportada por el Cliente *
            </label>
            <textarea
              name="symptoms"
              required
              rows={3}
              placeholder="Ej: Ruido metálico al girar dirección, testigo de check engine encendido, pedal de freno esponjoso..."
              className="w-full rounded-xl border border-surface-border bg-surface p-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-steel-400 uppercase tracking-wide">
              Notas Internas del Mecánico (Privadas)
            </label>
            <textarea
              name="mechanicNotes"
              rows={2}
              placeholder="Ej: Revisar también fuga de refrigerante en manguera superior..."
              className="w-full rounded-xl border border-surface-border bg-surface p-3 text-xs text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none resize-none"
            />
          </div>
        </div>

        {state.errors && Object.values(state.errors).flat().length > 0 && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
            {Object.values(state.errors).flat().map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || !vehicleData}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-500 py-4 text-base font-black text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-600 active:scale-95 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generando orden de trabajo...</span>
            </>
          ) : (
            <>
              <span>Abrir Orden de Ingreso</span>
              <ArrowRight className="h-5 w-5 stroke-[3]" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function NuevaOrdenPage() {
  return (
    <Suspense fallback={<div className="text-center p-8 text-xs text-steel-400">Cargando formulario...</div>}>
      <NuevaOrdenContent />
    </Suspense>
  );
}
