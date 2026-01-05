"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import { RatingInput } from "./rating-input";

interface BreedRatingsFormProps<T extends FieldValues> {
  control: Control<T>;
}

export function BreedRatingsForm<T extends FieldValues>({ control }: BreedRatingsFormProps<T>) {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <div className="space-y-6">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 border-l-4 border-primary pl-3">
          Sosial & Keluarga
        </h3>
        <RatingInput control={control} name={"family" as Path<T>} label="Ramah Keluarga" />
        <RatingInput control={control} name={"otherPets" as Path<T>} label="Ramah Hewan Lain" />
        <RatingInput control={control} name={"aloneTime" as Path<T>} label="Toleransi Sendiri" />
      </div>

      <div className="space-y-6">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 border-l-4 border-blue-500 pl-3">
          Kebutuhan Fisik
        </h3>
        <RatingInput control={control} name={"grooming" as Path<T>} label="Perawatan Bulu" />
        <RatingInput control={control} name={"shedding" as Path<T>} label="Tingkat Rontok" />
        <RatingInput control={control} name={"coatLength" as Path<T>} label="Panjang Bulu" />
      </div>

      <div className="space-y-6">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 border-l-4 border-amber-500 pl-3">
          Kecerdasan & Energi
        </h3>
        <RatingInput control={control} name={"energy" as Path<T>} label="Tingkat Energi" />
        <RatingInput control={control} name={"vocal" as Path<T>} label="Tingkat Suara" />
        <RatingInput control={control} name={"environment" as Path<T>} label="Adaptasi Lingkungan" />
      </div>
    </div>
  );
}