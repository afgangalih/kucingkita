import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Cat, Pencil, MapPin, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteBreedDialog } from "./_components/delete-breed-dialog";

export default async function BreedListPage() {
  const breeds = await prisma.breed.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">
            Katalog <span className="text-primary">Ras</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Total {breeds.length} data kucing terdaftar
          </p>
        </div>
        
        <Link href="/admin/ras/tambah">
          <Button className="group h-14 rounded-2xl bg-slate-900 px-6 font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-primary hover:shadow-primary/20 active:scale-95">
            <Plus className="mr-2 h-5 w-5 stroke-[3px] transition-transform group-hover:rotate-90" /> 
            TAMBAH RAS BARU
          </Button>
        </Link>
      </div>

      {breeds.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-slate-200 bg-slate-50/50 p-20 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
            <Cat className="h-10 w-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-black uppercase tracking-tight text-slate-400">Database Kosong</h3>
          <p className="max-w-[200px] text-[10px] font-bold uppercase leading-relaxed text-slate-400 opacity-70">
            Belum ada data ras yang diinput ke sistem
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          <TooltipProvider delayDuration={0}>
            {breeds.map((breed) => (
              <div 
                key={breed.id} 
                className="group flex items-center justify-between rounded-3xl border border-slate-100 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-slate-100"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <Cat size={28} />
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-black italic uppercase tracking-tighter text-slate-900">
                        {breed.name}
                      </h2>
                      <Badge variant="secondary" className="rounded-md bg-slate-100 px-2 py-0 text-[9px] font-black uppercase text-slate-500">
                        {breed.coatType}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-primary" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{breed.origin || "Unknown"}</span>
                      </div>
                      <div className="h-1 w-1 rounded-full bg-slate-200" />
                      <span className="font-mono text-[10px] tracking-tight text-slate-300">/{breed.slug}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pr-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/admin/ras/${breed.slug}`}>
                        <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-primary">
                          <Eye size={20} />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="rounded-lg bg-slate-900 text-[10px] font-bold uppercase tracking-widest text-white">View Detail</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/admin/ras/${breed.slug}/edit`}>
                        <Button variant="ghost" size="icon" className="h-11 w-11 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-blue-600">
                          <Pencil size={18} />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="rounded-lg bg-slate-900 text-[10px] font-bold uppercase tracking-widest text-white">Edit Data</TooltipContent>
                  </Tooltip>

                  <div className="mx-1 h-6 w-[1px] bg-slate-100" />

                  <DeleteBreedDialog id={breed.id} name={breed.name} />
                </div>
              </div>
            ))}
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}