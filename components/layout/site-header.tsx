"use client";

import * as React from "react";
import Link from "next/link";
import { PawPrint, User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 md:h-20" />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-primary rounded-xl p-1.5 md:p-2 shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12 duration-300">
              <PawPrint className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-black tracking-tighter italic">
              KucingKita<span className="text-primary">.id</span>
            </h1>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent font-bold"
                  )}
                >
                  <Link href="/ras-kucing">Ras Kucing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent font-bold">
                  Anabul Care
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <MegaMenuContent />
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent font-bold"
                  )}
                >
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

                <SheetContent
                  side="right"
                  className="w-[85%] max-w-95 p-0 flex flex-col border-l rounded-none"
                >
                  <SheetHeader className="p-6 border-b text-left">
                    <SheetTitle className="flex items-center gap-2">
                      <PawPrint className="h-5 w-5 text-primary" />
                      <span className="font-black italic">KucingKita.id</span>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto p-6">
                    <nav className="flex flex-col space-y-2">
                      <Link
                        href="/ras-kucing"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-bold p-3 rounded-xl hover:bg-muted transition-colors"
                      >
                        Ras Kucing
                      </Link>

                      <Collapsible className="w-full">
                        <CollapsibleTrigger className="flex w-full items-center justify-between p-3 text-lg font-bold hover:bg-muted rounded-xl transition-colors group">
                          Anabul Care
                          <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="px-4 py-2 space-y-1 animate-in slide-in-from-top-1">
                          <MobileListItem
                            title="Katalog Makanan"
                            href="/food"
                            onClick={() => setIsOpen(false)}
                          />
                          <MobileListItem
                            title="Kesehatan Vet"
                            href="/kesehatan"
                            onClick={() => setIsOpen(false)}
                          />
                          <MobileListItem
                            title="Wellness"
                            href="/wellness"
                            onClick={() => setIsOpen(false)}
                          />
                          <MobileListItem
                            title="Perilaku"
                            href="/behaviour"
                            onClick={() => setIsOpen(false)}
                          />
                        </CollapsibleContent>
                      </Collapsible>

                      <Link
                        href="/komunitas"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-bold p-3 rounded-xl hover:bg-muted transition-colors"
                      >
                        Komunitas
                      </Link>
                    </nav>
                  </div>

                  <div className="p-6 bg-background border-t">
                    <Button className="w-full h-12 rounded-xl font-black shadow-lg shadow-primary/20 text-primary-foreground">
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
  );
}

function MegaMenuContent() {
  return (
    <div className="w-175 p-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-black text-foreground mb-4 px-3 italic">
            Anabul Care
          </h3>
          <ul className="space-y-1">
            <ListItem title="Katalog Makanan" href="/food">
              Temukan referensi nutrisi terbaik untuk kucing Anda
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
        <div className="flex items-center justify-center">
          <div className="w-full h-70 bg-slate-50 dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative">
            <PawPrint className="h-12 w-12 text-slate-200 dark:text-slate-800 mb-2" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
              Anabul Care Center
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
}: {
  title: string;
  children: string;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-xl p-3 transition-all hover:bg-primary/5 hover:text-primary group border border-transparent hover:border-primary/10"
        >
          <div className="text-sm font-bold tracking-tight">{title}</div>
          <p className="text-xs text-muted-foreground leading-snug line-clamp-2">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function MobileListItem({
  title,
  href,
  onClick,
}: {
  title: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
    >
      {title}
    </Link>
  );
}