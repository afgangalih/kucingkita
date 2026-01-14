import { getFoodBySlug } from "../_actions/food-actions";
import { notFound } from "next/navigation";

interface FoodDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function FoodDetailPage({ params }: FoodDetailPageProps) {
  const { slug } = await params;
  const food = await getFoodBySlug(slug);

  if (!food) notFound();

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-900">
          {food.name}
        </h1>
        <p className="text-sm font-bold text-primary uppercase tracking-widest mt-2">
          {food.brand.name}
        </p>
      </div>
    </div>
  );
}