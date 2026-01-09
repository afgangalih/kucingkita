"use client";

import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useEffect, useState, useRef } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ProductCategoryEnum } from "@/lib/validations/product";
import { Button } from "@/components/ui/button";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const initialQuery = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(initialQuery);
  const skipFirstRender = useRef(true);

  useEffect(() => {
    if (skipFirstRender.current) {
      skipFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if (search === (searchParams.get("q") ?? "")) return;

      if (search) {
        params.set("q", search);
      } else {
        params.delete("q");
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [search, pathname, router, searchParams]);

  function handleCategoryChange(val: string) {
    const params = new URLSearchParams(searchParams);
    const category = val === "ALL" ? "" : val;

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function clearFilters() {
    setSearch("");
    startTransition(() => {
      router.push(pathname);
    });
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Cari nama produk atau merek..."
          className="h-12 rounded-2xl border-slate-100 bg-white pl-11 shadow-sm transition-all focus:border-primary focus:ring-primary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isPending && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Select 
          value={searchParams.get("category") ?? "ALL"} 
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="h-12 w-[180px] rounded-2xl border-slate-100 bg-white font-bold text-slate-600 shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5" />
              <SelectValue placeholder="Kategori" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-slate-100">
            <SelectItem value="ALL" className="font-bold text-[10px] uppercase tracking-widest">Semua Kategori</SelectItem>
            {ProductCategoryEnum.options.map((opt) => (
              <SelectItem key={opt} value={opt} className="font-bold text-[10px] uppercase tracking-widest">
                {opt.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(search || searchParams.get("category")) && (
          <Button 
            variant="ghost" 
            onClick={clearFilters}
            className="h-12 rounded-2xl px-4 font-black text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-50"
          >
            <X className="mr-2 h-4 w-4" /> Reset
          </Button>
        )}
      </div>
    </div>
  );
}