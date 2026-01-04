"use client";

import { Cat, MapPin, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breed } from "@prisma/client"; 

interface BreedDetailHeaderProps {
  breed: Breed;
}

export function BreedDetailHeader({ breed }: BreedDetailHeaderProps) {
  return (
    <div className="rounded-[3rem] border-2 border-slate-50 bg-white p-10 shadow-sm">
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-[2.5rem] bg-slate-100 text-slate-400">
          <Cat size={64} />
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                {breed.name}
              </h2>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 rounded-full text-[10px] font-black uppercase">
                {breed.coatType}
              </Badge>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">
              {breed.officialName || breed.name}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2">
              <MapPin size={14} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                {breed.origin || "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-4 border-t border-slate-50 pt-10">
        <div className="flex items-center gap-2">
          <Info size={16} className="text-primary" />
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Deskripsi</h3>
        </div>
        <p className="text-slate-600 leading-relaxed font-medium">
          {breed.description}
        </p>
      </div>
    </div>
  );
}