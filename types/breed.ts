// types/breed.ts

export interface CatBreed {
  id: string;
  name: string;
  image: string;
  coatType: 'pendek' | 'sedang' | 'panjang';
  characteristics: string[]; // Contoh: ['Aktif', 'Ramah']
  description: string;
}