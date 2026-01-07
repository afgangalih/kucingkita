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
import { createProduct } from "../_actions/product-action";
import { ProductForm } from "../_components/product-form";

export default function AddProductPage() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      brand: "",
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
        // Navigasi dilakukan di sini agar feedback sukses muncul lebih dulu
        router.push("/admin/makanan");
      }
    } catch (error) {
      // Menangkap error jaringan atau error sistem tak terduga
      toast.error("Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-10">
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
          <ProductForm control={form.control} />

          <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-10">
            <Button
              type="submit"
              disabled={isPending}
              className="h-14 min-w-[220px] rounded-2xl bg-slate-900 px-10 font-black text-white shadow-xl shadow-slate-200 transition-all hover:bg-primary disabled:opacity-70"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Save className="mr-2 h-5 w-5" />
              )}
              SIMPAN PRODUK
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}