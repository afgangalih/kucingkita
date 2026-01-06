import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil } from "lucide-react";
import { BreedDetailHeader } from "./_components/breed-detail-header";
import { BreedInfoCards } from "./_components/breed-info-cards";
import { BreedRatingsDisplay } from "./_components/breed-ratings-display";
import { BreedFaqDisplay } from "./_components/breed-faq-display";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BreedDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const breed = await prisma.breed.findUnique({
    where: { slug },
    include: {
      ratings: true,
      faqs: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!breed) notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/ras">
            <Button variant="outline" className="h-12 w-12 rounded-2xl border-2 p-0">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase">
              Detail <span className="text-primary">Ras</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              ID: {breed.id}
            </p>
          </div>
        </div>

        <Link href={`/admin/ras/${breed.slug}/edit`}>
          <Button className="h-14 rounded-2xl bg-slate-900 px-8 font-bold text-white shadow-lg transition-all hover:bg-primary hover:shadow-primary/20">
            <Pencil className="mr-2 h-5 w-5" /> EDIT RAS
          </Button>
        </Link>
      </div>

      <BreedInfoCards breed={breed} />

      <div className="grid gap-8 lg:grid-cols-5 items-start">
        <div className="lg:col-span-3 space-y-8">
          <BreedDetailHeader breed={breed} />
          <BreedFaqDisplay faqs={breed.faqs} />
        </div>

        <div className="lg:col-span-2">
          <BreedRatingsDisplay ratings={breed.ratings} />
        </div>
      </div>
    </div>
  );
}