import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditProductClient } from "./_components/edit-product-client";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditPageProps) {
  const { id } = await params;

  if (!id) notFound();

  const [product, brands] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
    }),
    prisma.brand.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) notFound();

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
          Edit <span className="text-primary">Produk</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          ID: {product.id}
        </p>
      </div>

      <EditProductClient product={product} brands={brands} />
    </div>
  );
}