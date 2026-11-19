import Link from "next/link";
import Image from "next/image";
import SearchTokenForm from "@/components/landing/SearchTokenForm";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ScrollToTop from "@/components/ui/ScrollToTop";
import PublicNavbar from "@/components/landing/PublicNavbar";
import HeroCarousel from "@/components/landing/HeroCarousel";
import FaqSection from "@/components/landing/FaqSection";
import InteractiveMap from "@/components/landing/InteractiveMap";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import {
  Wrench,
  Car,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Calendar,
  ChevronRight,
  Sparkles,
  Gauge,
  Camera,
  Award,
  Star,
  Check,
  BadgeCheck,
  Zap,
  Heart,
} from "lucide-react";

export const metadata = {
  title: "Taller Junior — Mecánica Automotriz de Precisión en Santa Marta",
  description:
    "Mantenimiento preventivo, frenos, suspensión, diagnóstico computarizado y seguimiento en vivo por WhatsApp para tu vehículo en Santa Marta, Colombia.",
};

const SERVICES = [
  {
    icon: Wrench,
    title: "Mantenimiento Preventivo",
    badge: "Esencial",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
    desc: "Cambio de aceite según especificaciones del fabricante, sustitución de filtros y revisión multipunto de 25 elementos críticos.",
    features: ["Aceites sintéticos y semisintéticos", "Filtros certificados", "Revisión de niveles y fugas"],
    color: "brand",
  },
  {
    icon: Gauge,
    title: "Diagnóstico Computarizado",
    badge: "Tecnología",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    desc: "Escáner automotriz avanzado multimarca: Check Engine, ABS, Airbag, sensores de oxígeno y calibración electrónica.",
    features: ["Reporte digital de escaneo", "Pruebas de actuadores", "Detección rápida de fallas eléctricas"],
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Frenos de Alta Seguridad",
    badge: "Seguridad",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    desc: "Rectificación y cambio de discos, pastillas cerámicas, purga de líquido DOT 4/5.1 y calibración de freno de mano.",
    features: ["Pastillas cerámicas sin chirridos", "Líquido de alta ebullición", "Prueba de frenado en ruta"],
    color: "red",
  },
  {
    icon: Car,
    title: "Suspensión y Dirección",
    badge: "Confort",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80",
    desc: "Amortiguadores, tijeras, terminales, rótulas, rodamientos y alineación computarizada para un andar suave.",
    features: ["Prueba en fosa hidráulica", "Bujes y terminales reforzados", "Mayor estabilidad y confort"],
    color: "green",
  },
  {
    icon: Award,
    title: "Embrague y Transmisión",
    badge: "Mecánica Mayor",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    desc: "Cambio completo de kit de clutch, corrección de pedal duro o patinamiento, cambio de valvulina y sellado de fugas.",
    features: ["Repuestos originales", "Calibración de guaya o bombines", "Suavidad inmediata al pedal"],
    color: "amber",
  },
  {
    icon: Sparkles,
    title: "Reparación de Motor",
    badge: "Especialidad",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    desc: "Correa/cadena de tiempos, bomba de agua, empaquetaduras y erradicación total de fugas de aceite.",
    features: ["Torque exacto por manual de taller", "Garantía escrita en motor", "Pruebas de compresión"],
    color: "orange",
  },
];

const TESTIMONIALS = [
  {
    name: "Carlos Mario Restrepo",
    vehicle: "Renault Duster 2020",
    role: "Cliente Particular · Rodadero",
    avatar: "CM",
    text: "Lo mejor de Taller Junior es que no tienes que estar llamando. Me enviaron el enlace por WhatsApp con fotos del amortiguador dañado y el repuesto nuevo antes de instalarlo. 100% transparente.",
    rating: 5,
  },
  {
    name: "Dayana Morales",
    vehicle: "Chevrolet Onix 2022",
    role: "Conductora Diaria · Santa Marta Centro",
    avatar: "DM",
    text: "Tenía una falla eléctrica que dos mecánicos no resolvieron. Junior le puso el escáner, me explicó exactamente el sensor averiado y en la misma tarde me entregó el carro perfecto.",
    rating: 5,
  },
  {
    name: "Andrés Felipe Giraldo",
    vehicle: "Toyota Hilux 4x4",
    role: "Vehículo de Trabajo y Turismo",
    avatar: "AF",
    text: "Viajo mucho hacia La Guajira y Minca, necesito frenos y suspensión impecables. Los repuestos con precio claro y la garantía por escrito me dan total tranquilidad.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0d13] text-steel-100 flex flex-col selection:bg-brand-500 selection:text-white">

      {/* ── Navbar con Menú Hamburguesa ── */}
      <PublicNavbar />

      {/* ── Hero Section: Dos Columnas con Carrusel ── */}
      <section id="inicio" className="relative overflow-hidden pt-10 pb-20 px-4 border-b border-surface-border">
        {/* Glows de ambiente */}
        <div className="pointer-events-none absolute left-1/4 top-0 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-brand-500/10 blur-[160px]" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-[400px] w-[400px] rounded-full bg-orange-600/8 blur-[140px]" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Izquierda: Texto, CTAs y Buscador */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-400 shadow-inner">
              <Sparkles suppressHydrationWarning className="h-3.5 w-3.5" />
              <span>5 Años de Excelencia Mecánica en Santa Marta</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Tu auto en manos de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-orange-400 to-amber-300">
                quien sabe
              </span>
              {" "}y te mantiene informado
            </h1>

            <p className="text-sm sm:text-base text-steel-300 leading-relaxed">
              Diagnóstico computarizado, repuestos de calidad garantizada y seguimiento fotográfico en tiempo real directamente en tu WhatsApp. Sin secretos, sin sorpresas en la factura.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href="/agendar"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-orange-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-brand-500/30 transition-all hover:scale-105 hover:shadow-brand-500/50 active:scale-95"
              >
                <Calendar suppressHydrationWarning className="h-4 w-4" />
                <span>Agendar Turno</span>
                <ChevronRight suppressHydrationWarning className="h-4 w-4 opacity-80" />
              </Link>

              <a
                href="https://wa.me/573025449422?text=Hola%20Kilmer,%20quiero%20hacer%20una%20consulta%20mecánica%20para%20mi%20vehículo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-4 text-sm font-bold text-[#4ade80] shadow-lg transition-all hover:bg-[#25D366]/20 active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4 fill-[#25D366]" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

            {/* Widget de Rastreo Rápido */}
            <div className="rounded-2xl border border-surface-border bg-surface-elevated/90 p-4 shadow-2xl backdrop-blur-md space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
                  <span>¿Tu auto ya está en el taller?</span>
                </div>
                <span className="text-[10px] text-steel-400 bg-surface border border-surface-border rounded-md px-2 py-0.5">Sin contraseñas</span>
              </div>
              <SearchTokenForm />
              <p className="text-[11px] text-steel-500">
                Código único recibido por WhatsApp — ej: <span className="text-brand-400 font-mono font-bold">TJ-7K9P-2M4X</span>
              </p>
            </div>

            {/* Mini Métricas */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {[
                { val: "+1,500", label: "Autos reparados" },
                { val: "5 ★", label: "Calificación" },
                { val: "30 días", label: "Garantía escrita" },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-surface-border bg-surface-elevated/60 p-3 text-center">
                  <p className="text-base sm:text-lg font-black text-brand-400">{m.val}</p>
                  <p className="text-[10px] text-steel-400 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Derecha: Carrusel Fotográfico Interactivo */}
          <div className="lg:col-span-6">
            <HeroCarousel />
          </div>
        </div>

        {/* Banda de Logos / Marcas de Vehículos Atendidos */}
        <div className="max-w-6xl mx-auto mt-14 relative z-10">
          <p className="text-center text-xs text-steel-500 font-semibold uppercase tracking-widest mb-5">
            Atendemos todas las marcas de autos en Santa Marta
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-steel-500 text-xs font-black uppercase tracking-wide">
            {["Chevrolet", "Renault", "Toyota", "Mazda", "Nissan", "Hyundai", "Kia", "Ford", "Volkswagen", "Mitsubishi"].map((brand) => (
              <span
                key={brand}
                className="rounded-lg border border-surface-border bg-surface-elevated/40 px-3 py-1.5 hover:border-brand-500/40 hover:text-brand-400 transition-colors cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Catálogo de Servicios con Imágenes Automotrices ── */}
      <section id="servicios" className="py-20 px-4 border-b border-surface-border bg-surface/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider">
              Servicios Especializados
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Mecánica Profesional con Repuestos de Primera
            </h2>
            <p className="text-xs sm:text-sm text-steel-400 leading-relaxed">
              Atención directa por el mecánico dueño. No aprendices, no intermediarios, no sorpresas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-3xl border border-surface-border bg-surface-elevated overflow-hidden transition-all duration-300 hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 hover:-translate-y-1 flex flex-col"
                >
                  {/* Imagen del Servicio */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-surface-elevated/30 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-[#0b0d13]/85 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-400 border border-surface-border">
                      {s.badge}
                    </span>
                    <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                      <Icon suppressHydrationWarning className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-black text-white text-base tracking-tight group-hover:text-brand-400 transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-steel-400 leading-relaxed">{s.desc}</p>
                    </div>

                    <ul className="space-y-1.5 pt-3 border-t border-surface-border/60 text-[11px] text-steel-300">
                      {s.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle2 suppressHydrationWarning className="h-3.5 w-3.5 text-green-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/agendar"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-surface border border-surface-border py-2.5 text-xs font-bold text-steel-200 transition-all hover:bg-brand-500 hover:text-white hover:border-brand-500 active:scale-95"
                    >
                      <span>Cotizar este Servicio</span>
                      <ChevronRight suppressHydrationWarning className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Portal de Seguimiento en Vivo ── */}
      <section id="seguimiento" className="py-20 px-4 border-b border-surface-border bg-gradient-to-b from-[#0b0d13] via-surface-elevated/30 to-[#0b0d13]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Texto y Beneficios */}
          <div className="lg:col-span-6 space-y-6">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider inline-block">
              Transparencia Absoluta
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Se acabaron las llamadas: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-orange-400">
                "¿Cómo va mi carro?"
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-steel-300 leading-relaxed">
              Cuando dejas tu vehículo en Taller Junior, recibes un enlace exclusivo a tu WhatsApp para seguir cada etapa desde tu celular — sin contraseñas ni apps:
            </p>

            <div className="space-y-3 pt-1">
              {[
                {
                  icon: Clock,
                  color: "brand",
                  title: "Línea de Tiempo en Tiempo Real",
                  desc: "Visualiza cuándo tu vehículo es Recibido, está en Diagnóstico, Cotizado, en Reparación o Listo para retirar.",
                },
                {
                  icon: Camera,
                  color: "green",
                  title: "Fotos de Evidencia Fotográfica",
                  desc: "Ves la pieza desgastada que retiramos y el repuesto nuevo con empaque original antes de montarlo.",
                },
                {
                  icon: ShieldCheck,
                  color: "orange",
                  title: "Aprobación de Cotización con 1 Toque",
                  desc: "Desglose transparente de mano de obra y repuestos. No compramos nada sin tu autorización.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                const colorMap: Record<string, string> = {
                  brand: "bg-brand-500/20 text-brand-400",
                  green: "bg-green-500/20 text-green-400",
                  orange: "bg-orange-500/20 text-orange-400",
                };
                return (
                  <div key={i} className="flex items-start gap-3.5 rounded-2xl bg-surface-elevated/80 border border-surface-border p-4 hover:border-brand-500/30 transition-colors">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colorMap[item.color]}`}>
                      <Icon suppressHydrationWarning className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">{item.title}</h4>
                      <p className="text-[11px] text-steel-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Maqueta del Portal del Cliente */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border-2 border-surface-border bg-surface-elevated p-5 sm:p-6 shadow-2xl space-y-4">
              {/* Encabezado */}
              <div className="flex items-center justify-between border-b border-surface-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white font-black text-sm">TJ</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-black text-white">KLR-456</span>
                      <span className="text-[10px] rounded-full bg-brand-500/20 px-2 py-0.5 font-bold text-brand-400">Toyota Corolla</span>
                    </div>
                    <span className="text-[10px] text-steel-500">Orden #OT-1042 · Taller Junior</span>
                  </div>
                </div>
                <span className="rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-xs font-bold text-green-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Listo para Entrega
                </span>
              </div>

              {/* Imagen de Evidencia */}
              <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-surface-border">
                <Image
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
                  alt="Vehículo en proceso de mantenimiento"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13]/60 to-transparent" />
                <div className="absolute bottom-2 left-2 rounded-lg bg-[#0b0d13]/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md flex items-center gap-1.5">
                  <Camera suppressHydrationWarning className="h-3 w-3 text-brand-400" />
                  4 Fotos de Evidencia Subidas
                </div>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-5 gap-1 text-center">
                {["🚗", "🔍", "📋", "🔧", "🎉"].map((emoji, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm transition-all ${
                      i < 4 ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                      i === 4 ? "bg-gradient-to-br from-brand-500 to-orange-600 text-white scale-110 shadow-lg shadow-brand-500/40" :
                      "bg-surface border border-surface-border text-steel-600 opacity-50"
                    }`}>
                      {i < 4 ? <CheckCircle2 suppressHydrationWarning className="h-4 w-4 stroke-[2.5]" /> : emoji}
                    </div>
                    <span className={`text-[9px] font-bold leading-tight ${i === 4 ? "text-brand-400" : i < 4 ? "text-white" : "text-steel-600"}`}>
                      {["Recibido", "Diagnóst.", "Cotizado", "Reparac.", "Listo"][i]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Presupuesto */}
              <div className="rounded-2xl bg-surface p-3.5 border border-surface-border flex items-center justify-between text-xs">
                <div>
                  <p className="text-[10px] text-steel-500 uppercase font-bold tracking-wider">Total Aprobado</p>
                  <p className="font-black text-white text-base mt-0.5">$320.000 COP</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                  <BadgeCheck suppressHydrationWarning className="h-3.5 w-3.5" />
                  Autorizado por el Cliente
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pilares de Confianza ── */}
      <section id="por-que-nosotros" className="py-20 px-4 border-b border-surface-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider inline-flex items-center gap-1.5">
              <Heart suppressHydrationWarning className="h-3.5 w-3.5" />
              Nuestra Promesa de Servicio
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ¿Por qué los Samarios confían en Taller Junior?
            </h2>
            <p className="text-xs sm:text-sm text-steel-400">
              Mecánica honesta, sin sorpresas en la cuenta y con el respaldo del dueño del taller.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: ShieldCheck, color: "brand",
                title: "Garantía Certificada",
                desc: "30 días o 1.000 km en mano de obra. Si algo no queda al 100%, lo corregimos sin costo.",
              },
              {
                icon: Camera, color: "green",
                title: "Fotos Reales por WhatsApp",
                desc: "Ves la pieza dañada y el repuesto nuevo antes de que lo instalemos. Cero imaginación necesaria.",
              },
              {
                icon: Check, color: "amber",
                title: "Presupuesto sin Sorpresas",
                desc: "El precio que apruebas es el que pagas. Nada se hace sin tu visto bueno previo.",
              },
              {
                icon: Zap, color: "orange",
                title: "Mecánico Dueño Dedicado",
                desc: "Sin aprendices. Kilmer Primiento interviene personalmente cada vehículo con 5 años de experiencia.",
              },
            ].map((p, i) => {
              const Icon = p.icon;
              const colorMap: Record<string, string> = {
                brand: "bg-brand-500/15 text-brand-400 border-brand-500/30",
                green: "bg-green-500/15 text-green-400 border-green-500/30",
                amber: "bg-amber-500/15 text-amber-400 border-amber-500/30",
                orange: "bg-orange-500/15 text-orange-400 border-orange-500/30",
              };
              return (
                <div key={i} className="rounded-3xl border border-surface-border bg-surface-elevated p-6 space-y-3 hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${colorMap[p.color]}`}>
                    <Icon suppressHydrationWarning className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-white text-base">{p.title}</h3>
                  <p className="text-xs text-steel-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonios con Carrusel de Tarjetas ── */}
      <section id="testimonios" className="py-20 px-4 border-b border-surface-border bg-surface/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider">
              Opiniones de Nuestros Clientes
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Lo que dicen en Santa Marta
            </h2>
            <p className="text-xs sm:text-sm text-steel-400">
              Reputación construida con honestidad, trato directo y cumplimiento en cada entrega.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-surface-border bg-surface-elevated p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} suppressHydrationWarning className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-steel-300 leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500/20 text-brand-400 font-black text-xs border border-brand-500/30">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{t.name}</p>
                      <p className="text-[10px] text-steel-400">{t.role}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-md shrink-0">
                    {t.vehicle}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Post-Testimonios */}
          <div className="text-center pt-4">
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-orange-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Calendar suppressHydrationWarning className="h-4 w-4" />
              <span>Únete a Nuestros Clientes Satisfechos</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ Interactivo (Acordeón) ── */}
      <FaqSection />

      {/* ── Ubicación con Mapa Interactivo ── */}
      <section id="ubicacion" className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider">
              Dónde Estamos
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Visítanos en Santa Marta
            </h2>
            <p className="text-xs sm:text-sm text-steel-400">
              Ubicación de fácil acceso desde el Rodadero, Mamatoco, El Centro y vía Gaira.
            </p>
          </div>

          <InteractiveMap />

          {/* Botones debajo del mapa */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/agendar"
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-500 to-orange-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/25 hover:scale-105 transition-all active:scale-95"
            >
              <Calendar suppressHydrationWarning className="h-4 w-4" />
              <span>Agendar Turno en el Taller</span>
            </Link>

            <a
              href="https://wa.me/573025449422?text=Hola%20Kilmer,%20quiero%20agendar%20una%20revisión%20en%20el%20taller"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 px-8 py-4 text-sm font-bold text-[#4ade80] hover:bg-[#25D366]/20 transition-all active:scale-95"
            >
              <WhatsAppIcon className="h-4 w-4 fill-[#25D366]" />
              <span>Escribir por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-surface-border bg-[#07090e] py-12 px-4 text-xs text-steel-500">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Fila Superior */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Marca */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-orange-600 text-white font-black text-sm shadow-md shadow-brand-500/25">
                  TJ
                </div>
                <div>
                  <p className="font-black text-white text-sm">Taller Junior</p>
                  <p className="text-[11px] text-steel-400">Mecánica Automotriz · Santa Marta</p>
                </div>
              </div>
              <p className="text-[11px] text-steel-500 leading-relaxed">
                5 años cuidando los vehículos de los samarios con honestidad, garantía certificada y transparencia total.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">Navegación</p>
              <div className="space-y-2 text-[11px]">
                <a href="#servicios" className="block hover:text-white transition-colors">Servicios Especializados</a>
                <a href="#seguimiento" className="block hover:text-white transition-colors">Portal de Seguimiento</a>
                <a href="#testimonios" className="block hover:text-white transition-colors">Opiniones de Clientes</a>
                <a href="#faq" className="block hover:text-white transition-colors">Preguntas Frecuentes</a>
                <a href="#ubicacion" className="block hover:text-white transition-colors">Ubicación y Mapa</a>
              </div>
            </div>

            {/* Contacto */}
            <div className="space-y-3">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">Contacto Directo</p>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="h-3.5 w-3.5 fill-[#25D366] shrink-0" />
                  <span>+57 302 544 9422</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                  <span>Lun – Sáb: 8:00 AM – 6:00 PM</span>
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <Link
                  href="/agendar"
                  className="rounded-xl bg-brand-500 px-3 py-2 text-[11px] font-bold text-white hover:bg-brand-600 transition-colors"
                >
                  Agendar Cita
                </Link>
                <Link
                  href="/login"
                  className="rounded-xl border border-surface-border px-3 py-2 text-[11px] font-bold text-steel-300 hover:border-brand-500 hover:text-brand-400 transition-colors"
                >
                  Portal Admin
                </Link>
              </div>
            </div>
          </div>

          {/* Fila Inferior */}
          <div className="border-t border-surface-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-steel-600">
            <p>© 2026 Taller Junior. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1.5">
              <span>Hecho con</span>
              <Heart suppressHydrationWarning className="h-3 w-3 text-red-400 fill-red-400" />
              <span>en Santa Marta, Colombia 🇨🇴</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Elementos Flotantes Globales ── */}
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}
