"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { EditorialSection } from "@/types/breed";
import { cn } from "@/lib/utils";

interface Props {
  index: number;
  total: number;
  breedName: string;
  section: EditorialSection;
}

export function BreedEditorialSection({ index, total, breedName, section }: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <section className="container mx-auto px-4 max-w-4xl py-10">
      <div className="space-y-6">
        <div className="space-y-3">
          <span className="text-primary font-bold text-sm">{index}/{total}</span>
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight italic">
              {section.title} {breedName}
            </h2>
            <p className="text-primary text-sm font-medium opacity-80 uppercase tracking-widest italic">{section.subtitle}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <p className={cn("text-slate-600 text-sm leading-relaxed max-w-3xl transition-all", !isExpanded && "line-clamp-3")}>
              {section.content}
            </p>
            {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />}
          </div>
          <Button onClick={() => setIsExpanded(!isExpanded)} variant="outline" className="border-primary text-primary text-[10px] h-9 px-6 font-black uppercase tracking-widest">
            {isExpanded ? "Tutup" : "Baca lebih lanjut"}
          </Button>
        </div>
      </div>
    </section>
  );
}