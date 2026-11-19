"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { createCustomerAction, updateCustomerAction, type CustomerFormState } from "@/actions/customers";
import { Loader2, Save, User, Phone, Mail, FileText, MapPin } from "lucide-react";
import type { Customer } from "@prisma/client";

interface CustomerFormProps {
  customer?: Customer;
  onSuccess?: (id: string) => void;
}

const initialState: CustomerFormState = {};

export default function CustomerForm({ customer, onSuccess }: CustomerFormProps) {
  const router = useRouter();
  const isEditing = !!customer;

  const action = isEditing
    ? updateCustomerAction.bind(null, customer.id)
    : createCustomerAction;

  const [state, formAction, isPending] = useActionState(action, initialState);

  if (state.customerId) {
    if (onSuccess) {
      onSuccess(state.customerId);
    } else {
      router.push(`/admin/clientes/${state.customerId}`);
    }
  }

  const field = (name: string) =>
    (state.errors as Record<string, string[] | undefined> | undefined)?.[name]?.[0];

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
          {state.error}
        </div>
      )}

      {/* Nombre */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-steel-300">
          Nombre completo <span className="text-brand-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
          <input
            name="name"
            defaultValue={customer?.name}
            placeholder="Ej: Carlos Martínez"
            required
            className="w-full rounded-xl border border-surface-border bg-surface pl-10 pr-4 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        {field("name") && <p className="text-xs text-red-400">{field("name")}</p>}
      </div>

      {/* WhatsApp / Teléfono */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-steel-300">
          WhatsApp / Teléfono Móvil <span className="text-brand-500">*</span>
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
          <input
            name="phone"
            type="tel"
            defaultValue={customer?.phone}
            placeholder="Ej: 3001234567"
            required
            className="w-full rounded-xl border border-surface-border bg-surface pl-10 pr-4 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        {field("phone") && <p className="text-xs text-red-400">{field("phone")}</p>}
      </div>

      {/* Email & Cédula */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-steel-300">Email (Opcional)</label>
          <input
            name="email"
            type="email"
            defaultValue={customer?.email ?? ""}
            placeholder="cliente@correo.com"
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-steel-300">Cédula / NIT (Opcional)</label>
          <input
            name="cedula"
            defaultValue={customer?.cedula ?? ""}
            placeholder="C.C. o NIT"
            className="w-full rounded-xl border border-surface-border bg-surface px-3 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Dirección */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-steel-300">Dirección en Santa Marta</label>
        <div className="relative">
          <MapPin className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
          <input
            name="address"
            defaultValue={customer?.address ?? ""}
            placeholder="Ej: Rodadero, Carrera 4 # 15-20"
            className="w-full rounded-xl border border-surface-border bg-surface pl-10 pr-4 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Notas internas */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-steel-300 flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-steel-500" />
          <span>Notas internas del cliente</span>
        </label>
        <textarea
          name="notes"
          defaultValue={customer?.notes ?? ""}
          placeholder="Ej: Cliente frecuente de taxi / particular. Siempre pide aceite sintético..."
          rows={3}
          className="w-full rounded-xl border border-surface-border bg-surface p-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
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
            <span>Guardando cliente...</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>{isEditing ? "Actualizar Cliente" : "Guardar Cliente"}</span>
          </>
        )}
      </button>
    </form>
  );
}
