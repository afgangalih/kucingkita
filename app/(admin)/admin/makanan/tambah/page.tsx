import { prisma } from "@/lib/prisma";
import AddProductFormClient from "./_components/add-product-form-client";

export default async function AddProductPage() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
  });

  return <AddProductFormClient brands={brands} />;
}
