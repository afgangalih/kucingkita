import * as z from "zod";

export const ProductCategoryEnum = z.enum([
  "WET_FOOD",
  "DRY_FOOD",
  "SUPPLEMENT",
  "TREATS",
]);

export const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi").max(255),
  slug: z.string().min(1, "Slug wajib diisi").toLowerCase(),
  brand: z.string().min(1, "Merek wajib diisi").max(100),
  category: ProductCategoryEnum,
  image: z.string().min(1, "Foto produk wajib diunggah"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  benefits: z.string().min(1, "Manfaat produk wajib diisi"),
  nutrition: z.string().min(1, "Informasi nutrisi wajib diisi"),
  sizes: z.array(z.string()).min(1, "Minimal masukkan satu ukuran produk"),
  link: z.string().url("Masukkan URL yang valid"),
  isPublished: z.boolean(), // Hapus .default(false) di sini
});

export type ProductFormValues = z.infer<typeof productSchema>;