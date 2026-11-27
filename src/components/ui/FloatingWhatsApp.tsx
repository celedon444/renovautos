"use client";

import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/utils";

interface FloatingWhatsAppProps {
  phone?: string;
  message?: string;
}

export default function FloatingWhatsApp({
  phone = "573025449422",
  message = "¡Hola Renovautos! Deseo hacer una consulta sobre la restauración o mantenimiento de mi vehículo en Santa Marta.",
}: FloatingWhatsAppProps) {
  const url = buildWhatsAppLink(phone, message);

  return (
    <aside aria-label="Contacto por WhatsApp" className="fixed bottom-6 right-5 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a Renovautos por WhatsApp"
        className="group relative flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 sm:px-5 sm:py-3.5 text-white shadow-2xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] hover:shadow-[#25D366]/60 active:scale-95"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
          <WhatsAppIcon className="relative h-6 w-6 fill-white" />
        </span>
        <span className="hidden sm:inline-block text-xs font-black tracking-wide">
          ¿Necesitas ayuda?
        </span>
      </a>
    </aside>
  );
}
