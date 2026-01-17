"use client";

import { Product } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Sparkles, Activity } from "lucide-react";

interface FoodDetailInfoProps {
  food: Product;
}

export function FoodDetailInfo({ food }: FoodDetailInfoProps) {
  return (
    <div className="mt-20">
      <Tabs defaultValue="detail" className="w-full">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-slate-100 rounded-none gap-8">
          <TabsTrigger
            value="detail"
            className="relative h-auto rounded-none border-b-2 border-transparent bg-transparent px-0 pb-4 pt-0 text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-none transition-all data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none"
          >
            Detail Produk
          </TabsTrigger>
          <TabsTrigger
            value="manfaat"
            className="relative h-auto rounded-none border-b-2 border-transparent bg-transparent px-0 pb-4 pt-0 text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-none transition-all data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none"
          >
            Manfaat
          </TabsTrigger>
          <TabsTrigger
            value="nutrisi"
            className="relative h-auto rounded-none border-b-2 border-transparent bg-transparent px-0 pb-4 pt-0 text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-none transition-all data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-slate-900 data-[state=active]:shadow-none"
          >
            Informasi Nutrisi
          </TabsTrigger>
        </TabsList>

        <div className="py-12">
          <TabsContent value="detail" className="mt-0 outline-none">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Info size={16} strokeWidth={3} />
                <h3 className="text-sm font-black uppercase tracking-widest">Tentang Produk</h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {food.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="manfaat" className="mt-0 outline-none">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Sparkles size={16} strokeWidth={3} />
                <h3 className="text-sm font-black uppercase tracking-widest">Manfaat Utama</h3>
              </div>
              <div className="text-slate-600 leading-relaxed text-lg font-medium">
                {food.benefits.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nutrisi" className="mt-0 outline-none">
            <div className="max-w-3xl space-y-6">
              <div className="flex items-center gap-3 text-primary">
                <Activity size={16} strokeWidth={3} />
                <h3 className="text-sm font-black uppercase tracking-widest">Kandungan Nutrisi</h3>
              </div>
              <div className="text-slate-600 leading-relaxed text-lg font-medium">
                {food.nutrition.split("\n").map((item, i) => (
                  <p key={i} className="mb-2 last:mb-0">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}