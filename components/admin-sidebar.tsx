"use client";
import * as React from "react";
import {
  LayoutDashboard,
  Cat,
  Users,
  Settings,
  LogOut,
  PawPrint,
  Utensils,
  BookOpen,
  MapPin,
  MessageSquare,
  Camera,
  ShieldCheck,
  Languages
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { supabase } from "@/lib/supabase";

const navigationData = {
  main: [{ title: "Dashboard", url: "/admin", icon: LayoutDashboard }],
  management: [
    { title: "Ras Kucing", url: "/admin/ras", icon: Cat },
    { title: "Katalog Makanan", url: "/admin/makanan", icon: Utensils },
    { title: "Artikel & Edukasi", url: "/admin/artikel", icon: BookOpen },
    { title: "Direktori Vet", url: "/admin/vet", icon: MapPin },
  ],
  community: [
    { title: "Moderasi Galeri", url: "/admin/galeri", icon: Camera },
    { title: "Forum Diskusi", url: "/admin/forum", icon: MessageSquare },
    { title: "Submissions", url: "/admin/submissions", icon: ShieldCheck },
  ],
  system: [
    { title: "User & Role", url: "/admin/users", icon: Users },
    { title: "Bilingual", url: "/admin/bahasa", icon: Languages },
    { title: "Pengaturan", url: "/admin/settings", icon: Settings },
  ],
};

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax;";
    window.location.href = "/login";
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {/* HEADER: Clean & Balanced */}
      <SidebarHeader className="h-16 border-b border-slate-200/60">
        <div className={`flex items-center transition-all duration-300 h-full ${isCollapsed ? "justify-center px-3" : "px-4 gap-3"}`}>
          {/* Logo Container - Always Visible */}
          <div className="relative flex items-center justify-center h-10 w-10 shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/25"></div>
            <PawPrint className="relative h-5 w-5 text-white" />
          </div>
          
          {/* Brand Text - Hidden When Collapsed */}
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 overflow-hidden">
              <div className="flex items-baseline gap-1">
                <span className="font-bold text-base text-slate-900 tracking-tight">KucingKita</span>
                <span className="font-bold text-base text-primary">.id</span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Admin Panel</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 gap-4">
        {/* Navigation Groups */}
        {[
          { label: "Main", items: navigationData.main },
          { label: "Database", items: navigationData.management },
          { label: "Moderasi", items: navigationData.community },
          { label: "Sistem", items: navigationData.system }
        ].map((group, idx) => (
          <SidebarGroup key={idx} className="p-0">
            {!isCollapsed && (
              <SidebarGroupLabel className="px-2 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="gap-1">
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title} 
                    className={`h-10 rounded-lg transition-all duration-200 hover:bg-slate-100 active:scale-[0.98] ${isCollapsed ? "justify-center px-0" : "px-3"}`}
                  >
                    <a href={item.url} className="flex items-center gap-3 font-medium text-slate-700 hover:text-slate-900">
                      <item.icon className="h-[1.15rem] w-[1.15rem] shrink-0" />
                      {!isCollapsed && <span className="truncate text-sm">{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3 mt-auto border-t border-slate-200/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Keluar"
              className={`h-10 rounded-lg font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 active:scale-[0.98] ${isCollapsed ? "justify-center px-0" : "px-3"}`}
            >
              <LogOut className="h-[1.15rem] w-[1.15rem] shrink-0" />
              {!isCollapsed && <span className="text-sm">Keluar</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}