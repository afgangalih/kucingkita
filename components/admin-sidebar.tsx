// components/admin-sidebar.tsx
"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Cat,
  Users,
  Settings,
  LogOut,
  PawPrint,
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
} from "@/components/ui/sidebar";
import { supabase } from "@/lib/supabase";

const data = {
  navMain: [
    { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
    { title: "Kelola Ras", url: "/admin/ras", icon: Cat },
    { title: "Users", url: "/admin/users", icon: Users },
  ],
  settings: [{ title: "Pengaturan", url: "/admin/settings", icon: Settings }],
};

export function AppSidebar() {
  const handleLogout = async () => {
    // 1. hapus session client-side di supabase
    await supabase.auth.signOut();

    // 2. hapus cookie sb-access-token
    document.cookie =
      "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax;";

    // 3. arahkan ke halaman login
    window.location.href = "/login";
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-primary rounded-lg p-1.5 shadow-lg">
            <PawPrint className="h-5 w-5 text-white" />
          </div>
          <span className="font-black tracking-tighter text-lg truncate group-data-[collapsible=icon]:hidden">
            KucingKita<span className="text-primary">.id</span>
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url} className="font-medium">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sistem</SidebarGroupLabel>
          <SidebarMenu>
            {data.settings.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Keluar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
