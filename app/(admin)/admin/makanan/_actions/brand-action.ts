"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBrand(data: {
  name: string;
  slug: string;
  logo: string;
  category: string;
}) {
  try {
    const brand = await prisma.brand.create({
      data: {
        name: data.name,
        slug: data.slug,
        logo: data.logo,
        category: data.category,
        description: "",
        socials: [],
      },
    });
    revalidatePath("/admin/makanan");
    revalidatePath("/admin/brand");
    return { success: true, brand };
  } catch {
    return { error: "Gagal membuat merek baru" };
  }
}