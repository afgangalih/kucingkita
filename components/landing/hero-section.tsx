"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Cat, Heart, Stethoscope } from "lucide-react"

export function HeroSection() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-28 lg:py-36">
      <div className="flex flex-col items-center space-y-12 text-center">
        
        
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Selamat Datang di <span className="text-primary">KucingKita.id</span>
          </h1>
          <p className="mx-auto max-w-[750px] text-lg text-muted-foreground md:text-xl leading-relaxed">
            Panduan lengkap perawatan kucing, rekomendasi makanan lokal, 
            direktori vet terdekat, dan komunitas pecinta kucing Indonesia.
          </p>
        </div>

        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          <Button 
            size="lg" 
            className="group relative h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-bold shadow-[0_10px_20px_-10px_rgba(var(--primary),0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_25px_-5px_rgba(var(--primary),0.4)] active:scale-95"
          >
            <span className="relative z-10 flex items-center">
              Jelajahi Ras Kucing 
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="h-14 px-10 rounded-2xl border-2 font-bold transition-all duration-300 hover:bg-secondary hover:border-primary/30 active:scale-95"
          >
            Cari Vet Terdekat
          </Button>
        </div>

        
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mt-12 w-full max-w-6xl mx-auto">
          <Card className="group p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
            <div className="mb-5 p-4 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
              <Cat className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3">Ras Kucing Populer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Informasi lengkap tentang berbagai ras kucing yang populer di Indonesia mulai dari karakter hingga perawatan.
            </p>
          </Card>

          <Card className="group p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
            <div className="mb-5 p-4 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3">Tips Perawatan</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Panduan harian mulai dari nutrisi, vaksinasi, hingga tips kesehatan agar anabul tetap aktif dan bahagia.
            </p>
          </Card>

          <Card className="group p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 bg-card/50 backdrop-blur-sm">
            <div className="mb-5 p-4 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-xl mb-3">Komunitas</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ruang berbagi cerita, konsultasi sesama pemilik, dan ajang pamer kegemasan kucing kesayangan Anda.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}