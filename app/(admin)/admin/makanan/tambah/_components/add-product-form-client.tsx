"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/lib/validations/product";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { createProduct } from "../../_actions/product-action"; // Sesuaikan path-nya
import { ProductForm } from "../../_components/product-form"; // Sesuaikan path-nya
import { Brand } from "@prisma/client";

interface Props {
  brands: Brand[];
}

export default function AddProductFormClient({ brands }: Props) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      brandId: "", // Pastikan ini brandId, bukan brand
      category: "DRY_FOOD",
      image: "",
      description: "",
      benefits: "",
      nutrition: "",
      sizes: [],
      link: "",
      isPublished: false,
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setIsPending(true);
    const toastId = toast.loading("Menyimpan produk baru...");
    try {
      const result = await createProduct(data);
      if (result?.error) {
        toast.error(result.error, { id: toastId });
      } else {
        toast.success("Produk berhasil ditambahkan", { id: toastId });
        router.push("/admin/makanan");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* Header tetap sama seperti desain Anda */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Tambah <span className="text-primary">Produk</span>
          </h1>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Katalog Makanan & Nutrisi
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="h-12 rounded-xl font-bold text-slate-400 hover:text-slate-900 transition-all"
        >
          <ChevronLeft className="mr-2 h-5 w-5" /> KEMBALI
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          {/* Kirim brands ke ProductForm agar map() tidak error */}
          <ProductForm control={form.control} brands={brands} />

          <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-10">
            <Button
              type="submit"
              disabled={isPending}
              className="h-14 min-w-[220px] rounded-2xl bg-slate-900 px-10 font-black text-white shadow-xl transition-all hover:bg-primary"
            >
              {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              <span className="ml-2">SIMPAN PRODUK</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}