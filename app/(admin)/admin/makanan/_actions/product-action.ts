"use server";

import { prisma } from "@/lib/prisma";
import { productSchema, ProductFormValues } from "@/lib/validations/product";
import { revalidatePath } from "next/cache";

export async function createProduct(values: ProductFormValues) {
  const validated = productSchema.safeParse(values);
  if (!validated.success) return { error: "Data tidak valid." };

  try {
    await prisma.product.create({
      data: validated.data,
    });
    
    revalidatePath("/admin/makanan");
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Gagal membuat produk di database." };
  }
}

export async function updateProduct(id: string, values: ProductFormValues) {
  const validated = productSchema.safeParse(values);
  if (!validated.success) return { error: "Data tidak valid." };

  try {
    await prisma.product.update({
      where: { id },
      data: validated.data,
    });
    
    revalidatePath("/admin/makanan");
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { error: "Gagal memperbarui data produk." };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/makanan");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Gagal menghapus produk." };
  }
}