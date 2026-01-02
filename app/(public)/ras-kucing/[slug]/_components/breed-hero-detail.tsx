import Image from "next/image";
import { Share2, Twitter, Linkedin, Link2 } from "lucide-react";
import { CatBreedDetail } from "@/types/breed";

export function BreedHeroDetail({ breed }: { breed: CatBreedDetail }) {
  return (
    <section className="container mx-auto px-4 pt-32 pb-16">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-6xl mx-auto">
        
        <div className="flex-1 space-y-6 w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tighter italic">
            Mari bahas <br /> {breed.name}
          </h1>

          <div className="flex gap-2">
            {[Twitter, Share2, Linkedin, Link2].map((Icon, i) => (
              <button
                key={i}
                className="p-2 rounded-full border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <Icon className="h-3.5 w-3.5 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="space-y-5 text-sm md:text-base text-slate-600 max-w-md leading-relaxed">
            <p>{breed.description}</p>
            <div className="space-y-1 pt-2 text-xs md:text-sm">
              <p>
                <span className="text-primary font-bold">Nama resmi:</span>{" "}
                {breed.officialName}
              </p>
              <p>
                <span className="text-primary font-bold">Nama lain:</span>{" "}
                {breed.otherName}
              </p>
              <p>
                <span className="text-primary font-bold">Asal:</span>{" "}
                {breed.origin}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 relative w-full">
          <div className="relative w-full aspect-square max-w-md ml-auto">
            <div className="absolute inset-0 bg-slate-50 rounded-full scale-90 translate-x-4" />
            <Image
              src={breed.image}
              alt={breed.name}
              fill
              priority
              className="object-contain relative z-10 p-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
