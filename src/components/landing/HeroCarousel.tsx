"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShieldCheck, MapPin } from "lucide-react";

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  tag: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80",
    badge: "Mecánica Automotriz",
    title: "Diagnóstico Certero y Cuidado Total",
    subtitle: "Atención personalizada por Kilmer Primiento sin intermediarios",
    tag: "5 Años en Santa Marta",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    badge: "Seguimiento en Vivo",
    title: "Fotos y Avances en tu Celular",
    subtitle: "Consulta el progreso de tu vehículo por WhatsApp sin contraseñas",
    tag: "100% Transparente",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
    badge: "Seguridad y Frenado",
    title: "Frenos Cerámicos y Rectificación",
    subtitle: "Máxima potencia de frenado para la topografía de Santa Marta y la Sierra",
    tag: "Repuestos Certificados",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    badge: "Tecnología Avanzada",
    title: "Escáner Computarizado Multimarca",
    subtitle: "Lectura profunda de Check Engine, ABS, sensores y calibración electrónica",
    tag: "Diagnóstico Rápido",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="relative mx-auto w-full select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Marco contenedor del Carrusel con altura simétrica y balanceada */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-surface-border shadow-2xl bg-surface-elevated h-[480px] sm:h-[540px] lg:h-[590px] w-full">
        <div className="relative h-full w-full">
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Gradientes oscuros para contraste cinematográfico */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13]/90 via-[#0b0d13]/30 to-transparent" />

              {/* Contenido flotante de la diapositiva */}
              <div className="absolute top-4 left-4 z-20">
                <span className="rounded-full bg-brand-500/90 text-white font-black text-[10px] uppercase tracking-wider px-3 py-1 shadow-md">
                  {slide.badge}
                </span>
              </div>

              {/* Texto ubicado en la parte inferior para dejar la imagen limpia */}
              <div className="absolute bottom-10 left-5 right-5 z-20 space-y-1">
                <span className="text-[10px] sm:text-[11px] font-bold text-brand-400 uppercase tracking-wider">
                  {slide.tag}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                  {slide.title}
                </h3>
                <p className="text-xs text-steel-300 drop-shadow line-clamp-2 max-w-lg">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Badge Flotante Superior: Santa Marta */}
          <div className="absolute top-4 right-4 z-20 rounded-full border border-surface-border bg-[#0b0d13]/80 px-3.5 py-1.5 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-bold text-white">
            <MapPin suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400" />
            <span>Santa Marta, Colombia</span>
          </div>
        </div>

        {/* Botones de Navegación Anterior / Siguiente */}
        <button
          onClick={prevSlide}
          aria-label="Diapositiva anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-[#0b0d13]/70 border border-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-brand-500 hover:border-brand-500 active:scale-95"
        >
          <ChevronLeft suppressHydrationWarning className="h-5 w-5" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Diapositiva siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-[#0b0d13]/70 border border-white/20 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-brand-500 hover:border-brand-500 active:scale-95"
        >
          <ChevronRight suppressHydrationWarning className="h-5 w-5" />
        </button>

        {/* Indicadores de Diapositiva (Dots) en la parte inferior */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Ir a diapositiva ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === current ? "w-6 bg-brand-500" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
