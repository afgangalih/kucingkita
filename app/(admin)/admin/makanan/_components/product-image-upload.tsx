"use client";

import { useState } from "react";
import { X, Loader2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ProductImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export function ProductImageUpload({
  value,
  onChange,
  onRemove,
}: ProductImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Ukuran file maksimal 2MB");
    }

    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      onChange(publicUrl);
      toast.success("Gambar berhasil diunggah");
    } catch (error) {
      toast.error("Gagal mengunggah gambar");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {value ? (
        <div className="relative h-64 w-full overflow-hidden rounded-[2.5rem] border-4 border-slate-100 shadow-inner bg-white">
          <Image
            fill
            src={value}
            alt="Preview"
            className="object-contain p-6"
          />
          <Button
            type="button"
            onClick={onRemove}
            variant="destructive"
            size="icon"
            className="absolute right-4 top-4 h-10 w-10 rounded-2xl shadow-xl transition-transform active:scale-90"
          >
            <X size={18} />
          </Button>
        </div>
      ) : (
        <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:border-primary/30">
          <div className="flex flex-col items-center justify-center">
            {isUploading ? (
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            ) : (
              <>
                <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm text-slate-400">
                  <ImageIcon size={32} />
                </div>
                <p className="mb-1 text-sm font-black uppercase tracking-tighter text-slate-900">
                  Klik untuk <span className="text-primary">Unggah Foto</span>
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Maksimal 2MB
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}