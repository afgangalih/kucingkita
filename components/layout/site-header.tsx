"use client"

import * as React from "react"
import Link from "next/link"
import { PawPrint, User, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import ModeToggle from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 md:h-20" />
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-primary rounded-xl p-1.5 md:p-2 shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12 duration-300">
              <PawPrint className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-black tracking-tighter">
              KucingKita<span className="text-primary">.id</span>
            </h1>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold")}>
                  <Link href="/ras-kucing">Ras Kucing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-bold">Anabul Care</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuContent />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "bg-transparent font-bold")}>
                  <Link href="/komunitas">Komunitas</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 md:gap-4">
            <ModeToggle />
            <Button className="hidden md:flex rounded-2xl font-black px-6 bg-primary shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all gap-2 text-primary-foreground">
              <User className="h-4 w-4" />
              <span>MASUK</span>
            </Button>

            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col border-l-0 rounded-l-[2rem]">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center gap-2">
                      <PawPrint className="h-6 w-6 text-primary" />
                      <span className="font-black">KucingKita.id</span>
                    </SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <nav className="flex flex-col space-y-4">
                      <Link href="/ras-kucing" onClick={() => setIsOpen(false)} className="text-2xl font-bold px-2">Ras Kucing</Link>
                      
                      <Collapsible className="space-y-2">
                        <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-2 text-2xl font-bold hover:text-primary transition-colors group">
                          Anabul Care
                          <ChevronDown className="h-6 w-6 transition-transform group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-4 pr-2 pt-2 pb-4 space-y-4 bg-muted/30 rounded-3xl mt-2 animate-in slide-in-from-top-2 duration-300">
                           <ul className="grid gap-4">
                              <MobileListItem title="Nutrisi & Diet" href="/nutrisi" onClick={() => setIsOpen(false)} />
                              <MobileListItem title="Kesehatan Vet" href="/kesehatan" onClick={() => setIsOpen(false)} />
                              <MobileListItem title="Wellness" href="/wellness" onClick={() => setIsOpen(false)} />
                              <MobileListItem title="Perilaku" href="/behaviour" onClick={() => setIsOpen(false)} />
                           </ul>
                        </CollapsibleContent>
                      </Collapsible>

                      <Link href="/komunitas" onClick={() => setIsOpen(false)} className="text-2xl font-bold px-2">Komunitas</Link>
                    </nav>
                  </div>

                  <div className="p-6 border-t mt-auto">
                    <Button className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 text-primary-foreground">
                      MASUK
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function MegaMenuContent() {
  return (
    <div className="w-[700px] p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side - Menu Items */}
        <div className="space-y-2">
          <h3 className="text-lg font-black text-foreground mb-4 px-3">Anabul Care</h3>
          <ul className="space-y-1">
            <ListItem title="Nutrisi & Diet" href="/nutrisi">
              Makanan terbaik untuk kucing Anda
            </ListItem>
            <ListItem title="Kesehatan Vet" href="/kesehatan">
              Vaksinasi dan konsultasi dokter hewan
            </ListItem>
            <ListItem title="Wellness" href="/wellness">
              Tips kebersihan dan perawatan kucing
            </ListItem>
            <ListItem title="Perilaku" href="/behaviour">
              Memahami bahasa tubuh kucing
            </ListItem>
          </ul>
        </div>

        {/* Right Side - Image Placeholder */}
        <div className="flex items-center justify-center">
          <div className="w-full h-[280px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden relative">
            {/* Placeholder untuk gambar kucing */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PawPrint className="h-16 w-16 text-slate-300 dark:text-slate-700" />
            </div>
            {/* Text overlay untuk preview */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Image Preview Area
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ListItem({ title, children, href }: { title: string; children: string; href: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link 
          href={href} 
          className="block select-none space-y-1 rounded-xl p-3 transition-all hover:bg-primary/5 hover:text-primary group"
        >
          <div className="text-sm font-bold tracking-tight group-hover:text-primary">
            {title}
          </div>
          <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

function MobileListItem({ title, href, onClick }: { title: string; href: string, onClick: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="block px-2 py-1 text-base font-bold text-muted-foreground hover:text-primary transition-colors"
    >
      {title}
    </Link>
  )
}