"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { z } from "zod";

const vehicleSchema = z.object({
  plate: z.string().min(5, "Placa inválida").max(10)
    .transform((v) => v.toUpperCase().replace(/\s/g, "")),
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  year: z.coerce.number().min(1950).max(new Date().getFullYear() + 2),
  color: z.string().optional().or(z.literal("")),
  vin: z.string().optional().or(z.literal("")),
  engineType: z.string().optional().or(z.literal("")),
  transmission: z.string().optional().or(z.literal("")),
  oilType: z.string().optional().or(z.literal("")),
  oilCapacityLts: z.coerce.number().min(0).max(20).optional(),
  notes: z.string().optional().or(z.literal("")),
  customerId: z.string().min(1, "Debes asociar el vehículo a un cliente"),
});

export type VehicleFormState = {
  errors?: Partial<Record<keyof z.infer<typeof vehicleSchema>, string[]>>;
  error?: string;
  vehicleId?: string;
  plate?: string;
};

export async function createVehicleAction(
  _prev: VehicleFormState,
  formData: FormData
): Promise<VehicleFormState> {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  const raw = Object.fromEntries(formData);
  const parsed = vehicleSchema.safeParse(raw);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as VehicleFormState["errors"] };
  }

  // Verificar si la placa ya existe
  const existing = await prisma.vehicle.findUnique({
    where: { plate: parsed.data.plate },
  });
  if (existing) {
    return { errors: { plate: ["Ya existe un vehículo registrado con esta placa"] } };
  }

  const vehicle = await prisma.vehicle.create({
    data: {
      plate: parsed.data.plate,
      brand: parsed.data.brand,
      model: parsed.data.model,
      year: parsed.data.year,
      color: parsed.data.color || null,
      vin: parsed.data.vin || null,
      engineType: parsed.data.engineType || null,
      transmission: parsed.data.transmission || null,
      oilType: parsed.data.oilType || null,
      oilCapacityLts: parsed.data.oilCapacityLts || null,
      notes: parsed.data.notes || null,
      customerId: parsed.data.customerId,
    },
  });

  revalidatePath(`/admin/clientes/${parsed.data.customerId}`);
  revalidatePath("/admin/vehiculos");
  return { vehicleId: vehicle.id, plate: vehicle.plate };
}

export async function updateVehicleAction(
  vehicleId: string,
  _prev: VehicleFormState,
  formData: FormData
): Promise<VehicleFormState> {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  const raw = Object.fromEntries(formData);
  const parsed = vehicleSchema.safeParse(raw);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as VehicleFormState["errors"] };
  }

  await prisma.vehicle.update({
    where: { id: vehicleId },
    data: {
      brand: parsed.data.brand,
      model: parsed.data.model,
      year: parsed.data.year,
      color: parsed.data.color || null,
      vin: parsed.data.vin || null,
      engineType: parsed.data.engineType || null,
      transmission: parsed.data.transmission || null,
      oilType: parsed.data.oilType || null,
      oilCapacityLts: parsed.data.oilCapacityLts || null,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath(`/admin/vehiculos/${parsed.data.plate}`);
  revalidatePath(`/admin/clientes/${parsed.data.customerId}`);
  return {};
}

export async function searchVehicleByPlate(plate: string) {
  if (!plate || plate.length < 3) return null;

  return prisma.vehicle.findFirst({
    where: { plate: { contains: plate.toUpperCase() } },
    include: {
      customer: {
        select: { id: true, name: true, phone: true },
      },
      workOrders: {
        where: {
          status: { notIn: ["DELIVERED", "CANCELLED"] },
        },
        select: { id: true, orderNumber: true, status: true },
        take: 1,
      },
    },
  });
}

export async function getVehicleHistory(plate: string) {
  return prisma.vehicle.findUnique({
    where: { plate: plate.toUpperCase() },
    include: {
      customer: true,
      workOrders: {
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            where: { type: "PART" },
            select: { description: true, quantity: true, unitPrice: true, brand: true },
          },
          photos: {
            take: 4,
            select: { id: true, url: true, caption: true, stage: true },
          },
          _count: { select: { items: true, photos: true } },
        },
      },
    },
  });
}

export async function getAllVehicles(query?: string) {
  const where = query
    ? {
        OR: [
          { plate: { contains: query.toUpperCase() } },
          { brand: { contains: query, mode: "insensitive" as const } },
          { model: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  return prisma.vehicle.findMany({
    where,
    include: {
      customer: { select: { name: true, phone: true } },
      _count: { select: { workOrders: true } },
    },
    orderBy: { updatedAt: "desc" },
    take: 50,
  });
}
