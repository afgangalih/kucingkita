import { prisma } from "@/lib/prisma";
import { Award } from "lucide-react";
import { BrandTable } from "./_components/brand-table";
import { BrandModal } from "./_components/brand-modal";

export default async function BrandPage() {
  const brands = await prisma.brand.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
            Merek & <span className="text-primary">Brand</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Total {brands.length} brand terdaftar
          </p>
        </div>
        <BrandModal />
      </div>

      {brands.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-slate-200 bg-slate-50/30 p-20 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white border border-slate-100 shadow-sm">
            <Award className="h-10 w-10 text-slate-300" />
          </div>
          <h3 className="text-lg font-black uppercase tracking-tight text-slate-400">
            Belum Ada Brand
          </h3>
          <p className="max-w-50 text-[10px] font-bold uppercase leading-relaxed text-slate-400 opacity-70">
            Mulai tambahkan brand pertama Anda untuk mengelola katalog produk
          </p>
        </div>
      ) : (
        <BrandTable data={brands} />
      )}
    </div>
  );
}
