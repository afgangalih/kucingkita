"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { brandSchema, BrandFormValues } from "@/lib/validations/brand"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, Plus, Award, ImageIcon } from "lucide-react"
import { createBrand, updateBrand } from "../_actions/brand-actions"
import { Brand } from "@prisma/client"
import { supabase } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"
import Image from "next/image"

interface BrandModalProps {
  initialData?: Brand
  onClose?: () => void
}

export function BrandModal({ initialData, onClose }: BrandModalProps) {
  const [open, setOpen] = useState(initialData ? true : false)
  const [isPending, setIsPending] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const form = useForm<BrandFormValues>({
    resolver: zodResolver(brandSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      slug: initialData.slug,
      logo: initialData.logo,
      category: initialData.category || "",
    } : {
      name: "", slug: "", logo: "", category: "",
    },
  })

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (!initialData && name === "name" && value.name) {
        const generatedSlug = value.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        form.setValue("slug", generatedSlug)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, initialData])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `brands/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      form.setValue("logo", publicUrl)
      toast.success("Logo uploaded successfully")
    } catch (error) {
      toast.error("Failed to upload image")
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  async function onSubmit(values: BrandFormValues) {
    setIsPending(true)
    const result = initialData 
      ? await updateBrand(initialData.id, values)
      : await createBrand(values)
    setIsPending(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(initialData ? "Brand updated" : "Brand added")
      if (onClose) onClose()
      else {
        setOpen(false)
        form.reset()
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val && onClose) onClose(); setOpen(val); }}>
      {!initialData && (
        <DialogTrigger asChild>
          <Button className="h-12 rounded-2xl bg-slate-900 px-6 font-black text-white hover:bg-primary transition-all active:scale-95 shadow-xl shadow-slate-200 uppercase text-xs tracking-widest gap-2">
            <Plus className="h-4 w-4" /> Add Brand
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md rounded-4xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-2 text-slate-900">
            <Award className="h-5 w-5 text-primary" /> {initialData ? "Update" : "New"} <span className="text-primary">Brand</span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Brand Name</FormLabel>
                <FormControl><Input {...field} className="h-12 rounded-xl border-slate-100 bg-slate-50/50 font-bold" /></FormControl>
                <FormMessage className="text-[10px] uppercase font-bold px-1" />
              </FormItem>
            )} />
            
            <FormItem>
              <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Brand Logo</FormLabel>
              <div className="flex gap-3">
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50 pt-2.5 text-[10px] font-bold uppercase file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-2 file:py-1 file:text-[10px] file:font-black file:text-white"
                  />
                </FormControl>
                {form.watch("logo") && (
                  <div className="relative h-12 w-12 shrink-0 rounded-xl border border-slate-100 bg-slate-50 overflow-hidden">
                    <Image src={form.watch("logo")} alt="Preview" fill className="object-contain p-1" />
                  </div>
                )}
              </div>
              {isUploading && <p className="text-[9px] font-bold text-primary animate-pulse italic mt-1 uppercase">Uploading asset...</p>}
            </FormItem>

            <Button type="submit" disabled={isPending || isUploading} className="w-full h-12 rounded-2xl bg-slate-900 font-black uppercase text-xs tracking-widest text-white hover:bg-primary transition-all shadow-lg shadow-slate-200">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm & Save"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}