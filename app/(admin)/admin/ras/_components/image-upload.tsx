"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}.${fileExt}`;
      const filePath = `breeds/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      onChange(data.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative h-40 w-40 rounded-[2rem] overflow-hidden border-2 border-slate-100">
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-xl shadow-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Breed image"
              src={value}
              unoptimized // Penting jika URL dari luar domain tanpa config next.config.js
            />
          </div>
        ) : (
          <div className="h-40 w-40 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2">
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            ) : (
              <ImageIcon className="h-8 w-8" />
            )}
            <span className="text-[10px] font-black uppercase tracking-widest">
              {isUploading ? "Proses Upload..." : "Belum Ada Foto"}
            </span>
          </div>
        )}

        {!value && (
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={onUpload}
              className="hidden"
              id="imageInput"
              disabled={isUploading}
            />
            <label htmlFor="imageInput">
              <Button
                type="button"
                variant="outline"
                className="h-14 rounded-2xl border-2 font-black px-6 cursor-pointer hover:bg-slate-50 transition-all"
                asChild
                disabled={isUploading}
              >
                <span>{isUploading ? "MENGUNGGAH..." : "PILIH FOTO RAS"}</span>
              </Button>
            </label>
            <p className="mt-3 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              JPG, PNG, WEBP • MAKS 2MB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
