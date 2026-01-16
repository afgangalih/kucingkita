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
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-4 px-0 text-[10px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-slate-900"
          >
            Detail Produk
          </TabsTrigger>
          <TabsTrigger
            value="manfaat"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-4 px-0 text-[10px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-slate-900"
          >
            Manfaat
          </TabsTrigger>
          <TabsTrigger
            value="nutrisi"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-4 px-0 text-[10px] font-black uppercase tracking-widest text-slate-400 data-[state=active]:text-slate-900"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Sparkles size={16} strokeWidth={3} />
                  <h3 className="text-sm font-black uppercase tracking-widest">Key Benefits</h3>
                </div>
               
                <ul className="space-y-4">
                  {food.benefits.split("\n").map((benefit, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <p className="text-slate-600 font-medium leading-snug">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nutrisi" className="mt-0 outline-none">
            <div className="max-w-2xl p-8 rounded-4xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3 text-primary mb-8">
                <Activity size={16} strokeWidth={3} />
                <h3 className="text-sm font-black uppercase tracking-widest">Kandungan Nutrisi</h3>
              </div>
              <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:font-medium">
                {food.nutrition.split("\n").map((item, i) => (
                  <p key={i} className="mb-2">{item}</p>
                ))}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}