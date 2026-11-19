"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { generatePublicToken } from "@/lib/tokens";
import { z } from "zod";
import type {
  WorkOrderStatus,
  PhotoStage,
} from "@prisma/client";

// ─────────────────────────────────────────────
// CREAR ORDEN DE TRABAJO
// ─────────────────────────────────────────────
const createOrderSchema = z.object({
  vehicleId: z.string().min(1, "Selecciona un vehículo"),
  mileageIn: z.coerce.number().min(0).optional(),
  fuelLevel: z.enum(["EMPTY", "QUARTER", "HALF", "THREE_QUARTERS", "FULL"]).optional(),
  symptoms: z.string().min(3, "Describe brevemente la falla reportada"),
  mechanicNotes: z.string().optional(),
});

export type CreateOrderState = {
  errors?: Partial<Record<string, string[]>>;
  error?: string;
  orderId?: string;
  orderNumber?: string;
};

export async function createWorkOrderAction(
  _prev: CreateOrderState,
  formData: FormData
): Promise<CreateOrderState> {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  const parsed = createOrderSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  // Generar número correlativo
  const count = await prisma.workOrder.count();
  const year = new Date().getFullYear();
  const num = String(count + 1).padStart(3, "0");
  const orderNumber = `TJ-${year}-${num}`;
  const publicToken = generatePublicToken();

  const order = await prisma.workOrder.create({
    data: {
      orderNumber,
      publicToken,
      vehicleId: parsed.data.vehicleId,
      mileageIn: parsed.data.mileageIn ?? null,
      fuelLevel: parsed.data.fuelLevel ?? null,
      symptoms: parsed.data.symptoms,
      mechanicNotes: parsed.data.mechanicNotes ?? null,
      status: "RECEIVED",
    },
  });

  revalidatePath("/admin/ordenes");
  revalidatePath("/admin");
  return { orderId: order.id, orderNumber: order.orderNumber };
}

// ─────────────────────────────────────────────
// ACTUALIZAR ESTADO
// ─────────────────────────────────────────────
export async function updateOrderStatusAction(
  orderId: string,
  status: WorkOrderStatus
) {
  const session = await auth();
  if (!session) throw new Error("No autorizado");

  const data: Record<string, unknown> = { status };
  if (status === "READY") data.completedAt = new Date();
  if (status === "DELIVERED") data.deliveredAt = new Date();

  await prisma.workOrder.update({ where: { id: orderId }, data });

  revalidatePath(`/admin/ordenes/${orderId}`);
  revalidatePath("/admin/ordenes");
  revalidatePath("/admin");
}

// ─────────────────────────────────────────────
// ACTUALIZAR DATOS GENERALES
// ─────────────────────────────────────────────
const updateOrderSchema = z.object({
  symptoms: z.string().min(3),
  diagnosis: z.string().optional(),
  mechanicNotes: z.string().optional(),
  workDone: z.string().optional(),
  mileageIn: z.coerce.number().optional(),
  mileageOut: z.coerce.number().optional(),
  estimatedReady: z.string().optional(),
  discount: z.coerce.number().min(0).optional(),
});

export async function updateWorkOrderAction(
  orderId: string,
  _prev: { error?: string },
  formData: FormData
) {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  const parsed = updateOrderSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Datos inválidos" };

  await prisma.workOrder.update({
    where: { id: orderId },
    data: {
      symptoms: parsed.data.symptoms,
      diagnosis: parsed.data.diagnosis || null,
      mechanicNotes: parsed.data.mechanicNotes || null,
      workDone: parsed.data.workDone || null,
      mileageIn: parsed.data.mileageIn ?? undefined,
      mileageOut: parsed.data.mileageOut ?? undefined,
      discount: parsed.data.discount ?? 0,
      estimatedReady: parsed.data.estimatedReady
        ? new Date(parsed.data.estimatedReady)
        : null,
    },
  });

  await recalcOrderTotals(orderId);
  revalidatePath(`/admin/ordenes/${orderId}`);
  return {};
}

// ─────────────────────────────────────────────
// AGREGAR ÍTEM (REPUESTO O MANO DE OBRA)
// ─────────────────────────────────────────────
const itemSchema = z.object({
  workOrderId: z.string(),
  type: z.enum(["PART", "LABOR", "OTHER"]),
  description: z.string().min(1, "Descripción requerida"),
  quantity: z.coerce.number().min(0.01),
  unit: z.string().optional(),
  unitCost: z.coerce.number().min(0),
  unitPrice: z.coerce.number().min(0),
  partNumber: z.string().optional(),
  brand: z.string().optional(),
});

export async function addOrderItemAction(
  _prev: { error?: string },
  formData: FormData
) {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  const parsed = itemSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Datos del ítem inválidos" };

  const { workOrderId, quantity, unitCost, unitPrice, ...rest } = parsed.data;
  const totalCost = quantity * unitCost;
  const totalPrice = quantity * unitPrice;
  const margin = totalPrice - totalCost;

  await prisma.orderItem.create({
    data: {
      workOrderId,
      quantity,
      unitCost,
      unitPrice,
      totalCost,
      totalPrice,
      margin,
      ...rest,
    },
  });

  await recalcOrderTotals(workOrderId);
  revalidatePath(`/admin/ordenes/${workOrderId}`);
  return {};
}

export async function deleteOrderItemAction(itemId: string, workOrderId: string) {
  const session = await auth();
  if (!session) throw new Error("No autorizado");

  await prisma.orderItem.delete({ where: { id: itemId } });
  await recalcOrderTotals(workOrderId);
  revalidatePath(`/admin/ordenes/${workOrderId}`);
}

async function recalcOrderTotals(workOrderId: string) {
  const items = await prisma.orderItem.findMany({ where: { workOrderId } });

  const subtotalParts = items
    .filter((i) => i.type === "PART" || i.type === "OTHER")
    .reduce((acc, i) => acc + i.totalPrice, 0);

  const subtotalLabor = items
    .filter((i) => i.type === "LABOR")
    .reduce((acc, i) => acc + i.totalPrice, 0);

  const totalCostParts = items
    .filter((i) => i.type === "PART")
    .reduce((acc, i) => acc + i.totalCost, 0);

  const order = await prisma.workOrder.findUnique({
    where: { id: workOrderId },
    select: { discount: true },
  });

  const totalAmount = Math.max(0, subtotalParts + subtotalLabor - (order?.discount ?? 0));

  await prisma.workOrder.update({
    where: { id: workOrderId },
    data: { subtotalParts, subtotalLabor, totalCostParts, totalAmount },
  });
}

// ─────────────────────────────────────────────
// FOTOS DE LA ORDEN
// ─────────────────────────────────────────────
export async function saveOrderPhotoAction(
  workOrderId: string,
  url: string,
  publicId: string,
  stage: PhotoStage,
  caption?: string
) {
  const session = await auth();
  if (!session) throw new Error("No autorizado");

  await prisma.orderPhoto.create({
    data: { workOrderId, url, publicId, stage, caption: caption ?? null },
  });

  revalidatePath(`/admin/ordenes/${workOrderId}`);
}

export async function deleteOrderPhotoAction(photoId: string, workOrderId: string) {
  const session = await auth();
  if (!session) throw new Error("No autorizado");

  await prisma.orderPhoto.delete({ where: { id: photoId } });
  revalidatePath(`/admin/ordenes/${workOrderId}`);
}

// ─────────────────────────────────────────────
// REGISTRAR PAGO
// ─────────────────────────────────────────────
const paymentSchema = z.object({
  workOrderId: z.string(),
  amount: z.coerce.number().min(1, "Monto inválido"),
  method: z.enum(["CASH", "TRANSFER", "CARD", "MIXED"]),
  reference: z.string().optional(),
  notes: z.string().optional(),
});

export async function registerPaymentAction(
  _prev: { error?: string },
  formData: FormData
) {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  const parsed = paymentSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Datos de pago inválidos" };

  const { workOrderId, amount, method, reference, notes } = parsed.data;

  await prisma.payment.create({
    data: {
      workOrderId,
      amount,
      method,
      reference: reference || null,
      notes: notes || null,
    },
  });

  const order = await prisma.workOrder.findUnique({
    where: { id: workOrderId },
    select: { totalAmount: true, paidAmount: true },
  });

  if (!order) return { error: "Orden no encontrada" };

  const newPaid = order.paidAmount + amount;
  const paymentStatus =
    newPaid >= order.totalAmount ? "PAID" : newPaid > 0 ? "PARTIAL" : "UNPAID";

  await prisma.workOrder.update({
    where: { id: workOrderId },
    data: { paidAmount: newPaid, paymentStatus },
  });

  revalidatePath(`/admin/ordenes/${workOrderId}`);
  revalidatePath("/admin");
  return {};
}

// ─────────────────────────────────────────────
// OBTENER DETALLE DE LA ORDEN
// ─────────────────────────────────────────────
export async function getWorkOrderDetail(id: string) {
  return prisma.workOrder.findUnique({
    where: { id },
    include: {
      vehicle: { include: { customer: true } },
      items: { orderBy: { createdAt: "asc" } },
      photos: { orderBy: { createdAt: "asc" } },
      payments: { orderBy: { createdAt: "asc" } },
    },
  });
}

// Para portal público por token
export async function getWorkOrderByPublicToken(token: string) {
  return prisma.workOrder.findUnique({
    where: { publicToken: token },
    include: {
      vehicle: {
        select: {
          plate: true,
          brand: true,
          model: true,
          year: true,
          color: true,
          customer: { select: { name: true, phone: true } },
        },
      },
      items: {
        select: {
          id: true,
          type: true,
          description: true,
          quantity: true,
          unit: true,
          unitPrice: true,
          totalPrice: true,
          brand: true,
        },
        orderBy: { createdAt: "asc" },
      },
      photos: {
        select: {
          id: true,
          url: true,
          stage: true,
          caption: true,
          createdAt: true,
        },
        orderBy: { createdAt: "asc" },
      },
      payments: {
        select: {
          id: true,
          amount: true,
          method: true,
          createdAt: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

// ─────────────────────────────────────────────
// LISTAR ÓRDENES
// ─────────────────────────────────────────────
export async function getWorkOrders(
  status?: WorkOrderStatus | "ALL",
  page = 1,
  limit = 20
) {
  const where =
    status && status !== "ALL"
      ? { status }
      : { status: { notIn: ["DELIVERED", "CANCELLED"] as WorkOrderStatus[] } };

  const [orders, total] = await Promise.all([
    prisma.workOrder.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        vehicle: {
          select: {
            plate: true,
            brand: true,
            model: true,
            customer: { select: { name: true, phone: true } },
          },
        },
        _count: { select: { items: true, photos: true } },
      },
    }),
    prisma.workOrder.count({ where }),
  ]);

  return { orders, total };
}
