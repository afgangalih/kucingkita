"use client";

import { useFieldArray, Control } from "react-hook-form";
import { Plus, Trash2, LayoutPanelTop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BreedFormValues } from "@/lib/validations/breed";

export function BreedEditorialForm({ control }: { control: Control<BreedFormValues> }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "editorialSections",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutPanelTop size={18} className="text-primary" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">Blok Konten Editorial</h3>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => append({ title: "", subtitle: "", content: "" })}
          className="rounded-xl border-2 font-bold text-[10px] uppercase"
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Section
        </Button>
      </div>

      <div className="grid gap-6">
        {fields.map((field, index) => (
          <div key={field.id} className="group relative rounded-[2rem] border-2 border-slate-50 bg-slate-50/30 p-8 transition-all hover:bg-white hover:border-slate-100">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
              className="absolute -right-2 -top-2 h-8 w-8 rounded-xl opacity-0 transition-all group-hover:opacity-100 shadow-lg"
            >
              <Trash2 size={14} />
            </Button>

            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={control}
                  name={`editorialSections.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Judul Section</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Sejarah Singkat" className="h-12 rounded-xl border-2 bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`editorialSections.${index}.subtitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sub-judul</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Asal usul dan evolusi" className="h-12 rounded-xl border-2 bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name={`editorialSections.${index}.content`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Isi Konten</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tulis artikel mendalam di sini..." className="min-h-[150px] rounded-xl border-2 bg-white p-4 leading-relaxed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="rounded-[2.5rem] border-2 border-dashed border-slate-100 py-16 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 italic">Belum ada section editorial</p>
          </div>
        )}
      </div>
    </div>
  );
}