"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  Calendar,
  Menu,
  X,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function PublicNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ── Top Bar de Contacto e Información Rápida (Elegante y Nítido) ── */}
      <div className="bg-[#0f172a] text-[11px] text-slate-300 py-2 px-4 sm:px-8 lg:px-12 relative z-50 border-b border-slate-800">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3.5 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1.5 text-white font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Renovautos Abierto en Santa Marta · Lun a Sáb: 8:00 AM - 6:00 PM
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <MapPin suppressHydrationWarning className="h-3 w-3 text-brand-400" />
              Calle 156 #7-15, Santa Marta
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/573025449422?text=Hola%20Renovautos,%20quiero%20hacer%20una%20consulta%20para%20mi%20vehículo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 font-bold text-slate-200"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 fill-[#25D366]" />
              <span>WhatsApp: +57 302 544 9422</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link
              href="/login"
              className="text-slate-300 hover:text-white transition-colors font-semibold"
            >
              Acceso Admin
            </Link>
          </div>
        </div>
      </div>

      {/* ── Navbar Principal con Fondo Claro y Logo Oficial Renovautos ── */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-3 transition-all shadow-xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo Oficial Horizontal de Renovautos */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center group focus:outline-none"
            aria-label="Renovautos - Restauración Automotriz - Ir al inicio"
          >
            <div className="relative py-0.5 transition-transform duration-200 group-hover:scale-[1.03]">
              <Image
                src="/brand/logo-horizontal-clean.png"
                alt="Renovautos — Restauración Automotriz"
                width={260}
                height={60}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Enlaces de Navegación Escritorio */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-700">
            <a href="#servicios" className="hover:text-brand-600 transition-colors">
              Servicios
            </a>
            <a href="#seguimiento" className="hover:text-brand-600 transition-colors">
              Seguimiento en Vivo
            </a>
            <a href="#por-que-nosotros" className="hover:text-brand-600 transition-colors">
              Garantía
            </a>
            <a href="#faq" className="hover:text-brand-600 transition-colors">
              Preguntas
            </a>
            <a href="#testimonios" className="hover:text-brand-600 transition-colors">
              Opiniones
            </a>
            <a href="#ubicacion" className="hover:text-brand-600 transition-colors">
              Ubicación & Mapa
            </a>
          </nav>

          {/* Botones de Acción y Hamburguesa */}
          <div className="flex items-center gap-3">
            <Link
              href="/agendar"
              className="hidden sm:flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-5 py-2.5 text-xs font-black text-white shadow-md shadow-brand-600/25 transition-all hover:scale-105 active:scale-95"
            >
              <Calendar suppressHydrationWarning className="h-4 w-4" />
              <span>Agendar Cita</span>
            </Link>

            {/* Botón Hamburguesa Móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-colors hover:text-slate-900 hover:border-brand-500 focus:outline-none"
            >
              {isOpen ? (
                <X suppressHydrationWarning className="h-5 w-5" />
              ) : (
                <Menu suppressHydrationWarning className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* ── Menú Desplegable Móvil / Tablet ── */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-4">
              <nav className="flex flex-col space-y-2 text-sm font-bold text-slate-700">
                <a
                  href="#servicios"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  <span>Servicios Especializados</span>
                  <ChevronRight suppressHydrationWarning className="h-4 w-4 text-slate-400" />
                </a>

                <a
                  href="#seguimiento"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  <span>Seguimiento de Vehículo en Vivo</span>
                  <ChevronRight suppressHydrationWarning className="h-4 w-4 text-slate-400" />
                </a>

                <a
                  href="#por-que-nosotros"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  <span>Nuestra Garantía y Confianza</span>
                  <ChevronRight suppressHydrationWarning className="h-4 w-4 text-slate-400" />
                </a>

                <a
                  href="#faq"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  <span>Preguntas Frecuentes</span>
                  <ChevronRight suppressHydrationWarning className="h-4 w-4 text-slate-400" />
                </a>

                <a
                  href="#testimonios"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  <span>Opiniones de Clientes</span>
                  <ChevronRight suppressHydrationWarning className="h-4 w-4 text-slate-400" />
                </a>

                <a
                  href="#ubicacion"
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-100 hover:text-brand-600"
                >
                  <span>Ubicación y Mapa en Santa Marta</span>
                  <ChevronRight suppressHydrationWarning className="h-4 w-4 text-slate-400" />
                </a>
              </nav>

              <div className="pt-2 border-t border-slate-200 space-y-2.5">
                <Link
                  href="/agendar"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-brand-600 hover:bg-brand-700 py-3.5 text-xs font-black text-white shadow-md active:scale-95"
                >
                  <Calendar suppressHydrationWarning className="h-4 w-4" />
                  <span>Agendar Cita en el Taller</span>
                </Link>

                <a
                  href="https://wa.me/573025449422?text=Hola%20Renovautos,%20quiero%20hacer%20una%20consulta%20mecánica"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/40 py-3 text-xs font-bold text-[#16a34a] hover:bg-[#25D366]/20 transition-colors"
                >
                  <WhatsAppIcon className="h-4 w-4 fill-[#25D366]" />
                  <span>Escribir al WhatsApp (+57 302 544 9422)</span>
                </a>

                <div className="text-center pt-1">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="text-xs text-slate-500 hover:text-brand-600 transition-colors"
                  >
                    Portal Administrativo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
