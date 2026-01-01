import Image from "next/image"
import Link from "next/link"
import { CatBreed } from "@/types/breed"

export function BreedCard({ breed }: { breed: CatBreed }) {
  return (
    <Link href={`/ras-kucing/${breed.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10">
        <Image
          src={breed.image}
          alt={breed.name}
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-4 text-center text-xl font-black italic uppercase tracking-tight text-slate-900 group-hover:text-primary transition-colors">
        {breed.name}
      </h3>
    </Link>
  )
}