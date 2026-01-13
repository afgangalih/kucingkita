"use client";

import { useFieldArray, Control, ArrayPath } from "react-hook-form";
import { Plus, Trash2, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
        
        {/* Button sudah konsisten dengan AddBrandDialog */}
        <Button
          type="button"
          onClick={() => append("")}
          className="h-9 rounded-xl bg-slate-900 px-4 text-[9px] font-black uppercase tracking-[0.15em] text-white hover:bg-primary transition-all shadow-md active:scale-95"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5 stroke-[4px]" /> Tambah Ukuran
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
                          className="h-12 w-32 rounded-2xl border-2 border-slate-100 bg-slate-50/30 px-5 text-xs font-bold transition-all focus:bg-white focus:border-primary/30 group-hover:border-slate-300"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="h-12 w-12 rounded-2xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={16} />
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
          <div className="w-full rounded-4xl border-2 border-dashed border-slate-100 py-10 text-center bg-slate-50/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic opacity-70">
              Belum ada ukuran yang ditambahkan
            </p>
          </div>
        )}
      </div>
    </div>
  );
}