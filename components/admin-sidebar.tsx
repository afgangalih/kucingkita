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
  Languages,
  Award,
  ChevronRight,
  PackageSearch,
  LucideIcon
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { supabase } from "@/lib/supabase";

interface NavSubItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface NavItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  items?: NavSubItem[];
}

interface NavData {
  main: NavItem[];
  database: NavItem[];
  community: NavItem[];
  system: NavItem[];
}

const navigationData: NavData = {
  main: [{ title: "Dashboard", url: "/admin", icon: LayoutDashboard }],
  database: [
    { title: "Ras Kucing", url: "/admin/ras", icon: Cat },
    {
      title: "Nutrisi & Produk",
      icon: PackageSearch,
      items: [
        { title: "Katalog Makanan", url: "/admin/makanan", icon: Utensils },
        { title: "Merek & Brand", url: "/admin/brand", icon: Award },
      ],
    },
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
    <Sidebar collapsible="icon" className="border-r-0 bg-white">
      <SidebarHeader className="h-20 border-b border-slate-100 flex justify-center">
        <div className={`flex items-center transition-all duration-300 ${isCollapsed ? "justify-center px-0" : "px-4 gap-4"}`}>
          <div className="relative flex items-center justify-center h-11 w-11 shrink-0">
            <div className="absolute inset-0 bg-slate-900 rounded-2xl shadow-lg shadow-slate-200"></div>
            <PawPrint className="relative h-6 w-6 text-white" />
          </div>
          
          {!isCollapsed && (
            <div className="flex flex-col min-w-0 pr-4">
              <div className="flex items-baseline">
                <span className="font-black text-lg uppercase italic tracking-tighter text-slate-900 leading-none">
                  KUCINGKITA
                </span>
                <span className="font-black text-lg italic text-primary leading-none ml-0.5">
                  .id
                </span>
              </div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1 leading-none">
                MANAGEMENT
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 gap-3 scrollbar-none">
        {[
          { label: "Main Overview", items: navigationData.main },
          { label: "Core Database", items: navigationData.database },
          { label: "Community", items: navigationData.community },
          { label: "System Control", items: navigationData.system }
        ].map((group, idx) => (
          <SidebarGroup key={idx} className="p-0">
            {!isCollapsed && (
              <SidebarGroupLabel className="px-3 mb-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-slate-300">
                {group.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="gap-1">
              {group.items.map((item) => {
                if (item.items && item.items.length > 0) {
                  return (
                    <Collapsible key={item.title} asChild className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={item.title} className="h-9 rounded-xl transition-colors hover:bg-slate-50 data-[state=open]:bg-slate-50/50">
                            <item.icon className="h-[1.05rem] w-[1.05rem] text-slate-500 group-hover:text-slate-900 transition-colors" />
                            {!isCollapsed && (
                              <>
                                <span className="flex-1 text-[11px] font-bold uppercase tracking-tight text-slate-600 group-hover:text-slate-900">{item.title}</span>
                                <ChevronRight className="h-3 w-3 text-slate-300 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                              </>
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className="ml-5 mt-0.5 border-l border-slate-100 pl-2 gap-0.5">
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild className="h-7 rounded-lg transition-all hover:bg-transparent group/sub">
                                  <a href={subItem.url} className="flex items-center gap-2.5">
                                    <div className="h-1 w-1 rounded-full bg-slate-200 group-hover/sub:bg-primary transition-colors" />
                                    <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400 group-hover/sub:text-slate-900 transition-colors">
                                      {subItem.title}
                                    </span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title} 
                      className={`h-9 rounded-xl transition-all hover:bg-slate-50 ${isCollapsed ? "justify-center" : "px-3"}`}
                    >
                      <a href={item.url} className="flex items-center gap-2.5">
                        <item.icon className="h-[1.05rem] w-[1.05rem] text-slate-500 hover:text-slate-900 transition-colors" />
                        {!isCollapsed && (
                          <span className="text-[11px] font-bold uppercase tracking-tight text-slate-600 hover:text-slate-900">
                            {item.title}
                          </span>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3 mt-auto border-t border-slate-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className={`h-10 rounded-xl font-bold uppercase tracking-widest text-[9px] text-red-400 hover:bg-red-50 hover:text-red-600 transition-all ${isCollapsed ? "justify-center px-0" : "px-4"}`}
            >
              <LogOut className="h-3.5 w-3.5 shrink-0" />
              {!isCollapsed && <span className="ml-2">Logout System</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}