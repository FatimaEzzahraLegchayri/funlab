'use client'

import Image from 'next/image'
import { MessageCircle, Maximize, Coffee, Wifi, Sparkles, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SpaceRental() {
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const MESSAGE = encodeURIComponent("Bonjour ! Je souhaiterais réserver votre espace à Casablanca. Voici mon projet, ainsi que la date et la durée souhaitées :");
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`

  const amenities = [
    { icon: <Maximize size={18} />, text: "Espace polyvalent" },
    { icon: <Wifi size={18} />, text: "Wifi Haut Débit" },
    { icon: <Briefcase size={18} />, text: "Bureau & Consultations" },
    { icon: <Sparkles size={18} />, text: "Matériel de qualité" },
  ]

  return (
    <section id='space-rental' className="py-20 px-6 bg-[#FDFBF9]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-5">
              <span className="text-[#B35D89] font-bold text-[10px] uppercase tracking-[0.3em] block">
                Location d'Espace
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
                Un cadre inspirant pour <br /> 
                <span className="italic text-[#B35D89]">vos projets.</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                <p>
                  Le Fun Lab vous propose un espace polyvalent et chaleureux à Casablanca, pensé pour accueillir tous vos projets créatifs ou professionnels.
                </p>
                <p className="text-sm md:text-base opacity-90">
                  Que vous souhaitiez organiser votre propre atelier, utiliser le bureau pour travailler ou pour vos consultations, notre espace s’adapte à vos besoins.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {amenities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#EBE3DE] shadow-sm">
                  <div className="text-[#B35D89]">{item.icon}</div>
                  <span className="text-xs font-bold text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <p className="text-gray-500 italic text-sm leading-relaxed border-l-2 border-[#B35D89]/20 pl-4">
                Dites-nous simplement ce dont vous avez besoin, la date et la durée — journée complète ou demi-journée — et nous nous assurerons que l’espace soit disponible pour vous.
              </p>

              <Button 
                asChild
                className="w-full sm:w-auto rounded-full bg-[#B35D89] text-white hover:bg-[#913d64] min-h-[4rem] h-auto py-4 px-10 text-sm md:text-base font-bold shadow-lg shadow-[#B35D89]/20 transition-all active:scale-95 whitespace-normal"
              >
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center text-center gap-3 w-full"
                >
                  <MessageCircle className="h-6 w-6 shrink-0" />
                  <span className="leading-tight">
                    Contactez-nous pour réserver
                  </span>
                </a>
              </Button>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative group">
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#B35D89]/20 rounded-[2.5rem] -z-10 group-hover:top-0 group-hover:right-0 transition-all duration-500"></div>
            
            <div className="relative h-[400px] sm:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
              src="/diverse-group-of-people-joyfully-painting-tote-bag.jpg" 
                alt="Location studio créatif Casablanca"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 right-6 left-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-white/50">
                <p className="text-[10px] font-bold text-[#B35D89] uppercase tracking-widest mb-1">Ambiance conviviale</p>
                <p className="text-sm text-gray-700 leading-snug">
                  Un lieu idéal pour créer, collaborer et partager des idées.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}