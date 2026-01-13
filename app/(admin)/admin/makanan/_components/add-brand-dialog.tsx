"use client";

import { useState } from "react";
import { Plus, Loader2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createBrand } from "../_actions/brand-action";
import { useRouter } from "next/navigation";

export function AddBrandDialog() {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();

    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const slug = name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    try {
      const res = await createBrand({
        name,
        slug,
        logo: `https://ui-avatars.com/api/?name=${name}&background=0F172A&color=fff`,
        category: "Umum",
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Merek berhasil ditambahkan");
        setOpen(false);
        router.refresh();
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="h-9 rounded-xl bg-slate-900 px-4 text-[9px] font-black uppercase tracking-[0.15em] text-white hover:bg-primary transition-all shadow-md active:scale-95"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5 stroke-[4px]" /> TAMBAH MEREK
        </Button>
      </DialogTrigger>
      
      <DialogContent className="rounded-[2.5rem] border-none sm:max-w-md shadow-2xl p-10 bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-black uppercase italic tracking-tighter text-2xl text-slate-900">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            TAMBAH <span className="text-primary">MEREK</span>
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">
            Pendaftaran cepat merek ke dalam database
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 pt-6">
          <div className="space-y-3">
            <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Nama Merek Resmi
            </Label>
            <Input
              name="name"
              placeholder="Contoh: Royal Canin"
              className="h-14 rounded-2xl border-2 border-slate-100 bg-slate-50/50 font-bold focus:bg-white focus:border-primary/30 transition-all px-5 text-sm"
              required
              autoComplete="off"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isPending}
            className="h-14 w-full rounded-2xl bg-slate-900 font-black uppercase tracking-[0.2em] text-[10px] text-white shadow-xl hover:bg-primary transition-all active:scale-95 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "KONFIRMASI DATA"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}