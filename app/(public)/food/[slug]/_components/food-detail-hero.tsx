"use client";

import Image from "next/image";
import { Brand, Product } from "@prisma/client";

interface FoodDetailHeroProps {
  food: Product & { brand: Brand };
}

export function FoodDetailHero({ food }: FoodDetailHeroProps) {
  return (
    <div className="relative w-full aspect-square flex items-center justify-center bg-white group">
      <div className="absolute top-0 right-0 z-10">
        <div className="relative h-14 w-14 rounded-2xl border border-slate-50 bg-white/50 backdrop-blur-sm p-3 shadow-sm transition-all duration-500 group-hover:shadow-md">
          <Image
            src={food.brand.logo}
            alt={food.brand.name}
            fill
            className="object-contain p-2"
          />
        </div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative w-[85%] h-[85%] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105">
          <Image
            src={food.image}
            alt={food.name}
            fill
            className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.07)]"
            priority
          />
        </div>
      </div>
    </div>
  );
}
