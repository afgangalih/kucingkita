"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { BrandFormValues } from "@/lib/validations/brand";
import { Prisma } from "@prisma/client";

export async function getBrands() {
  return await prisma.brand.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createBrand(data: BrandFormValues) {
  try {
    const brand = await prisma.brand.create({
      data: {
        name: data.name,
        slug: data.slug,
        logo: data.logo,
        category: data.category,
      },
    });
    revalidatePath("/admin/brand");
    return { success: true, data: brand };
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { success: false, error: "Nama atau slug brand sudah terdaftar" };
    }
    return { success: false, error: "Terjadi kesalahan sistem" };
  }
}

export async function updateBrand(id: string, data: BrandFormValues) {
  try {
    await prisma.brand.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        logo: data.logo,
        category: data.category,
      },
    });
    revalidatePath("/admin/brand");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal memperbarui brand" };
  }
}

export async function deleteBrand(id: string) {
  try {
    await prisma.brand.delete({ where: { id } });
    revalidatePath("/admin/brand");
    return { success: true };
  } catch {
    return {
      success: false,
      error:
        "Gagal menghapus brand. Pastikan brand tidak memiliki produk terhubung.",
    };
  }
}
