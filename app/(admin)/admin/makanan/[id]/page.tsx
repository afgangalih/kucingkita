import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Pencil, ExternalLink, Package, Tag, Ruler, Zap, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      brand: true,
    },
  });

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        <header className="mb-12">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              asChild 
              className="-ml-3 h-12 w-12 rounded-2xl border-2 border-slate-100 bg-white text-slate-900 shadow-sm transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900"
            >
              <Link href="/admin/makanan">
                <ChevronLeft className="h-6 w-6" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge
                  variant={product.isPublished ? "default" : "secondary"}
                  className="h-6 rounded-md px-3 text-[10px] font-black uppercase tracking-widest"
                >
                  {product.isPublished ? "Published" : "Draft"}
                </Badge>
                <span className="text-[10px] text-slate-300 font-mono font-bold tracking-tighter">ID: {product.id}</span>
              </div>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
                {product.name}
              </h1>
              <p className="text-sm font-bold text-primary uppercase tracking-widest">{product.brand.name}</p>
            </div>

            <Button 
              asChild 
              className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-primary text-white font-black uppercase italic tracking-tighter shadow-2xl shadow-slate-200 transition-all active:scale-95"
            >
              <Link href={`/admin/makanan/${product.id}/edit`}>
                <Pencil className="mr-2 h-5 w-5" />
                Edit Produk
              </Link>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-square rounded-[2.5rem] bg-white border-2 border-slate-50 overflow-hidden shadow-2xl shadow-slate-200/50 group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="rounded-4xl bg-white border border-slate-100 p-8 shadow-sm space-y-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" /> Informasi Produk
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shadow-sm">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Brand</p>
                    <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight leading-none">{product.brand.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shadow-sm">
                    <Tag className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Kategori</p>
                    <p className="text-sm font-black text-slate-900 uppercase italic tracking-tight leading-none">
                      {product.category.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100 shadow-sm">
                    <Ruler className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 leading-none">Ukuran Tersedia</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-900 text-[10px] font-black text-white uppercase tracking-tighter"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 px-2">
              <a 
                href={product.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 rounded-3xl border-2 border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white group-hover:bg-primary transition-colors">
                    <ExternalLink size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">External Access</p>
                    <p className="text-sm font-black italic uppercase tracking-tighter text-slate-900 leading-none">Buka Link Pembelian</p>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full flex items-center justify-center border border-slate-200 group-hover:translate-x-1 transition-transform">
                  <ChevronLeft className="h-4 w-4 rotate-180 text-slate-400 group-hover:text-primary" />
                </div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <section className="rounded-[2.5rem] bg-white border border-slate-100 p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1.5 bg-primary rounded-full" />
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">
                  Deskripsi Produk
                </h2>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-base text-slate-600 font-medium leading-relaxed italic">
                  &quot;{product.description}&quot;
                </p>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="rounded-[2.5rem] bg-white border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-primary">
                  <Zap size={18} className="fill-current" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                    Manfaat Utama
                  </h3>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                  {product.benefits}
                </div>
              </section>

              <section className="rounded-[2.5rem] bg-slate-50 border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6 text-slate-900">
                  <ShieldCheck size={18} />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]">
                    Informasi Nutrisi
                  </h3>
                </div>
                <div className="rounded-2xl bg-white p-5 border border-slate-100 font-mono text-xs italic text-slate-500 leading-relaxed whitespace-pre-line shadow-inner">
                  {product.nutrition}
                </div>
              </section>
            </div>

            <div className="rounded-4xl bg-slate-50/50 border-2 border-dashed border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                  <Clock size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Terakhir Diperbarui</p>
                  <p className="text-xs font-bold text-slate-900">
                    {new Date(product.updatedAt).toLocaleDateString("id-ID", {
                      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
              <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                Created: {new Date(product.createdAt).toLocaleDateString("id-ID")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}