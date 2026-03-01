import Image from 'next/image';
import { MessageCircle, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivateEvents() {
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER; 
  const MESSAGE = encodeURIComponent("Bonjour ! Je souhaiterais créer un événement sur mesure au Fun Lab (Anniversaire / Entreprise). Pourrais-je avoir plus d'informations ?");
  const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;

  const inclusions = [
    "Atelier créatif guidé",
    "Tout le matériel inclus",
    "Accompagnement du début à la fin",
    "Un espace chaleureux rien que pour vous"
  ];

  return (
    <section id='private-events' className="py-20 px-6 bg-[#FDFBF9]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-white rotate-1">
            <Image
              src="/diverse-group-of-people-joyfully-painting-tote-bag.jpg" 
              alt="Événements privés au Fun Lab"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-5">
              <h3 className="text-[#B35D89] font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-2">
                <Sparkles size={12} /> Événements privés
              </h3>
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-[1.1]">
                Célébrez vos moments <br /> 
                <span className="italic text-[#B35D89]">sur mesure.</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                Anniversaire, événement d’entreprise ou moment spécial à célébrer — le Fun Lab crée des expériences uniques pour votre groupe. Chaque événement est personnalisé et adapté à vos envies.
              </p>
            </div>

            <div className="bg-white/50 border border-[#B35D89]/10 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-800">Ce qui est inclus</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {inclusions.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#B35D89]/10 flex items-center justify-center">
                      <Check size={12} className="text-[#B35D89]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-500 italic text-sm">
              Il suffit de nous dire ce que vous avez en tête — nous nous occupons du reste.
            </p>

            <div className="pt-2 w-full max-w-md mx-auto lg:mx-0">
  <Button 
    asChild
    className="w-full sm:w-auto rounded-[2rem] bg-[#25D366] hover:bg-[#1eb956] text-white min-h-[4rem] h-auto py-4 px-8 text-sm md:text-base font-bold shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center whitespace-normal"
  >
    <a 
      href={WHATSAPP_URL} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="flex items-center justify-center text-center gap-3 w-full"
    >
      <MessageCircle className="h-6 w-6 shrink-0" />
      <span className="flex-1 leading-tight py-1">
        Contactez-nous pour créer votre événement
      </span>
    </a>
  </Button>
</div>
          </div>

        </div>
      </div>
    </section>
  );
}