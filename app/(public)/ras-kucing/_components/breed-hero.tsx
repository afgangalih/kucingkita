import { Sparkles } from "lucide-react";

export function BreedHero() {
  return (
    <section className="relative pt-44 pb-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                Katalog Kucing Eksklusif
              </span>
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
  );
}