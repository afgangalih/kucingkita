"use client";

import * as React from "react";
import { Search, X, RotateCcw, SlidersHorizontal, ChevronUp, Cat, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BreedCard } from "@/components/ras-kucing/breed-card";
import { BreedFilters } from "@/components/ras-kucing/breed-filters";
import { CatBreed } from "@/types/breed";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";

const DUMMY_BREEDS: CatBreed[] = [
  { id: "1", name: "American Bobtail", coatType: "pendek", characteristics: ["Aktif", "Cerdas"], image: "/images/breeds/bobtail.png", description: "" },
  { id: "2", name: "Bengal", coatType: "pendek", characteristics: ["Lincah", "Aktif"], image: "/images/breeds/bengal.png", description: "" },
  { id: "3", name: "Maine Coon", coatType: "sedang", characteristics: ["Tenang", "Setia"], image: "/images/breeds/mainecoon.png", description: "" },
  { id: "4", name: "Persian", coatType: "panjang", characteristics: ["Tenang"], image: "/images/breeds/persian.png", description: "" },
];

const COAT_TYPES = [
  { id: "all", label: "Semua Ras" },
  { id: "pendek", label: "Rambut Pendek" },
  { id: "sedang", label: "Bulu Sedang" },
  { id: "panjang", label: "Bulu Panjang" },
];

export default function RasKucingPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCoat, setSelectedCoat] = React.useState<string>("all");
  const [selectedTraits, setSelectedTraits] = React.useState<string[]>([]);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCoat("all");
    setSelectedTraits([]);
  };

  const filteredBreeds = React.useMemo(() => {
    return DUMMY_BREEDS.filter((breed) => {
      const matchSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCoat = selectedCoat === "all" || breed.coatType === selectedCoat;
      const matchTraits = selectedTraits.length === 0 || selectedTraits.every((t) => breed.characteristics.includes(t));
      return matchSearch && matchCoat && matchTraits;
    });
  }, [searchTerm, selectedCoat, selectedTraits]);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-44 pb-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Katalog Kucing Eksklusif</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-slate-900 uppercase leading-[0.8] mb-10">
                KENALI <br /> <span className="text-primary italic">DUNIA</span> <br /> ANABUL
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-sm border-l-4 border-primary/20 pl-6">
                Telusuri database ras kucing terlengkap untuk menemukan teman hidup yang sempurna bagi Anda.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="w-[450px] h-[500px] rounded-[5rem] bg-slate-50 border border-slate-100 flex items-center justify-center shadow-2xl shadow-slate-200/50 overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-black text-slate-200/30 select-none tracking-tighter group-hover:scale-110 transition-transform duration-1000">
                  CAT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY FILTER & SEARCH BAR - Focus Management Modern */}
      <nav className={cn(
        "sticky top-[64px] z-30 transition-all duration-500",
        isScrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-slate-100" : "bg-white py-8"
      )}>
        <div className="container mx-auto px-4 flex items-center gap-6">
          <div className="lg:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-slate-100 bg-slate-50 hover:bg-white transition-colors">
                  <SlidersHorizontal className="h-5 w-5 text-slate-600" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="rounded-t-[3rem]">
                <div className="mx-auto w-full max-w-md pb-12">
                  <DrawerHeader className="pt-8">
                    <div className="mx-auto w-12 h-1.5 bg-slate-200 rounded-full mb-6" />
                    <DrawerTitle className="text-2xl font-black uppercase italic text-center tracking-tighter">Filter Ras</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-8 py-6 max-h-[50vh] overflow-y-auto">
                    <BreedFilters selectedTraits={selectedTraits} onTraitChange={(t) => setSelectedTraits((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t])} />
                  </div>
                  <DrawerFooter className="flex flex-row gap-4 p-8 border-t border-slate-50">
                    <Button onClick={resetFilters} variant="ghost" className="flex-1 rounded-2xl font-bold h-14">Reset</Button>
                    <DrawerClose asChild>
                      <Button className="flex-1 rounded-2xl font-black uppercase tracking-widest bg-slate-900 h-14 text-white hover:bg-primary transition-colors">Selesai</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="relative w-full lg:max-w-lg group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors z-10" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari ras kucing..."
              className="h-14 pl-12 pr-12 rounded-full border-transparent bg-slate-100/50 hover:bg-slate-100 focus-visible:bg-white focus-visible:ring-0 focus-visible:border-primary/20 focus-visible:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-all font-bold text-lg border-2"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-100 rounded-full transition-colors z-10">
                <X className="h-4 w-4 text-slate-400 hover:text-primary" />
              </button>
            )}
          </div>
          
          <div className="hidden lg:block">
             {searchTerm || selectedTraits.length > 0 || selectedCoat !== 'all' ? (
                <Button onClick={resetFilters} variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary gap-2 transition-colors">
                  <RotateCcw className="h-3 w-3" /> Reset Pencarian
                </Button>
             ) : null}
          </div>
        </div>
      </nav>

      {/* 3. CONTENT SECTION */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-20">
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-48 space-y-8">
              <BreedFilters selectedTraits={selectedTraits} onTraitChange={(t) => setSelectedTraits((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t])} />
              {(selectedTraits.length > 0 || selectedCoat !== "all" || searchTerm !== "") && (
                <Button onClick={resetFilters} variant="outline" className="w-full h-14 rounded-2xl text-slate-400 hover:text-primary transition-all gap-3 border-dashed border-2 text-[10px] font-black uppercase tracking-widest">
                  <RotateCcw className="h-3 w-3" /> Bersihkan Filter
                </Button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-start md:justify-center lg:justify-start mb-16 overflow-hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar w-full">
                {COAT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedCoat(type.id)}
                    className={cn(
                      "px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2 shrink-0 shadow-sm",
                      selectedCoat === type.id
                        ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-300 scale-105"
                        : "bg-white border-slate-50 text-slate-400 hover:border-slate-200"
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-8 px-2 lg:px-0">
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.3em]">
                Ditemukan <span className="text-slate-900 font-black italic">{filteredBreeds.length}</span> Spesies Unik
              </p>
            </div>

            {filteredBreeds.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 px-2 lg:px-0">
                {filteredBreeds.map((breed) => <BreedCard key={breed.id} breed={breed} />)}
              </div>
            ) : (
              <div className="py-40 text-center bg-slate-50/50 rounded-[5rem] border-2 border-dashed border-slate-100 mx-2 lg:mx-0">
                <p className="text-slate-400 font-bold italic mb-4 text-lg">Tidak ditemukan ras yang sesuai kriteria.</p>
                <Button onClick={resetFilters} variant="link" className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">Cari Ulang Ras Lain</Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {isScrolled && (
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-12 right-12 h-16 w-16 rounded-full shadow-2xl z-50 animate-in fade-in zoom-in duration-500 bg-slate-900 hover:bg-primary transition-all active:scale-90"
          size="icon"
        >
          <ChevronUp className="h-7 w-7 text-white" />
        </Button>
      )}
    </main>
  );
}