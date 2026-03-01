import { Sparkles, Users, Palette, Heart } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Un espace chaleureux et accueillant",
    description: "Ici, tout est pensé pour que tu te sentes bien dès que tu passes la porte.",
  },
  {
    icon: Palette,
    title: "Tout est inclus",
    description: "Matériel, peinture, outils — tu arrives les mains vides, tu repars avec ta création.",
  },
  {
    icon: Sparkles,
    title: "Une approche humaine",
    description: "On prend le temps. On t’accompagne à ton rythme, sans pression.",
  },
  {
    icon: Heart,
    title: "Plus qu’un atelier",
    description: "Le Fun Lab, c’est aussi un lieu de rencontres, de partages et de belles connexions",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
            Pourquoi le Fun Lab ?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center space-y-4 group px-5">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
