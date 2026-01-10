"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
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
        logo: `https://ui-avatars.com/api/?name=${name}&background=random&color=fff`,
        category: "Premium",
      });

      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Merek berhasil ditambahkan");
        setOpen(false);
        router.refresh();
      }
    } catch (error) {
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
          variant="outline"
          size="sm"
          className="h-8 rounded-lg border-dashed border-2 text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/5"
        >
          <Plus className="mr-1 h-3 w-3" /> Tambah Merek Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[2rem] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-black italic uppercase tracking-tighter">
            Tambah Merek
          </DialogTitle>
          <DialogDescription className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Daftarkan merek makanan baru ke database
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">
              Nama Merek
            </Label>
            <Input
              name="name"
              placeholder="Contoh: Royal Canin"
              className="h-12 rounded-xl border-2 font-bold"
              required
              autoComplete="off"
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-xl bg-slate-900 font-black text-white"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "SIMPAN MEREK"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
