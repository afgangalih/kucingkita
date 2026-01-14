"use server";

import { prisma } from "@/lib/prisma";
import { ProductCategory } from "@prisma/client";

export async function getPublicFoods(params: {
  brand?: string;
  category?: string;
  search?: string;
}) {
  const { brand, category, search } = params;

  return await prisma.product.findMany({
    where: {
      isPublished: true,
      AND: [
        brand ? { brand: { slug: brand } } : {},
        category ? { category: category as ProductCategory } : {},
        search ? { name: { contains: search, mode: "insensitive" } } : {},
      ],
    },
    include: {
      brand: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFoodBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { 
      slug,
      isPublished: true 
    },
    include: {
      brand: true,
    },
  });
}