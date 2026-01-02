import Image from "next/image";
import Link from "next/link";
import { RelatedArticle } from "@/types/breed";

export function BreedArticles({ articles }: { articles: RelatedArticle[] }) {
  return (
    <section className="container mx-auto px-4 py-20 bg-slate-50/50">
      <div className="max-w-5xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold text-primary leading-tight">
          Baca selengkapnya tentang topik ini
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Link 
              key={index} 
              href={`/edukasi/${article.slug}`}
              className="group bg-white border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-500"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image 
                  src={article.image} 
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-primary leading-snug group-hover:text-primary/80 transition-colors">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}