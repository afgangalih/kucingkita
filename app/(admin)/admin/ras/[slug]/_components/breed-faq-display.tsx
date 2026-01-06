"use client";

import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Faq } from "@prisma/client";

interface BreedFaqDisplayProps {
  faqs: Faq[];
}

export function BreedFaqDisplay({ faqs }: BreedFaqDisplayProps) {
  return (
    <div className="rounded-[2.5rem] border-2 border-slate-100 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <HelpCircle size={18} />
        </div>
        <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
          Tanya Jawab Umum
        </h3>
      </div>

      {faqs.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-md hover:border-slate-300"
            >
              <AccordionTrigger className="px-6 py-5 text-left text-sm font-black uppercase tracking-wider text-slate-900 hover:no-underline data-[state=open]:bg-slate-50">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2 text-base font-medium leading-relaxed text-slate-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50 py-14 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">
            Belum ada pertanyaan yang tersedia
          </p>
        </div>
      )}
    </div>
  );
}