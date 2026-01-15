"use client";

import { Brand } from "@prisma/client";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FoodSidebar } from "./food-sidebar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FoodMobileFilterProps {
  brands: Brand[];
}

export function FoodMobileFilter({ brands }: FoodMobileFilterProps) {
  return (
    <div className="lg:hidden mb-8">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-100 flex items-center justify-between px-6 font-black uppercase text-[10px] tracking-widest text-slate-900 shadow-sm active:scale-95 transition-all">
            <span>Filter & Kategori</span>
            <SlidersHorizontal className="h-4 w-4 text-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-75 p-8 border-none rounded-r-[3rem]">
          <SheetHeader className="mb-10 text-left">
            <SheetTitle className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">
              FILTERS
            </SheetTitle>
          </SheetHeader>
          <FoodSidebar brands={brands} />
        </SheetContent>
      </Sheet>
    </div>
  );
}