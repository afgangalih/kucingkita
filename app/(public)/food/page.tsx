import { getPublicFoods } from "./_actions/food-actions";
import { prisma } from "@/lib/prisma";

interface FoodPageProps {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    q?: string;
  }>;
}

export default async function FoodPage({ searchParams }: FoodPageProps) {
  const { brand, category, q } = await searchParams;

  const foods = await getPublicFoods({
    brand,
    category,
    search: q,
  });

  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Food <span className="text-primary">Catalog</span>
          </h1>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400">
            Expertly curated nutrition for your feline companion
          </p>
        </header>

        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="w-full lg:w-64 shrink-0">
            <div className="h-96 rounded-4xl bg-slate-50 border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2">
              <p className="text-[10px] font-black uppercase text-slate-300">Filter Sidebar</p>
              <p className="text-[8px] font-bold uppercase text-slate-300">
                Ready to sync {brands.length} brands
              </p>
            </div>
          </aside>

          <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.length === 0 ? (
                <div className="col-span-full h-64 rounded-4xl bg-slate-50 border-2 border-dashed border-slate-100 flex items-center justify-center">
                  <p className="text-[10px] font-black uppercase text-slate-300">No products found</p>
                </div>
              ) : (
                foods.map((food) => (
                  <div key={food.id} className="h-64 rounded-4xl bg-slate-50 border-2 border-dashed border-slate-100 flex items-center justify-center">
                    <p className="text-[10px] font-black uppercase text-slate-300">{food.name}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}