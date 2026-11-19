"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils";

interface FloatingWhatsAppProps {
  phone?: string;
  message?: string;
}

export default function FloatingWhatsApp({
  phone = "573001234567",
  message = "¡Hola Taller Junior! Deseo hacer una consulta sobre la reparación o mantenimiento de mi vehículo.",
}: FloatingWhatsAppProps) {
  const url = buildWhatsAppLink(phone, message);

  return (
    <aside aria-label="Contacto por WhatsApp" className="fixed bottom-6 right-5 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 p-3.5 sm:px-5 sm:py-3.5 text-white shadow-2xl shadow-green-500/40 transition-all duration-300 hover:scale-105 hover:shadow-green-500/60 active:scale-95"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
          <MessageCircle suppressHydrationWarning className="relative h-6 w-6 text-white" />
        </span>
        <span className="hidden sm:inline-block text-xs font-black tracking-wide">
          ¿Dudas? Chatea al WhatsApp
        </span>
      </a>
    </aside>
  );
}
