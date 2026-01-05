"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoFormProps<T extends FieldValues> {
  control: Control<T>;
}

export function BasicInfoForm<T extends FieldValues>({ control }: BasicInfoFormProps<T>) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          control={control}
          name={"name" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Ras</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Maine Coon" className="h-12 rounded-xl border-2 focus-visible:ring-primary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"slug" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slug URL</FormLabel>
              <FormControl>
                <Input placeholder="maine-coon" className="h-12 rounded-xl border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <FormField
          control={control}
          name={"officialName" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Resmi</FormLabel>
              <FormControl>
                <Input placeholder="The Maine Coon" className="h-12 rounded-xl border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"origin" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Asal Negara</FormLabel>
              <FormControl>
                <Input placeholder="Amerika Serikat" className="h-12 rounded-xl border-2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={"coatType" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipe Bulu</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 rounded-xl border-2">
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-xl border-2">
                  <SelectItem value="pendek">Pendek</SelectItem>
                  <SelectItem value="sedang">Sedang</SelectItem>
                  <SelectItem value="panjang">Panjang</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={"description" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi Lengkap</FormLabel>
            <FormControl>
              <Textarea placeholder="Tuliskan deskripsi mendalam tentang ras ini..." className="min-h-[120px] rounded-2xl border-2 p-4" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}