import { HeroSection } from "@/components/landing/hero-section";
import { FeatureBreed } from "@/components/landing/feature-breed";
import { FoodBrands } from "@/components/landing/food-brands";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FoodBrands />
      <FeatureBreed />
    </main>
  );
}
