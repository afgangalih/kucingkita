"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FeatureBreed() {
  return (
    <section className="w-full py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 leading-[1.1]">
                Pelajari Tentang <br />
                <span className="text-primary italic">Ras Kucing</span>
              </h2>
              
              <p className="text-base md:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
                Pelajari wawasan terbaik tentang ras hewan disini. Temukan karakteristik unik, kepribadian, hingga kebutuhan khusus anabul favorit Anda.
              </p>
              
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 rounded-2xl border-2 border-slate-200 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all group font-bold gap-3 shadow-sm"
                >
                  Pelajari
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>

            
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center animate-in fade-in slide-in-from-right duration-700">
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              
              <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-500 ease-out">
                <Image
                  src="/images/hero-cats.png"
                  alt="Ras Kucing"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}