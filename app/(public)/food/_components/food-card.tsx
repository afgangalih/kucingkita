"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Brand, Product } from "@prisma/client";

interface FoodCardProps {
  food: Product & { brand: Brand };
}

export function FoodCard({ food }: FoodCardProps) {
  return (
    <Link href={`/food/${food.slug}`} className="group block w-full">
      <div className="relative flex flex-col overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-5 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] hover:border-slate-200">
        <div className="aspect-square relative w-full overflow-hidden rounded-4xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[85%] h-[85%] transition-transform duration-1000 ease-out group-hover:scale-110">
              <Image
                src={food.image}
                alt={food.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 350px"
                priority
              />
            </div>
          </div>

          <div className="absolute top-2 left-2">
            <Badge className="bg-slate-50/80 backdrop-blur-md text-slate-500 border border-slate-100 px-3 py-1 text-[8px] font-black uppercase tracking-[0.15em] shadow-none">
              {food.category.replace("_", " ")}
            </Badge>
          </div>

          <div className="absolute top-2 right-2">
            <div className="h-9 w-9 rounded-xl bg-white border border-slate-50 p-2 shadow-sm">
              <Image
                src={food.brand.logo}
                alt={food.brand.name}
                fill
                className="object-contain p-1.5"
              />
            </div>
          </div>

          <div className="absolute bottom-4 right-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <div className="bg-slate-900 p-3.5 rounded-2xl text-white shadow-lg">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="px-1 pt-6 pb-2 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            {food.brand.name}
          </p>

          <div className="min-h-14 flex flex-col justify-start">
            <h3 className="text-lg md:text-xl font-black italic tracking-tighter uppercase text-slate-900 leading-[1.1] group-hover:text-primary transition-colors duration-300 line-clamp-2 overflow-hidden">
              {food.name}
            </h3>
          </div>

          <div className="flex items-center gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[9px] font-black uppercase italic tracking-widest text-primary">
              View Info
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
