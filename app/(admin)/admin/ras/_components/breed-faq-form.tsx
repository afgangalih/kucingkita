"use client";

import { useFieldArray, Control } from "react-hook-form";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BreedFormValues } from "@/lib/validations/breed";

export function BreedFaqForm({ control }: { control: Control<BreedFormValues> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-primary" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Daftar Tanya Jawab</h3>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => append({ question: "", answer: "" })}
          className="rounded-xl border-2 font-bold text-[10px] uppercase"
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah FAQ
        </Button>
      </div>

      <div className="grid gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="group relative rounded-3xl border-2 border-slate-50 bg-slate-50/30 p-6 transition-all hover:bg-white hover:border-slate-100">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
              className="absolute -right-2 -top-2 h-8 w-8 rounded-xl opacity-0 transition-all group-hover:opacity-100 shadow-lg"
            >
              <Trash2 size={14} />
            </Button>

            <div className="space-y-4">
              <FormField
                control={control}
                name={`faqs.${index}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pertanyaan #{index + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder="Apa keunikan ras ini?" className="h-12 rounded-xl border-2 bg-white" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`faqs.${index}.answer`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Jawaban</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tuliskan jawaban lengkap..." className="min-h-[100px] rounded-xl border-2 bg-white p-4" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="rounded-3xl border-2 border-dashed border-slate-100 py-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 italic">Belum ada pertanyaan yang ditambahkan</p>
          </div>
        )}
      </div>
    </div>
  );
}