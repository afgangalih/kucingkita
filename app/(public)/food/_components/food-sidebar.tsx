"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Brand } from "@prisma/client";
import { ProductCategoryEnum } from "@/lib/validations/product";

interface FoodSidebarProps {
  brands: Brand[];
}

export function FoodSidebar({ brands }: FoodSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get("brand") || "";
  const currentCategory = searchParams.get("category") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    
    router.push(`/food?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
          Category
        </h3>
        <div className="space-y-5">
          {ProductCategoryEnum.options.map((cat) => (
            <div key={cat} className="flex items-center space-x-3 group">
              <Checkbox
                id={cat}
                checked={currentCategory === cat}
                onCheckedChange={() => updateFilter("category", cat)}
                className="h-5 w-5 rounded-md border-2 border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all"
              />
              <Label
                htmlFor={cat}
                className="text-[11px] font-bold uppercase tracking-tight text-slate-500 group-hover:text-slate-900 transition-colors cursor-pointer"
              >
                {cat.replace("_", " ")}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-slate-100" />

      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
          Brands
        </h3>
        <ScrollArea className="h-100 -mr-4 pr-4">
          <div className="space-y-5">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-3 group">
                <Checkbox
                  id={brand.id}
                  checked={currentBrand === brand.slug}
                  onCheckedChange={() => updateFilter("brand", brand.slug)}
                  className="h-5 w-5 rounded-md border-2 border-slate-200 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all"
                />
                <Label
                  htmlFor={brand.id}
                  className="text-[11px] font-bold uppercase tracking-tight text-slate-500 group-hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}