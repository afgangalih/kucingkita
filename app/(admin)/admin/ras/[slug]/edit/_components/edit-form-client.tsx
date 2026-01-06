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
import { BreedRatingsForm } from "../../../_components/breed-ratings-form";
import { updateBreed } from "../../../_actions/breed-actions";
import { useRouter } from "next/navigation";
import { Breed, BreedRatings } from "@prisma/client";

export function EditFormClient({
  breed,
}: {
  breed: Breed & { ratings: BreedRatings | null };
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<BreedFormValues>({
    resolver: zodResolver(breedSchema),
    defaultValues: {
      name: breed.name ?? "",
      slug: breed.slug ?? "",
      image: breed.image ?? "", 
      description: breed.description ?? "",
      officialName: breed.officialName ?? "",
      origin: breed.origin ?? "",
      coatType: breed.coatType as BreedFormValues["coatType"],
      grooming: breed.ratings?.grooming ?? 3,
      shedding: breed.ratings?.shedding ?? 3,
      energy: breed.ratings?.energy ?? 3,
      vocal: breed.ratings?.vocal ?? 3,
      family: breed.ratings?.family ?? 3,
      otherPets: breed.ratings?.otherPets ?? 3,
      aloneTime: breed.ratings?.aloneTime ?? 3,
      coatLength: breed.ratings?.coatLength ?? 3,
      environment: breed.ratings?.environment ?? 3,
    },
  });

  async function onSubmit(data: BreedFormValues) {
    setIsPending(true);
    const toastId = toast.loading(`Memperbarui ${breed.name}...`);
    try {
      const result = await updateBreed(breed.id, data);
      if (result.success) {
        toast.success("Berhasil diperbarui", { id: toastId });
        router.refresh(); // Sync data server terbaru
        router.push("/admin/ras");
      } else {
        toast.error(result.error ?? "Gagal", { id: toastId });
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

        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="ghost"
            className="h-14 rounded-2xl px-6 font-bold text-slate-400 hover:text-slate-900 transition-all"
            onClick={() => router.back()}
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> KEMBALI
          </Button>

          <Button
            type="submit"
            disabled={isPending}
            className="h-14 min-w-[200px] rounded-2xl bg-slate-900 px-10 font-black text-white shadow-xl shadow-slate-100 transition-all hover:bg-primary"
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