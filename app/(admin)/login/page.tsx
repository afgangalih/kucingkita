"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PawPrint, Loader2 } from "lucide-react";

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
      alert("Gagal Masuk: " + error.message);
      setLoading(false);
    } else if (data.session) {
      const token = data.session.access_token;
      const maxAge = 60 * 60 * 8; // 8 hours

      document.cookie = `sb-access-token=${token}; path=/; max-age=${maxAge}; SameSite=Lax;`;

      setTimeout(() => {
        window.location.href = "/admin";
      }, 300);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md rounded-[2.5rem] border-none shadow-2xl p-4">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <PawPrint className="text-white h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black tracking-tighter italic text-primary">
              ADMIN LOGIN
            </CardTitle>
            <CardDescription>
              Masuk untuk mengelola portal KucingKita.id
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email Admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl border-muted-foreground/20 focus-visible:ring-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-muted-foreground/20 focus-visible:ring-primary"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "MASUK KE DASHBOARD"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
