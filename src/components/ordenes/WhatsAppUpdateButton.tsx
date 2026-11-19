"use client";

import { buildOrderUpdateMessage } from "@/lib/whatsapp";
import { buildWhatsAppLink } from "@/lib/utils";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import type { WorkOrderStatus } from "@prisma/client";

interface Props {
  customerPhone: string;
  customerName: string;
  vehiclePlate: string;
  orderNumber: string;
  status: WorkOrderStatus;
  totalAmount: number;
  publicToken: string;
}

export default function WhatsAppUpdateButton({
  customerPhone,
  customerName,
  vehiclePlate,
  orderNumber,
  status,
  totalAmount,
  publicToken,
}: Props) {
  const message = buildOrderUpdateMessage({
    customerName,
    vehiclePlate,
    orderNumber,
    status,
    totalAmount,
    publicToken,
  });

  const whatsappLink = buildWhatsAppLink(customerPhone, message);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-2xl bg-green-600/90 hover:bg-green-600 px-4 py-3.5 text-xs font-bold text-white shadow-xl shadow-green-600/20 transition-all active:scale-95"
    >
      <div className="flex items-center gap-2.5">
        <MessageCircle className="h-5 w-5" />
        <div className="text-left">
          <p className="text-sm font-bold leading-tight">Enviar Actualización por WhatsApp</p>
          <p className="text-[11px] font-normal text-green-100">
            Abre WhatsApp con el link del portal para el cliente
          </p>
        </div>
      </div>
      <ArrowUpRight className="h-5 w-5 shrink-0" />
    </a>
  );
}
