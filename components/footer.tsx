import Link from "next/link"
import { Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  const whatsappMsg = encodeURIComponent("Bonjour The Fun Lab ! Je souhaite avoir des informations sur open studio.")

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          <div className="text-center md:text-left space-y-2">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              The Fun Lab
            </h3>
            <p className="text-sm md:text-base text-muted-foreground italic max-w-[250px] md:max-w-none">
              Créer, apprendre, s'épanouir ensemble
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold hidden md:block">
              Suivez l'aventure
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://www.instagram.com/the.fun.lab/"
                target="_blank"
                className="w-12 h-12 rounded-full bg-[#AB507B]/10 flex items-center justify-center hover:bg-[#AB507B] hover:text-white text-[#AB507B] transition-all duration-300 shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                target="_blank"
                className="w-12 h-12 rounded-full bg-[#AB507B]/10 flex items-center justify-center hover:bg-[#AB507B] hover:text-white text-[#AB507B] transition-all duration-300 shadow-sm"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-xs md:text-sm text-muted-foreground">
          <p>© 2026 The Fun Lab. Tous droits réservés.</p>
          
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="hover:text-[#AB507B] transition-colors">
              Mentions Légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-[#AB507B] transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}