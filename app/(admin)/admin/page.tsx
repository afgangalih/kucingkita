"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Cat, MessageSquare, MapPin, 
  ShieldAlert, CheckCircle2, Clock, 
  Plus, ArrowRight, Loader2, Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ cats: 0, pendingPhotos: 3, pendingVet: 5 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { count: catCount } = await supabase.from("cats").select("*", { count: "exact", head: true });
      // Di masa depan, count pending bisa ditarik dari tabel 'submissions' atau 'gallery'
      setStats(prev => ({ ...prev, cats: catCount || 0 }));
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] space-y-10 pb-10">
      {/* 1. HEADER & GLOBAL ACTION */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-black italic tracking-tighter text-slate-900 leading-none uppercase">
            Control <span className="text-primary">Center</span>
          </h1>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Management & Moderation System</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="h-14 rounded-2xl border-2 font-bold px-6 hover:bg-slate-50">
            LIHAT SITUS
          </Button>
          <Button 
            onClick={() => window.location.href = "/admin/ras"}
            className="h-14 rounded-2xl bg-slate-900 px-8 font-bold text-white shadow-2xl shadow-slate-200 transition-all hover:bg-primary"
          >
            <Plus className="mr-2 h-5 w-5 stroke-[3px]" /> INPUT DATA
          </Button>
        </div>
      </div>

      {/* 2. CORE METRICS (Statistik Berdasarkan FR) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Data Ras (FR-01) */}
        <div className="group rounded-[2.5rem] bg-white p-8 border-2 border-slate-50 shadow-sm transition-all hover:border-orange-200">
          <div className="flex flex-col gap-4">
            <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
              <Cat className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Katalog Ras</p>
              <h2 className="text-4xl font-black tracking-tighter">{loading ? "..." : stats.cats}</h2>
            </div>
          </div>
        </div>

        {/* Moderasi Foto (FR-06) */}
        <div className="group rounded-[2.5rem] bg-white p-8 border-2 border-slate-50 shadow-sm transition-all hover:border-purple-200">
          <div className="flex flex-col gap-4">
            <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Camera className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pending Foto</p>
              <h2 className="text-4xl font-black tracking-tighter">{stats.pendingPhotos}</h2>
            </div>
          </div>
        </div>

        {/* Submission Vet (FR-04/FR-10) */}
        <div className="group rounded-[2.5rem] bg-white p-8 border-2 border-slate-50 shadow-sm transition-all hover:border-blue-200">
          <div className="flex flex-col gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Submission Vet</p>
              <h2 className="text-4xl font-black tracking-tighter">{stats.pendingVet}</h2>
            </div>
          </div>
        </div>

        {/* Forum Moderasi (FR-05) */}
        <div className="group rounded-[2.5rem] bg-white p-8 border-2 border-slate-50 shadow-sm transition-all hover:border-emerald-200">
          <div className="flex flex-col gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Komentar Baru</p>
              <h2 className="text-4xl font-black tracking-tighter text-emerald-600">Active</h2>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MODERATION PRIORITY (FR-10) */}
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-[3rem] bg-white border-2 border-slate-50 p-10 space-y-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-black italic tracking-tighter uppercase flex items-center gap-3">
                <ShieldAlert className="h-6 w-6 text-primary" /> Perlu Approval
              </h3>
              <p className="text-xs font-medium text-slate-400">Submission dari pengguna yang harus diperiksa (FR-10)</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { type: "Foto Galeri", user: "Budi Santoso", item: "Kucing Persia Medium", time: "10 menit lalu", color: "text-purple-600" },
              { type: "Submission Vet", user: "Klinik Anabul", item: "Vet Baru: Jakarta Selatan", time: "2 jam lalu", color: "text-blue-600" },
              { type: "Review Makanan", user: "Siska Kucing", item: "Review: Royal Canin Hairball", time: "5 jam lalu", color: "text-orange-600" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50/50 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                <div className="flex items-center gap-5">
                  <div className={`text-[10px] font-black w-24 uppercase tracking-tighter ${item.color}`}>{item.type}</div>
                  <div>
                    <p className="text-sm font-black text-slate-800 italic uppercase">{item.item}</p>
                    <p className="text-[10px] text-slate-400 font-bold">Oleh {item.user} • {item.time}</p>
                  </div>
                </div>
                <Button size="sm" className="rounded-full bg-white text-slate-900 border-2 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  Review
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CONTENT INTEGRITY (FR-09) */}
        <div className="lg:col-span-2 rounded-[3rem] bg-slate-900 p-10 text-white relative flex flex-col justify-between shadow-2xl">
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black italic tracking-tighter uppercase">Bilingual Status</h3>
            </div>
            
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Memastikan seluruh konten (Ras, Makanan, Artikel) sudah memiliki terjemahan Indonesia & Inggris (FR-09).
            </p>

            <div className="space-y-5 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  <span>Data Ras (ID/EN)</span>
                  <span className="text-primary">85%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-primary shadow-[0_0_10px_rgba(255,107,0,0.5)]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  <span>Direktori Vet</span>
                  <span className="text-blue-400">100%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </div>
              </div>
            </div>
          </div>
          
          <button className="mt-12 group flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Cek Semua Pending</span>
            <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}