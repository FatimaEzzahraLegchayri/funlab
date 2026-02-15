"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
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
    { href: "#ateliers", label: "Ateliers" },
    { href: "#open-studio", label: "Open Studio" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
        
        <Link 
          href="/" 
          className="font-serif text-2xl tracking-tight font-bold text-foreground hover:opacity-80 transition-opacity"
        >
          The Fun Lab
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
                {/* Underline animation */}
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

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-8 w-8 stroke-[1.5]" />
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-[87%] sm:w-[400px] bg-background/95 backdrop-blur-2xl border-l border-border/40 flex flex-col p-0"
            >
              <SheetHeader className="p-8 border-b border-border/20">
                <div className="flex items-center justify-between">
                  <SheetTitle className="font-serif text-2xl tracking-tight">The Fun Lab</SheetTitle>
                </div>
              </SheetHeader>

              <div className="flex flex-col flex-1 px-8 py-12 gap-8">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-serif tracking-tight text-foreground/80 hover:text-foreground transition-colors"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="mt-auto pb-10">
                  <Button 
                    variant="workshop" 
                    className="w-full py-8 text-lg rounded-2xl"
                    onClick={() => setIsOpen(false)}
                  >
                    Réserver
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}