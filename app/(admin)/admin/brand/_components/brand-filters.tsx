"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";

export function BrandFilters() {
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
          placeholder="Cari nama brand..."
          className="h-12 rounded-xl border border-slate-200 bg-white pl-11 shadow-none transition-all focus:border-primary focus:ring-0 placeholder:text-slate-300 w-full font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {isPending && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border border-primary border-t-transparent" />
          </div>
        )}
      </div>

      {search && (
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
  );
}