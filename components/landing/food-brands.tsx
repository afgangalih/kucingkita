"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase" 


interface Brand {
  id: string;
  name: string;
  img_url: string; 
  category: string;
}

export function FoodBrands() {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const [brands, setBrands] = React.useState<Brand[]>([])
  const [loading, setLoading] = React.useState(true)

  
  React.useEffect(() => {
    async function fetchBrands() {
      const { data, error } = await supabase
        .from("food_brands") 
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBrands(data);
      }
      setLoading(false);
    }
    fetchBrands();
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <section className="w-full py-24 bg-slate-50/50">
      <div className="container mx-auto px-4">
        
       
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Katalog Nutrisi</h4>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 italic uppercase leading-none">
              Merk <span className="text-primary not-italic">Terpercaya</span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="h-12 w-12 rounded-full border-2 hover:bg-white transition-all active:scale-90">
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="h-12 w-12 rounded-full border-none bg-slate-900 text-white hover:bg-primary transition-all shadow-xl shadow-slate-200 active:scale-90">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-8 pt-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {loading ? (
             <div className="flex h-[400px] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : (
            brands.map((brand) => (
              <div 
                key={brand.id} 
                className="min-w-[300px] md:min-w-[420px] aspect-[4/5] relative rounded-[3rem] overflow-hidden group snap-start bg-slate-200 shadow-2xl shadow-slate-200/50"
              >
                <Image 
                  src={brand.img_url}
                  alt={brand.name}
                  fill 
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  priority
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 p-10 z-20 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 animate-in slide-in-from-bottom-2 duration-500">
                    {brand.category}
                  </p>
                  <h3 className="text-white text-3xl font-black italic tracking-tighter uppercase leading-none mb-6">
                    {brand.name}
                  </h3>
                  <Button variant="link" className="text-white p-0 h-auto font-bold hover:text-primary transition-colors gap-3 group/btn">
                    Lihat Produk 
                    <div className="bg-white/10 p-2 rounded-full group-hover/btn:bg-primary transition-colors">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </Button>
                </div>
              </div>
            ))
          )}

          
          <div className="min-w-[300px] md:min-w-[420px] aspect-[4/5] rounded-[3rem] border-4 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-black uppercase tracking-widest text-xs">
            Segera Hadir
          </div>
        </div>
      </div>
    </section>
  )
}