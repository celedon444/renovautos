import Link from "next/link";
import Image from "next/image";
import SearchTokenForm from "@/components/landing/SearchTokenForm";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import {
  Wrench,
  Car,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  ChevronRight,
  Sparkles,
  Gauge,
  Camera,
  Award,
  Star,
  ArrowRight,
  Check,
  BadgeCheck,
} from "lucide-react";

export const metadata = {
  title: "Taller Junior — Mecánica Automotriz de Precisión en Santa Marta",
  description:
    "Mantenimiento preventivo, frenos, suspensión, diagnóstico computarizado y seguimiento en vivo por WhatsApp para tu vehículo en Santa Marta.",
};

const SERVICES = [
  {
    icon: Wrench,
    title: "Mantenimiento Preventivo",
    badge: "Esencial",
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=800&q=80",
    desc: "Cambio de aceite según las especificaciones del fabricante, sustitución de filtros de aire, aceite y combustible, e inspección multipunto de 25 elementos críticos.",
    features: ["Aceites sintéticos y semisintéticos", "Filtros certificados", "Revisión de niveles y fugas"],
  },
  {
    icon: Gauge,
    title: "Diagnóstico Computarizado",
    badge: "Tecnología",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
    desc: "Escáner automotriz avanzado multimarca. Lectura y borrado de códigos de falla de Check Engine, ABS, Airbag, sensores de oxígeno y calibración electrónica.",
    features: ["Reporte digital de escaneo", "Pruebas de actuadores", "Detección rápida de fallas eléctricas"],
  },
  {
    icon: ShieldCheck,
    title: "Sistema de Frenos de Alta Seguridad",
    badge: "Seguridad",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
    desc: "Rectificación y cambio de discos, sustitución de pastillas cerámicas, purga y renovación de líquido DOT 4/5.1 y calibración de freno de mano.",
    features: ["Pastillas cerámicas sin chirridos", "Líquido de frenos de alta ebullición", "Prueba de frenado en ruta"],
  },
  {
    icon: Car,
    title: "Suspensión, Amortiguación y Dirección",
    badge: "Confort",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=800&q=80",
    desc: "Eliminación de ruidos y golpes en baches. Diagnóstico y cambio de amortiguadores, tijeras, terminales, rótulas, rodamientos y alineación computarizada.",
    features: ["Prueba en fosa hidráulica", "Bujes y terminales reforzados", "Mayor estabilidad y confort"],
  },
  {
    icon: Award,
    title: "Embrague y Cajas de Transmisión",
    badge: "Mecánica Mayor",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    desc: "Cambio de kit de clutch (prensa, disco y balinera), solución a pedales duros o patinamiento, cambio de valvulina y sellado de fugas de retenes.",
    features: ["Repuestos originales o equipo original", "Calibración de guaya o bombines", "Suavidad inmediata al pedal"],
  },
  {
    icon: Sparkles,
    title: "Reparación de Motores y Fugas",
    badge: "Especialidad",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    desc: "Mantenimiento mayor, cambio de kit de repartición (correa/cadena de tiempos), bombas de agua, termostatos, empaquetaduras y erradicación de fugas de aceite.",
    features: ["Torque exacto por manual de taller", "Garantía escrita en motor", "Pruebas de compresión de cilindros"],
  },
];

const TESTIMONIALS = [
  {
    name: "Carlos Mario Restrepo",
    vehicle: "Renault Duster 2020",
    role: "Cliente Particular · Rodadero",
    text: "Lo mejor de Taller Junior es que no tienes que estar llamando para saber cómo va el carro. Me enviaron el enlace por WhatsApp con fotos del amortiguador dañado y el repuesto nuevo antes de instalarlo. 100% transparente.",
    rating: 5,
  },
  {
    name: "Dayana Morales",
    vehicle: "Chevrolet Onix 2022",
    role: "Conductora Diaria · Santa Marta Centro",
    text: "Tenía una falla eléctrica con el testigo de motor que dos mecánicos no supieron resolver. Junior le puso el escáner, me explicó exactamente el sensor averiado y en la misma tarde me entregó el carro perfecto.",
    rating: 5,
  },
  {
    name: "Andrés Felipe Giraldo",
    vehicle: "Toyota Hilux 4x4",
    role: "Vehículo de Trabajo y Turismo",
    text: "Viajo mucho hacia La Guajira y Minca, necesito frenos y suspensión impecables. Los repuestos fueron cotizados con precio claro y la garantía por escrito me da total tranquilidad. Recomendado a ojo cerrado.",
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0b0d13] text-steel-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* ── Top Bar de Contacto Rápido ── */}
      <div className="bg-surface-elevated/90 border-b border-surface-border/50 text-[11px] text-steel-400 py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-brand-400 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Taller Abierto en Santa Marta · Lun a Sáb: 8:00 AM - 6:00 PM
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-steel-400">
              <MapPin suppressHydrationWarning className="h-3 w-3 text-steel-500" />
              Calle Principal # 12-34
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/573001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors flex items-center gap-1 font-semibold text-steel-300"
            >
              <MessageCircle suppressHydrationWarning className="h-3 w-3 text-green-400" />
              WhatsApp: +57 300 123 4567
            </a>
            <span className="text-steel-600">|</span>
            <Link
              href="/login"
              className="text-steel-400 hover:text-brand-400 transition-colors font-medium"
            >
              Acceso Admin
            </Link>
          </div>
        </div>
      </div>

      {/* ── Header Principal con Glassmorphism ── */}
      <header className="sticky top-0 z-40 border-b border-surface-border/60 bg-[#0b0d13]/85 backdrop-blur-md px-4 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-orange-600 shadow-lg shadow-brand-500/25 transition-transform group-hover:scale-105">
              <Wrench suppressHydrationWarning className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-black text-white text-lg tracking-tight leading-tight block">
                Taller Junior
              </span>
              <span className="text-[11px] text-brand-400 font-semibold tracking-wide block">
                Mecánica Automotriz · Santa Marta
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-steel-300">
            <a href="#servicios" className="hover:text-brand-400 transition-colors">
              Servicios Especializados
            </a>
            <a href="#seguimiento" className="hover:text-brand-400 transition-colors">
              Seguimiento en Vivo
            </a>
            <a href="#por-que-nosotros" className="hover:text-brand-400 transition-colors">
              Garantía y Confianza
            </a>
            <a href="#testimonios" className="hover:text-brand-400 transition-colors">
              Opiniones
            </a>
            <a href="#ubicacion" className="hover:text-brand-400 transition-colors">
              Ubicación
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/agendar"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-orange-600 px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-brand-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Calendar suppressHydrationWarning className="h-4 w-4" />
              <span>Agendar Cita</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section Visual & Impactante ── */}
      <section className="relative overflow-hidden pt-10 pb-20 px-4 border-b border-surface-border">
        {/* Glows de fondo */}
        <div className="pointer-events-none absolute left-1/4 top-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-brand-500/15 blur-[140px]" />
        <div className="pointer-events-none absolute right-10 top-1/3 h-[400px] w-[400px] rounded-full bg-orange-600/10 blur-[130px]" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Lado Izquierdo: Titular, Propuesta de Valor y CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-400 shadow-inner">
              <Sparkles suppressHydrationWarning className="h-3.5 w-3.5" />
              <span>5 Años de Excelencia Mecánica en Santa Marta</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              Reparación Mecánica Confiable y{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-orange-400 to-amber-300">
                Seguimiento en Vivo
              </span>{" "}
              de tu Auto
            </h1>

            <p className="text-sm sm:text-base text-steel-300 leading-relaxed max-w-xl">
              Cuidamos tu vehículo como si fuera nuestro. Diagnóstico computarizado preciso, repuestos de calidad garantizada y un portal web exclusivo para consultar fotos y avances de tu reparación directamente desde WhatsApp.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/agendar"
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-orange-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-brand-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <Calendar suppressHydrationWarning className="h-4 w-4" />
                <span>Agendar Turno en el Taller</span>
                <ChevronRight suppressHydrationWarning className="h-4 w-4 opacity-80" />
              </Link>

              <a
                href="https://wa.me/573001234567?text=Hola%20Junior,%20quiero%20hacer%20una%20consulta%20mecánica%20para%20mi%20vehículo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-2xl border border-green-500/30 bg-green-500/10 px-6 py-4 text-sm font-bold text-green-400 shadow-lg shadow-green-500/10 transition-all hover:bg-green-500/20 active:scale-95"
              >
                <MessageCircle suppressHydrationWarning className="h-4 w-4" />
                <span>Hablar por WhatsApp (+57 300 123 4567)</span>
              </a>
            </div>

            {/* Widget de Rastreo Rápido */}
            <div className="pt-4 max-w-lg">
              <div className="rounded-2xl border border-surface-border bg-surface-elevated/90 p-4 shadow-2xl backdrop-blur-md space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
                    <span>¿Tu auto ya está en el taller?</span>
                  </div>
                  <span className="text-[10px] text-steel-400">Sin contraseñas</span>
                </div>
                <SearchTokenForm />
                <p className="text-[11px] text-steel-500">
                  Ingresa tu código único (ej: <span className="text-brand-400 font-mono font-bold">TJ-7K9P-2M4X</span>) para ver cotización, fotos y avance.
                </p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Visual Fotográfico con Badge Flotante */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Marco fotográfico con glow */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-surface-border shadow-2xl bg-surface-elevated group">
                <div className="relative h-96 sm:h-[460px] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80"
                    alt="Mecánico profesional de Taller Junior revisando motor de vehículo"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradiente oscuro para contraste */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-[#0b0d13]/20 to-transparent" />
                </div>

                {/* Badge Flotante: Atención directa por el dueño */}
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-surface-border/80 bg-surface-elevated/95 p-4 backdrop-blur-md shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
                      <Award suppressHydrationWarning className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">Junior Celedón</p>
                      <p className="text-[11px] text-steel-400">Mecánico Titular & Propietario</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400 justify-end">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} suppressHydrationWarning className="h-3 w-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-green-400">Garantía Certificada</span>
                  </div>
                </div>

                {/* Badge Flotante Superior: Santa Marta */}
                <div className="absolute top-4 right-4 rounded-full border border-surface-border bg-[#0b0d13]/80 px-3.5 py-1.5 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-bold text-white">
                  <MapPin suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400" />
                  <span>Santa Marta, Colombia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Barra de Métricas y Confianza ── */}
        <div className="max-w-6xl mx-auto mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-surface-border bg-surface-elevated/50 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-black text-white">5+ Años</p>
            <p className="text-xs font-semibold text-steel-400 mt-1">Trayectoria en Santa Marta</p>
          </div>
          <div className="rounded-2xl border border-surface-border bg-surface-elevated/50 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-black text-brand-400">+1,500</p>
            <p className="text-xs font-semibold text-steel-400 mt-1">Vehículos Reparados</p>
          </div>
          <div className="rounded-2xl border border-surface-border bg-surface-elevated/50 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-black text-green-400">100%</p>
            <p className="text-xs font-semibold text-steel-400 mt-1">Repuestos con Trazabilidad</p>
          </div>
          <div className="rounded-2xl border border-surface-border bg-surface-elevated/50 p-4 text-center">
            <p className="text-2xl sm:text-3xl font-black text-orange-400">30 Días</p>
            <p className="text-xs font-semibold text-steel-400 mt-1">Garantía Escrita o 1.000 km</p>
          </div>
        </div>
      </section>

      {/* ── Sección de Servicios con Imágenes Automotrices Reales ── */}
      <section id="servicios" className="py-20 px-4 border-b border-surface-border bg-surface/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider">
              Nuestros Servicios Especializados
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Mecánica Profesional con Repuestos de Primera Calidad
            </h2>
            <p className="text-xs sm:text-sm text-steel-400 leading-relaxed">
              Atención directa por mecánico certificado. Diagnosticamos con precisión para que no gastes de más cambiando piezas innecesarias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-3xl border border-surface-border bg-surface-elevated overflow-hidden transition-all duration-300 hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 flex flex-col"
                >
                  {/* Foto de Cabecera del Servicio */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-surface-elevated/40 to-transparent" />
                    
                    {/* Badge Categoría */}
                    <span className="absolute top-3 left-3 rounded-full bg-[#0b0d13]/80 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-400 border border-surface-border">
                      {s.badge}
                    </span>

                    {/* Icono Flotante */}
                    <div className="absolute bottom-3 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                      <Icon suppressHydrationWarning className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Contenido del Servicio */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-black text-white text-lg tracking-tight group-hover:text-brand-400 transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-steel-400 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    {/* Puntos clave */}
                    <ul className="space-y-1.5 pt-2 border-t border-surface-border/60 text-[11px] text-steel-300">
                      {s.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <CheckCircle2 suppressHydrationWarning className="h-3.5 w-3.5 text-green-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <Link
                        href="/agendar"
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-surface border border-surface-border py-2.5 text-xs font-bold text-steel-200 transition-all hover:bg-brand-500 hover:text-white hover:border-brand-500 active:scale-95"
                      >
                        <span>Cotizar este Servicio</span>
                        <ChevronRight suppressHydrationWarning className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Sección Estrella: El Portal de Seguimiento en Vivo ── */}
      <section id="seguimiento" className="py-20 px-4 bg-gradient-to-b from-[#0b0d13] via-surface-elevated/40 to-[#0b0d13] border-b border-surface-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Explicación y Beneficios */}
          <div className="lg:col-span-6 space-y-6">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider">
              Transparencia Absoluta
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Se acabaron las dudas: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-orange-400">
                "¿Cómo va mi carro en el taller?"
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-steel-300 leading-relaxed">
              En Taller Junior eliminamos la incertidumbre. Cuando dejas tu vehículo, recibes un enlace exclusivo a tu WhatsApp que te permite seguir cada etapa desde tu celular sin contraseñas engorrosas:
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 rounded-2xl bg-surface-elevated/80 border border-surface-border p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
                  <Clock suppressHydrationWarning className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Línea de Tiempo en Tiempo Real</h4>
                  <p className="text-[11px] text-steel-400 mt-0.5">
                    Visualiza cuándo tu vehículo es Recibido, en Diagnóstico, Cotizado, en Reparación o Listo para retirar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl bg-surface-elevated/80 border border-surface-border p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500/20 text-green-400">
                  <Camera suppressHydrationWarning className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Fotos de Evidencia Fotográfica</h4>
                  <p className="text-[11px] text-steel-400 mt-0.5">
                    Te mostramos la pieza desgastada que retiramos y el repuesto nuevo con su empaque original antes de montar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl bg-surface-elevated/80 border border-surface-border p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
                  <ShieldCheck suppressHydrationWarning className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Aprobación de Cotización con 1 Toque</h4>
                  <p className="text-[11px] text-steel-400 mt-0.5">
                    Desglose transparente de mano de obra y repuestos. No compramos nada que no hayas aprobado previamente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Maqueta Interactiva del Portal del Cliente */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border-2 border-surface-border bg-surface-elevated p-5 sm:p-6 shadow-2xl space-y-5 relative">
              {/* Encabezado del Mockup */}
              <div className="flex items-center justify-between border-b border-surface-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white font-black">
                    TJ
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-white">KLR-456</span>
                      <span className="text-[10px] rounded-full bg-brand-500/20 px-2 py-0.5 font-bold text-brand-400">
                        Toyota Corolla
                      </span>
                    </div>
                    <span className="text-[10px] text-steel-500">Orden de Trabajo #OT-1042</span>
                  </div>
                </div>
                <span className="rounded-full bg-green-500/10 border border-green-500/30 px-3 py-1 text-xs font-bold text-green-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  Listo para Entrega
                </span>
              </div>

              {/* Imagen de Evidencia Real */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-surface-border">
                <Image
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
                  alt="Vehículo en proceso de mantenimiento"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 rounded-lg bg-[#0b0d13]/85 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                  📷 4 Fotos de Evidencia Subidas por Junior
                </div>
              </div>

              {/* Barra de Progreso del Cliente */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-steel-300">Progreso del Servicio</span>
                  <span className="text-brand-400">100% Completado</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-surface overflow-hidden p-0.5 border border-surface-border">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-green-500 w-full" />
                </div>
                <div className="flex justify-between text-[10px] text-steel-500">
                  <span>Recibido</span>
                  <span>Diagnóstico</span>
                  <span>Cotizado</span>
                  <span>Reparación</span>
                  <span className="font-bold text-green-400">Entregado</span>
                </div>
              </div>

              {/* Resumen Financiero Transparente */}
              <div className="rounded-2xl bg-surface p-3.5 border border-surface-border flex items-center justify-between text-xs">
                <div>
                  <p className="text-[10px] text-steel-500 uppercase font-bold tracking-wider">Total Cotizado</p>
                  <p className="font-black text-white text-base mt-0.5">$320.000 COP</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                    <BadgeCheck suppressHydrationWarning className="h-3.5 w-3.5" />
                    Aprobado por el Cliente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ¿Por qué elegir a Taller Junior? (Pilares de Usabilidad) ── */}
      <section id="por-que-nosotros" className="py-20 px-4 border-b border-surface-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider">
              Nuestra Promesa de Servicio
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              ¿Por qué los Samarios confían en Taller Junior?
            </h2>
            <p className="text-xs sm:text-sm text-steel-400">
              Mecánica honesta, sin sorpresas en la cuenta final y con el respaldo directo del dueño del taller.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-3xl border border-surface-border bg-surface-elevated p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-400 border border-brand-500/30">
                <ShieldCheck suppressHydrationWarning className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-white text-base">Garantía Certificada</h3>
              <p className="text-xs text-steel-400 leading-relaxed">
                Todo trabajo cuenta con respaldo de 30 días o 1.000 km en mano de obra. Si algo no queda al 100%, lo corregimos sin costo.
              </p>
            </div>

            <div className="rounded-3xl border border-surface-border bg-surface-elevated p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/15 text-green-400 border border-green-500/30">
                <MessageCircle suppressHydrationWarning className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-white text-base">Fotos en Vivo por WhatsApp</h3>
              <p className="text-xs text-steel-400 leading-relaxed">
                No tienes que imaginar el daño. Te enviamos foto de la pieza vieja averiada y el repuesto nuevo antes de ensamblar.
              </p>
            </div>

            <div className="rounded-3xl border border-surface-border bg-surface-elevated p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Check suppressHydrationWarning className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-white text-base">Presupuesto sin Sorpresas</h3>
              <p className="text-xs text-steel-400 leading-relaxed">
                El precio que apruebas es el que pagas. Si detectamos algo adicional, te consultamos y autorizas antes de tocarlo.
              </p>
            </div>

            <div className="rounded-3xl border border-surface-border bg-surface-elevated p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
                <Wrench suppressHydrationWarning className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-white text-base">Mecánico Dueño Dedicado</h3>
              <p className="text-xs text-steel-400 leading-relaxed">
                Sin aprendices ni intermediarios. Tu vehículo es intervenido directamente por Junior Celedón con 5 años de experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonios Reales ── */}
      <section id="testimonios" className="py-20 px-4 border-b border-surface-border bg-surface/40">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider">
              Opiniones de Nuestros Clientes
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Lo que dicen los conductores en Santa Marta
            </h2>
            <p className="text-xs sm:text-sm text-steel-400">
              Nuestra reputación se basa en la honestidad, el trato directo y el cumplimiento en cada entrega.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-surface-border bg-surface-elevated p-6 space-y-4 shadow-xl flex flex-col justify-between"
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

                <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{t.name}</p>
                    <p className="text-[10px] text-steel-400">{t.role}</p>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-brand-400 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-md">
                    {t.vehicle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ubicación, Foto del Taller y Horarios ── */}
      <section id="ubicacion" className="py-20 px-4">
        <div className="max-w-6xl mx-auto rounded-3xl border border-surface-border bg-surface-elevated overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Foto del taller */}
            <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1000&q=80"
                alt="Instalaciones de Taller Junior en Santa Marta"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 rounded-xl bg-[#0b0d13]/85 backdrop-blur-md px-3.5 py-2 border border-surface-border text-white text-xs font-black">
                📍 Taller Junior Santa Marta
              </div>
            </div>

            {/* Datos de contacto y horarios */}
            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 flex flex-col justify-center">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  Visítanos o Escríbenos
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Estamos listos para atender tu vehículo
                </h2>
                <p className="text-xs text-steel-400">
                  Ubicación estratégica de fácil acceso para Santa Marta, El Rodadero, Mamatoco y vía Gaira.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-2xl bg-surface p-4 border border-surface-border space-y-1">
                  <div className="flex items-center gap-2 text-brand-400 font-bold mb-1">
                    <MapPin suppressHydrationWarning className="h-4 w-4" />
                    <span>Dirección del Taller</span>
                  </div>
                  <p className="font-bold text-white">Calle Principal # 12-34</p>
                  <p className="text-steel-400 text-[11px]">Santa Marta, Magdalena, Colombia</p>
                </div>

                <div className="rounded-2xl bg-surface p-4 border border-surface-border space-y-1">
                  <div className="flex items-center gap-2 text-brand-400 font-bold mb-1">
                    <Clock suppressHydrationWarning className="h-4 w-4" />
                    <span>Horario de Atención</span>
                  </div>
                  <p className="font-bold text-white">Lunes a Sábado</p>
                  <p className="text-steel-400 text-[11px]">8:00 AM - 6:00 PM (Jornada Continua)</p>
                </div>

                <div className="rounded-2xl bg-surface p-4 border border-surface-border space-y-1 sm:col-span-2">
                  <div className="flex items-center gap-2 text-green-400 font-bold mb-1">
                    <Phone suppressHydrationWarning className="h-4 w-4" />
                    <span>Contacto Directo / WhatsApp</span>
                  </div>
                  <p className="font-bold text-white text-sm">+57 300 123 4567</p>
                  <p className="text-steel-400 text-[11px]">
                    Escríbenos para una cotización previa o respuesta inmediata a tu consulta mecánica.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  href="/agendar"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600 transition-colors"
                >
                  <Calendar suppressHydrationWarning className="h-4 w-4" />
                  <span>Separar Turno en el Taller</span>
                </Link>

                <a
                  href="https://wa.me/573001234567?text=Hola%20Junior,%20quiero%20agendar%20una%20revisión%20en%20el%20taller"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-6 py-3.5 text-xs font-bold text-green-400 hover:bg-green-500/20 transition-colors"
                >
                  <MessageCircle suppressHydrationWarning className="h-4 w-4" />
                  <span>Chatear por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-surface-border bg-[#07090e] py-10 px-4 text-xs text-steel-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white font-black">
              TJ
            </div>
            <div>
              <p className="font-bold text-white text-sm">Taller Junior</p>
              <p className="text-[11px] text-steel-400">Mecánica Automotriz de Precisión · Santa Marta</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-steel-400">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#seguimiento" className="hover:text-white transition-colors">Seguimiento</a>
            <Link href="/agendar" className="hover:text-white transition-colors">Agendar Cita</Link>
            <Link href="/login" className="hover:text-brand-400 transition-colors">Portal Admin</Link>
          </div>

          <p className="text-[11px] text-steel-500">
            © 2026 Taller Junior. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Botón Flotante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
