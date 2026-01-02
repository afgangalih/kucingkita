"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const CHARACTERISTICS = [
  "Aktif", "Ramah", "Cerdas", "Tenang", "Setia", 
  "Lincah", "Energetik", "Mandiiri", "Penyayang", "Sosial"
];

interface BreedFiltersProps {
  selectedTraits: string[];
  onTraitChange: (trait: string) => void;
}

export function BreedFilters({ selectedTraits, onTraitChange }: BreedFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
          Pilih Karakteristik
        </h4>
        
        
        <div className="flex flex-wrap gap-2">
          {CHARACTERISTICS.map((trait) => {
            const isActive = selectedTraits.includes(trait);
            return (
              <button
                key={trait}
                onClick={() => onTraitChange(trait)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border",
                  isActive 
                    ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105" 
                    : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900"
                )}
              >
                {isActive && <span className="mr-2">✦</span>}
                {trait}
              </button>
            );
          })}
        </div>
      </div>

      
      <p className="text-[10px] text-slate-400 italic leading-relaxed">
        *Anda dapat memilih lebih dari satu karakteristik untuk hasil yang lebih spesifik.
      </p>
    </div>
  );
}