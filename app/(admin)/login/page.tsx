"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PawPrint, Loader2, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Akses Ditolak: " + error.message);
      setLoading(false);
    } else if (data.session) {
      const token = data.session.access_token;
      const maxAge = 60 * 60 * 8;
      document.cookie = `sb-access-token=${token}; path=/; max-age=${maxAge}; SameSite=Lax;`;

      setTimeout(() => {
        window.location.href = "/admin";
      }, 300);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 md:p-0">
      {/* Kontainer Utama - Semua di dalam sini */}
      <div className="flex w-full max-w-[950px] overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200 min-h-[600px]">
        {/* SISI KIRI: Brand Identity (Visual & Warna Utama) */}
        <div className="hidden w-1/2 flex-col justify-between bg-primary p-12 text-white md:flex relative overflow-hidden">
          {/* Ornamen Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary shadow-lg">
                <PawPrint className="h-6 w-6" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic">
                KucingKita<span className="opacity-70">.id</span>
              </span>
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <h2 className="text-4xl font-black italic leading-tight tracking-tighter">
              KELOLA DUNIA <br /> ANABULMU.
            </h2>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-sm font-semibold text-white/60"></div>
        </div>

        {/* SISI KANAN: Form Login (Clean & Modern) */}
        <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-16">
          <div className="mb-10 flex flex-col items-center md:items-start">
            {/* Logo Mobile Only */}
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary md:hidden">
              <PawPrint className="h-7 w-7 text-white" />
            </div>

            <h3 className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">
              Admin Login
            </h3>
            <p className="mt-2 text-sm text-slate-500 font-medium">
              Masukkan akun khusus administrator untuk melanjutkan.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold uppercase tracking-widest text-slate-400"
                >
                  Email Kantor
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kucingkita.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-2 border-slate-100 bg-slate-50/50 rounded-2xl focus:border-primary/30 focus:ring-0 transition-all font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-bold uppercase tracking-widest text-slate-400"
                >
                  Kata Sandi
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-2 border-slate-100 bg-slate-50/50 rounded-2xl focus:border-primary/30 focus:ring-0 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 transition-all group"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <span className="flex items-center justify-center gap-3">
                  MASUK SEKARANG
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-12 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              © {new Date().getFullYear()} KucingKita.id Internal Access System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
