import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso Administrativo | Renovautos",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-12 relative overflow-hidden">
      {/* Glow rojo racing */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-500/10 blur-[120px]" />

      {/* Botón Volver al Inicio */}
      <div className="w-full max-w-sm mb-4 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-steel-400 hover:text-white transition-colors group"
        >
          <ArrowLeft suppressHydrationWarning className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver a la página de inicio</span>
        </Link>
      </div>

      <div className="w-full max-w-sm rounded-3xl border border-surface-border bg-surface-elevated p-7 shadow-2xl relative z-10 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <Link href="/">
            <Image
              src="/brand/logo-horizontal-dark.png"
              alt="Renovautos — Restauración Automotriz"
              width={220}
              height={50}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>
          <p className="text-xs text-steel-400">Santa Marta, Colombia · Panel Mecánico</p>
        </div>

        <Suspense fallback={<div className="h-40 flex items-center justify-center text-xs text-steel-500">Cargando...</div>}>
          <LoginForm />
        </Suspense>

        <div className="border-t border-surface-border pt-4 text-center">
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-steel-500">
            <ShieldCheck suppressHydrationWarning className="h-3.5 w-3.5 text-brand-400" />
            Acceso exclusivo para el administrador
          </p>
        </div>
      </div>
    </div>
  );
}
