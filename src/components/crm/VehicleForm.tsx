"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createVehicleAction, updateVehicleAction, type VehicleFormState } from "@/actions/vehicles";
import { Loader2, Save, Car, Fuel, Droplet } from "lucide-react";
import type { Vehicle } from "@prisma/client";

const OIL_TYPES = [
  "5W-30 Sintético",
  "5W-40 Sintético",
  "10W-30 Semi-sintético",
  "10W-40 Semi-sintético",
  "20W-50 Mineral",
  "0W-20 Sintético",
  "15W-40 Diesel",
  "Otro",
];

const TRANSMISSIONS = ["Manual / Mecánica", "Automática", "CVT", "Secuencial"];

interface VehicleFormProps {
  vehicle?: Vehicle;
  customerId: string;
  defaultPlate?: string;
  onSuccess?: (plate: string) => void;
}

const initialState: VehicleFormState = {};

export default function VehicleForm({
  vehicle,
  customerId,
  defaultPlate = "",
  onSuccess,
}: VehicleFormProps) {
  const router = useRouter();
  const isEditing = !!vehicle;

  const action = isEditing
    ? updateVehicleAction.bind(null, vehicle.id)
    : createVehicleAction;

  const [state, formAction, isPending] = useActionState(action, initialState);

  if (state.plate) {
    if (onSuccess) {
      onSuccess(state.plate);
    } else {
      router.push(`/admin/vehiculos/${state.plate}`);
    }
  }

  const field = (name: string) =>
    (state.errors as Record<string, string[] | undefined> | undefined)?.[name]?.[0];

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="customerId" value={customerId} />

      {state.error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
          {state.error}
        </div>
      )}

      {/* Placa en grande y centrada */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-steel-300">
          Placa del Vehículo <span className="text-brand-500">*</span>
        </label>
        <div className="relative">
          <input
            name="plate"
            defaultValue={vehicle?.plate ?? defaultPlate}
            disabled={isEditing}
            placeholder="ABC-123"
            required
            maxLength={8}
            className="w-full rounded-2xl border-2 border-brand-500/30 bg-surface px-4 py-3.5 text-center font-mono text-2xl font-black uppercase tracking-[0.25em] text-brand-400 placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
            onChange={(e) => {
              e.target.value = e.target.value.toUpperCase().replace(/\s/g, "");
            }}
          />
        </div>
        {field("plate") && <p className="text-xs text-red-400">{field("plate")}</p>}
      </div>

      {/* Marca & Modelo */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-steel-300">
            Marca <span className="text-brand-500">*</span>
          </label>
          <input
            name="brand"
            defaultValue={vehicle?.brand}
            placeholder="Toyota, Renault, Chevrolet..."
            required
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
          />
          {field("brand") && <p className="text-xs text-red-400">{field("brand")}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-steel-300">
            Modelo / Línea <span className="text-brand-500">*</span>
          </label>
          <input
            name="model"
            defaultValue={vehicle?.model}
            placeholder="Hilux, Duster, Spark..."
            required
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
          />
          {field("model") && <p className="text-xs text-red-400">{field("model")}</p>}
        </div>
      </div>

      {/* Año & Color */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-steel-300">
            Año <span className="text-brand-500">*</span>
          </label>
          <input
            name="year"
            type="number"
            min={1950}
            max={2030}
            defaultValue={vehicle?.year ?? new Date().getFullYear()}
            required
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-steel-300">Color</label>
          <input
            name="color"
            defaultValue={vehicle?.color ?? ""}
            placeholder="Blanco, Gris, Rojo..."
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Tipo de Aceite (Clave para taller unipersonal) */}
      <div className="space-y-1.5 rounded-xl border border-brand-500/20 bg-brand-500/5 p-3">
        <label className="text-xs font-bold text-brand-400 flex items-center gap-1.5">
          <Droplet className="h-4 w-4" />
          <span>Aceite Recomendado para este motor</span>
        </label>
        <select
          name="oilType"
          defaultValue={vehicle?.oilType ?? "5W-30 Sintético"}
          className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2.5 text-sm text-white focus:border-brand-500 focus:outline-none"
        >
          {OIL_TYPES.map((oil) => (
            <option key={oil} value={oil} className="bg-surface-elevated text-white">
              {oil}
            </option>
          ))}
        </select>
      </div>

      {/* Motor & Transmisión */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-steel-300">Cilindraje / Motor</label>
          <input
            name="engineType"
            defaultValue={vehicle?.engineType ?? ""}
            placeholder="1.6L 16V, 2.0 Turbo..."
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-steel-300">Transmisión</label>
          <select
            name="transmission"
            defaultValue={vehicle?.transmission ?? "Manual / Mecánica"}
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white focus:border-brand-500 focus:outline-none"
          >
            {TRANSMISSIONS.map((t) => (
              <option key={t} value={t} className="bg-surface-elevated text-white">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notas técnicas */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-steel-300">
          Historial / Observaciones técnicas del auto
        </label>
        <textarea
          name="notes"
          defaultValue={vehicle?.notes ?? ""}
          placeholder="Ej: Pernos de rueda trasera con estría desgastada, fuga leve en empaque de tapa..."
          rows={2}
          className="w-full rounded-xl border border-surface-border bg-surface p-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 active:scale-95 disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Guardando vehículo...</span>
          </>
        ) : (
          <>
            <Car className="h-4 w-4" />
            <span>{isEditing ? "Actualizar Vehículo" : "Registrar Vehículo"}</span>
          </>
        )}
      </button>
    </form>
  );
}
