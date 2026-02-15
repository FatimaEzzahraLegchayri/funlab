import { Button } from "@/components/ui/button"
import { MapPin, Instagram, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  const whatsappMsg = encodeURIComponent("Bonjour The Fun Lab ! Je souhaite avoir des informations sur open studio.")
  
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-4 mb-12 md:mb-20">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
              Nous Contacter
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Venez nous rendre visite ou contactez-nous
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            
            {/* Left Column: Info */}
            <div className="space-y-8 md:space-y-10 text-center md:text-left">
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-foreground flex items-center justify-center md:justify-start gap-2">
                  Notre Atelier
                </h3>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 text-muted-foreground group">
                  <MapPin className="w-5 h-5 text-[#AB507B] shrink-0 transition-transform group-hover:bounce" />
                  <p className="leading-relaxed text-sm md:text-base">
                    Californie, Casablanca, Maroc
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-foreground flex items-center justify-center md:justify-start gap-2">
                  Horaires d'Ouverture
                </h3>
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-[#AB507B] shrink-0 hidden md:block" />
                  <p className="text-sm md:text-base leading-relaxed">
                    <span className="font-medium text-foreground">Mardi - Samedi:</span> 10h00 - 19h00
                    <br />
                    <span className="font-medium text-foreground">Dimanche:</span> 14h00 - 18h00
                    <br />
                    <span className="text-[#AB507B]/70 italic">Fermé le lundi</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Socials/CTA */}
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <h3 className="font-serif text-2xl font-semibold text-foreground text-center md:text-left">
                Suivez-Nous
              </h3>

              <div className="flex flex-col gap-4 w-full max-w-[320px] md:max-w-none">
                <Link href="https://www.instagram.com/the.fun.lab/" target="_blank" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center md:justify-start gap-3 rounded-full bg-transparent hover:bg-[#AB507B]/5 border-2 border-[#AB507B]/20 hover:border-[#AB507B]/40 hover:text-foreground h-12 md:h-14 transition-all" 
                    size="lg"
                  >
                    <Instagram className="w-5 h-5 text-[#AB507B]" />
                    <span className="font-medium text-sm md:text-base tracking-wide">@thefunlab</span>
                  </Button>
                </Link>

                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                  target="_blank"
                  className="w-full"
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-center md:justify-start gap-3 rounded-full bg-transparent hover:bg-green-50 border-2 border-green-100 hover:border-green-200 hover:text-foreground h-12 md:h-14 transition-all" 
                    size="lg"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-sm md:text-base tracking-wide">WhatsApp</span>
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}