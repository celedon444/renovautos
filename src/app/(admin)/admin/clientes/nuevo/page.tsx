import CustomerForm from "@/components/crm/CustomerForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Nuevo Cliente | Taller Junior" };

export default function NuevoClientePage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-3 border-b border-surface-border pb-4">
        <Link
          href="/admin/clientes"
          className="rounded-xl border border-surface-border bg-surface-elevated p-2 text-steel-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Registrar Nuevo Cliente</h1>
          <p className="text-xs text-steel-400 mt-0.5">Crea el perfil del cliente para asociarle vehículos y órdenes.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5 sm:p-6 shadow-xl">
        <CustomerForm />
      </div>
    </div>
  );
}
