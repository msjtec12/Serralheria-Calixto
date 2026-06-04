"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProduct(data: any) {
  const product = await prisma.product.create({ data });
  revalidatePath("/products");
  return product;
}

export async function updateProduct(id: string, data: any) {
  const product = await prisma.product.update({
    where: { id },
    data,
  });
  revalidatePath("/products");
  return product;
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/products");
}
