"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteProduct } from "../_actions/product-action";
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

interface DeleteProductButtonProps {
  id: string;
  name: string;
}

export function DeleteProductButton({ id, name }: DeleteProductButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function onDelete() {
    setIsLoading(true);
    const toastId = toast.loading(`Menghapus ${name}...`);
    try {
      const result = await deleteProduct(id);
      if (result.success) {
        toast.success("Produk berhasil dihapus", { id: toastId });
      } else {
        toast.error(result.error || "Gagal menghapus produk", { id: toastId });
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
      
      <AlertDialogContent className="rounded-4xl border-none p-10 max-w-sm">
        <AlertDialogHeader className="items-center text-center">
          <div className="mb-6 rounded-2xl bg-red-50 p-4 text-red-500 shadow-inner">
            <AlertTriangle size={32} />
          </div>
          <AlertDialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-slate-900">
            Hapus Produk?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed px-4">
            Tindakan ini permanen. Ingin menghapus <span className="text-red-500 font-black">{name}</span> dari katalog?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <AlertDialogFooter className="mt-8 flex-col-reverse sm:flex-row gap-3">
          <AlertDialogCancel className="h-12 flex-1 rounded-2xl border-2 border-slate-100 font-black uppercase text-[10px] tracking-widest text-slate-400 hover:bg-slate-50 transition-all">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
            disabled={isLoading}
            className="h-12 flex-1 rounded-2xl bg-red-600 font-black uppercase text-[10px] tracking-widest text-white hover:bg-red-700 shadow-xl shadow-red-100 transition-all active:scale-95"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ya, Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}