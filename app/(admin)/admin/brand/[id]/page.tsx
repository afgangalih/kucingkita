import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Package, ExternalLink, Pencil, Globe, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BrandDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandDetailPage({ params }: BrandDetailPageProps) {
  const { id } = await params;

  if (!id || id === "undefined") {
    notFound();
  }

  const brand = await prisma.brand.findUnique({
    where: { id },
    include: {
      products: {
        orderBy: { createdAt: "desc" },
      },
      _count: {
        select: { products: true }
      }
    },
  });

  if (!brand) {
    notFound();
  }

  const socials = (brand.socials as { platform: string; url: string }[]) || [];

  const stats = {
    dry: brand.products.filter((p) => p.category === "DRY_FOOD").length,
    wet: brand.products.filter((p) => p.category === "WET_FOOD").length,
    treats: brand.products.filter((p) => p.category === "TREATS").length,
    supp: brand.products.filter((p) => p.category === "SUPPLEMENT").length,
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/brand">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl border border-slate-100 bg-white shadow-sm">
              <ChevronLeft size={20} />
            </Button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
              Detail <span className="text-primary">Merek</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Profil dan Analitik Inventaris {brand.name}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-4xl border border-slate-100 bg-white p-8 shadow-sm text-center">
            <div className="relative h-32 w-32 mx-auto mb-6 overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 p-2 shadow-inner">
              <Image src={brand.logo} alt={brand.name} fill className="object-contain p-2" />
            </div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-900 leading-tight">{brand.name}</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1 mb-4">{brand.slug}</p>
            
            <Badge className="bg-slate-100 text-slate-500 border-none px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest mb-6">
              {brand.category || "Umum"}
            </Badge>

            <div className="pt-8 border-t border-slate-50 space-y-8 text-left">
              <div className="space-y-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Deskripsi</p>
                <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                  {brand.description || "Tidak ada deskripsi tersedia."}
                </p>
              </div>

              {socials.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Tautan Resmi</p>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((social, idx) => (
                      <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white transition-all">
                        <Globe size={12} className="text-primary" />
                        <span className="text-[9px] font-bold uppercase text-slate-700">{social.platform}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Statistik Produk</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50/50 border border-slate-100 p-4">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Dry Food</p>
                    <p className="text-xl font-black text-slate-900 leading-none">{stats.dry}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50/50 border border-slate-100 p-4">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Wet Food</p>
                    <p className="text-xl font-black text-slate-900 leading-none">{stats.wet}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50/50 border border-slate-100 p-4">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Treats</p>
                    <p className="text-xl font-black text-slate-900 leading-none">{stats.treats}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50/50 border border-slate-100 p-4">
                    <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Suplemen</p>
                    <p className="text-xl font-black text-slate-900 leading-none">{stats.supp}</p>
                  </div>
                </div>
                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 text-center">
                  <p className="text-[8px] font-black text-primary uppercase mb-1">Total Koleksi</p>
                  <p className="text-2xl font-black text-primary leading-none">{brand._count.products} SKU</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-4xl border border-slate-100 bg-white p-2 shadow-sm">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
               <h3 className="font-black uppercase italic tracking-tighter text-slate-900 flex items-center gap-2">
                 <Package size={18} className="text-primary" /> Daftar Inventaris
               </h3>
               <Badge className="rounded-lg text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 border-none">
                 {brand.products.length} Items
               </Badge>
            </div>
            {brand.products.length === 0 ? (
              <div className="p-20 text-center">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Belum ada produk terhubung</p>
              </div>
            ) : (
              <Table className="border-separate border-spacing-y-2">
                <TableHeader>
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Informasi Item</TableHead>
                    <TableHead className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Kategori</TableHead>
                    <TableHead className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Status</TableHead>
                    <TableHead className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right pr-6">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {brand.products.map((product) => (
                    <TableRow key={product.id} className="group border-none bg-white transition-all hover:bg-slate-50/50">
                      <TableCell className="rounded-l-2xl py-3 border-y border-l border-slate-50 group-hover:border-slate-100">
                        <div className="flex items-center gap-3 pl-2">
                          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-slate-100 bg-white p-1">
                            <Image src={product.image} alt={product.name} fill className="object-contain" />
                          </div>
                          <p className="text-[11px] font-black uppercase text-slate-700 italic tracking-tight leading-none">{product.name}</p>
                        </div>
                      </TableCell>
                      <TableCell className="border-y border-slate-50 group-hover:border-slate-100">
                        <Badge variant="outline" className="rounded-lg border-slate-100 text-[8px] font-black uppercase tracking-widest text-slate-400 bg-white">
                          {product.category.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-y border-slate-50 group-hover:border-slate-100 text-center">
                        <Badge variant={product.isPublished ? "default" : "secondary"} className="text-[8px] font-black uppercase px-2 shadow-none">
                          {product.isPublished ? "Tayang" : "Draf"}
                        </Badge>
                      </TableCell>
                      <TableCell className="rounded-r-2xl border-y border-r border-slate-50 group-hover:border-slate-100 text-right pr-4">
                        <div className="flex justify-end gap-1">
                          <Link href={`/admin/makanan/${product.id}/edit`}>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-900">
                              <Pencil size={14} />
                            </Button>
                          </Link>
                          <a href={product.link} target="_blank" rel="noopener noreferrer">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary">
                              <ExternalLink size={14} />
                            </Button>
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}