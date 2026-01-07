"use client";

import { Control } from "react-hook-form";
import { ProductFormValues, ProductCategoryEnum } from "@/lib/validations/product";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ProductSizeInput } from "./product-size-input";
import { ProductImageUpload } from "./product-image-upload";
import { Info, Image as ImageIcon, Eye } from "lucide-react";

interface ProductFormProps {
  control: Control<ProductFormValues>;
}

export function ProductForm({ control }: ProductFormProps) {
  return (
    <div className="space-y-12">
      <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon size={18} className="text-primary" />
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">
              Media & Visibilitas
            </h2>
          </div>
          
          <FormField
            control={control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 space-y-0 rounded-2xl bg-slate-50 px-4 py-2 border-2 border-slate-100">
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {field.value ? "PUBLISHED" : "DRAFT MODE"}
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-primary"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 uppercase">Foto Produk</FormLabel>
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
      </div>

      <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
        <div className="mb-8 flex items-center gap-2">
          <Info size={18} className="text-primary" />
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">
            Informasi Identitas
          </h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Produk</FormLabel>
                <FormControl><Input className="h-12 rounded-xl border-2 font-bold" {...field} /></FormControl>
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
                <FormControl><Input className="h-12 rounded-xl border-2 font-bold" {...field} /></FormControl>
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
                    <SelectTrigger className="h-12 rounded-xl border-2 font-bold">
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
                <FormControl><Input className="h-12 rounded-xl border-2 font-mono text-xs" {...field} /></FormControl>
                <FormDescription className="text-[9px] font-bold uppercase tracking-tight text-slate-400">URL: /makanan/{field.value || "..."}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-slate-100 bg-white p-10 shadow-sm">
        <div className="mb-8 flex items-center gap-2">
          <Eye size={18} className="text-primary" />
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">
            Detail & Manfaat
          </h2>
        </div>
        <div className="grid gap-8">
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi Singkat</FormLabel>
                <FormControl><Textarea className="min-h-[120px] rounded-2xl border-2 p-4 font-medium" {...field} /></FormControl>
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
                  <FormControl><Textarea className="min-h-[120px] rounded-2xl border-2 p-4 font-mono text-xs" {...field} /></FormControl>
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
                <FormControl><Input className="h-12 rounded-xl border-2 font-bold text-primary underline" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}