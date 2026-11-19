"use client";

import { useActionState } from "react";
import { registerPaymentAction } from "@/actions/workorders";
import { formatCOP } from "@/lib/utils";
import { Banknote, Smartphone, CreditCard, Loader2, CheckCircle2 } from "lucide-react";
import type { Payment, PaymentStatus } from "@prisma/client";

interface Props {
  workOrderId: string;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: PaymentStatus;
  payments: Payment[];
}

export default function PaymentPanel({
  workOrderId,
  totalAmount,
  paidAmount,
  paymentStatus,
  payments,
}: Props) {
  const [state, formAction, isPending] = useActionState(registerPaymentAction, {});

  const remaining = Math.max(0, totalAmount - paidAmount);
  const isPaid = paymentStatus === "PAID" || (totalAmount > 0 && remaining <= 0);

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-steel-400">
          Control de Pagos y Abonos
        </h3>
        <span
          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
            isPaid
              ? "bg-green-500/10 text-green-400 border-green-500/20"
              : paidAmount > 0
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}
        >
          {isPaid ? "Pagado Completo" : paidAmount > 0 ? "Abono Parcial" : "Pendiente de Pago"}
        </span>
      </div>

      {/* Balance Summary */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-surface p-2.5 border border-surface-border">
          <p className="text-[10px] text-steel-500">Total a Cobrar</p>
          <p className="text-sm font-black text-white">{formatCOP(totalAmount)}</p>
        </div>
        <div className="rounded-xl bg-surface p-2.5 border border-surface-border">
          <p className="text-[10px] text-steel-500">Total Pagado</p>
          <p className="text-sm font-black text-green-400">{formatCOP(paidAmount)}</p>
        </div>
        <div className="rounded-xl bg-surface p-2.5 border border-surface-border">
          <p className="text-[10px] text-steel-500">Saldo Pendiente</p>
          <p className="text-sm font-black text-brand-400">{formatCOP(remaining)}</p>
        </div>
      </div>

      {/* Registrar Abono / Pago */}
      {!isPaid && (
        <form action={formAction} className="space-y-3 border-t border-surface-border pt-4">
          <input type="hidden" name="workOrderId" value={workOrderId} />

          {state.error && (
            <p className="text-xs text-red-400">{state.error}</p>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-steel-300">Monto del Abono (COP)</label>
              <input
                name="amount"
                type="number"
                min="1"
                max={remaining > 0 ? remaining : undefined}
                defaultValue={remaining > 0 ? remaining : ""}
                placeholder="Monto"
                required
                className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm text-white font-bold text-green-400 focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-steel-300">Método de Pago</label>
              <select
                name="method"
                defaultValue="TRANSFER"
                className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="TRANSFER" className="bg-surface-elevated">
                  Transferencia (Nequi / Daviplata)
                </option>
                <option value="CASH" className="bg-surface-elevated">
                  Efectivo
                </option>
                <option value="CARD" className="bg-surface-elevated">
                  Tarjeta Débito/Crédito
                </option>
                <option value="MIXED" className="bg-surface-elevated">
                  Mixto
                </option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <input
              name="reference"
              placeholder="N° de comprobante / Nequi / Observaciones (Opcional)"
              className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-xs text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 text-xs font-bold text-white shadow-lg shadow-green-600/25 transition-all hover:bg-green-700 active:scale-95 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Registrando pago...</span>
              </>
            ) : (
              <>
                <Banknote className="h-4 w-4" />
                <span>Registrar Abono / Pago</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Historial de Abonos */}
      {payments.length > 0 && (
        <div className="space-y-2 border-t border-surface-border pt-3">
          <p className="text-[11px] font-semibold text-steel-400 uppercase tracking-wide">
            Comprobantes de Pago ({payments.length})
          </p>
          <div className="space-y-1.5">
            {payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-xl bg-surface border border-surface-border text-xs"
              >
                <div>
                  <span className="font-bold text-white">{formatCOP(p.amount)}</span>
                  <span className="text-[11px] text-steel-500 ml-2">
                    ({p.method === "TRANSFER" ? "Nequi/Transferencia" : p.method === "CASH" ? "Efectivo" : "Tarjeta"})
                  </span>
                  {p.reference && (
                    <p className="text-[10px] text-steel-400 mt-0.5">Ref: {p.reference}</p>
                  )}
                </div>
                <span className="text-[10px] text-steel-500">
                  {new Date(p.createdAt).toLocaleDateString("es-CO")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
