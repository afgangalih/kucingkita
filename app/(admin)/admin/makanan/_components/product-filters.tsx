"use client";

import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useEffect, useState, useRef, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ProductCategoryEnum } from "@/lib/validations/product";

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const skipFirstRender = useRef(true);

  const applyFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    if (skipFirstRender.current) {
      skipFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      if (search !== (searchParams.get("q") ?? "")) {
        applyFilter("q", search);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search, applyFilter, searchParams]);

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Cari produk atau merek..."
          className="h-12 rounded-xl border border-slate-200 bg-white pl-11 shadow-none transition-all focus:border-primary focus:ring-0 placeholder:text-slate-300 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isPending && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border border-primary border-t-transparent" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-12 w-12 rounded-xl border border-slate-200 bg-white p-0 shadow-none hover:bg-slate-50 transition-all focus:ring-0 group"
            >
              <SlidersHorizontal
                className={`h-5 w-5 transition-colors ${
                  searchParams.get("category") ? "text-primary" : "text-slate-400 group-hover:text-slate-900"
                }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-xl border border-slate-200 min-w-50 shadow-lg p-1" align="end">
            <DropdownMenuItem
              onClick={() => applyFilter("category", "")}
              className="font-bold text-[10px] uppercase tracking-widest py-2 italic cursor-pointer rounded-lg"
            >
              Semua Kategori
            </DropdownMenuItem>
            {ProductCategoryEnum.options.map((opt) => (
              <DropdownMenuItem
                key={opt}
                onClick={() => applyFilter("category", opt)}
                className="font-bold text-[10px] uppercase tracking-widest py-2 italic cursor-pointer rounded-lg"
              >
                {opt.replace("_", " ")}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {(search || searchParams.get("category")) && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSearch("");
              router.push(pathname);
            }}
            className="h-12 w-12 rounded-xl border border-transparent hover:border-slate-100 p-0 text-red-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}