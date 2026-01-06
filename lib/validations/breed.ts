import * as z from "zod";

export const breedSchema = z.object({
  name: z.string().min(1, "Nama ras wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  officialName: z.string().min(1, "Nama resmi wajib diisi"),
  origin: z.string().min(1, "Asal ras wajib diisi"),
  coatType: z.enum(["pendek", "sedang", "panjang"]),
  
 image: z.string().min(1, "Foto ras wajib diunggah"),
 
  grooming: z.number().min(1).max(5),
  shedding: z.number().min(1).max(5),
  energy: z.number().min(1).max(5),
  vocal: z.number().min(1).max(5),
  family: z.number().min(1).max(5),
  otherPets: z.number().min(1).max(5),
  aloneTime: z.number().min(1).max(5),
  coatLength: z.number().min(1).max(5),
  environment: z.number().min(1).max(5),
});

export type BreedFormValues = z.infer<typeof breedSchema>;