import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Pencil, ExternalLink, Package, Tag, Ruler } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
       
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Button 
              variant="ghost" 
              asChild 
              className="h-10 px-3 rounded-xl hover:bg-slate-100"
            >
              <Link href="/admin/makanan">
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Kembali</span>
              </Link>
            </Button>
            <div className="h-4 w-px bg-slate-200" />
            <span className="text-xs text-slate-500 font-medium">Detail Produk</span>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge
                  variant={product.isPublished ? "default" : "secondary"}
                  className="h-6 px-3 text-xs font-semibold"
                >
                  {product.isPublished ? "Published" : "Draft"}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">ID: {product.id.slice(0, 8)}</span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-slate-600 font-medium">{product.brand}</p>
            </div>

            <Button 
              asChild 
              className="h-11 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 shadow-sm"
            >
              <Link href={`/admin/makanan/${product.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Produk
              </Link>
            </Button>
          </div>
        </header>

        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="relative aspect-square rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                className="object-contain p-8"
              />
            </div>

            
            <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">
                Informasi Produk
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1">Brand</p>
                    <p className="text-sm font-semibold text-slate-900 truncate">{product.brand}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Tag className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1">Kategori</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {product.category.replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <Ruler className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-2">Ukuran Tersedia</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-xs font-medium text-slate-700"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg">
              <div className="mb-4">
                <p className="text-sm font-semibold mb-1">Link Pembelian</p>
                <p className="text-xs text-slate-400">Kunjungi marketplace atau toko resmi</p>
              </div>
              <Button
                asChild
                className="w-full h-11 rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-semibold shadow-sm"
              >
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  Buka Link
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          
          <div className="lg:col-span-3 space-y-6">
            {/* Description */}
            <section className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Deskripsi Produk
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </section>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <section className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Manfaat Utama
                </h3>
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {product.benefits}
                </div>
              </section>

              
              <section className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-4">
                  Informasi Nutrisi
                </h3>
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                  <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {product.nutrition}
                  </div>
                </div>
              </section>
            </div>

           
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <div>
                  <span className="font-medium">Dibuat:</span>{" "}
                  {new Date(product.createdAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </div>
                <div className="h-4 w-px bg-slate-300" />
                <div>
                  <span className="font-medium">Terakhir diubah:</span>{" "}
                  {new Date(product.updatedAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}