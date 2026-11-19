"use client";

import { useActionState } from "react";
import { createExpenseAction, type ExpenseFormState } from "@/actions/expenses";
import { Plus, Loader2, DollarSign } from "lucide-react";

const initialState: ExpenseFormState = {};

export default function ExpenseForm() {
  const [state, formAction, isPending] = useActionState(createExpenseAction, initialState);

  return (
    <form action={formAction} className="space-y-3">
      {state.error && (
        <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded-lg">{state.error}</p>
      )}

      <div className="space-y-1">
        <label className="text-xs font-semibold text-steel-300">Descripción del Gasto *</label>
        <input
          name="description"
          placeholder="Ej: Compra juego de dados 1/2, Arriendo taller marzo, Factura luz Air-e..."
          required
          className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2.5 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-steel-300">Monto (COP) *</label>
          <input
            name="amount"
            type="number"
            min="1"
            placeholder="Monto"
            required
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm font-bold text-red-400 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-steel-300">Categoría *</label>
          <select
            name="category"
            defaultValue="PARTS"
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-xs text-white focus:border-brand-500 focus:outline-none"
          >
            <option value="PARTS" className="bg-surface-elevated">Compra de Repuestos</option>
            <option value="TOOLS" className="bg-surface-elevated">Herramientas y Equipos</option>
            <option value="RENT" className="bg-surface-elevated">Arriendo del Local</option>
            <option value="UTILITIES" className="bg-surface-elevated">Servicios Públicos (Luz/Agua)</option>
            <option value="SALARY" className="bg-surface-elevated">Ayudante / Mano de Obra</option>
            <option value="TRANSPORT" className="bg-surface-elevated">Transporte / Envíos</option>
            <option value="OTHER" className="bg-surface-elevated">Otros Gastos Operativos</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-steel-300">Proveedor / Almacén (Opcional)</label>
        <input
          name="vendor"
          placeholder="Ej: AutoPartes Santa Marta, Ferretería El Tornillo..."
          className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-xs text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600/90 py-3 text-xs font-bold text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-600 active:scale-95 disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Registrando egreso...</span>
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            <span>Registrar Gasto</span>
          </>
        )}
      </button>
    </form>
  );
}
