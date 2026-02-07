import Link from "next/link"
import { Instagram, MessageCircle } from "lucide-react"

export function Footer() {

  const whatsappMsg = encodeURIComponent("Bonjour The Fun Lab ! Je souhaite avoir des informations sur open studio.")

  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">The Fun Lab</h3>
            <p className="text-sm text-muted-foreground italic">Créer, apprendre, s'épanouir ensemble</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/the.fun.lab/"
              className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
            >
              <Instagram className="w-5 h-5 text-accent" />
            </Link>
            <Link
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-accent" />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2026 The Fun Lab. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
