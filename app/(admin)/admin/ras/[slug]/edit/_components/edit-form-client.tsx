"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { breedSchema, BreedFormValues } from "@/lib/validations/breed";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save, ChevronLeft } from "lucide-react";
import { BasicInfoForm } from "../../../_components/basic-info-form";
import { updateBreed } from "../../../_actions/breed-actions";
import { useRouter } from "next/navigation";
import { Breed } from "@prisma/client";

export function EditFormClient({ breed }: { breed: Breed }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<BreedFormValues>({
    resolver: zodResolver(breedSchema),
    defaultValues: {
      name: breed.name,
      slug: breed.slug,
      description: breed.description,
      coatType: breed.coatType as BreedFormValues["coatType"],
      officialName: breed.officialName || "",
      origin: breed.origin || "",
    },
  });

  async function onSubmit(data: BreedFormValues) {
    setIsPending(true);
    
    // 1. Munculkan toast loading instan (UX Standar Industri)
    const toastId = toast.loading(`Sedang memperbarui data ${breed.name}...`);

    try {
      const result = await updateBreed(breed.id, data);
      
      if (result.success) {
        // 2. Update toast loading menjadi sukses
        toast.success(`Berhasil! Data ${result.name} telah diperbarui`, {
          id: toastId,
        });
        
        router.push("/admin/ras");
        router.refresh();
      } else {
        // 3. Update toast loading menjadi error
        toast.error(result.error, { id: toastId });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem yang tidak terduga", { id: toastId });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
          <BasicInfoForm control={form.control} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            className="h-14 rounded-2xl px-6 font-bold text-slate-400 hover:text-slate-900 transition-all"
            onClick={() => router.back()}
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            KEMBALI
          </Button>

          <Button
            type="submit"
            className="h-14 min-w-[200px] rounded-2xl bg-slate-900 px-10 font-black uppercase tracking-widest text-[11px] text-white transition-all hover:bg-primary hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
            disabled={isPending}
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
  );
}