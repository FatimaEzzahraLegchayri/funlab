import { Search, Calendar, Palette, ClipboardEdit, MousePointerClick, Sparkles } from "lucide-react"

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
    title: "Choisissez l'activité",
    description: "Sélectionnez votre projet créatif parmi nos options",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Venez vous amuser",
    description: "Profitez de l'espace et du matériel pour créer en toute liberté",
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
              <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-border/60 z-0" />
            )}

            <div className="flex flex-col items-center space-y-4 relative z-10">
              <div className="relative inline-flex transition-transform duration-300 group-hover:scale-110">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#AB507B]/10 flex items-center justify-center">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#AB507B]" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#AB507B] text-white flex items-center justify-center font-bold text-xs md:text-sm shadow-md">
                  {step.number}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-[280px] mx-auto md:max-w-none">
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
    <section className="py-16 md:py-24 space-y-16 md:space-y-24 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Comment Ça Marche
          </h2>
          <div className="w-20 h-1 bg-[#AB507B]/20 mx-auto rounded-full" />
        </div>

        <div className="space-y-10">
          <p className="text-center text-xs md:text-sm font-bold text-[#AB507B] uppercase tracking-[0.3em]">
            Pour les ateliers
          </p>
          {renderSteps(atelierSteps)}
        </div>

        <div className="max-w-xs mx-auto py-12 md:py-16">
          <div className="border-t border-border/60" />
        </div>

        <div className="space-y-10">
          <p className="text-center text-xs md:text-sm font-bold text-[#AB507B] uppercase tracking-[0.3em]">
            Pour l&apos;Open Studio
          </p>
          {renderSteps(openStudioSteps)}
        </div>
      </div>
    </section>
  )
}