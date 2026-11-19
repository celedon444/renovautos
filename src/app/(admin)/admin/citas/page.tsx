import { getAppointments, updateAppointmentStatusAction } from "@/actions/appointments";
import { formatDate } from "@/lib/utils";
import { Calendar, Phone, Car, ArrowUpRight, CheckCircle2, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Citas Agendadas | Taller Junior" };

export default async function CitasPage() {
  const appointments = await getAppointments();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-surface-border pb-4">
        <h1 className="text-2xl font-black text-white tracking-tight">Citas y Solicitudes Web</h1>
        <p className="text-xs text-steel-400 mt-0.5">
          Clientes que han agendado citas desde la página pública del taller.
        </p>
      </div>

      <div className="space-y-3">
        {appointments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-surface-border p-8 text-center bg-surface-elevated/40">
            <Calendar className="mx-auto h-8 w-8 text-steel-600 mb-2" />
            <p className="text-sm font-medium text-steel-400">No hay citas registradas.</p>
          </div>
        ) : (
          appointments.map((appt) => (
            <div
              key={appt.id}
              className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-base">{appt.customerName}</span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      appt.status === "PENDING"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : appt.status === "CONFIRMED"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-steel-500/10 text-steel-400 border-steel-500/20"
                    }`}
                  >
                    {appt.status === "PENDING" ? "Pendiente" : appt.status === "CONFIRMED" ? "Confirmada" : appt.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-steel-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3 text-steel-500" />
                    <span>{appt.customerPhone}</span>
                  </span>
                  {appt.vehiclePlate && (
                    <span className="flex items-center gap-1 font-mono font-bold text-brand-400">
                      <Car className="h-3 w-3" />
                      <span>{appt.vehiclePlate}</span>
                    </span>
                  )}
                  <span>Fecha deseada: {formatDate(appt.preferredDate, "dd MMM yyyy, HH:mm")}</span>
                </div>

                <div className="rounded-lg bg-surface p-2 text-xs text-steel-300">
                  <p className="font-bold text-brand-400">{appt.serviceType}</p>
                  {appt.description && <p className="text-steel-400 mt-0.5">{appt.description}</p>}
                </div>
              </div>

              <div className="flex sm:flex-col items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/${appt.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${appt.customerName}, te escribo de Taller Junior en Santa Marta para confirmar tu cita de ${appt.serviceType}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:w-full flex items-center justify-center gap-1.5 rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white hover:bg-green-700 transition-colors"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>

                {appt.vehiclePlate && (
                  <a
                    href={`/admin/ordenes/nueva?plate=${appt.vehiclePlate}`}
                    className="flex-1 sm:w-full flex items-center justify-center gap-1.5 rounded-xl bg-brand-500 px-4 py-2 text-xs font-bold text-white hover:bg-brand-600 transition-colors"
                  >
                    <span>Crear Orden</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
