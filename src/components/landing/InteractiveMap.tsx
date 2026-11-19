"use client";

import { MapPin, Navigation, Clock, Phone, ExternalLink } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function InteractiveMap() {
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Santa+Marta+Magdalena+Colombia";
  const wazeUrl =
    "https://www.waze.com/ul?q=Santa%20Marta%20Magdalena";

  return (
    <div className="rounded-3xl border border-surface-border bg-surface-elevated overflow-hidden shadow-2xl space-y-0">
      {/* Mapa Interactivo de Santa Marta */}
      <div className="relative h-72 sm:h-96 w-full bg-surface-elevated">
        <iframe
          title="Ubicación de Taller Junior en Santa Marta, Colombia"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125345.54580235777!2d-74.2541459461129!3d11.231526364009765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ef4f64c6c19eb99%3A0x6b107e3240e53a29!2sSanta%20Marta%2C%20Magdalena!5e0!3m2!1ses!2sco!4v1710899000000!5m2!1ses!2sco"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "contrast(1.05) brightness(0.9)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Badge flotante sobre el mapa */}
        <div className="absolute top-4 left-4 z-10 rounded-2xl bg-[#0b0d13]/90 backdrop-blur-md p-3.5 border border-surface-border shadow-2xl flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-orange-600 text-white shadow-md shadow-brand-500/25">
            <MapPin suppressHydrationWarning className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black text-white">Taller Junior</p>
            <p className="text-[11px] text-brand-400 font-medium">Santa Marta, Magdalena</p>
          </div>
        </div>

        {/* Acceso directo a Waze y Google Maps */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#0b0d13]/90 backdrop-blur-md px-3 py-2 text-xs font-bold text-white border border-surface-border hover:border-brand-500 hover:text-brand-400 transition-all shadow-lg active:scale-95"
          >
            <Navigation suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400" />
            <span>Google Maps</span>
            <ExternalLink suppressHydrationWarning className="h-3 w-3 opacity-60" />
          </a>

          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#33ccff]/90 backdrop-blur-md px-3 py-2 text-xs font-bold text-black border border-[#33ccff] hover:bg-[#33ccff] transition-all shadow-lg active:scale-95"
          >
            <span>Waze</span>
            <ExternalLink suppressHydrationWarning className="h-3 w-3 opacity-80" />
          </a>
        </div>
      </div>

      {/* Franja Informativa de Contacto y Horarios */}
      <div className="p-6 sm:p-8 bg-surface-elevated border-t border-surface-border grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brand-400 font-bold mb-1">
            <MapPin suppressHydrationWarning className="h-4 w-4" />
            <span>Dirección del Taller</span>
          </div>
          <p className="font-bold text-white text-sm">Calle Principal # 12-34</p>
          <p className="text-steel-400 text-[11px]">
            Santa Marta, Magdalena · Fácil acceso desde El Rodadero y Mamatoco
          </p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brand-400 font-bold mb-1">
            <Clock suppressHydrationWarning className="h-4 w-4" />
            <span>Horario de Atención</span>
          </div>
          <p className="font-bold text-white text-sm">Lunes a Sábado</p>
          <p className="text-steel-400 text-[11px]">8:00 AM - 6:00 PM (Jornada Continua)</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-green-400 font-bold mb-1">
            <WhatsAppIcon className="h-4 w-4 fill-[#25D366]" />
            <span>Contacto Directo / WhatsApp</span>
          </div>
          <p className="font-bold text-white text-sm">+57 300 123 4567</p>
          <p className="text-steel-400 text-[11px]">Atención directa por el mecánico dueño</p>
        </div>
      </div>
    </div>
  );
}
