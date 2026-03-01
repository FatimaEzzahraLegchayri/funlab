import { Search, Calendar, Palette, ClipboardEdit, MousePointerClick, Sparkles } from "lucide-react"
import { WorkshopsSection } from "./workshops-section"

const atelierSteps = [
  {
    icon: Search,
    number: "01",
    title: "Choisissez un atelier",
    description: "Parcourez nos ateliers et trouvez celui qui vous inspire",
  },
  {
    icon: Calendar,
    number: "02",
    title: "Réservez votre place",
    description: "Réservez et confirmez votre place en quelques clics.",
  },
  {
    icon: Palette,
    number: "03",
    title: "Venez créer avec nous",
    description: "Rejoignez-nous et laissez libre cours à votre créativité",
  },
]

const openStudioSteps = [
  {
    icon: ClipboardEdit,
    number: "01",
    title: "Remplissez le formulaire",
    description: "Indiquez-nous votre créneau et le nombre de participants",
  },
  {
    icon: MousePointerClick,
    number: "02",
    title: "Choisissez votre projet",
    description: "Sélectionnez l’activité créative que vous souhaitez réaliser",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Venez créer",
    description: "Profitez de l’espace et du matériel pour vivre votre moment créatif à votre rythme",
  },
]

export function BookingProcessSection() {
  const renderSteps = (stepList: typeof atelierSteps) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto px-4">
      {stepList.map((step, index) => {
        const Icon = step.icon
        return (
          <div key={index} className="relative text-center group">
            {index < stepList.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[65%] w-[70%] h-[1px] bg-[#AB507B]/20 z-0" />
            )}

            <div className="flex flex-col items-center space-y-4 relative z-10">
              <div className="relative inline-flex transition-all duration-500 group-hover:scale-105">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-white border border-[#AB507B]/10 shadow-sm flex items-center justify-center">
                  <Icon className="w-8 h-8 md:w-9 md:h-9 text-[#AB507B]" />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#AB507B] text-white flex items-center justify-center font-bold text-xs md:text-sm shadow-lg shadow-[#AB507B]/20">
                  {step.number}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] mx-auto md:max-w-none">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )

  return (
    <section className="py-20 md:py-32 bg-[#FDFBF9]">
      <div className="container mx-auto px-6">
        

        <div className="space-y-12">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Comment ca marche ?
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[#AB507B]/30" />
            <p className="text-center text-[10px] md:text-xs font-bold text-[#AB507B] uppercase tracking-[0.4em]">
              Pour les Ateliers Privés
            </p>
            <div className="h-[1px] w-12 bg-[#AB507B]/30" />
          </div>
          {renderSteps(openStudioSteps)}
        </div>

        <div className="py-6 md:py-10">
        <WorkshopsSection />
        </div>

        <div className="space-y-12">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Comment ca marche ?
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[#AB507B]/30" />
            <p className="text-center text-[10px] md:text-xs font-bold text-[#AB507B] uppercase tracking-[0.4em]">
            Pour les ateliers guidés
            </p>
            <div className="h-[1px] w-12 bg-[#AB507B]/30" />
          </div>
          {renderSteps(atelierSteps)}
        </div>

      </div>
    </section>
  )
}