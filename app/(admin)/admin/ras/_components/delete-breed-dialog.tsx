"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { deleteBreed } from "../_actions/breed-actions";
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
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeleteBreedDialogProps {
  id: string;
  name: string;
}

export function DeleteBreedDialog({ id, name }: DeleteBreedDialogProps) {
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    setIsPending(true);
    try {
      const result = await deleteBreed(id);
      if (result.success) {
        toast.success(`${name} telah dihapus`);
        setOpen(false);
      } else {
        toast.error(result.error || "Gagal menghapus data");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 size={18} />
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg bg-red-600 text-[10px] font-black uppercase tracking-widest text-white border-none">
          Delete Ras
        </TooltipContent>
      </Tooltip>

      <AlertDialogContent className="max-w-[450px] rounded-[3rem] border-none p-12 shadow-2xl">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500">
            <AlertTriangle size={40} />
          </div>
          <AlertDialogTitle className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 leading-tight">
            Konfirmasi <span className="text-red-600">Hapus</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm font-medium leading-relaxed text-slate-500">
            Apakah Anda yakin ingin menghapus ras <span className="font-black text-slate-900">{name}</span>? Data ini akan hilang permanen dari database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-10 flex flex-row items-center justify-center gap-3">
          <AlertDialogCancel className="h-14 flex-1 rounded-2xl border-2 border-slate-100 bg-transparent font-black uppercase tracking-widest text-[10px] text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all m-0">
            BATAL
          </AlertDialogCancel>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            className="h-14 flex-1 rounded-2xl bg-red-600 font-black uppercase tracking-widest text-[10px] text-white hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-100"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "YA, HAPUS"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}