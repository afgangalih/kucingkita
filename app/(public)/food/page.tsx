import { getPublicFoods } from "./_actions/food-actions";
import { prisma } from "@/lib/prisma";
import { FoodSidebar } from "./_components/food-sidebar";
import { FoodMobileFilter } from "./_components/food-mobile-filter";
import { FoodCard } from "./_components/food-card";

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
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-16">
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
            Food <span className="text-primary">Catalog</span>
          </h1>
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.4em] text-slate-400">
            Precision nutrition for your companion
          </p>
        </header>

        <FoodMobileFilter brands={brands} />

        <div className="flex flex-col gap-16 lg:flex-row">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <FoodSidebar brands={brands} />
            </div>
          </aside>

          <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-14">
              {foods.length === 0 ? (
                <div className="col-span-full h-96 rounded-[3rem] bg-slate-50 border-2 border-dashed border-slate-100 flex items-center justify-center">
                  <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">
                    No matching products found
                  </p>
                </div>
              ) : (
                foods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}