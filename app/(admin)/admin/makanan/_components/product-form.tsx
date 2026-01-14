"use client";

import { Control } from "react-hook-form";
import {
  ProductFormValues,
  ProductCategoryEnum,
} from "@/lib/validations/product";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { Switch } from "@/components/ui/switch";
import { ProductSizeInput } from "./product-size-input";
import { ProductImageUpload } from "./product-image-upload";
import { Info, Image as ImageIcon, Eye } from "lucide-react";
import { Brand } from "@prisma/client";
import { AddBrandDialog } from "./add-brand-dialog";

interface ProductFormProps {
  control: Control<ProductFormValues>;
  brands: Brand[];
  onNewBrand?: (brand: Brand) => void;
}

export function ProductForm({ control, brands, onNewBrand }: ProductFormProps) {
  return (
    <div className="space-y-12">
      <div className="rounded-4xl border border-slate-100 bg-white p-10 shadow-sm">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-xl text-primary">
              <ImageIcon size={20} />
            </div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">
              Media & Konten
            </h2>
          </div>

          <FormField
            control={control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4 space-y-0 rounded-2xl bg-white px-5 py-2.5 border-2 border-slate-100 shadow-sm transition-all">
                <FormLabel className={`text-[10px] font-black uppercase tracking-[0.15em] transition-colors ${field.value ? "text-primary" : "text-slate-400"}`}>
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
              <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Foto Katalog Utama
              </FormLabel>
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

      <div className="rounded-4xl border border-slate-100 bg-white p-10 shadow-sm">
        <div className="mb-10 flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <Info size={20} />
          </div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">
            Spesifikasi Produk
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Nama Produk
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contoh: Mother & Babycat"
                    className="h-14 rounded-2xl border-2 bg-slate-50/30 font-bold focus:bg-white transition-all px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="brandId"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-0.5">
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Merek
                  </FormLabel>
                  <AddBrandDialog onBrandCreated={(newBrand) => {
                    if (onNewBrand) onNewBrand(newBrand);
                  }} />
                </div>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 rounded-2xl border-2 bg-slate-50/30 font-black uppercase text-[10px] tracking-widest px-5 focus:bg-white transition-all">
                      <SelectValue placeholder="PILIH MEREK" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-2xl shadow-xl p-1 border-slate-100">
                    {brands.length === 0 ? (
                      <div className="p-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Belum ada merek</div>
                    ) : (
                      brands.map((brand) => (
                        <SelectItem
                          key={brand.id}
                          value={brand.id}
                          className="font-bold uppercase text-[10px] tracking-widest py-3 rounded-xl focus:bg-primary focus:text-white transition-colors cursor-pointer"
                        >
                          {brand.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Kategori Produk
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 rounded-2xl border-2 bg-slate-50/30 font-black uppercase text-[10px] tracking-widest px-5 focus:bg-white transition-all">
                      <SelectValue placeholder="PILIH KATEGORI" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-2xl shadow-xl p-1 border-slate-100">
                    {ProductCategoryEnum.options.map((opt) => (
                      <SelectItem
                        key={opt}
                        value={opt}
                        className="font-bold uppercase text-[10px] tracking-widest py-3 rounded-xl focus:bg-primary focus:text-white transition-colors cursor-pointer"
                      >
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
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  URL Slug
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="mother-baby-cat"
                    className="h-14 rounded-2xl border-2 bg-slate-50/30 font-mono text-xs focus:bg-white transition-all px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div className="rounded-4xl border border-slate-100 bg-white p-10 shadow-sm">
        <div className="mb-10 flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl text-primary">
            <Eye size={20} />
          </div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900">
            Deskripsi & Nutrisi
          </h2>
        </div>
        <div className="grid gap-10">
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Deskripsi Utama
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="min-h-32 rounded-3xl border-2 bg-slate-50/30 p-5 font-medium focus:bg-white transition-all leading-relaxed"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-8 md:grid-cols-2">
            <FormField
              control={control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Manfaat Unggulan
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-32 rounded-3xl border-2 bg-slate-50/30 p-5 italic focus:bg-white transition-all leading-relaxed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="nutrition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                    Tabel Nutrisi
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-32 rounded-3xl border-2 bg-slate-50/30 p-5 font-mono text-xs focus:bg-white transition-all leading-relaxed"
                      {...field}
                    />
                  </FormControl>
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
                <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Link Eksternal
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://shopee.co.id/..."
                    className="h-14 rounded-2xl border-2 bg-slate-50/30 font-bold text-primary underline focus:bg-white transition-all px-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}