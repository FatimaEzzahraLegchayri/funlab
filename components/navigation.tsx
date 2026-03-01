"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  const navLinks = [
    { href: "/#open-studio", label: "Atelier privé" },
    { href: "/#ateliers", label: "Ateliers guidés" },
    { href: "/#private-events", label: "événement privé" },
    { href: "/#space-rental", label: "location d'éspace" },
    { href: "/#contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        
        <Link 
          href="/" 
          className="font-serif text-2xl tracking-tight font-bold text-foreground hover:opacity-80 transition-opacity"
        >
          <Image 
            src="/logo.png" 
            alt="The Fun Lab Logo"
            width={150} 
            height={40} 
            className="h-8 md:h-10 lg:h-16 w-auto object-contain" 
            priority 
          />
        </Link>

        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.1em] font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
          <Link href="#ateliers" scroll={true}>
          <Button 
            size="lg" 
            className="rounded-full px-8 py-6 text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95" 
            variant="workshop"
          >
            Réserver
          </Button>
          </Link>
        </div>

        <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-7 w-7 text-[#AB507B]" />
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-[80%] sm:w-[350px] bg-background border-l border-border/40 flex flex-col p-0"
            >
              <SheetHeader className="p-6 border-b border-border/10 flex flex-row items-center justify-between">
                <SheetTitle className="text-left">
                   <Image src="/logo.PNG" alt="Logo" width={100} height={30} className="h-6 w-auto" />
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col flex-1 px-8 py-10">
                <div className="space-y-6">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-[11px] uppercase tracking-[0.25em] font-bold text-muted-foreground hover:text-[#AB507B] transition-colors border-b border-border/5 pb-4"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                <div className="mt-auto pb-10">
                  <Link href="#ateliers">
                  <Button 
                    variant="workshop" 
                    className="w-full py-7 text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-[#AB507B]/10"
                    onClick={() => setIsOpen(false)}
                  >
                    Réserver un créneau
                  </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
      
        </div>
      </div>
    </nav>
  )
}