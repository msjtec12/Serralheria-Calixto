"use server";

import { prisma } from "@/lib/prisma";

export async function getGeneralReports() {
  const sales = await prisma.sale.findMany({
    where: { status: "COMPLETED" },
    include: { 
      items: { include: { product: true } },
      payments: true,
      customer: true,
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const cashRegisters = await prisma.cashRegister.findMany({
    include: { user: true },
    orderBy: { openedAt: "desc" }
  });

  const products = await prisma.product.findMany({
    include: { category: true }
  });

  return {
    sales,
    cashRegisters,
    products
  };
}
