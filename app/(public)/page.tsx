import { HeroSection } from "@/components/landing/hero-section";
import { FeatureBreed } from "@/components/landing/feature-breed";
import { FoodBrands } from "@/components/landing/food-brands";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const brands = await prisma.brand.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <main className="flex-1">
      <HeroSection />
      <FoodBrands initialBrands={brands} />
      <FeatureBreed />
    </main>
  );
}