"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { CatBreedDetail } from "@/types/breed";

export function BreedStatsSection({ breed }: { breed: CatBreedDetail }) {
  const [activeTab, setActiveTab] = React.useState<"karakteristik" | "khusus">("karakteristik");

  return (
    <section className="container mx-auto px-4 py-16 border-t border-slate-100">
      <div className="flex justify-center gap-8 mb-16">
        {(["karakteristik", "khusus"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "text-sm font-bold capitalize pb-2 transition-all border-b-2 tracking-widest",
              activeTab === tab ? "border-primary text-slate-900" : "border-transparent text-slate-400"
            )}
          >
            {tab === "khusus" ? "Hal-hal khusus" : tab}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto min-h-[250px]">
        {activeTab === "karakteristik" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
            <RatingItem label="Panjang bulu" value={breed.ratings.coatLength} />
            <RatingItem label="Peliharaan keluarga?" value={breed.ratings.family} />
            <RatingItem label="Tingkat kerontokan" value={breed.ratings.shedding} />
            <RatingItem label="Interaksi hewan lain" value={breed.ratings.otherPets} />
            <RatingItem label="Kebutuhan perawatan" value={breed.ratings.grooming} />
            <RatingItem label="Dapat ditinggal sendiri?" value={breed.ratings.aloneTime} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div className="space-y-6">
                <h5 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] border-b pb-2">Data Fisik Jantan</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-slate-400 text-[10px]">Tinggi</p><p className="text-base font-bold text-slate-700">{breed.stats.maleHeight}</p></div>
                  <div><p className="text-slate-400 text-[10px]">Berat</p><p className="text-base font-bold text-slate-700">{breed.stats.maleWeight}</p></div>
                </div>
             </div>
             <div className="space-y-6">
                <h5 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] border-b pb-2">Tahap Kehidupan</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-slate-400 text-[10px]">Dewasa</p><p className="text-sm font-bold">{breed.stats.lifeStages.adult}</p></div>
                  <div><p className="text-slate-400 text-[10px]">Tua</p><p className="text-sm font-bold">{breed.stats.lifeStages.senior}</p></div>
                </div>
             </div>
          </div>
        )}
      </div>
    </section>
  );
}

function RatingItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-50">
      <span className="text-slate-600 text-xs font-medium">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} className={cn("h-3 w-3", s <= value ? "fill-primary text-primary" : "fill-slate-200 text-slate-200")} />
        ))}
      </div>
    </div>
  );
}