"use client";

import { Calendar, Hash, Clock } from "lucide-react";
import { Breed } from "@prisma/client";

interface BreedInfoCardsProps {
  breed: Breed;
}

export function BreedInfoCards({ breed }: BreedInfoCardsProps) {
  const meta = [
    { label: "Slug URL", value: breed.slug, icon: Hash },
    { label: "Negara Asal", value: breed.origin || "-", icon: Calendar },
    { label: "Tanggal Registrasi", value: new Date(breed.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }), icon: Clock 
    },
  ];

  return (
    <div className="rounded-[2rem] border-2 border-slate-50 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-8">
        {meta.map((item, i) => (
          <div key={i} className="flex items-center gap-4 flex-1 min-w-[200px]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
              <item.icon size={20} />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">{item.label}</p>
              <p className="text-sm font-black text-slate-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}