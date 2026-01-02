import { FactItem } from "@/types/breed";

interface Props {
  index: number;
  total: number;
  breedName: string;
  facts: FactItem[];
}

export function BreedFacts({ index, total, breedName, facts }: Props) {
  return (
    <section className="container mx-auto px-4 max-w-5xl py-12">
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-primary font-bold text-sm">{index}/{total}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight italic">
            {facts.length} fakta tentang kucing {breedName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facts.map((fact, idx) => (
            <div key={idx} className="bg-white p-8 rounded-sm shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border-t-4 border-primary space-y-4 text-center">
              <h3 className="text-primary text-sm font-bold uppercase">{idx + 1}. {fact.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{fact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}