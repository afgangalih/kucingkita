"use client";

import { Control } from "react-hook-form";
import { ProductFormValues, ProductCategoryEnum } from "@/lib/validations/product";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductSizeInput } from "./product-size-input";
import { ProductImageUpload } from "./product-image-upload";

interface ProductFormProps {
  control: Control<ProductFormValues>;
}

export function ProductForm({ control }: ProductFormProps) {
  return (
    <div className="space-y-12">
      <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
        <h2 className="mb-8 text-xl font-black italic uppercase tracking-tighter text-slate-900">
          Media & Informasi Utama
        </h2>
        
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem className="mb-8">
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Foto Produk</FormLabel>
              <FormControl>
                <ProductImageUpload 
                  value={field.value} 
                  onChange={field.onChange} 
                  onRemove={() => field.onChange("")} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Produk</FormLabel>
                <FormControl><Input className="h-12 rounded-xl border-2" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Merek</FormLabel>
                <FormControl><Input className="h-12 rounded-xl border-2" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kategori</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 rounded-xl border-2">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl">
                    {ProductCategoryEnum.options.map((opt) => (
                      <SelectItem key={opt} value={opt} className="font-bold uppercase text-[10px] tracking-widest">
                        {opt.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slug URL</FormLabel>
                <FormControl><Input className="h-12 rounded-xl border-2" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
        <h2 className="mb-8 text-xl font-black italic uppercase tracking-tighter text-slate-900">
          Detail & Manfaat
        </h2>
        <div className="grid gap-8">
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi Singkat</FormLabel>
                <FormControl><Textarea className="min-h-[120px] rounded-2xl border-2 p-4" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Manfaat Utama</FormLabel>
                  <FormControl><Textarea className="min-h-[120px] rounded-2xl border-2 p-4 italic" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="nutrition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nutrisi</FormLabel>
                  <FormControl><Textarea className="min-h-[120px] rounded-2xl border-2 p-4" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ProductSizeInput control={control} />
          
          <FormField
            control={control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Link Pembelian</FormLabel>
                <FormControl><Input className="h-12 rounded-xl border-2" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}