"use client";

import { MapPin, Navigation, Clock, Phone, ExternalLink } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function InteractiveMap() {
  const googleMapsUrl = "https://maps.app.goo.gl/APvTKrsBY5Fw5v4a8";
  const wazeUrl =
    "https://www.waze.com/ul?q=Calle%20156%20%237-15%2C%20Santa%20Marta%2C%20Magdalena";

  return (
    <div className="rounded-3xl border border-surface-border bg-surface-elevated overflow-hidden shadow-2xl space-y-0">
      {/* Mapa Interactivo con la ubicación exacta */}
      <div className="relative h-72 sm:h-96 w-full bg-surface-elevated">
        <iframe
          title="Ubicación de Taller Junior en Calle 156 #7-15, Santa Marta, Colombia"
          src="https://maps.google.com/maps?q=calle%20156%20%237-15%2C%20Santa%20Marta%2C%20Magdalena%2C%20Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "contrast(1.05) brightness(0.95)" }}
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
            <p className="text-[11px] text-brand-400 font-medium">Calle 156 #7-15 · Santa Marta</p>
          </div>
        </div>

        {/* Acceso directo a Waze y Google Maps */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#0b0d13]/90 backdrop-blur-md px-3.5 py-2 text-xs font-bold text-white border border-surface-border hover:border-brand-500 hover:text-brand-400 transition-all shadow-lg active:scale-95"
          >
            <Navigation suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400" />
            <span>Cómo llegar (Maps)</span>
            <ExternalLink suppressHydrationWarning className="h-3 w-3 opacity-60" />
          </a>

          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#33ccff]/90 backdrop-blur-md px-3.5 py-2 text-xs font-bold text-black border border-[#33ccff] hover:bg-[#33ccff] transition-all shadow-lg active:scale-95"
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
            <span>Dirección Exacta</span>
          </div>
          <p className="font-bold text-white text-sm">Calle 156 #7-15</p>
          <p className="text-steel-400 text-[11px]">
            Santa Marta, Magdalena · Fácil acceso desde El Rodadero y vía Gaira
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
            <span>Kilmer Primiento · Contacto</span>
          </div>
          <p className="font-bold text-white text-sm">+57 302 544 9422</p>
          <p className="text-steel-400 text-[11px]">Mecánico y dueño del taller</p>
        </div>
      </div>
    </div>
  );
}
