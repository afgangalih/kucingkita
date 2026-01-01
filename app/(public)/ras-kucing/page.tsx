"use client"

import * as React from "react"
import { Search, X, RotateCcw } from "lucide-react" // Tambah icon untuk clear
import { Input } from "@/components/ui/input"
import { BreedCard } from "@/components/ras-kucing/breed-card"
import { BreedFilters } from "@/components/ras-kucing/breed-filters"
import { CatBreed } from "@/types/breed"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const DUMMY_BREEDS: CatBreed[] = [
  { id: '1', name: 'American Bobtail', coatType: 'pendek', characteristics: ['Aktif', 'Cerdas'], image: '/images/breeds/bobtail.png', description: '' },
  { id: '2', name: 'Bengal', coatType: 'pendek', characteristics: ['Lincah', 'Aktif'], image: '/images/breeds/bengal.png', description: '' },
  { id: '3', name: 'Maine Coon', coatType: 'sedang', characteristics: ['Tenang', 'Setia'], image: '/images/breeds/mainecoon.png', description: '' },
  { id: '4', name: 'Persian', coatType: 'panjang', characteristics: ['Tenang'], image: '/images/breeds/persian.png', description: '' },
]

// Tambahkan opsi 'all' untuk filter awal
const COAT_TYPES = [
  { id: 'all', label: 'Semua Ras' },
  { id: 'pendek', label: 'Rambut Pendek' },
  { id: 'sedang', label: 'Bulu Sedang' },
  { id: 'panjang', label: 'Bulu Panjang' },
]

export default function RasKucingPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCoat, setSelectedCoat] = React.useState<string>("all") // Default ke 'all'
  const [selectedTraits, setSelectedTraits] = React.useState<string[]>([])

  // Fungsi Reset Filter
  const resetFilters = () => {
    setSearchTerm("")
    setSelectedCoat("all")
    setSelectedTraits([])
  }

  const filteredBreeds = React.useMemo(() => {
    return DUMMY_BREEDS.filter((breed) => {
      const matchSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCoat = selectedCoat === "all" || breed.coatType === selectedCoat
      const matchTraits = selectedTraits.length === 0 || 
                         selectedTraits.every(t => breed.characteristics.includes(t))
      
      return matchSearch && matchCoat && matchTraits
    })
  }, [searchTerm, selectedCoat, selectedTraits])

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev => 
      prev.includes(trait) ? prev.filter(t => t !== trait) : [...prev, trait]
    )
  }

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* HEADER SECTION - Refined Search Layout */}
      <div className="bg-slate-50/50 border-b border-slate-100 py-24 relative overflow-hidden">
        {/* Dekorasi BG Halus */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-primary rounded-full" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Database Ras</h4>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 uppercase leading-[0.85]">
              Cari <span className="text-primary italic">Anabul</span> <br /> Impianmu
            </h1>
            
            {/* SEARCH BOX MODERN */}
            <div className="flex flex-col md:flex-row gap-4 mt-12 group">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ketik nama ras kucing..." 
                  className="h-16 pl-16 pr-6 rounded-[2rem] border-2 border-slate-200 focus:border-primary bg-white shadow-sm transition-all text-lg font-bold placeholder:text-slate-300 placeholder:italic"
                />
                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm("")}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="h-4 w-4 text-slate-400" />
                    </button>
                )}
              </div>
              <Button className="h-16 px-10 rounded-[2rem] bg-slate-900 hover:bg-primary text-white font-black uppercase italic tracking-widest transition-all shadow-xl shadow-slate-200">
                Cari Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* SIDEBAR */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="sticky top-28 space-y-6">
              <BreedFilters selectedTraits={selectedTraits} onTraitChange={toggleTrait} />
              
              {/* CLEAR FILTER BUTTON (MODERN) */}
              {(selectedTraits.length > 0 || selectedCoat !== "all" || searchTerm !== "") && (
                <Button 
                    onClick={resetFilters}
                    variant="ghost" 
                    className="w-full h-14 rounded-2xl text-slate-400 hover:text-primary hover:bg-primary/5 font-bold transition-all gap-2 border border-dashed border-slate-200 hover:border-primary/50"
                >
                    <RotateCcw className="h-4 w-4" />
                    Reset Semua Filter
                </Button>
              )}
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 space-y-12">
            {/* TABS SWITCHER - Clean Style */}
            <div className="flex flex-wrap items-center gap-10 border-b border-slate-100">
              {COAT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedCoat(type.id)}
                  className={cn(
                    "pb-6 text-sm font-black uppercase tracking-[0.2em] transition-all relative",
                    selectedCoat === type.id ? "text-primary" : "text-slate-300 hover:text-slate-500"
                  )}
                >
                  {type.label}
                  {selectedCoat === type.id && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-full animate-in fade-in slide-in-from-left-2 duration-300" />
                  )}
                </button>
              ))}
            </div>

            {/* INFO & COUNT */}
            <div className="flex items-center justify-between">
                <p className="text-slate-400 font-medium italic">
                    Menampilkan <span className="text-slate-900 font-black not-italic">{filteredBreeds.length}</span> hasil terbaik
                </p>
            </div>

            {/* GRID HASIL */}
            {filteredBreeds.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredBreeds.map((breed) => (
                  <BreedCard key={breed.id} breed={breed} />
                ))}
              </div>
            ) : (
              <div className="py-32 text-center bg-slate-50/50 rounded-[4rem] border-2 border-dashed border-slate-100">
                <div className="max-w-xs mx-auto space-y-4">
                    <p className="text-slate-400 font-bold italic text-lg">Oops! Tidak ada anabul yang cocok dengan kriteria Anda.</p>
                    <Button onClick={resetFilters} variant="link" className="text-primary font-black uppercase tracking-widest p-0 h-auto">Mulai Ulang Pencarian</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}