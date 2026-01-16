import { getFoodBySlug } from "../_actions/food-actions";
import { notFound } from "next/navigation";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FoodDetailHero } from "./_components/food-detail-hero";
import { FoodDetailInfo } from "./_components/food-detail-info";

interface FoodDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const { slug } = await params;
  const food = await getFoodBySlug(slug);

  if (!food) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <Link href="/food" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 group-hover:bg-slate-900 group-hover:border-slate-900 transition-all">
              <ArrowLeft
                size={16}
                className="text-slate-400 group-hover:text-white transition-colors"
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">
              Back
            </span>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-slate-100"
          >
            <Share2 size={16} className="text-slate-400" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <FoodDetailHero food={food} />

          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
                {food.name}
              </h1>
              <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.2em]">
                {food.brand.name} • {food.category.replace("_", " ")}
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                  Ukuran yang tersedia
                </span>
                <div className="flex flex-wrap gap-3">
                  {food.sizes.map((size) => (
                    <div
                      key={size}
                      className="px-5 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-600"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 h-16 rounded-2xl bg-primary text-white font-black uppercase italic tracking-widest hover:brightness-110 transition-all shadow-xl shadow-primary/20">
                  Temukan Peritel
                </Button>
                <Link href={food.link} target="_blank" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full h-16 rounded-2xl border-2 border-slate-100 font-black uppercase italic tracking-widest hover:bg-slate-50"
                  >
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
