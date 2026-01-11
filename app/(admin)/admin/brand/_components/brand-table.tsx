"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, ImageIcon } from "lucide-react";
import { BrandModal } from "./brand-modal";
import { DeleteBrandButton } from "./delete-brand-button";
import { useState } from "react";
import { Brand } from "@prisma/client";

interface BrandWithCount extends Brand {
  _count: { products: number };
}

export function BrandTable({ data }: { data: BrandWithCount[] }) {
  const [editingBrand, setEditingBrand] = useState<BrandWithCount | null>(null);

  return (
    <>
      <div className="rounded-4xl border border-slate-100 bg-white p-2 shadow-sm">
        <Table className="border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent text-nowrap">
              <TableHead className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900">
                Brand
              </TableHead>
              <TableHead className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 text-center">
                In Stock
              </TableHead>
              <TableHead className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 text-right pr-6">
                Management
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((brand) => (
              <TableRow
                key={brand.id}
                className="group border-none bg-white transition-all hover:bg-slate-50/50"
              >
                <TableCell className="rounded-l-2xl py-3 border-y border-l border-slate-50 group-hover:border-slate-100">
                  <div className="flex items-center gap-4 pl-2">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-100 bg-white p-1 shadow-sm">
                      {brand.logo ? (
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-50">
                          <ImageIcon className="h-6 w-6 text-slate-200" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight text-slate-900 leading-none italic">
                        {brand.name}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        REF: {brand.id.slice(0, 8)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="border-y border-slate-50 group-hover:border-slate-100 text-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg text-[10px] font-black bg-slate-100 text-slate-500 uppercase tracking-tighter group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {brand._count.products} Products
                  </span>
                </TableCell>
                <TableCell className="rounded-r-2xl border-y border-r border-slate-50 group-hover:border-slate-100 text-right pr-4">
                  <div className="flex justify-end gap-1">
                    <Button
                      onClick={() => setEditingBrand(brand)}
                      size="icon"
                      variant="ghost"
                      className="h-9 w-9 rounded-xl text-slate-400 hover:text-slate-900 transition-all"
                    >
                      <Pencil size={16} />
                    </Button>
                    <DeleteBrandButton id={brand.id} name={brand.name} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {editingBrand && (
        <BrandModal
          initialData={editingBrand}
          onClose={() => setEditingBrand(null)}
        />
      )}
    </>
  );
}
