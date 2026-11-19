import Link from "next/link";
import SearchTokenForm from "@/components/landing/SearchTokenForm";
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
  Search,
  Sparkles,
  Gauge,
  Camera,
  Award,
} from "lucide-react";

export const metadata = {
  title: "Taller Junior — Taller Mecánico Automotriz en Santa Marta",
  description:
    "5 años de trayectoria en Santa Marta. Mantenimiento preventivo, frenos, suspensión, diagnóstico computarizado y seguimiento en vivo de tu vehículo.",
};

const SERVICES = [
  {
    icon: Wrench,
    title: "Mantenimiento Preventivo",
    desc: "Cambio de aceite según especificaciones exactas del fabricante, filtros, fluidos e inspección de puntos críticos.",
  },
  {
    icon: Gauge,
    title: "Diagnóstico Computarizado",
    desc: "Escáner automotriz avanzado para lectura y borrado de fallas (Check Engine, ABS, Airbag, sensores).",
  },
  {
    icon: ShieldCheck,
    title: "Sistema de Frenos",
    desc: "Cambio y rectificación de discos, pastillas de freno cerámicas, purga de líquido y calibración de frenos de mano.",
  },
  {
    icon: Car,
    title: "Suspensión y Dirección",
    desc: "Amortiguadores, terminales, tijeras, rótulas, rodamientos y alineación para un andar suave y seguro.",
  },
  {
    icon: Award,
    title: "Embrague y Transmisión",
    desc: "Diagnóstico y sustitución de kits de clutch, reparación de fugas de valvulina y ajustes de caja.",
  },
  {
    icon: Sparkles,
    title: "Reparación de Motor",
    desc: "Mantenimiento mayor, empaquetaduras, correas de repartición, bombas de agua y eliminación de fugas.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-steel-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-surface-border bg-surface-elevated/85 backdrop-blur-md px-4 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/25">
              <Wrench suppressHydrationWarning className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-black text-white text-base tracking-tight leading-tight block">
                Taller Junior
              </span>
              <span className="text-[10px] text-brand-400 font-semibold block">
                Santa Marta, Colombia
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-steel-300">
            <a href="#servicios" className="hover:text-white transition-colors">
              Servicios
            </a>
            <a href="#seguimiento" className="hover:text-white transition-colors">
              Seguimiento en Vivo
            </a>
            <a href="#ubicacion" className="hover:text-white transition-colors">
              Ubicación
            </a>
            <Link
              href="/login"
              className="text-steel-500 hover:text-brand-400 transition-colors"
            >
              Acceso Admin
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/agendar"
              className="flex items-center gap-1.5 rounded-xl bg-brand-500 px-3.5 py-2 text-xs font-bold text-white shadow-lg shadow-brand-500/20 transition-all hover:bg-brand-600 active:scale-95"
            >
              <Calendar suppressHydrationWarning className="h-3.5 w-3.5" />
              <span>Agendar Cita</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 border-b border-surface-border">
        {/* Glow de fondo */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-4xl rounded-full bg-brand-500/10 blur-[120px]" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-400">
            <Sparkles suppressHydrationWarning className="h-3.5 w-3.5" />
            <span>5 Años de Experiencia Mecánica en Santa Marta</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Mecánica Automotriz de Precisión y{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-orange-500">
              Seguimiento en Tiempo Real
            </span>
          </h1>

          <p className="text-sm sm:text-base text-steel-400 max-w-2xl mx-auto leading-relaxed">
            Diagnóstico certero, repuestos con trazabilidad y un portal único para consultar el estado de tu vehículo con fotos de evidencia directamente desde tu WhatsApp.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/agendar"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-brand-500 px-6 py-4 text-sm font-black text-white shadow-xl shadow-brand-500/30 transition-all hover:bg-brand-600 active:scale-95"
            >
              <Calendar suppressHydrationWarning className="h-4 w-4" />
              <span>Agendar Cita en el Taller</span>
            </Link>

            <a
              href="https://wa.me/573045284505?text=Hola%20Junior,%20quiero%20hacer%20una%20consulta%20mecánica"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-green-500/30 bg-green-600/15 px-6 py-4 text-sm font-bold text-green-400 transition-all hover:bg-green-600/25 active:scale-95"
            >
              <MessageCircle suppressHydrationWarning className="h-4 w-4" />
              <span>Escribir al WhatsApp (+57 304 528 4505)</span>
            </a>
          </div>

          {/* Formulario rápido para consultar estado */}
          <div className="pt-6 max-w-md mx-auto space-y-2">
            <SearchTokenForm />
            <p className="text-[11px] text-steel-500">
              Sin crear contraseñas. Revisa avances, fotos y cotización con el enlace que te enviamos.
            </p>
          </div>
        </div>
      </section>

      {/* ── Feature Highlight: Portal Cliente ── */}
      <section id="seguimiento" className="py-16 px-4 bg-surface-elevated/40 border-b border-surface-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Transparencia Absoluta
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Se acabaron las llamadas preguntando: <br />
              <span className="text-brand-400">"¿Cómo va mi carro?"</span>
            </h2>
            <p className="text-xs sm:text-sm text-steel-300 leading-relaxed">
              En Taller Junior entendemos que tu tiempo es valioso. Cuando dejas tu vehículo con nosotros, recibes un enlace único por WhatsApp que te permite ver:
            </p>

            <ul className="space-y-2.5 text-xs text-steel-300">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 suppressHydrationWarning className="h-4 w-4 text-brand-400 shrink-0" />
                <span>Línea de tiempo de avance en vivo (Recibido → Diagnóstico → Reparación → Listo).</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 suppressHydrationWarning className="h-4 w-4 text-brand-400 shrink-0" />
                <span>Fotos de piezas desgastadas, fugas y el repuesto nuevo instalado.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 suppressHydrationWarning className="h-4 w-4 text-brand-400 shrink-0" />
                <span>Desglose detallado de mano de obra y piezas para que apruebes con un toque.</span>
              </li>
            </ul>
          </div>

          {/* Visual Mockup Card */}
          <div className="rounded-2xl border border-surface-border bg-surface p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div className="flex items-center gap-2 font-mono text-sm font-black text-brand-400">
                <Car suppressHydrationWarning className="h-4 w-4" />
                <span>ABC-123</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                🎉 Listo para Entrega
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-white">Toyota Corolla 2021</p>
              <div className="h-2 rounded-full bg-surface-elevated overflow-hidden">
                <div className="h-full bg-brand-500 w-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl bg-surface-elevated p-2.5 border border-surface-border text-center">
                <p className="text-[10px] text-steel-500">Fotos de Evidencia</p>
                <p className="font-bold text-white mt-0.5">4 fotos subidas</p>
              </div>
              <div className="rounded-xl bg-surface-elevated p-2.5 border border-surface-border text-center">
                <p className="text-[10px] text-steel-500">Garantía</p>
                <p className="font-bold text-green-400 mt-0.5">Certificada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Catálogo de Servicios ── */}
      <section id="servicios" className="py-16 px-4 border-b border-surface-border">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Soluciones Integrales
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Nuestros Servicios Especializados
            </h2>
            <p className="text-xs text-steel-400 max-w-xl mx-auto">
              Atención directa por el mecánico dueño, sin intermediarios y con repuestos de calidad garantizada en Santa Marta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-surface-border bg-surface-elevated p-5 space-y-3 transition-all hover:border-brand-500/40 hover:-translate-y-0.5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400">
                    <Icon suppressHydrationWarning className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-white text-base">{s.title}</h3>
                  <p className="text-xs text-steel-400 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Ubicación y Horarios ── */}
      <section id="ubicacion" className="py-16 px-4">
        <div className="max-w-4xl mx-auto rounded-3xl border border-surface-border bg-surface-elevated p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Visítanos en Santa Marta
            </h2>
            <p className="text-xs text-steel-400">
              Estamos ubicados en una zona de fácil acceso para toda la ciudad y el Rodadero.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl bg-surface p-4 border border-surface-border space-y-1">
              <MapPin suppressHydrationWarning className="mx-auto h-5 w-5 text-brand-400 mb-1" />
              <p className="text-xs font-bold text-white">Dirección</p>
              <p className="text-xs text-steel-400">Calle Principal # 12-34, Santa Marta, Magdalena</p>
            </div>

            <div className="rounded-2xl bg-surface p-4 border border-surface-border space-y-1">
              <Clock suppressHydrationWarning className="mx-auto h-5 w-5 text-brand-400 mb-1" />
              <p className="text-xs font-bold text-white">Horario de Atención</p>
              <p className="text-xs text-steel-400">Lunes a Sábado: 8:00 AM - 6:00 PM</p>
            </div>

            <div className="rounded-2xl bg-surface p-4 border border-surface-border space-y-1">
              <Phone suppressHydrationWarning className="mx-auto h-5 w-5 text-brand-400 mb-1" />
              <p className="text-xs font-bold text-white">Contacto Directo</p>
              <p className="text-xs text-steel-400">+57 300 123 4567 (WhatsApp / Llamadas)</p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600 transition-colors"
            >
              <span>Separar mi Turno Ahora</span>
              <ChevronRight suppressHydrationWarning className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-surface-border bg-surface-elevated/60 py-8 px-4 text-center text-xs text-steel-500">
        <p className="font-bold text-white">Taller Junior — Santa Marta, Colombia</p>
        <p className="mt-1">Mecánica de Confianza · 5 Años de Trayectoria</p>
        <p className="mt-4 text-[10px]">
          © 2026 Taller Junior. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
