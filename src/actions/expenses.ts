"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { z } from "zod";
import type { ExpenseCategory } from "@prisma/client";

const expenseSchema = z.object({
  description: z.string().min(2, "Descripción requerida"),
  category: z.enum(["PARTS", "TOOLS", "RENT", "UTILITIES", "SALARY", "TRANSPORT", "MARKETING", "OTHER"]),
  amount: z.coerce.number().min(1, "Monto inválido"),
  vendor: z.string().optional(),
  notes: z.string().optional(),
  date: z.string().optional(),
  workOrderId: z.string().optional(),
});

export type ExpenseFormState = {
  error?: string;
  success?: boolean;
};

export async function createExpenseAction(
  _prev: ExpenseFormState,
  formData: FormData
): Promise<ExpenseFormState> {
  const session = await auth();
  if (!session) return { error: "No autorizado" };

  const parsed = expenseSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Datos del gasto inválidos" };

  const { description, category, amount, vendor, notes, date, workOrderId } = parsed.data;

  await prisma.expense.create({
    data: {
      description,
      category,
      amount,
      vendor: vendor || null,
      notes: notes || null,
      date: date ? new Date(date) : new Date(),
      workOrderId: workOrderId || null,
    },
  });

  revalidatePath("/admin/finanzas");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteExpenseAction(id: string) {
  const session = await auth();
  if (!session) throw new Error("No autorizado");

  await prisma.expense.delete({ where: { id } });
  revalidatePath("/admin/finanzas");
  revalidatePath("/admin");
}

export async function getExpenses(limit = 30) {
  return prisma.expense.findMany({
    orderBy: { date: "desc" },
    take: limit,
    include: {
      workOrder: {
        select: { orderNumber: true, vehicle: { select: { plate: true } } },
      },
    },
  });
}

export async function getFinancialSummary() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Pagos recibidos este mes
  const payments = await prisma.payment.findMany({
    where: { createdAt: { gte: startOfMonth } },
    select: { amount: true },
  });
  const totalIncome = payments.reduce((acc, p) => acc + p.amount, 0);

  // Gastos registrados este mes
  const expenses = await prisma.expense.findMany({
    where: { date: { gte: startOfMonth } },
    select: { amount: true, category: true },
  });
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  // Gastos por categoría
  const expensesByCategory: Record<string, number> = {};
  for (const exp of expenses) {
    expensesByCategory[exp.category] = (expensesByCategory[exp.category] || 0) + exp.amount;
  }

  // Órdenes activas
  const activeOrders = await prisma.workOrder.count({
    where: { status: { notIn: ["DELIVERED", "CANCELLED"] } },
  });

  // Autos listos para entrega
  const readyOrders = await prisma.workOrder.count({
    where: { status: "READY" },
  });

  // Utilidad Neta
  const netProfit = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    netProfit,
    activeOrders,
    readyOrders,
    expensesByCategory,
  };
}
