import { getFoodBySlug } from "../_actions/food-actions";
import { notFound } from "next/navigation";
import { ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FoodDetailHero } from "./_components/food-detail-hero";

interface FoodDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const { slug } = await params;
  const food = await getFoodBySlug(slug);

  if (!food) notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <Link href="/food">
            <Button
              variant="ghost"
              className="rounded-2xl gap-2 font-bold uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all"
            >
              <ChevronLeft size={16} />
              Back to Catalog
            </Button>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="rounded-2xl border-2 border-slate-100"
          >
            <Share2 size={16} className="text-slate-400" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <section>
            <FoodDetailHero food={food} />
          </section>

          <section className="space-y-10 pt-4">
            <div className="space-y-4">
              <p className="font-mono text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                Product Specification
              </p>
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.9]">
                {food.name}
              </h1>
            </div>

            <div className="space-y-6">
              <div className="p-8 rounded-4xl bg-slate-50 border border-slate-100 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Description
                </h4>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {food.description ||
                    "No description available for this product."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl border-2 border-slate-50 flex flex-col gap-1">
                  <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">
                    Brand Origin
                  </span>
                  <span className="text-sm font-black uppercase italic text-slate-900">
                    {food.brand.name}
                  </span>
                </div>
                <div className="p-6 rounded-3xl border-2 border-slate-50 flex flex-col gap-1">
                  <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">
                    Category
                  </span>
                  <span className="text-sm font-black uppercase italic text-slate-900">
                    {food.category.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button className="w-full h-16 rounded-3xl bg-slate-900 text-white font-black uppercase italic tracking-widest hover:bg-primary hover:scale-[1.02] transition-all shadow-2xl shadow-slate-200">
                Contact for Availability
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
