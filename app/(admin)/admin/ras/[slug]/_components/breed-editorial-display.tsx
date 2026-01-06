"use client";

import { EditorialSection } from "@prisma/client";

export const BreedEditorialDisplay = ({
  sections,
}: {
  sections: EditorialSection[];
}) => {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-16">
      {sections.map((section, index) => (
        <div key={section.id} className="relative">
          <div className="mb-6 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {index + 1}/{sections.length}
            </span>
            <h3 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
              {section.title}
            </h3>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary italic">
              {section.subtitle}
            </h4>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="whitespace-pre-wrap text-lg font-medium leading-relaxed text-slate-500">
              {section.content}
            </p>
          </div>

          <button className="mt-8 rounded-xl border-2 border-slate-900 px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-900 hover:text-white">
            Baca Lebih Lanjut
          </button>
        </div>
      ))}
    </div>
  );
};

export default BreedEditorialDisplay;
