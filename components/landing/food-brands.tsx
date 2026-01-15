"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "@prisma/client";

interface FoodBrandsProps {
  initialBrands: Brand[];
}

export function FoodBrands({ initialBrands }: FoodBrandsProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [brands] = React.useState<Brand[]>(initialBrands);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Partner Nutrisi</h4>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 italic uppercase leading-none">
              Merk <span className="text-primary not-italic">Terpercaya</span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("left")} 
              className="h-14 w-14 rounded-2xl border-2 border-slate-100 hover:border-primary hover:text-primary transition-all active:scale-95"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("right")} 
              className="h-14 w-14 rounded-2xl border-none bg-slate-900 text-white hover:bg-primary transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {brands.map((brand) => (
            <Link 
              key={brand.id} 
              href={`/food?brand=${brand.slug}`}
              className="group snap-start"
            >
              <div className="min-w-65 md:min-w-[320px] space-y-6">
                <div className="aspect-square relative rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10">
                  <Image 
                    src={brand.logo}
                    alt={brand.name}
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 260px, 320px"
                  />
                  
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-6 right-6 opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 z-10">
                    <div className="bg-primary p-3 rounded-xl shadow-lg text-white">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="px-2 space-y-2">
                  <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                    {brand.category || "Premium Food"}
                  </p>
                  <h3 className="text-slate-900 text-2xl font-black italic tracking-tighter uppercase leading-none">
                    {brand.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}

          <div className="min-w-65 md:min-w-[320px] aspect-square rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 gap-3">
             <div className="h-1 w-12 bg-slate-100 rounded-full" />
             <p className="font-black uppercase tracking-widest text-[10px]">Coming Soon</p>
          </div>
        </div>
      </div>
    </section>
  );
}