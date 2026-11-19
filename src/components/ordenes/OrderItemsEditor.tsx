"use client";

import { useActionState, useState, useTransition } from "react";
import { addOrderItemAction, deleteOrderItemAction } from "@/actions/workorders";
import { formatCOP } from "@/lib/utils";
import { Plus, Trash2, Wrench, Package, TrendingUp, Loader2 } from "lucide-react";
import type { OrderItem } from "@prisma/client";

interface Props {
  workOrderId: string;
  items: OrderItem[];
  subtotalParts: number;
  subtotalLabor: number;
  totalCostParts: number;
  totalAmount: number;
  discount: number;
}

export default function OrderItemsEditor({
  workOrderId,
  items,
  subtotalParts,
  subtotalLabor,
  totalCostParts,
  totalAmount,
  discount,
}: Props) {
  const [itemType, setItemType] = useState<"PART" | "LABOR">("PART");
  const [isDeleting, startDelete] = useTransition();

  // Estados de cálculo de margen en vivo
  const [qty, setQty] = useState("1");
  const [unitCost, setUnitCost] = useState("");
  const [unitPrice, setUnitPrice] = useState("");

  const parsedQty = parseFloat(qty) || 1;
  const parsedCost = parseFloat(unitCost) || 0;
  const parsedPrice = parseFloat(unitPrice) || 0;
  const liveMargin = (parsedPrice - parsedCost) * parsedQty;

  const [state, formAction, isPending] = useActionState(addOrderItemAction, {});

  const totalMargin = subtotalParts + subtotalLabor - totalCostParts;

  return (
    <div className="space-y-4">
      {/* Formulario Agregar Ítem */}
      <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-steel-400">
            Cotización / Repuestos y Mano de Obra
          </h3>
          <div className="flex rounded-lg bg-surface p-1 border border-surface-border">
            <button
              type="button"
              onClick={() => setItemType("PART")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                itemType === "PART"
                  ? "bg-brand-500 text-white"
                  : "text-steel-400 hover:text-white"
              }`}
            >
              <Package className="h-3.5 w-3.5" />
              <span>Repuesto</span>
            </button>
            <button
              type="button"
              onClick={() => setItemType("LABOR")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-colors ${
                itemType === "LABOR"
                  ? "bg-brand-500 text-white"
                  : "text-steel-400 hover:text-white"
              }`}
            >
              <Wrench className="h-3.5 w-3.5" />
              <span>Mano de Obra</span>
            </button>
          </div>
        </div>

        <form action={formAction} className="space-y-3">
          <input type="hidden" name="workOrderId" value={workOrderId} />
          <input type="hidden" name="type" value={itemType} />

          {/* Descripción */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-steel-300">
              {itemType === "PART" ? "Nombre / Referencia del Repuesto" : "Labor Mecánica Realizada"} *
            </label>
            <input
              name="description"
              placeholder={
                itemType === "PART"
                  ? "Ej: Kit de embrague Valeo, Pastillas de freno cerámicas..."
                  : "Ej: Bajada de caja y montaje de embrague, Rectificación de discos..."
              }
              required
              className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2.5 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none"
            />
          </div>

          {/* Cantidad y Unidad */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-steel-300">Cantidad</label>
              <input
                name="quantity"
                type="number"
                step="0.1"
                min="0.1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                required
                className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm text-white text-center font-bold focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-steel-300">Unidad</label>
              <input
                name="unit"
                defaultValue={itemType === "PART" ? "unid" : "servicio"}
                placeholder="unid, lt, jgo..."
                className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-steel-300">Marca (Opcional)</label>
              <input
                name="brand"
                placeholder="Bosch, Gates..."
                className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Costo de Compra (solo repuesto) vs Precio Cliente */}
          <div className="grid grid-cols-2 gap-2">
            {itemType === "PART" ? (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-steel-400">
                  Costo Compra (COP) <span className="text-[10px] text-steel-500">(Privado)</span>
                </label>
                <input
                  name="unitCost"
                  type="number"
                  min="0"
                  value={unitCost}
                  onChange={(e) => setUnitCost(e.target.value)}
                  placeholder="Lo que te costó"
                  className="w-full rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
                />
              </div>
            ) : (
              <input type="hidden" name="unitCost" value="0" />
            )}

            <div className={`space-y-1 ${itemType === "LABOR" ? "col-span-2" : ""}`}>
              <label className="text-xs font-bold text-brand-400">
                Precio al Cliente (COP) *
              </label>
              <input
                name="unitPrice"
                type="number"
                min="0"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="Lo que cobras"
                required
                className="w-full rounded-xl border border-brand-500/30 bg-surface px-3 py-2 text-sm font-bold text-brand-400 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Margen en Vivo */}
          {itemType === "PART" && parsedPrice > 0 && (
            <div className="flex items-center justify-between rounded-xl bg-surface p-2.5 border border-surface-border text-xs">
              <span className="text-steel-400 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-green-400" />
                <span>Ganancia neta en esta pieza:</span>
              </span>
              <span className="font-bold text-green-400">{formatCOP(liveMargin)}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-xs font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600 active:scale-95 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Agregando línea...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 stroke-[3]" />
                <span>Agregar a la Orden</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Lista de Ítems */}
      <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden shadow-xl">
        <div className="p-4 border-b border-surface-border flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-steel-400">
            Detalle del Presupuesto ({items.length} ítems)
          </h4>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center text-xs text-steel-500">
            No has agregado repuestos ni mano de obra a esta orden.
          </div>
        ) : (
          <div className="divide-y divide-surface-border">
            {items.map((item) => (
              <div key={item.id} className="p-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        item.type === "PART"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                      }`}
                    >
                      {item.type === "PART" ? "Repuesto" : "Labor"}
                    </span>
                    <p className="font-bold text-white text-xs truncate">
                      {item.description}
                    </p>
                    {item.brand && (
                      <span className="text-[10px] text-steel-500 font-normal">
                        ({item.brand})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-1 text-[11px] text-steel-400">
                    <span>
                      {item.quantity} {item.unit ?? "unid"} × {formatCOP(item.unitPrice)}
                    </span>
                    {item.type === "PART" && item.unitCost > 0 && (
                      <span className="text-green-400 font-medium">
                        (Margen: +{formatCOP(item.margin)})
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-white text-xs">
                    {formatCOP(item.totalPrice)}
                  </span>
                  <button
                    onClick={() => startDelete(() => deleteOrderItemAction(item.id, workOrderId))}
                    disabled={isDeleting}
                    className="p-1 text-steel-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resumen Totales */}
        <div className="bg-surface p-4 border-t border-surface-border space-y-2">
          <div className="flex justify-between text-xs text-steel-400">
            <span>Repuestos:</span>
            <span>{formatCOP(subtotalParts)}</span>
          </div>
          <div className="flex justify-between text-xs text-steel-400">
            <span>Mano de obra:</span>
            <span>{formatCOP(subtotalLabor)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-xs text-red-400">
              <span>Descuento aplicado:</span>
              <span>-{formatCOP(discount)}</span>
            </div>
          )}

          <div className="flex justify-between text-base font-black text-white pt-2 border-t border-surface-border">
            <span>Total Cliente:</span>
            <span className="text-brand-400">{formatCOP(totalAmount)}</span>
          </div>

          <div className="flex justify-between text-xs font-semibold text-green-400 pt-1">
            <span>Tu Utilidad Estimada (Mano de Obra + Margen Repuestos):</span>
            <span>{formatCOP(totalMargin)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
