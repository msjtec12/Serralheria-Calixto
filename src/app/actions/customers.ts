"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCustomers() {
  return prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createCustomer(data: any) {
  const customer = await prisma.customer.create({ data });
  revalidatePath("/customers");
  return customer;
}

export async function updateCustomer(id: string, data: any) {
  const customer = await prisma.customer.update({
    where: { id },
    data,
  });
  revalidatePath("/customers");
  return customer;
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({ where: { id } });
  revalidatePath("/customers");
}
