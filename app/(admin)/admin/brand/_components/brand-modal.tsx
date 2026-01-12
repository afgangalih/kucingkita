"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  brandSchema,
  type BrandFormValues,
  type BrandFormInput,
} from "@/lib/validations/brand";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Tag, Trash2, UploadCloud } from "lucide-react";
import { createBrand, updateBrand } from "../_actions/brand-actions";
import { type Brand } from "@prisma/client";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

interface BrandModalProps {
  initialData?: Brand;
  onClose?: () => void;
}

export function BrandModal({ initialData, onClose }: BrandModalProps) {
  const [open, setOpen] = useState(initialData ? true : false);
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<BrandFormInput>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      logo: initialData?.logo ?? "",
      description: initialData?.description ?? "",
      category: initialData?.category ?? "Umum",
      socials: (initialData?.socials as BrandFormInput["socials"]) ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socials",
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (!initialData && name === "name" && value.name) {
        const generatedSlug = value.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        form.setValue("slug", generatedSlug);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, initialData]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `brands/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);
      if (uploadError) throw uploadError;
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);
      form.setValue("logo", publicUrl);
      toast.success("Logo diunggah");
    } catch {
      toast.error("Gagal unggah logo");
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(values: BrandFormValues) {
    setIsPending(true);
    const result = initialData
      ? await updateBrand(initialData.id, values)
      : await createBrand(values);
    setIsPending(false);
    if (result.error) toast.error(result.error);
    else {
      toast.success(initialData ? "Merek diperbarui" : "Merek ditambahkan");
      if (onClose) onClose();
      else {
        setOpen(false);
        form.reset();
      }
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!val && onClose) onClose();
        setOpen(val);
      }}
    >
      {!initialData && (
        <DialogTrigger asChild>
          <Button className="h-12 rounded-2xl bg-slate-900 px-6 font-black text-white hover:bg-primary transition-all shadow-xl shadow-slate-200 uppercase text-xs tracking-widest gap-2 active:scale-95">
            <Plus className="h-4 w-4 stroke-[3px]" /> TAMBAH MEREK
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-2xl rounded-[2.5rem] border-none shadow-2xl max-h-[90vh] overflow-y-auto p-10 bg-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-3 text-slate-900 mb-4">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Tag className="h-7 w-7 text-primary" />
            </div>
            {initialData ? "PERBARUI" : "TAMBAH"}{" "}
            <span className="text-primary">MEREK</span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              onSubmit(data as BrandFormValues)
            )}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                      NAMA MEREK
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Contoh: Royal Canin"
                        className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-bold focus:bg-white transition-all text-sm px-5"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                      KATEGORI KELAS
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-black uppercase text-[10px] tracking-widest px-5 focus:ring-0 focus:bg-white text-slate-900">
                          <SelectValue placeholder="PILIH KATEGORI" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-2xl border-slate-100 shadow-xl overflow-hidden p-1 bg-white">
                        {[
                          "Ekonomi",
                          "Standar",
                          "Premium",
                          "Super Premium",
                          "Prescription",
                        ].map((cat) => (
                          <SelectItem
                            key={cat}
                            value={cat}
                            className="rounded-xl font-bold uppercase text-[10px] tracking-widest py-3 focus:bg-primary focus:text-white cursor-pointer transition-colors"
                          >
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                    DESKRIPSI MEREK
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tuliskan sejarah atau keunggulan merek di sini..."
                      className="min-h-35 rounded-3xl border-slate-100 bg-slate-50/50 font-medium resize-none focus:bg-white transition-all p-5 leading-relaxed text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  MEDIA SOSIAL & LINK
                </FormLabel>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => append({ platform: "Instagram", url: "" })}
                  className="h-8 text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 rounded-xl px-3 transition-colors"
                >
                  <Plus className="h-3 w-3 mr-1 stroke-[4px]" /> TAMBAH LINK
                </Button>
              </div>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex gap-3 items-start group animate-in fade-in slide-in-from-top-2"
                  >
                    <FormField
                      control={form.control}
                      name={`socials.${index}.platform`}
                      render={({ field }) => (
                        <FormItem className="w-35">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Platform"
                              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-black text-[10px] uppercase tracking-widest text-center px-2"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`socials.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://instagram.com/brand"
                              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-medium text-[10px] px-4"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
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
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                LOGO MEREK
              </FormLabel>
              <div className="group relative flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-4xl border-2 border-dashed border-slate-100 bg-slate-50/30 transition-all hover:border-primary hover:bg-primary/5 active:scale-[0.99]">
                {form.watch("logo") ? (
                  <div className="relative h-full w-full p-6 text-center">
                    <Image
                      src={form.watch("logo")}
                      alt="Logo Preview"
                      fill
                      className="object-contain p-6"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-4xl">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">
                        GANTI LOGO
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:shadow-md transition-all">
                      <UploadCloud className="h-6 w-6 text-slate-300 group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                      Klik atau seret logo ke sini
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending || isUploading}
              className="w-full h-16 rounded-[1.75rem] bg-slate-900 font-black uppercase text-xs tracking-[0.3em] text-white hover:bg-primary transition-all shadow-2xl shadow-slate-200 active:scale-95 disabled:opacity-50"
            >
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : initialData ? (
                "SIMPAN PERUBAHAN"
              ) : (
                "KONFIRMASI DATA"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
