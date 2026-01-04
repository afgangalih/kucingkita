"use server";

import { prisma } from "@/lib/prisma";
import { breedSchema, BreedFormValues } from "@/lib/validations/breed";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBreed(values: BreedFormValues) {
  const validatedFields = breedSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Data tidak valid." };

  try {
    await prisma.breed.create({
      data: {
        ...validatedFields.data,
        officialName:
          validatedFields.data.officialName || validatedFields.data.name,
        origin: validatedFields.data.origin || "-",
        image: "/images/breeds/default.png",
        otherName: "",
        characteristics: [],
      },
    });

    revalidatePath("/admin/ras");
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Terjadi kesalahan sistem." };
  }

  redirect("/admin/ras");
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

export async function updateBreed(id: string, values: BreedFormValues) {
  const validatedFields = breedSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Data tidak valid. Silakan periksa kembali input Anda.",
    };
  }

  try {
    const updated = await prisma.breed.update({
      where: { id },
      data: {
        ...validatedFields.data,
        officialName:
          validatedFields.data.officialName || validatedFields.data.name,
      },
    });

    revalidatePath("/admin/ras");
    revalidatePath(`/admin/ras/${updated.slug}`);

    return { success: true, name: updated.name };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false, error: "Gagal menyambung ke database." };
  }
}
