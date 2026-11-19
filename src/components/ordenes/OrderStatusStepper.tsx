"use client";

import { useTransition } from "react";
import { updateOrderStatusAction } from "@/actions/workorders";
import { ORDER_STATUS_CONFIG } from "@/lib/utils";
import { Check, Loader2, ChevronRight } from "lucide-react";
import type { WorkOrderStatus } from "@prisma/client";

const STEPS: WorkOrderStatus[] = [
  "RECEIVED",
  "DIAGNOSING",
  "QUOTE_SENT",
  "APPROVED",
  "IN_REPAIR",
  "QUALITY_CHECK",
  "READY",
  "DELIVERED",
];

interface Props {
  orderId: string;
  currentStatus: WorkOrderStatus;
}

export default function OrderStatusStepper({ orderId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();

  const currentIndex = STEPS.indexOf(currentStatus);
  const nextStatus = STEPS[currentIndex + 1];
  const nextConfig = nextStatus ? ORDER_STATUS_CONFIG[nextStatus] : null;

  const handleAdvance = () => {
    if (!nextStatus) return;
    startTransition(() => updateOrderStatusAction(orderId, nextStatus));
  };

  const handleSetStatus = (status: WorkOrderStatus) => {
    startTransition(() => updateOrderStatusAction(orderId, status));
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-steel-400">
          Línea de Estado del Vehículo
        </h3>
        <span className="text-xs text-brand-400 font-bold">
          {ORDER_STATUS_CONFIG[currentStatus]?.label}
        </span>
      </div>

      {/* Progress Dots Bar */}
      <div className="flex items-center justify-between overflow-x-auto pb-2 gap-1 no-scrollbar">
        {STEPS.map((step, idx) => {
          const cfg = ORDER_STATUS_CONFIG[step];
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <button
              key={step}
              onClick={() => handleSetStatus(step)}
              disabled={isPending}
              className="flex flex-col items-center gap-1.5 min-w-[56px] focus:outline-none transition-transform active:scale-95"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${
                  isDone
                    ? "border-green-500 bg-green-500/20 text-green-400"
                    : isCurrent
                    ? "border-brand-500 bg-brand-500 text-white shadow-lg shadow-brand-500/30 scale-110"
                    : "border-surface-border bg-surface text-steel-600 hover:border-steel-500"
                }`}
              >
                {isDone ? <Check className="h-4 w-4 stroke-[3]" /> : idx + 1}
              </div>

              <span
                className={`text-[9px] font-semibold text-center leading-tight truncate max-w-[54px] ${
                  isCurrent
                    ? "text-brand-400"
                    : isDone
                    ? "text-steel-300"
                    : "text-steel-600"
                }`}
              >
                {cfg.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Botón de Avance Rápido (Un toque con el pulgar) */}
      {nextStatus && currentStatus !== "DELIVERED" && currentStatus !== "CANCELLED" && (
        <button
          onClick={handleAdvance}
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 active:scale-95 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Actualizando estado...</span>
            </>
          ) : (
            <>
              <span>Pasar a: {nextConfig?.label}</span>
              <ChevronRight className="h-4 w-4 stroke-[3]" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
