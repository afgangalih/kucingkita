import * as z from "zod";

export const breedSchema = z.object({
  name: z.string().min(1, "Nama ras wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  officialName: z.string().min(1, "Nama resmi wajib diisi"),
  origin: z.string().min(1, "Asal ras wajib diisi"),
  coatType: z.enum(["pendek", "sedang", "panjang"]),
});

export type BreedFormValues = z.infer<typeof breedSchema>;