import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PawPrint, ArrowLeft, Construction, Sparkles } from "lucide-react";

export const metadata = {
  title: "Halaman Sedang Dipersiapkan - KucingKita.id",
  description: "Kami sedang menyiapkan konten terbaik untuk anabul kesayangan Anda.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center animate-in fade-in duration-700">
      
      <div className="relative mb-8">
        <div className="absolute -inset-4 rounded-full bg-primary/10 blur-2xl animate-pulse" />
        <div className="relative rounded-3xl bg-background border shadow-2xl p-8">
          <Construction className="h-16 w-16 text-primary" />
        </div>
        <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-bounce" />
      </div>

     
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl uppercase">
          Ups! Sedang <span className="text-primary">Dipersiapkan</span>
        </h2>
        <p className="mx-auto max-w-[550px] text-lg text-muted-foreground leading-relaxed">
          Sabar ya! Tim &quot;Babu Kucing&quot; kami sedang bekerja keras menyusun konten terbaik 
          agar anabul kesayanganmu makin sehat dan bahagia.
        </p>
      </div>

      
      <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
        <Button asChild size="lg" className="h-14 px-10 rounded-2xl font-black shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            KEMBALI KE BERANDA
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl font-bold border-2 hover:bg-muted transition-all">
          Lapor Masalah
        </Button>
      </div>

      
      <div className="mt-20 flex items-center gap-3 text-muted-foreground/30 font-bold uppercase tracking-[0.3em] text-[10px]">
        <PawPrint className="h-4 w-4" />
        <span>Meow! Harap bersabar ya...</span>
        <PawPrint className="h-4 w-4" />
      </div>
    </div>
  );
}