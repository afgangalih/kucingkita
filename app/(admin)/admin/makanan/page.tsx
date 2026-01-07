import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Package, ExternalLink, Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { DeleteProductButton } from "./_components/delete-product-button";

export default async function MakananPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
            Katalog <span className="text-primary">Makanan</span>
          </h1>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Manajemen Nutrisi & Rekomendasi Produk
          </p>
        </div>
        <Link href="/admin/makanan/tambah">
          <Button className="h-14 rounded-2xl bg-slate-900 px-8 font-black text-white shadow-xl shadow-slate-200 transition-all hover:bg-primary">
            <Plus className="mr-2 h-5 w-5" /> TAMBAH PRODUK
          </Button>
        </Link>
      </div>

      <div className="rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                <th className="px-6 pb-2">Produk</th>
                <th className="px-6 pb-2">Kategori</th>
                <th className="px-6 pb-2">Status</th>
                <th className="px-6 pb-2 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="group transition-all hover:bg-slate-50/50">
                  <td className="rounded-l-3xl bg-slate-50/30 px-6 py-4 group-hover:bg-transparent">
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
                        <p className="text-sm font-black uppercase tracking-tight text-slate-900 leading-none">
                          {product.name}
                        </p>
                        <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="rounded-lg border-2 border-slate-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-500">
                      {product.category.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={product.isPublished ? "default" : "secondary"} className="rounded-md uppercase text-[8px] font-black">
                      {product.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="rounded-r-3xl bg-slate-50/30 px-6 py-4 text-right group-hover:bg-transparent">
                    <div className="flex justify-end gap-2">
                     
                      <Link href={`/admin/makanan/${product.id}`}>
                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                          <Eye size={18} />
                        </Button>
                      </Link>

                     
                      <Link href={`/admin/makanan/${product.id}/edit`}>
                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                          <Pencil size={18} />
                        </Button>
                      </Link>

                     
                      <a href={product.link} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-400 hover:text-primary hover:bg-orange-50 transition-all">
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
        </div>

        {products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-slate-50 p-6 text-slate-200">
              <Package size={48} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-300">
              Belum ada data produk tersedia
            </p>
          </div>
        )}
      </div>
    </div>
  );
}