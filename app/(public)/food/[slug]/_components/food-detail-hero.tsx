"use client";

import Image from "next/image";
import { Brand, Product } from "@prisma/client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface FoodDetailHeroProps {
  food: Product & { brand: Brand };
}

export function FoodDetailHero({ food }: FoodDetailHeroProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[3rem] bg-slate-50 border border-slate-100">
      <div className="absolute top-8 left-8 z-10 flex flex-col gap-3">
        <Badge className="w-fit bg-primary text-white border-none px-4 py-2 text-[10px] font-black uppercase tracking-widest shadow-xl">
          {food.category.replace("_", " ")}
        </Badge>
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-100 shadow-sm w-fit">
          <div className="relative h-5 w-5">
            <Image
              src={food.brand.logo}
              alt={food.brand.name}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
            {food.brand.name}
          </span>
        </div>
      </div>

      <div className="p-12 md:p-24 flex items-center justify-center">
        <div className="w-full max-w-md transition-transform duration-1000 hover:scale-105">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={food.image}
              alt={food.name}
              fill
              className="object-contain"
              priority
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}