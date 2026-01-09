import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Package, ExternalLink, Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DeleteProductButton } from "./_components/delete-product-button";
import { ProductFilters } from "./_components/product-filters";
import { ProductCategory } from "@prisma/client";

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
            { brand: { contains: q, mode: 'insensitive' } },
          ]
        } : {},
        category ? { category: category as ProductCategory } : {},
      ]
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
            Katalog <span className="text-primary">Makanan</span>
          </h1>
          <p className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Manajemen Nutrisi & Rekomendasi Produk
          </p>
        </div>
        <Link href="/admin/makanan/tambah">
          <Button className="h-14 rounded-2xl bg-slate-900 px-8 font-black text-white shadow-2xl shadow-slate-200 transition-all hover:bg-primary active:scale-95">
            <Plus className="mr-2 h-5 w-5" /> TAMBAH PRODUK
          </Button>
        </Link>
      </div>

      <ProductFilters />

      <div className="rounded-[2.5rem] border-2 border-slate-100 bg-white p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {products.length > 0 ? (
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                  <th className="px-6 pb-2">Produk</th>
                  <th className="px-6 pb-2">Kategori</th>
                  <th className="px-6 pb-2">Status</th>
                  <th className="px-6 pb-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="group transition-all">
                    <td className="rounded-l-[2rem] bg-slate-50/50 px-6 py-4 group-hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-white bg-white shadow-sm">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-tight text-slate-900 leading-none italic">
                            {product.name}
                          </p>
                          <p className="mt-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {product.brand}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="bg-slate-50/50 px-6 py-4 group-hover:bg-slate-50 transition-colors">
                      <Badge variant="outline" className="rounded-lg border-2 border-white bg-white px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-500 shadow-sm">
                        {product.category.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="bg-slate-50/50 px-6 py-4 group-hover:bg-slate-50 transition-colors">
                      <Badge variant={product.isPublished ? "default" : "secondary"} className="rounded-md uppercase text-[8px] font-black px-2 py-0.5 tracking-tighter">
                        {product.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="rounded-r-[2rem] bg-slate-50/50 px-6 py-4 text-right group-hover:bg-slate-50 transition-colors">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/makanan/${product.id}`}>
                          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-white transition-all shadow-none hover:shadow-sm">
                            <Eye size={18} />
                          </Button>
                        </Link>
                        <Link href={`/admin/makanan/${product.id}/edit`}>
                          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-white transition-all shadow-none hover:shadow-sm">
                            <Pencil size={18} />
                          </Button>
                        </Link>
                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                          <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-white transition-all shadow-none hover:shadow-sm">
                            <ExternalLink size={18} />
                          </Button>
                        </a>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="mb-6 rounded-[2.5rem] bg-slate-50 p-10 text-slate-200 border-2 border-dashed border-slate-100">
                <Package size={64} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 italic">
                Data tidak ditemukan
              </p>
              <p className="text-[10px] font-bold text-slate-300 uppercase mt-2">
                Coba sesuaikan kata kunci atau filter kategori Anda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}