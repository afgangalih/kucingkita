"use client";

import { useFieldArray, Control, ArrayPath } from "react-hook-form";
import { Plus, Trash2, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductFormValues } from "@/lib/validations/product";

interface ProductSizeInputProps {
  control: Control<ProductFormValues>;
}

export function ProductSizeInput({ control }: ProductSizeInputProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes" as ArrayPath<ProductFormValues>,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box size={18} className="text-primary" />
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
            Varian Ukuran
          </h3>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
          className="h-9 rounded-xl border-2 font-bold text-[10px] uppercase transition-all hover:bg-slate-50"
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah Ukuran
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        {fields.map((field, index) => (
          <div key={field.id} className="group relative">
            <FormField
              control={control}
              name={`sizes.${index}`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="e.g. 400g"
                          className="h-12 w-32 rounded-2xl border-2 bg-white px-4 text-xs font-bold transition-all focus-visible:ring-primary group-hover:border-slate-300"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                        className="h-10 w-10 rounded-xl shadow-sm transition-all active:scale-95"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold uppercase tracking-tight" />
                </FormItem>
              )}
            />
          </div>
        ))}

        {fields.length === 0 && (
          <div className="w-full rounded-3xl border-2 border-dashed border-slate-100 py-10 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 italic">
              Belum ada ukuran yang ditambahkan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}