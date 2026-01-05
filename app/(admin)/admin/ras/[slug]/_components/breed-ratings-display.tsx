"use client";

import { Star } from "lucide-react";
import { BreedRatings } from "@prisma/client";

export function BreedRatingsDisplay({ ratings }: { ratings: BreedRatings | null }) {
  const data = ratings ? [
    { label: "Ramah Keluarga", value: ratings.family },
    { label: "Ramah Hewan Lain", value: ratings.otherPets },
    { label: "Toleransi Sendiri", value: ratings.aloneTime },
    { label: "Tingkat Energi", value: ratings.energy },
    { label: "Tingkat Suara", value: ratings.vocal },
    { label: "Adaptasi Lingkungan", value: ratings.environment },
  ] : [];

  return (
    <div className="rounded-[2.5rem] border-2 border-slate-50 bg-white p-8 shadow-sm h-full">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Karakteristik Ras</h3>
        <Star size={14} className="text-primary fill-primary" />
      </div>

      <div className="grid gap-6">
        {data.map((item, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
              <span className="text-slate-400">{item.label}</span>
              <span className="text-slate-900">{item.value} / 5</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-50">
              <div 
                className="h-full bg-slate-900 rounded-full transition-all duration-700" 
                style={{ width: `${(item.value / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}