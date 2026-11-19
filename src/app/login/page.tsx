import { Suspense } from "react";
import { Wrench, ShieldCheck } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso Administrativo | Taller Junior",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 py-12 relative overflow-hidden">
      {/* Glow naranja industrial */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-brand-500/10 blur-[100px]" />

      <div className="w-full max-w-sm rounded-2xl border border-surface-border bg-surface-elevated p-6 shadow-2xl relative z-10 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 shadow-lg shadow-brand-500/30">
            <Wrench className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">Taller Junior</h1>
            <p className="text-xs text-steel-400 mt-0.5">Santa Marta, Colombia · Panel Mecánico</p>
          </div>
        </div>

        <Suspense fallback={<div className="h-40 flex items-center justify-center text-xs text-steel-500">Cargando...</div>}>
          <LoginForm />
        </Suspense>

        <div className="border-t border-surface-border pt-4 text-center">
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-steel-500">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-400" />
            Acceso exclusivo para el administrador
          </p>
        </div>
      </div>
    </div>
  );
}
