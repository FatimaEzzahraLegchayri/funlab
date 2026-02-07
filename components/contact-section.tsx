import { Button } from "@/components/ui/button"
import { MapPin, Instagram, MessageCircle } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  const whatsappMsg = encodeURIComponent("Bonjour The Fun Lab ! Je souhaite avoir des informations sur open studio.")
  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">Nous Contacter</h2>
            <p className="text-lg text-muted-foreground">Venez nous rendre visite ou contactez-nous</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">Notre Atelier</h3>
                <div className="flex gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-[#AB507B] mt-1 flex-shrink-0" />
                  <p className="leading-relaxed">
                  Californie, Casablanca, Maroc
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">Horaires d'Ouverture</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mardi - Samedi: 10h00 - 19h00
                  <br />
                  Dimanche: 14h00 - 18h00
                  <br />
                  Fermé le lundi
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-semibold text-foreground">Suivez-Nous</h3>

              <div className="flex flex-col gap-3">
                <Link href="https://www.instagram.com/the.fun.lab/" target="_blank">
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-full bg-transparent hover:bg-foreground/5 hover:text-foreground" size="lg">
                    <Instagram className="w-5 h-5" />
                    <span>@thefunlab</span>
                  </Button>
                </Link>

                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                  >
                  <Button variant="outline" className="w-full justify-start gap-3 rounded-full bg-transparent hover:bg-foreground/5 hover:text-foreground" size="lg">
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </Button>
                </Link>
              </div>

              <Button className="w-full rounded-full mt-4" size="lg" variant="workshop">
                Nous Contacter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
