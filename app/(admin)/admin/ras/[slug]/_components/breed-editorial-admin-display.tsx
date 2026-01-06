"use client";

import { BookOpen } from "lucide-react";
import { EditorialSection } from "@prisma/client";

interface BreedEditorialAdminDisplayProps {
  sections: EditorialSection[];
}

export function BreedEditorialAdminDisplay({ sections }: BreedEditorialAdminDisplayProps) {
  return (
    <div className="rounded-[2.5rem] border-2 border-slate-100 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <BookOpen size={18} />
        </div>
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
          Konten Editorial
        </h3>
      </div>

      {sections.length > 0 ? (
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md hover:border-slate-300"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Section {index + 1}
                  </span>
                  <h4 className="text-lg font-black italic uppercase tracking-tight text-slate-900">
                    {section.title}
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary italic">
                    {section.subtitle}
                  </p>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">
                  {section.content.length} karakter
                </span>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                {section.content || "Konten kosong"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-14 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">
            Belum ada konten editorial
          </p>
        </div>
      )}
    </div>
  );
}