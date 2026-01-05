import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditFormClient } from "./_components/edit-form-client";

export default async function EditBreedPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

 
  const breed = await prisma.breed.findUnique({
    where: { slug },
  });

  if (!breed) notFound();

  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 uppercase">
          Edit <span className="text-primary">Ras</span>
        </h1>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Perbarui informasi ras {breed.name}
        </p>
      </div>

      
      <EditFormClient breed={breed} />
    </div>
  );
}