"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteBrand } from "../_actions/brand-actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteBrandButtonProps {
  id: string;
  name: string;
}

export function DeleteBrandButton({ id, name }: DeleteBrandButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onDelete() {
    setIsLoading(true);
    const toastId = toast.loading(`Menghapus brand ${name}...`);
    try {
      const result = await deleteBrand(id);
      if (result.success) {
        toast.success("Brand berhasil dihapus", { id: toastId });
      } else {
        toast.error(result.error || "Gagal menghapus brand", { id: toastId });
      }
    } catch {
      toast.error("Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <Trash2 size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-4xl border-none p-8">
        <AlertDialogHeader className="items-center text-center">
          <div className="mb-4 rounded-3xl bg-red-50 p-4 text-red-500">
            <AlertTriangle size={32} />
          </div>
          <AlertDialogTitle className="text-xl font-black uppercase italic tracking-tighter text-slate-900">
            Hapus Brand?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Apakah Anda yakin ingin menghapus{" "}
            <span className="text-slate-900 font-black">{name}</span>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6 gap-3 sm:justify-center">
          <AlertDialogCancel className="h-12 rounded-xl border-2 font-bold uppercase text-[10px] tracking-widest">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            disabled={isLoading}
            className="h-12 rounded-xl bg-red-600 font-black uppercase text-[10px] tracking-widest text-white hover:bg-red-700 shadow-lg shadow-red-100 transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Ya, Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
