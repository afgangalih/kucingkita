"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Brand } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProductCategoryEnum } from "@/lib/validations/product";

interface FoodSidebarProps {
  brands: Brand[];
}

export function FoodSidebar({ brands }: FoodSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentBrand = searchParams.get("brand");
  const currentCategory = searchParams.get("category");

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
    <div className="space-y-10">
      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 border-l-4 border-primary pl-3">
          Product Category
        </h3>
        <div className="grid gap-3">
          {ProductCategoryEnum.options.map((cat) => (
            <div
              key={cat}
              onClick={() => updateFilter("category", cat)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all border-2 ${
                currentCategory === cat
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-transparent hover:bg-slate-50 text-slate-500"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {cat.replace("_", " ")}
              </span>
              {currentCategory === cat && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 border-l-4 border-primary pl-3">
          Browse Brands
        </h3>
        <ScrollArea className="h-100 pr-4">
          <div className="space-y-2">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all cursor-pointer ${
                  currentBrand === brand.slug ? "bg-slate-900 text-white" : "hover:bg-slate-50 text-slate-600"
                }`}
                onClick={() => updateFilter("brand", brand.slug)}
              >
                <Checkbox
                  id={brand.id}
                  checked={currentBrand === brand.slug}
                  className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={brand.id}
                  className="text-[10px] font-bold uppercase tracking-widest cursor-pointer flex-1"
                >
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {(currentBrand || currentCategory) && (
        <button
          onClick={() => router.push("/food")}
          className="w-full py-4 rounded-2xl bg-slate-50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-dashed border-slate-200"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
}