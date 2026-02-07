import { Button } from "./ui/button"

export function CtaSection() {
  return (
    /* Background updated to the warm cream/off-white seen in your Hero and How it Works sections */
    <section className="py-24 px-4 bg-[#FDFBF7]">
      <div className="mx-auto max-w-4xl text-center space-y-10">
        <div className="space-y-6">
          {/* Title updated to the brand mauve color #AB507B with a Serif font for premium feel */}
          <h2 className="text-4xl md:text-6xl font-serif text-[#AB507B] leading-tight">
            Prêt à Explorer Votre Créativité ?
          </h2>
          
          <p className="text-lg md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto text-pretty">
            Rejoignez-nous pour une expérience créative qui transformera votre vision de l'art. 
            Aucune compétence requise, juste votre envie d'explorer.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
          {/* Using the 'workshop' variant we created earlier with #AB507B */}
          <Button
            variant="workshop"
            size="lg"
            className="w-full sm:w-auto shadow-lg shadow-[#AB507B]/20 rounded-full"
          >
            Réserver Open Studio
          </Button>

          {/* Outline version for the secondary action */}
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-[#AB507B] text-[#AB507B] hover:bg-[#AB507B]/5 hover:text-[#AB507B] rounded-full uppercase tracking-widest text-xs font-bold px-10 h-12"
          >
            Réserver un workshop
          </Button>
        </div>
      </div>
    </section>
  )
}