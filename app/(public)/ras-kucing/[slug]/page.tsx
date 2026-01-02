"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { BreedHeroDetail } from "./_components/breed-hero-detail";
import { BreedStatsSection } from "./_components/breed-stats-section";
import { BreedEditorialSection } from "./_components/breed-editorial-section";
import { BreedFacts } from "./_components/breed-facts";
import { BreedArticles } from "./_components/breed-articles";
import { BreedFaq } from "./_components/breed-faq";
import { CatBreedDetail } from "@/types/breed";

const DUMMY_DATA: CatBreedDetail = {
  id: "british-shorthair",
  name: "British Shorthair",
  image: "/images/breeds/british-head.png",
  coatType: "pendek",
  characteristics: ["Tenang", "Setia", "Mandiri"],
  description:
    "Mustahil untuk tidak mencintai British Shorthair. Wajah montok dan rambut lembut seperti sutra menarik perhatian Anda.",
  officialName: "British Shorthair",
  otherName: "British Blue, Shorthair",
  origin: "Britania Raya",
  stats: {
    maleHeight: "30-46 cm",
    femaleHeight: "28-40 cm",
    maleWeight: "6-9 kg",
    femaleWeight: "4-6 kg",
    lifeStages: {
      growth: "4-12 bln",
      adult: "1-7 thn",
      mature: "7-12 thn",
      senior: "12+ thn",
    },
  },
  ratings: {
    coatLength: 2,
    shedding: 1,
    grooming: 2,
    energy: 3,
    vocal: 3,
    family: 5,
    otherPets: 5,
    aloneTime: 4,
    environment: 3,
  },
  editorialSections: [
    {
      title: "Mengenal",
      subtitle: "Asal usul ras",
      content:
        "British Shorthair adalah kucing yang umumnya hebat serta pilihan yang bagus sebagai kucing pertama...",
    },
    {
      title: "Sejarah",
      subtitle: "Warisan Romawi",
      content:
        "Diyakini bahwa bangsa Romawi membawa kucing ini ke Britania untuk melindungi makanan.",
    },
    {
      title: "Kesehatan",
      subtitle: "Yang Harus Diperhatikan",
      content:
        "Kontrol diet sangat penting karena mereka cenderung mudah obesitas.",
    },
    {
      title: "Merawat",
      subtitle: "Tips Grooming",
      content:
        "Bulu pendeknya sangat mudah dirawat, cukup disisir seminggu sekali.",
    },
    {
      title: "Karakter",
      subtitle: "Kepribadian Tenang",
      content: "British Shorthair adalah pengamat yang setia dan tenang.",
    },
  ],
  facts: [
    {
      title: "Jangan keliru dengan birunya",
      description:
        "Warna biru-abu-abu adalah ciri khas, tapi ada 100 pola warna lainnya.",
    },
    {
      title: "Pakaian luar tebal sedang populer",
      description:
        "Memiliki bulu per inci persegi terbanyak dibanding ras lainnya.",
    },
  ],
  faqs: [
    {
      question: "Apakah kucing British Shorthair ramah?",
      answer: "Sangat ramah. Mereka dikenal karena kesabarannya.",
    },
    {
      question: "Berapa jangka hidup kucing British Shorthair?",
      answer: "Umumnya antara 12 hingga 20 tahun.",
    },
  ],
  relatedArticles: [
    {
      title: "Risiko kesehatan pada kucing obesitas",
      image: "/images/articles/health-1.jpg",
      slug: "risiko-kesehatan-obesitas",
    },
    {
      title: "Memberi makan kucing pasca operasi",
      image: "/images/articles/health-2.jpg",
      slug: "makan-kucing-pasca-operasi",
    },
  ],
};

export default function BreedDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const breed = DUMMY_DATA;
  const TOTAL = 7;

  if (slug !== breed.id) notFound();

  return (
    <main className="min-h-screen bg-white pb-20">
      <BreedHeroDetail breed={breed} />
      <BreedStatsSection breed={breed} />

      <BreedEditorialSection
        index={1}
        total={TOTAL}
        breedName={breed.name}
        section={breed.editorialSections[0]}
      />

      <BreedFacts
        index={2}
        total={TOTAL}
        breedName={breed.name}
        facts={breed.facts}
      />

      <BreedEditorialSection
        index={3}
        total={TOTAL}
        breedName={breed.name}
        section={breed.editorialSections[1]}
      />
      <BreedEditorialSection
        index={4}
        total={TOTAL}
        breedName={breed.name}
        section={breed.editorialSections[2]}
      />
      <BreedEditorialSection
        index={5}
        total={TOTAL}
        breedName={breed.name}
        section={breed.editorialSections[3]}
      />
      <BreedEditorialSection
        index={6}
        total={TOTAL}
        breedName={breed.name}
        section={breed.editorialSections[4]}
      />

      <BreedFaq
        index={7}
        total={TOTAL}
        breedName={breed.name}
        faqs={breed.faqs}
      />

      <BreedArticles articles={breed.relatedArticles} />
    </main>
  );
}
