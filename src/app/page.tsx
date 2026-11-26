import Link from "next/link";
import Image from "next/image";
import SearchTokenForm from "@/components/landing/SearchTokenForm";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ScrollToTop from "@/components/ui/ScrollToTop";
import PublicNavbar from "@/components/landing/PublicNavbar";
import HeroCarousel from "@/components/landing/HeroCarousel";
import FaqSection from "@/components/landing/FaqSection";
import InteractiveMap from "@/components/landing/InteractiveMap";
import BrandsMarquee from "@/components/landing/BrandsMarquee";
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
  BadgeCheck,
  Heart,
} from "lucide-react";

export const metadata = {
  title: "Renovautos — Restauración y Mecánica Automotriz en Santa Marta",
  description:
    "Restauración automotriz, mantenimiento preventivo, frenos, suspensión, diagnóstico computarizado y seguimiento en vivo por WhatsApp en Santa Marta, Colombia.",
};

const SERVICES = [
  {
    icon: Wrench,
    title: "Mantenimiento Preventivo",
    badge: "Esencial",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
    desc: "Cambio de aceite según especificaciones del fabricante, sustitución de filtros y revisión multipunto de 25 elementos críticos.",
    features: ["Aceites sintéticos y semisintéticos", "Filtros certificados", "Revisión de niveles y fugas"],
  },
  {
    icon: Gauge,
    title: "Diagnóstico Computarizado",
    badge: "Tecnología",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    desc: "Escáner automotriz avanzado multimarca: Check Engine, ABS, Airbag, sensores de oxígeno y calibración electrónica.",
    features: ["Reporte digital de escaneo", "Pruebas de actuadores", "Detección rápida de fallas eléctricas"],
  },
  {
    icon: ShieldCheck,
    title: "Frenos de Alta Seguridad",
    badge: "Seguridad",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    desc: "Rectificación y cambio de discos, pastillas cerámicas, purga de líquido DOT 4/5.1 y calibración de freno de mano.",
    features: ["Pastillas cerámicas sin chirridos", "Líquido de alta ebullición", "Prueba de frenado en ruta"],
  },
  {
    icon: Car,
    title: "Suspensión y Dirección",
    badge: "Confort",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80",
    desc: "Amortiguadores, tijeras, terminales, rótulas, rodamientos y alineación computarizada para un andar suave.",
    features: ["Prueba en fosa hidráulica", "Bujes y terminales reforzados", "Mayor estabilidad y confort"],
  },
  {
    icon: Award,
    title: "Embrague y Transmisión",
    badge: "Mecánica Mayor",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    desc: "Cambio completo de kit de clutch, corrección de pedal duro o patinamiento, cambio de valvulina y sellado de fugas.",
    features: ["Repuestos originales", "Calibración de guaya o bombines", "Suavidad inmediata al pedal"],
  },
  {
    icon: Sparkles,
    title: "Reparación y Restauración de Motor",
    badge: "Especialidad",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    desc: "Correa/cadena de tiempos, bomba de agua, empaquetaduras y erradicación total de fugas de aceite con torque exacto.",
    features: ["Torque exacto por manual de taller", "Garantía escrita en motor", "Pruebas de compresión"],
  },
];

const TESTIMONIALS = [
  {
    name: "Carlos Mario Restrepo",
    vehicle: "Renault Duster 2020",
    role: "Cliente Particular · Rodadero",
    avatar: "CM",
    text: "Lo mejor de Renovautos es que no tienes que estar llamando. Me enviaron el enlace por WhatsApp con fotos del amortiguador dañado y el repuesto nuevo antes de instalarlo. 100% transparente.",
    rating: 5,
  },
  {
    name: "Dayana Morales",
    vehicle: "Chevrolet Onix 2022",
    role: "Conductora Diaria · Santa Marta Centro",
    avatar: "DM",
    text: "Tenía una falla eléctrica que dos talleres no resolvieron. En Renovautos le pusieron el escáner, me explicaron exactamente el sensor averiado y en la misma tarde me entregaron el carro perfecto.",
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
    <div className="min-h-screen bg-[#0a0a0c] text-steel-100 flex flex-col selection:bg-brand-500 selection:text-white">

      {/* ── Navbar con Menú Hamburguesa ── */}
      <PublicNavbar />

      {/* ── Hero Section: Dos Columnas con Ancho Completo Ampliado ── */}
      <section id="inicio" className="relative overflow-hidden pt-8 lg:pt-12 pb-20 px-4 sm:px-8 lg:px-12 border-b border-surface-border">
        {/* Glows de ambiente en rojo y titanio */}
        <div className="pointer-events-none absolute left-1/4 top-0 -translate-x-1/2 h-[650px] w-[650px] rounded-full bg-brand-600/12 blur-[170px]" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-[450px] w-[450px] rounded-full bg-red-700/10 blur-[150px]" />

        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Izquierda: Texto, CTAs y Buscador */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-400">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                Restauración & Precisión Mecánica
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white tracking-tight leading-[1.1]">
                Tu auto en manos de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-red-400 to-rose-300">
                  quien sabe
                </span>
                {" "}y te mantiene informado
              </h1>

              <p className="text-sm sm:text-base text-steel-300 leading-relaxed max-w-xl">
                Diagnóstico computarizado, repuestos de calidad garantizada y seguimiento fotográfico en tiempo real directamente en tu WhatsApp. Sin secretos, sin sorpresas en la factura.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <Link
                href="/agendar"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-red-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-brand-500/30 transition-all hover:scale-105 hover:shadow-brand-500/50 active:scale-95"
              >
                <Calendar suppressHydrationWarning className="h-4 w-4" />
                <span>Agendar Turno</span>
                <ChevronRight suppressHydrationWarning className="h-4 w-4 opacity-80" />
              </Link>

              <a
                href="https://wa.me/573025449422?text=Hola%20Renovautos,%20quiero%20hacer%20una%20consulta%20para%20mi%20vehículo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 px-7 py-4 text-sm font-bold text-[#4ade80] shadow-lg transition-all hover:bg-[#25D366]/20 active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4 fill-[#25D366]" />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

            {/* Widget de Rastreo Rápido */}
            <div className="rounded-2xl border border-surface-border bg-surface-elevated/90 p-5 shadow-2xl backdrop-blur-md space-y-3">
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
            <div className="grid grid-cols-3 gap-3.5 pt-1">
              {[
                { val: "+1,500", label: "Autos restaurados" },
                { val: "5 ★", label: "Calificación" },
                { val: "30 días", label: "Garantía escrita" },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-surface-border bg-surface-elevated/60 p-3.5 text-center">
                  <p className="text-base sm:text-xl font-black text-brand-400">{m.val}</p>
                  <p className="text-[10px] sm:text-xs text-steel-400 mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Derecha: Carrusel Fotográfico Interactivo Simétrico */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <HeroCarousel />
          </div>
        </div>

        {/* Banda de Marcas con Marquesina Rotatoria Infinita */}
        <div className="max-w-[1440px] mx-auto mt-16 relative z-10 space-y-4">
          <p className="text-center text-xs text-steel-500 font-semibold uppercase tracking-widest">
            Atendemos todas las marcas de autos en Santa Marta
          </p>
          <BrandsMarquee />
        </div>
      </section>

      {/* ── Catálogo de Servicios con Imágenes Automotrices ── */}
      <section id="servicios" className="py-20 px-4 sm:px-8 lg:px-12 border-b border-surface-border bg-surface/40">
        <div className="max-w-[1440px] mx-auto space-y-12">
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
                    <span className="absolute top-3 left-3 rounded-full bg-[#0a0a0c]/85 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-400 border border-surface-border">
                      {s.badge}
                    </span>
                    <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
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
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-surface border border-surface-border py-2.5 text-xs font-bold text-steel-200 transition-all hover:bg-brand-600 hover:text-white hover:border-brand-600 active:scale-95"
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
      <section id="seguimiento" className="py-20 px-4 sm:px-8 lg:px-12 border-b border-surface-border bg-gradient-to-b from-[#0a0a0c] via-surface-elevated/30 to-[#0a0a0c]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Texto y Beneficios */}
          <div className="lg:col-span-6 space-y-6">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider inline-block">
              Transparencia Absoluta
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Se acabaron las llamadas: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-red-400">
                "¿Cómo va mi carro?"
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-steel-300 leading-relaxed">
              Cuando dejas tu vehículo en Renovautos, recibes un enlace exclusivo a tu WhatsApp para seguir cada etapa desde tu celular — sin contraseñas ni apps:
            </p>

            <div className="space-y-3 pt-1">
              {[
                {
                  number: "01",
                  title: "Línea de Tiempo en Tiempo Real",
                  desc: "Visualiza cuándo tu vehículo es Recibido, está en Diagnóstico, Cotizado, en Reparación o Listo para retirar.",
                },
                {
                  number: "02",
                  title: "Fotos de Evidencia Fotográfica",
                  desc: "Ves la pieza desgastada que retiramos y el repuesto nuevo con empaque original antes de montarlo.",
                },
                {
                  number: "03",
                  title: "Aprobación de Cotización con 1 Toque",
                  desc: "Desglose transparente de mano de obra y repuestos. No compramos nada sin tu autorización.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3.5 rounded-2xl bg-surface-elevated/80 border border-surface-border p-4 hover:border-brand-500/30 transition-colors">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface border border-surface-border font-mono text-xs font-bold text-brand-400">
                    {item.number}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">{item.title}</h4>
                    <p className="text-[11px] text-steel-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maqueta del Portal del Cliente */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border-2 border-surface-border bg-surface-elevated p-5 sm:p-6 shadow-2xl space-y-4">
              {/* Encabezado */}
              <div className="flex items-center justify-between border-b border-surface-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a0a0c] border border-surface-border p-1">
                    <Image
                      src="/brand/renovautos-favicon.png"
                      alt="Renovautos"
                      width={44}
                      height={44}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm font-black text-white">KLR-456</span>
                      <span className="text-[10px] rounded-full bg-brand-500/20 px-2 py-0.5 font-bold text-brand-400">Toyota Corolla</span>
                    </div>
                    <span className="text-[10px] text-steel-500">Orden #OT-1042 · Renovautos</span>
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/60 to-transparent" />
                <div className="absolute bottom-2 left-2 rounded-lg bg-[#0a0a0c]/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md flex items-center gap-1.5">
                  <Camera suppressHydrationWarning className="h-3 w-3 text-brand-400" />
                  4 Fotos de Evidencia Subidas
                </div>
              </div>

              {/* Timeline de Seguimiento */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-5 gap-1.5">
                  {["Recibido", "Diagnóst.", "Cotizado", "Reparac.", "Listo"].map((step, i) => (
                    <div key={i} className="space-y-1.5">
                      <div
                        className={`h-1.5 w-full rounded-full transition-all ${
                          i < 4
                            ? "bg-emerald-500"
                            : "bg-gradient-to-r from-brand-600 to-red-500 shadow-sm shadow-brand-500/50"
                        }`}
                      />
                      <p
                        className={`text-[10px] text-center font-bold truncate ${
                          i === 4 ? "text-brand-400" : "text-steel-400"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
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
      <section id="por-que-nosotros" className="py-20 px-4 sm:px-8 lg:px-12 border-b border-surface-border">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider inline-block">
              Nuestra Promesa de Servicio
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ¿Por qué los Samarios confían en Renovautos?
            </h2>
            <p className="text-xs sm:text-sm text-steel-400">
              Restauración y mecánica honesta, sin sorpresas en la cuenta y con el respaldo directo del dueño.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                number: "01",
                tag: "Garantía",
                title: "Garantía Certificada",
                desc: "30 días o 1.000 km en mano de obra. Si algo no queda al 100%, lo corregimos sin costo.",
              },
              {
                number: "02",
                tag: "Transparencia",
                title: "Fotos Reales por WhatsApp",
                desc: "Ves la pieza dañada y el repuesto nuevo antes de que lo instalemos. Cero dudas.",
              },
              {
                number: "03",
                tag: "Claridad",
                title: "Presupuesto sin Sorpresas",
                desc: "El precio que apruebas es el que pagas. Nada se hace sin tu visto bueno previo.",
              },
              {
                number: "04",
                tag: "Atención",
                title: "Atención Dedicada",
                desc: "Sin intermediarios. Kilmer Primiento interviene personalmente cada vehículo con repuestos de primer nivel.",
              },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-3xl border border-surface-border bg-surface-elevated p-6 space-y-3 hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div className="flex items-center justify-between border-b border-surface-border/60 pb-3">
                  <span className="font-mono text-xs font-black text-brand-400 tracking-wider">
                    {p.number}
                  </span>
                  <span className="text-[10px] font-semibold text-steel-500 uppercase tracking-widest">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base pt-1">{p.title}</h3>
                <p className="text-xs text-steel-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonios con Carrusel de Tarjetas ── */}
      <section id="testimonios" className="py-20 px-4 sm:px-8 lg:px-12 border-b border-surface-border bg-surface/40">
        <div className="max-w-[1440px] mx-auto space-y-12">
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
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-red-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
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
      <section id="ubicacion" className="py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto space-y-8">
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
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-red-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-brand-500/25 hover:scale-105 transition-all active:scale-95"
            >
              <Calendar suppressHydrationWarning className="h-4 w-4" />
              <span>Agendar Turno en el Taller</span>
            </Link>

            <a
              href="https://wa.me/573025449422?text=Hola%20Renovautos,%20quiero%20agendar%20una%20revisión%20en%20el%20taller"
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
      <footer className="mt-auto border-t border-surface-border bg-[#07080a] py-12 px-4 sm:px-8 lg:px-12 text-xs text-steel-500">
        <div className="max-w-[1440px] mx-auto space-y-8">
          {/* Fila Superior */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Marca */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/brand/logo-horizontal-dark.png"
                  alt="Renovautos — Restauración Automotriz"
                  width={220}
                  height={50}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-[11px] text-steel-400 leading-relaxed max-w-sm">
                Restauración automotriz y mecánica de precisión en Santa Marta. Garantía certificada por escrito, seguimiento fotográfico en vivo y transparencia total.
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
                  className="rounded-xl bg-brand-600 px-3.5 py-2 text-[11px] font-bold text-white hover:bg-brand-500 transition-colors"
                >
                  Agendar Cita
                </Link>
                <Link
                  href="/login"
                  className="rounded-xl border border-surface-border px-3.5 py-2 text-[11px] font-bold text-steel-300 hover:border-brand-500 hover:text-brand-400 transition-colors"
                >
                  Portal Admin
                </Link>
              </div>
            </div>
          </div>

          {/* Fila Inferior */}
          <div className="border-t border-surface-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-steel-600">
            <p>© 2026 Renovautos. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1.5">
              <span>Hecho con</span>
              <Heart suppressHydrationWarning className="h-3 w-3 text-brand-500 fill-brand-500" />
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
