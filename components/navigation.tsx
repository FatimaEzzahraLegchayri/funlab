import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-bold text-foreground">
          The Fun Lab
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#ateliers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ateliers
          </Link>
          <Link href="#open-studio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Open Studio
          </Link>
          <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
          <Button size="sm" className="rounded-full px-5" variant="workshop">
            Réserver
          </Button>
        </div>
      </div>
    </nav>
  )
}
