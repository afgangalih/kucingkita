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
    <div className="lg:hidden mb-10">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-16 rounded-3xl border-2 border-slate-100 flex items-center justify-between px-8 font-black uppercase text-[10px] tracking-[0.2em] text-slate-900 active:scale-95 transition-all"
          >
            <span>Filter Options</span>
            <SlidersHorizontal className="h-4 w-4 text-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[320px] p-10 border-none rounded-r-[3.5rem]">
          <SheetHeader className="mb-12 text-left">
            <SheetTitle className="text-3xl font-black uppercase italic tracking-tighter text-slate-900">
              FILTERS
            </SheetTitle>
          </SheetHeader>
          <FoodSidebar brands={brands} />
        </SheetContent>
      </Sheet>
    </div>
  );
}