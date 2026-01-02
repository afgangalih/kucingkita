export interface LifeStages {
  growth: string;
  adult: string;
  mature: string;
  senior: string;
}

export interface BreedStats {
  maleHeight: string;
  femaleHeight: string;
  maleWeight: string;
  femaleWeight: string;
  lifeStages: LifeStages;
}

export interface BreedRatings {
  coatLength: number;
  shedding: number;
  grooming: number;
  energy: number;
  vocal: number;
  family: number;
  otherPets: number;
  aloneTime: number;
  environment: number;
}

export interface FactItem {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedArticle {
  title: string;
  image: string;
  slug: string;
}

export interface EditorialSection {
  title: string;
  subtitle: string;
  content: string; // Narasi utama
}

// Interface Utama Katalog
export interface CatBreed {
  id: string;
  name: string;
  image: string;
  coatType: 'pendek' | 'sedang' | 'panjang';
  characteristics: string[];
  description: string;
}

// Interface Utama Detail (Mewarisi CatBreed)
export interface CatBreedDetail extends CatBreed {
  officialName: string;
  otherName: string;
  origin: string;
  stats: BreedStats;
  ratings: BreedRatings;
  editorialSections: EditorialSection[]; // Untuk teks narasi
  facts: FactItem[]; // Untuk BreedFacts (Card)
  faqs: FAQItem[]; // Untuk BreedFaq (Accordion)
  relatedArticles: RelatedArticle[]; // Untuk BreedArticles
}