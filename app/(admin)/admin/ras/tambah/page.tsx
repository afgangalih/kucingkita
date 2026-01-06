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
import { BreedRatingsForm } from "../_components/breed-ratings-form";
import { BreedFaqForm } from "../_components/breed-faq-form";
import { BreedEditorialForm } from "../_components/breed-editorial-form";
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
      grooming: 3,
      shedding: 3,
      energy: 3,
      vocal: 3,
      family: 3,
      otherPets: 3,
      aloneTime: 3,
      coatLength: 3,
      environment: 3,
      faqs: [],
      editorialSections: [],
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
      <div className="space-y-1">
        <h1 className="text-4xl font-black italic uppercase text-slate-900">
          Tambah <span className="text-primary">Ras Baru</span>
        </h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
            <h2 className="mb-8 text-xl font-black italic uppercase tracking-tighter text-slate-900">
              Informasi Dasar
            </h2>
            <BasicInfoForm control={form.control} />
          </div>

          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
            <h2 className="mb-8 text-xl font-black italic uppercase tracking-tighter text-slate-900">
              Karakteristik & Rating
            </h2>
            <BreedRatingsForm control={form.control} />
          </div>

          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
            <h2 className="mb-8 text-xl font-black italic uppercase tracking-tighter text-slate-900">
              Daftar Tanya Jawab
            </h2>
            <BreedFaqForm control={form.control} />
          </div>

          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
            <h2 className="mb-8 text-xl font-black italic uppercase tracking-tighter text-slate-900">
              Blok Konten Editorial
            </h2>
            <BreedEditorialForm control={form.control} />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              className="h-14 rounded-2xl border-2 px-8 font-bold"
              onClick={() => window.history.back()}
            >
              BATAL
            </Button>
            <Button
              type="submit"
              className="h-14 rounded-2xl bg-slate-900 px-10 font-bold text-white shadow-xl shadow-slate-100"
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