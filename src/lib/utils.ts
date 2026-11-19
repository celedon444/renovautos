import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatRelative } from "date-fns";
import { es } from "date-fns/locale";
import type { WorkOrderStatus } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea valor en Pesos colombianos */
export function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Formatea fecha en español */
export function formatDate(date: Date | string, pattern = "dd MMM yyyy"): string {
  return format(new Date(date), pattern, { locale: es });
}

/** Fecha relativa en español (ej. "hace 2 horas") */
export function formatRelativeDate(date: Date | string): string {
  return formatRelative(new Date(date), new Date(), { locale: es });
}

/** Genera link de WhatsApp con mensaje prellenado */
export function buildWhatsAppLink(phone: string, message: string): string {
  // Limpiar caracteres no numéricos
  const cleanPhone = phone.replace(/\D/g, "");
  // Si no tiene prefijo país de Colombia (57), agregarlo si tiene 10 dígitos (ej. 300...)
  const fullPhone = cleanPhone.length === 10 && cleanPhone.startsWith("3") ? `57${cleanPhone}` : cleanPhone;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${fullPhone}?text=${encoded}`;
}

/** Genera número de orden correlativo */
export function generateOrderNumber(count: number): string {
  const year = new Date().getFullYear();
  const num = String(count + 1).padStart(3, "0");
  return `TJ-${year}-${num}`;
}

/** Mapa de colores y etiquetas para estados de orden */
export const ORDER_STATUS_CONFIG: Record<
  WorkOrderStatus,
  { label: string; color: string; badgeBg: string; step: number; emoji: string }
> = {
  PENDING_INTAKE:    { label: "Pendiente",          color: "bg-slate-500",  badgeBg: "bg-slate-500/10 text-slate-400 border-slate-500/20", step: 0, emoji: "⏳" },
  RECEIVED:          { label: "Recibido",           color: "bg-blue-500",   badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",   step: 1, emoji: "🚗" },
  DIAGNOSING:        { label: "En Diagnóstico",     color: "bg-purple-500", badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20", step: 2, emoji: "🔍" },
  QUOTE_SENT:        { label: "Cotización Enviada", color: "bg-amber-500",  badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/20", step: 3, emoji: "📋" },
  AWAITING_APPROVAL: { label: "Esperando Aprobación", color: "bg-yellow-500", badgeBg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", step: 3, emoji: "🕒" },
  APPROVED:          { label: "Aprobado",           color: "bg-cyan-500",   badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",   step: 4, emoji: "👍" },
  IN_REPAIR:         { label: "En Reparación",      color: "bg-orange-500", badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20", step: 4, emoji: "🔧" },
  QUALITY_CHECK:     { label: "Control Calidad",    color: "bg-indigo-500", badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", step: 5, emoji: "🔎" },
  READY:             { label: "Listo para Entrega", color: "bg-green-500",  badgeBg: "bg-green-500/10 text-green-400 border-green-500/20",  step: 6, emoji: "🎉" },
  DELIVERED:         { label: "Entregado",          color: "bg-slate-400",  badgeBg: "bg-slate-400/10 text-slate-300 border-slate-400/20",  step: 7, emoji: "✅" },
  CANCELLED:         { label: "Cancelado",          color: "bg-red-500",    badgeBg: "bg-red-500/10 text-red-400 border-red-500/20",      step: -1, emoji: "❌" },
};
