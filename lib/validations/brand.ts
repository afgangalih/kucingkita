import * as z from "zod";

export const brandSchema = z.object({
  name: z.string().min(1, "Nama brand wajib diisi").max(100),
  slug: z.string().min(1, "Slug wajib diisi"),
  logo: z.string().min(1, "URL Logo wajib diisi"),
  category: z.string().optional().nullable(),
});

export type BrandFormValues = z.infer<typeof brandSchema>;