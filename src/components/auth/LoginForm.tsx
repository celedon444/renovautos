"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction, type LoginState } from "@/actions/auth";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";

const initialState: LoginState = {};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";

  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />

      {state.error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-steel-300">
          Correo Electrónico
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
          <input
            name="email"
            type="email"
            autoComplete="email"
            defaultValue="junior@tallerjunior.com.co"
            placeholder="junior@tallerjunior.com.co"
            required
            className="w-full rounded-xl border border-surface-border bg-surface px-10 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        {state.fieldErrors?.email && (
          <p className="text-xs text-red-400">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-steel-300">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-steel-500" />
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            defaultValue="TallerJunior2024!"
            placeholder="••••••••"
            required
            className="w-full rounded-xl border border-surface-border bg-surface px-10 py-3 text-sm text-white placeholder:text-steel-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        {state.fieldErrors?.password && (
          <p className="text-xs text-red-400">{state.fieldErrors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 active:scale-95 disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Ingresando al taller...</span>
          </>
        ) : (
          <span>Ingresar al Sistema</span>
        )}
      </button>
    </form>
  );
}
