import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Package, ExternalLink, Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DeleteProductButton } from "./_components/delete-product-button";
import { ProductFilters } from "./_components/product-filters";
import { ProductCategory } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MakananPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function MakananPage({ searchParams }: MakananPageProps) {
  const { q, category } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      AND: [
        q ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { brand: { name: { contains: q, mode: 'insensitive' } } },
          ]
        } : {},
        category ? { category: category as ProductCategory } : {},
      ]
    },
    include: {
      brand: true
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
            Katalog <span className="text-primary">Makanan</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Total {products.length} data produk terfilter
          </p>
        </div>
        <Link href="/admin/makanan/tambah">
          <Button className="group h-14 rounded-2xl bg-slate-900 px-6 font-bold text-white shadow-lg shadow-slate-200 transition-all hover:bg-primary active:scale-95">
            <Plus className="mr-2 h-5 w-5 stroke-[3px] transition-transform group-hover:rotate-90" /> 
            TAMBAH PRODUK
          </Button>
        </Link>
      </div>

      <ProductFilters />

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/30 p-20 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white border border-slate-100 shadow-sm">
            <Package className="h-10 w-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-black uppercase tracking-tight text-slate-400">Data Tidak Ditemukan</h3>
          <p className="max-w-50 text-[10px] font-bold uppercase leading-relaxed text-slate-400 opacity-70">
            Coba sesuaikan kata kunci atau filter kategori Anda
          </p>
        </div>
      ) : (
        <div className="rounded-4xl border border-slate-100 bg-white p-2 shadow-sm">
          <Table className="border-separate border-spacing-y-2">
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent">
                <TableHead className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Produk</TableHead>
                <TableHead className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Kategori</TableHead>
                <TableHead className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Status</TableHead>
                <TableHead className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow 
                  key={product.id} 
                  className="group border-none bg-white transition-all hover:bg-slate-50/50"
                >
                  <TableCell className="rounded-l-2xl py-3 border-y border-l border-slate-50 group-hover:border-slate-100">
                    <div className="flex items-center gap-4 pl-2">
                      <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-100 bg-white p-1 shadow-sm">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight text-slate-900 leading-none italic">
                          {product.name}
                        </p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                          {product.brand.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="border-y border-slate-50 group-hover:border-slate-100">
                    <Badge variant="outline" className="rounded-lg border border-slate-100 bg-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-slate-500 shadow-none">
                      {product.category.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="border-y border-slate-50 group-hover:border-slate-100">
                    <Badge variant={product.isPublished ? "default" : "secondary"} className="rounded-md px-2 py-0.5 text-[8px] font-black uppercase tracking-tighter shadow-none">
                      {product.isPublished ? "Tayang" : "Draf"}
                    </Badge>
                  </TableCell>
                  <TableCell className="rounded-r-2xl border-y border-r border-slate-50 group-hover:border-slate-100 text-right pr-4">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/makanan/${product.id}`}>
                        <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
                          <Eye size={16} />
                        </Button>
                      </Link>
                      <Link href={`/admin/makanan/${product.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-slate-900 transition-all">
                          <Pencil size={16} />
                        </Button>
                      </Link>
                      <a href={product.link} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl text-slate-400 hover:text-primary transition-all">
                          <ExternalLink size={16} />
                        </Button>
                      </a>
                      <div className="ml-1 pl-1 border-l border-slate-100">
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}