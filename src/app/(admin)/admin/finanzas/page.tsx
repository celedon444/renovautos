import { getFinancialSummary, getExpenses } from "@/actions/expenses";
import ExpenseForm from "@/components/finanzas/ExpenseForm";
import { formatCOP, formatDate } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign, Receipt, Tag } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Finanzas & Flujo de Caja | Taller Junior" };

export default async function FinanzasPage() {
  const [finances, expenses] = await Promise.all([
    getFinancialSummary(),
    getExpenses(40),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-surface-border pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">Finanzas & Flujo de Caja</h1>
        <p className="text-xs text-steel-400 mt-0.5">
          Control de dinero para taller unipersonal: separación clara entre cobros, repuestos y ganancia real.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5">
          <div className="flex items-center justify-between text-steel-400 text-xs">
            <span>Ingresos Cobrados (Mes)</span>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </div>
          <p className="text-2xl font-black text-green-400 mt-2">{formatCOP(finances.totalIncome)}</p>
          <p className="text-[11px] text-steel-500 mt-1">Cobros de órdenes de trabajo</p>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface-elevated p-5">
          <div className="flex items-center justify-between text-steel-400 text-xs">
            <span>Egresos / Gastos (Mes)</span>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </div>
          <p className="text-2xl font-black text-red-400 mt-2">{formatCOP(finances.totalExpenses)}</p>
          <p className="text-[11px] text-steel-500 mt-1">Repuestos, arriendo, servicios</p>
        </div>

        <div className="rounded-2xl border border-brand-500/40 bg-gradient-to-br from-brand-500/10 to-transparent p-5">
          <div className="flex items-center justify-between text-brand-400 text-xs font-bold">
            <span>Utilidad Neta Real</span>
            <DollarSign className="h-4 w-4" />
          </div>
          <p className="text-2xl font-black text-brand-400 mt-2">{formatCOP(finances.netProfit)}</p>
          <p className="text-[11px] text-steel-400 mt-1">Tu ganancia libre de bolsillo</p>
        </div>
      </div>

      {/* Formulario de Registro + Lista de Gastos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Registrar Egreso / Gasto
          </h2>
          <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4 shadow-xl">
            <ExpenseForm />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Historial de Gastos Recientes ({expenses.length})
          </h2>

          <div className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden shadow-xl">
            {expenses.length === 0 ? (
              <div className="p-8 text-center text-xs text-steel-500">
                No hay gastos registrados este mes.
              </div>
            ) : (
              <div className="divide-y divide-surface-border">
                {expenses.map((exp) => (
                  <div key={exp.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-white">{exp.description}</p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-steel-400 flex-wrap">
                        <span className="rounded bg-surface px-1.5 py-0.5 border border-surface-border text-steel-300">
                          {exp.category}
                        </span>
                        {exp.vendor && <span>Proveedor: {exp.vendor}</span>}
                        <span>· {formatDate(exp.date)}</span>
                      </div>
                    </div>

                    <span className="font-black text-red-400 text-sm shrink-0">
                      -{formatCOP(exp.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
