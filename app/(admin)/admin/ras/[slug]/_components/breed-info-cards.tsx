"use client";

import { Calendar, Hash, Clock } from "lucide-react";
import { Breed } from "@prisma/client";

interface BreedInfoCardsProps {
  breed: Breed;
}

export function BreedInfoCards({ breed }: BreedInfoCardsProps) {
  const meta = [
    { 
      label: "Slug", 
      value: breed.slug, 
      icon: Hash 
    },
    { 
      label: "Asal", 
      value: breed.origin || "-", 
      icon: Calendar 
    },
    { 
      label: "Dibuat pada", 
      value: new Date(breed.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }), 
      icon: Clock 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[2.5rem] border-2 border-slate-50 bg-white p-8 shadow-sm">
        <h3 className="mb-6 text-sm font-black uppercase tracking-widest text-slate-900">Metadata</h3>
        <div className="space-y-6">
          {meta.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                <item.icon size={18} />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-tighter text-slate-400">{item.label}</p>
                <p className="text-xs font-black text-slate-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8 text-center bg-slate-50/30">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">
          Statistik & Rating belum diisi
        </p>
      </div>
    </div>
  );
}