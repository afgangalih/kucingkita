"use server";

import { prisma } from "@/lib/prisma";
import { breedSchema, BreedFormValues } from "@/lib/validations/breed";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBreed(values: BreedFormValues) {
  const validated = breedSchema.safeParse(values);
  if (!validated.success) return { error: "Data tidak valid." };

  const { 
    name, slug, description, officialName, origin, coatType,
    ...ratings 
  } = validated.data;

  try {
    await prisma.breed.create({
      data: {
        name,
        slug,
        description,
        officialName: officialName || name,
        origin: origin || "-",
        coatType,
        image: "/images/breeds/default.png",
        otherName: "",
        characteristics: [],
        ratings: {
          create: { ...ratings } 
        },
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Terjadi kesalahan sistem saat membuat data." };
  }

  revalidatePath("/admin/ras");
  redirect("/admin/ras");
}

export async function updateBreed(id: string, values: BreedFormValues) {
  const validated = breedSchema.safeParse(values);
  if (!validated.success) return { success: false, error: "Data tidak valid." };

  const { 
    name, slug, description, officialName, origin, coatType,
    ...ratings 
  } = validated.data;

  try {
    const updated = await prisma.breed.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        officialName: officialName || name,
        origin: origin || "-",
        coatType,
        ratings: {
          upsert: {
            create: { ...ratings },
            update: { ...ratings },
          },
        },
      },
    });

    revalidatePath("/admin/ras");
    revalidatePath(`/admin/ras/${updated.slug}`);
    return { success: true, name: updated.name };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: "Gagal memperbarui database." };
  }
}

export async function deleteBreed(id: string) {
  try {
    await prisma.breed.delete({
      where: { id },
    });

    revalidatePath("/admin/ras");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Gagal menghapus data ras." };
  }
}