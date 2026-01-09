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

const COAT_TYPES = [
  { label: "Pendek", value: "pendek" },
  { label: "Sedang", value: "sedang" },
  { label: "Panjang", value: "panjang" },
];

export function BreedFilters() {
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
    <div className="flex items-center gap-4 w-full">
      <div className="relative flex-1 group">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Cari nama ras..."
          className="h-14 rounded-2xl border-2 border-slate-100 bg-white pl-12 font-bold shadow-sm transition-all focus:border-primary focus:ring-0 placeholder:text-slate-300 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isPending && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-14 w-14 rounded-2xl border-2 border-slate-100 bg-white p-0 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-all focus:ring-0 group"
            >
              <SlidersHorizontal
                className={`h-6 w-6 transition-colors ${
                  searchParams.get("coat") ? "text-primary" : "text-slate-400 group-hover:text-slate-900"
                }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-2xl border-2 border-slate-100 min-w-[200px] shadow-xl p-2" align="end">
            <DropdownMenuItem
              onClick={() => applyFilter("coat", "")}
              className="font-black text-[10px] uppercase tracking-widest py-3 italic cursor-pointer rounded-xl"
            >
              Semua Jenis Bulu
            </DropdownMenuItem>
            {COAT_TYPES.map((type) => (
              <DropdownMenuItem
                key={type.value}
                onClick={() => applyFilter("coat", type.value)}
                className="font-black text-[10px] uppercase tracking-widest py-3 italic cursor-pointer rounded-xl"
              >
                Bulu {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {(search || searchParams.get("coat")) && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSearch("");
              router.push(pathname);
            }}
            className="h-14 w-14 rounded-2xl border-2 border-red-50 p-0 text-red-500 hover:bg-red-50 transition-all shadow-sm"
          >
            <X className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}