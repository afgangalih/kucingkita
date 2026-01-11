// app/(admin)/admin/layout.tsx
import { AppSidebar } from "@/components/admin-sidebar"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "sonner"; 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-[#fcfcfc]">
        
        <Toaster position="top-center" richColors closeButton />
        
        <header className="sticky top-0 z-10 flex h-20 shrink-0 items-center bg-white/50 px-6 backdrop-blur-md">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-9 w-9 rounded-xl border-none bg-slate-100 hover:bg-slate-200" />
              <Separator orientation="vertical" className="h-4" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Portal Admin</span>
                <span className="text-xs font-semibold text-slate-900">Kendali Utama</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}