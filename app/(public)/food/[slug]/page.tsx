import { getFoodBySlug } from "../_actions/food-actions";
import { notFound } from "next/navigation";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FoodDetailHero } from "./_components/food-detail-hero";
import { FoodDetailInfo } from "./_components/food-detail-info";
import { Brand, Product } from "@prisma/client";

interface FoodDetailPageProps {
  params: Promise<{ slug: string }>;
}

interface ExtendedProduct extends Product {
  brand: Brand;
}

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const { slug } = await params;
  const food = await getFoodBySlug(slug) as ExtendedProduct | null;

  if (!food) notFound();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
       
        <div className="flex items-center justify-between mb-16">
          <Link href="/food" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-900 transition-all duration-500">
              <ArrowLeft size={16} className="text-slate-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors">
              Kembali
            </span>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-50 transition-colors">
            <Share2 size={18} className="text-slate-400" />
          </Button>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center mb-24">
          
          <section className="flex justify-center lg:justify-start">
            <FoodDetailHero food={food} />
          </section>

         
          <div className="space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight">
                {food.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 rounded-full border border-slate-100 bg-white py-1.5 pl-1.5 pr-4 shadow-sm transition-transform hover:scale-105">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full border border-slate-100 bg-slate-50 p-1">
                    <Image
                      src={food.brand.logo}
                      alt={food.brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide text-slate-900">
                    {food.brand.name}
                  </span>
                </div>
                <div className="flex items-center justify-center rounded-full border border-slate-100 bg-slate-50 px-4 py-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {food.category.replace(/_/g, " ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Berat Tersedia</span>
                <div className="flex flex-wrap gap-3">
                  {food.sizes.map((size) => (
                    <div 
                      key={size} 
                      className="px-6 py-3 rounded-2xl border-2 border-slate-50 text-[12px] font-black hover:border-primary transition-all cursor-default"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1 h-16 rounded-2xl bg-slate-900 text-white font-black uppercase italic tracking-widest hover:bg-primary transition-all duration-500 shadow-xl shadow-slate-200">
                  Cek Ketersediaan
                </Button>
                <Link href={food.link} target="_blank" className="flex-1">
                  <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-slate-100 font-black uppercase italic tracking-widest hover:bg-slate-50 transition-all duration-500">
                    Beli Online
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <FoodDetailInfo food={food} />
      </div>
    </main>
  );
}