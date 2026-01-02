import { CatBreed } from "@/types/breed";
import { BreedHero } from "./_components/breed-hero";
import { BreedShell } from "./_components/breed-shell";

const DUMMY_BREEDS: CatBreed[] = [
  { id: "1", name: "American Bobtail", coatType: "pendek", characteristics: ["Aktif", "Cerdas"], image: "/images/breeds/bobtail.png", description: "" },
  { id: "2", name: "Bengal", coatType: "pendek", characteristics: ["Lincah", "Aktif"], image: "/images/breeds/bengal.png", description: "" },
  { id: "3", name: "Maine Coon", coatType: "sedang", characteristics: ["Tenang", "Setia"], image: "/images/breeds/mainecoon.png", description: "" },
  { id: "4", name: "Persian", coatType: "panjang", characteristics: ["Tenang"], image: "/images/breeds/persian.png", description: "" },
];

export default function RasKucingPage() {
  return (
    <main className="min-h-screen bg-white">
      <BreedHero />
      <BreedShell initialBreeds={DUMMY_BREEDS} />
    </main>
  );
}