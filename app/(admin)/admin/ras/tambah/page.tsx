"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { breedSchema, BreedFormValues } from "@/lib/validations/breed";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { BasicInfoForm } from "../_components/basic-info-form";
import { createBreed } from "../_actions/breed-actions";

export default function AddBreedPage() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<BreedFormValues>({
    resolver: zodResolver(breedSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      coatType: "pendek",
      officialName: "",
      origin: "",
    },
  });

  async function onSubmit(data: BreedFormValues) {
    setIsPending(true);
    const result = await createBreed(data);
    setIsPending(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Ras kucing berhasil ditambahkan!");
      form.reset();
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">
            Tambah <span className="text-primary">Ras Baru</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Pastikan data akurat dan memiliki referensi valid
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <BasicInfoForm control={form.control} />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-14 rounded-2xl border-2 px-8 font-bold"
              disabled={isPending}
              onClick={() => window.history.back()}
            >
              BATAL
            </Button>
            <Button
              type="submit"
              className="h-14 rounded-2xl bg-slate-900 px-10 font-bold text-white transition-all hover:bg-primary"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Save className="mr-2 h-5 w-5" />
              )}
              SIMPAN DATA
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
