"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(7, "Teléfono inválido").max(15),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  cedula: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

export type CustomerFormState = {
  errors?: Partial<Record<keyof z.infer<typeof customerSchema>, string[]>>;
  error?: string;
  customerId?: string;
};

export async function createCustomerAction(
  _prev: CustomerFormState,
  formData: FormData
): Promise<CustomerFormState> {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  const raw = Object.fromEntries(formData);
  const parsed = customerSchema.safeParse(raw);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as CustomerFormState["errors"] };
  }

  const { name, phone, email, cedula, address, notes } = parsed.data;

  // Verificar si ya existe con este teléfono
  const existing = await prisma.customer.findFirst({ where: { phone } });
  if (existing) {
    return { errors: { phone: ["Ya existe un cliente con este número de teléfono"] } };
  }

  const customer = await prisma.customer.create({
    data: {
      name,
      phone,
      email: email || null,
      cedula: cedula || null,
      address: address || null,
      notes: notes || null,
    },
  });

  revalidatePath("/admin/clientes");
  return { customerId: customer.id };
}

export async function updateCustomerAction(
  id: string,
  _prev: CustomerFormState,
  formData: FormData
): Promise<CustomerFormState> {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  const raw = Object.fromEntries(formData);
  const parsed = customerSchema.safeParse(raw);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as CustomerFormState["errors"] };
  }

  await prisma.customer.update({
    where: { id },
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      cedula: parsed.data.cedula || null,
      address: parsed.data.address || null,
      notes: parsed.data.notes || null,
    },
  });

  revalidatePath(`/admin/clientes/${id}`);
  revalidatePath("/admin/clientes");
  return {};
}

export async function searchCustomers(query: string) {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toLowerCase();

  return prisma.customer.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { phone: { contains: q } },
        { email: { contains: q, mode: "insensitive" } },
        { vehicles: { some: { plate: { contains: q.toUpperCase() } } } },
      ],
    },
    include: {
      vehicles: { select: { id: true, plate: true, brand: true, model: true } },
      _count: { select: { vehicles: true } },
    },
    orderBy: { name: "asc" },
    take: 10,
  });
}

export async function getCustomerWithHistory(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      vehicles: {
        include: {
          workOrders: {
            orderBy: { createdAt: "desc" },
            take: 5,
            select: {
              id: true,
              orderNumber: true,
              status: true,
              totalAmount: true,
              paidAmount: true,
              paymentStatus: true,
              createdAt: true,
              mileageIn: true,
              symptoms: true,
            },
          },
          _count: { select: { workOrders: true } },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export async function getCustomers(page = 1, limit = 20) {
  const skip = (page - 1) * limit;

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { vehicles: true } },
        vehicles: {
          take: 3,
          select: { plate: true, brand: true, model: true },
        },
      },
    }),
    prisma.customer.count(),
  ]);

  return { customers, total, pages: Math.ceil(total / limit) };
}
