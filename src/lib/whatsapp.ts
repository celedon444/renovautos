import { buildWhatsAppLink, formatCOP } from "./utils";
import type { WorkOrderStatus } from "@prisma/client";

export function buildOrderUpdateMessage(params: {
  customerName: string;
  vehiclePlate: string;
  orderNumber: string;
  status: WorkOrderStatus;
  totalAmount: number;
  publicToken: string;
}): string {
  const { customerName, vehiclePlate, orderNumber, status, totalAmount, publicToken } = params;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const firstName = customerName.split(" ")[0];
  const trackUrl = `${appUrl}/estado/${publicToken}`;

  const statusMessages: Partial<Record<WorkOrderStatus, string>> = {
    RECEIVED: "🚗 Tu vehículo ha ingresado exitosamente a nuestras instalaciones.",
    DIAGNOSING: "🔍 Nos encontramos en la fase de diagnóstico computarizado y revisión técnica.",
    QUOTE_SENT: `📋 Tu cotización está lista. Presupuesto estimado: *${formatCOP(totalAmount)}*`,
    APPROVED: "👍 Presupuesto aprobado. Iniciamos trabajos.",
    IN_REPAIR: "🔧 Tu vehículo se encuentra actualmente en reparación activa.",
    QUALITY_CHECK: "🔎 Realizando pruebas y control de calidad final.",
    READY: "🎉 ¡Tu vehículo está LISTO para ser retirado!",
    DELIVERED: "✅ Servicio completado. Gracias por confiar en Taller Junior.",
  };

  const statusMsg = statusMessages[status] ?? `Estado de tu orden: *${status}*`;

  return `Hola ${firstName} 👋\n\n${statusMsg}\n\n📋 *Orden:* ${orderNumber}\n🚗 *Vehículo:* ${vehiclePlate}\n${totalAmount > 0 ? `💰 *Total:* ${formatCOP(totalAmount)}\n` : ""}\n🔗 *Sigue el estado en vivo con fotos y detalles aquí:*\n${trackUrl}\n\nCualquier duda o comentario, puedes responder directamente a este mensaje.\n— *Taller Junior · Santa Marta, Colombia* 🔧`;
}
