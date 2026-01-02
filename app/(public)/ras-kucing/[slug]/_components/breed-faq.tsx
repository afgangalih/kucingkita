"use client";

import * as React from "react";
import { FAQItem } from "@/types/breed";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface Props {
  index: number;
  total: number;
  breedName: string;
  faqs: FAQItem[];
}

export function BreedFaq({ index, total, breedName, faqs }: Props) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="container mx-auto px-4 max-w-5xl py-12">
      <div className="space-y-8">
        <div className="space-y-3">
          <span className="text-primary font-bold text-sm">{index}/{total}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight italic">
            Semua tentang kucing {breedName}
          </h2>
        </div>

        <div className="border-t border-slate-200">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-slate-200">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className={cn("text-sm font-bold transition-colors", openIndex === idx ? "text-primary" : "text-slate-700 group-hover:text-primary")}>
                  {faq.question}
                </span>
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", openIndex === idx ? "rotate-180 text-primary" : "text-slate-300")} />
              </button>
              <div className={cn("overflow-hidden transition-all duration-300", openIndex === idx ? "max-h-96 pb-5" : "max-h-0")}>
                <p className="text-slate-500 text-xs leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}