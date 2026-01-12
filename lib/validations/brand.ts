import { z } from "zod"

export const brandSchema = z.object({
  name: z.string().min(1, "Nama brand wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  logo: z.string().min(1, "Logo wajib diunggah"),
  description: z.string().optional().default(""),
  category: z.string().optional().default("Umum"),
  socials: z
    .array(
      z.object({
        platform: z.string().min(1, "Platform wajib diisi"),
        url: z.string().url("URL harus valid"),
      })
    )
    .optional()
    .default([]),
})

export type BrandFormInput = z.input<typeof brandSchema>
export type BrandFormValues = z.output<typeof brandSchema>