import { CatBreed } from "@/types/breed";
import { BreedHero } from "./_components/breed-hero";
import { BreedShell } from "./_components/breed-shell";

const DUMMY_BREEDS: CatBreed[] = [
  { 
    id: "american-bobtail", 
    name: "American Bobtail", 
    coatType: "pendek", 
    characteristics: ["Aktif", "Cerdas"], 
    image: "/images/breeds/bobtail.png", 
    description: "Ras yang dikenal dengan ekor pendek alami dan kepribadian yang menyerupai anjing." 
  },
  { 
    id: "bengal", 
    name: "Bengal", 
    coatType: "pendek", 
    characteristics: ["Lincah", "Aktif"], 
    image: "/images/breeds/bengal.png", 
    description: "Kucing atletis dengan pola bintik atau marmer yang menyerupai macan tutul liar." 
  },
  { 
    id: "maine-coon", 
    name: "Maine Coon", 
    coatType: "sedang", 
    characteristics: ["Tenang", "Setia"], 
    image: "/images/breeds/mainecoon.png", 
    description: "Salah satu ras kucing domestik terbesar yang dikenal sebagai 'raksasa lembut'." 
  },
  { 
    id: "persian", 
    name: "Persian", 
    coatType: "panjang", 
    characteristics: ["Tenang"], 
    image: "/images/breeds/persian.png", 
    description: "Ras mewah dengan wajah datar dan bulu panjang yang membutuhkan perawatan intensif." 
  },
  { 
    id: "british-shorthair", 
    name: "British Shorthair", 
    coatType: "pendek", 
    characteristics: ["Tenang", "Setia", "Mandiri"], 
    image: "/images/breeds/british-head.png", 
    description: "Kucing berwajah montok dengan bulu lebat yang dikenal sangat sopan dan tenang." 
  },
];

export default function RasKucingPage() {
  return (
    <main className="min-h-screen bg-white">
      <BreedHero />
      <BreedShell initialBreeds={DUMMY_BREEDS} />
    </main>
  );
}