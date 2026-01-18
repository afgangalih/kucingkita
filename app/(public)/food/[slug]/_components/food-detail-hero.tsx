"use client";

import Image from "next/image";
import { Product } from "@prisma/client";

interface FoodDetailHeroProps {
  food: Product;
}

export function FoodDetailHero({ food }: FoodDetailHeroProps) {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden">
      <div className="relative h-[85%] w-[85%]">
        <Image
          src={food.image}
          alt={food.name}
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
