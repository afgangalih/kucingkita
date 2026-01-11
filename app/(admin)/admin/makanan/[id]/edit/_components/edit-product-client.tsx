"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/lib/validations/product";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateProduct } from "../../../_actions/product-action";
import { ProductForm } from "../../../_components/product-form";
import { Product, Brand } from "@prisma/client";

interface EditProductClientProps {
  product: Product;
  brands: Brand[];
}

export function EditProductClient({ product, brands }: EditProductClientProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      slug: product.slug,
      brandId: product.brandId,
      category: product.category as ProductFormValues["category"],
      image: product.image,
      description: product.description,
      benefits: product.benefits,
      nutrition: product.nutrition,
      sizes: product.sizes,
      link: product.link,
      isPublished: product.isPublished,
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setIsPending(true);
    const toastId = toast.loading("Menyimpan perubahan...");
    
    try {
      const result = await updateProduct(product.id, data);
      
      if (result.error) {
        toast.error(result.error, { id: toastId });
      } else {
        toast.success("Perubahan berhasil disimpan", { id: toastId });
        router.push("/admin/makanan");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <ProductForm control={form.control} brands={brands} />
        
        <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-10">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="h-14 rounded-2xl border-2 px-8 font-bold text-slate-500 hover:bg-slate-50 transition-all"
          >
            <X className="mr-2 h-5 w-5" /> BATAL
          </Button>
          
          <Button
            type="submit"
            disabled={isPending}
            className="h-14 min-w-[220px] rounded-2xl bg-slate-900 px-10 font-black text-white shadow-xl hover:bg-primary transition-all active:scale-95 disabled:opacity-70"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Save className="mr-2 h-5 w-5" />
            )}
            SIMPAN PERUBAHAN
          </Button>
        </div>
      </form>
    </Form>
    // trigger
  );
}