"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Brand, Product } from "@prisma/client";

interface FoodCardProps {
  food: Product & { brand: Brand };
}

export function FoodCard({ food }: FoodCardProps) {
  return (
    <Link href={`/food/${food.slug}`} className="group block">
      <div className="relative space-y-4">
        <div className="aspect-4/5 relative rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden transition-all duration-500 ease-out group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:border-primary/20">
          
          <div className="absolute inset-0 p-8 flex items-center justify-center">
            <Image
              src={food.image}
              alt={food.name}
              fill
              className="object-contain p-10 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 350px"
              priority
            />
          </div>

          <div className="absolute top-6 left-6">
            <Badge className="bg-white/90 backdrop-blur-md text-slate-900 border-none px-3 py-1 text-[8px] font-black uppercase tracking-[0.15em] shadow-sm">
              {food.category.replace("_", " ")}
            </Badge>
          </div>

          <div className="absolute top-6 right-6">
            <div className="relative h-9 w-9 rounded-xl bg-white/95 backdrop-blur-md border border-slate-100 p-1.5 shadow-sm overflow-hidden transition-transform duration-500 group-hover:rotate-6">
              <Image
                src={food.brand.logo}
                alt={food.brand.name}
                fill
                className="object-contain p-1.5"
              />
            </div>
          </div>

          <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <div className="bg-slate-900 p-4 rounded-2xl text-white shadow-xl">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="px-2 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
              <Utensils className="h-2 w-2 text-primary" strokeWidth={4} />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {food.brand.name}
            </span>
          </div>
          
          <h3 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-1">
            {food.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}