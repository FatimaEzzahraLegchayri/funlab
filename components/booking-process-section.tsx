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
    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
      {stepList.map((step, index) => {
        const Icon = step.icon
        return (
          <div key={index} className="relative text-center space-y-4">
            <div className="relative inline-flex">
              <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Icon className="w-10 h-10 text-accent" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {step.number}
              </div>
            </div>

            <h3 className="font-serif text-2xl font-semibold text-foreground">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>

            {/* Connecting Line */}
            {index < stepList.length - 1 && (
              <div className="hidden md:block absolute top-10 left-[65%] w-[70%] h-[1px] bg-border" />
            )}
          </div>
        )
      })}
    </div>
  )

  return (
    <section className="py-24 space-y-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Comment Ça Marche
          </h2>
        </div>

        {/* Ateliers Flow */}
        <div className="space-y-12">
          <p className="text-center text-lg font-medium text-muted-foreground uppercase tracking-widest">
            — Pour les ateliers —
          </p>
          {renderSteps(atelierSteps)}
        </div>

        {/* Divider */}
        <div className="max-w-xs mx-auto border-t border-border/50 pt-12" />

        {/* Open Studio Flow */}
        <div className="space-y-12">
          <p className="text-center text-lg font-medium text-muted-foreground uppercase tracking-widest">
            — Pour l'Open Studio —
          </p>
          {renderSteps(openStudioSteps)}
        </div>
      </div>
    </section>
  )
}