"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

interface RatingInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export function RatingInput<T extends FieldValues>({ control, name, label }: RatingInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <div className="flex items-center justify-between">
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {label}
            </FormLabel>
            <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-md">
              Level {field.value}
            </span>
          </div>
          <FormControl>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => field.onChange(value)}
                  className={cn(
                    "h-10 flex-1 rounded-xl border-2 font-black text-xs transition-all active:scale-95",
                    field.value >= value
                      ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-200"
                      : "border-slate-100 bg-white text-slate-300 hover:border-slate-200"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}