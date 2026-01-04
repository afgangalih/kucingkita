"use client";

import { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoFormProps<T extends FieldValues> {
  control: Control<T>;
}

export function BasicInfoForm<T extends FieldValues>({ control }: BasicInfoFormProps<T>) {
  return (
    <div className="space-y-6 rounded-[2.5rem] border-2 border-slate-50 bg-white p-10 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-primary">
          Informasi Dasar
        </h3>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Identitas utama ras kucing
        </p>
      </div>
      
      {/* Baris 1: Nama dan Slug */}
      <div className="grid gap-8 md:grid-cols-2">
        <FormField
          control={control}
          name={"name" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest">Nama Ras</FormLabel>
              <FormControl>
                <Input {...field} placeholder="British Shorthair" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white" />
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
              <FormLabel className="text-[10px] font-black uppercase tracking-widest">URL Slug</FormLabel>
              <FormControl>
                <Input {...field} placeholder="british-shorthair" className="h-14 rounded-2xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Baris 2: Nama Resmi dan Asal */}
      <div className="grid gap-8 md:grid-cols-2">
        <FormField
          control={control}
          name={"officialName" as Path<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest">Nama Resmi</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Felis Catus" className="h-14 rounded-2xl" />
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
              <FormLabel className="text-[10px] font-black uppercase tracking-widest">Asal Negara</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Inggris" className="h-14 rounded-2xl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Baris 3: Tipe Bulu */}
      <FormField
        control={control}
        name={"coatType" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[10px] font-black uppercase tracking-widest">Tipe Bulu</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-14 rounded-2xl">
                  <SelectValue placeholder="Pilih tipe bulu" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="pendek">Pendek</SelectItem>
                <SelectItem value="sedang">Sedang</SelectItem>
                <SelectItem value="panjang">Panjang</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Baris 4: Deskripsi */}
      <FormField
        control={control}
        name={"description" as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[10px] font-black uppercase tracking-widest">Deskripsi Singkat</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Tuliskan gambaran umum..." className="min-h-[150px] rounded-[2rem] p-6" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}