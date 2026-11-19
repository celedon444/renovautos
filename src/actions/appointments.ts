"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { AppointmentStatus } from "@prisma/client";

const appointmentSchema = z.object({
  customerName: z.string().min(2, "Ingresa tu nombre"),
  customerPhone: z.string().min(7, "Ingresa tu WhatsApp o teléfono"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  vehiclePlate: z.string().optional().or(z.literal("")),
  vehicleBrand: z.string().optional().or(z.literal("")),
  vehicleModel: z.string().optional().or(z.literal("")),
  serviceType: z.string().min(1, "Selecciona el servicio"),
  description: z.string().optional().or(z.literal("")),
  preferredDate: z.string().min(1, "Selecciona una fecha estimada"),
});

export type AppointmentState = {
  error?: string;
  success?: boolean;
  appointmentId?: string;
};

export async function createAppointmentAction(
  _prev: AppointmentState,
  formData: FormData
): Promise<AppointmentState> {
  const parsed = appointmentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Por favor completa los campos requeridos correctamente." };
  }

  const {
    customerName,
    customerPhone,
    customerEmail,
    vehiclePlate,
    vehicleBrand,
    vehicleModel,
    serviceType,
    description,
    preferredDate,
  } = parsed.data;

  const appt = await prisma.appointment.create({
    data: {
      customerName,
      customerPhone,
      customerEmail: customerEmail || null,
      vehiclePlate: vehiclePlate ? vehiclePlate.toUpperCase().trim() : null,
      vehicleBrand: vehicleBrand || null,
      vehicleModel: vehicleModel || null,
      serviceType,
      description: description || null,
      preferredDate: new Date(preferredDate),
      status: "PENDING",
      source: "web_form",
    },
  });

  revalidatePath("/admin/citas");
  revalidatePath("/admin");
  return { success: true, appointmentId: appt.id };
}

export async function updateAppointmentStatusAction(
  id: string,
  status: AppointmentStatus
) {
  await prisma.appointment.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/citas");
  revalidatePath("/admin");
}

export async function getAppointments(status?: AppointmentStatus) {
  const where = status ? { status } : {};
  return prisma.appointment.findMany({
    where,
    orderBy: { preferredDate: "asc" },
  });
}
