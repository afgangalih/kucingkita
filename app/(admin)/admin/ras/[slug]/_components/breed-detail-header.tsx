"use client";

import { Cat, MapPin, Info, Scissors, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Breed, BreedRatings } from "@prisma/client"; 
import Image from "next/image";

interface BreedDetailHeaderProps {
  breed: Breed & { ratings: BreedRatings | null };
}

export function BreedDetailHeader({ breed }: BreedDetailHeaderProps) {
  return (
    <div className="rounded-[2.5rem] border-2 border-slate-50 bg-white p-8 shadow-sm h-full">
      <div className="flex items-center gap-6 border-b border-slate-50 pb-8">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[2rem] bg-slate-900 text-white shadow-xl shadow-slate-200">
          {breed.image ? (
            <Image 
              src={breed.image} 
              alt={breed.name} 
              fill 
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Cat size={40} />
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
              {breed.name}
            </h2>
            <Badge className="bg-primary text-white border-none px-3 py-1 rounded-lg text-[9px] font-black uppercase">
              {breed.coatType}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {breed.ratings && (
              <>
                <div className="flex items-center gap-2 rounded-xl bg-blue-50/50 px-3 py-1.5 text-blue-700">
                  <Scissors size={12} />
                  <span className="text-[9px] font-black uppercase tracking-wider">Grooming: {breed.ratings.grooming}/5</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-amber-50/50 px-3 py-1.5 text-amber-700">
                  <Wind size={12} />
                  <span className="text-[9px] font-black uppercase tracking-wider">Rontok: {breed.ratings.shedding}/5</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
            <Info size={14} />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Tentang Ras</h3>
        </div>
        <p className="text-slate-600 leading-relaxed font-medium text-base italic">
          &ldquo;{breed.description}&rdquo;
        </p>
      </div>
    </div>
  );
}