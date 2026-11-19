"use client";

import { logoutAction } from "@/actions/auth";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-steel-400 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
    >
      <LogOut suppressHydrationWarning className="h-4 w-4" />
      {isPending ? "Saliendo..." : "Cerrar sesión"}
    </button>
  );
}
