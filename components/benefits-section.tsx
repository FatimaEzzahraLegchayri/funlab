import { Sparkles, Users, Palette, Heart } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Esprit Convivial",
    description: "Limité à 10 places pour garantir votre confort et une ambiance cosy.",
  },
  {
    icon: Palette,
    title: "Matériel Inclus",
    description: "Tout le matériel artistique fourni et de qualité professionnelle",
  },
  {
    icon: Sparkles,
    title: "Artistes Passionnés",
    description: "Apprenez auprès d'artistes expérimentés et passionnés",
  },
  {
    icon: Heart,
    title: "Ambiance Conviviale",
    description: "Un espace chaleureux propice à la créativité et aux rencontres",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">
            Pourquoi Choisir The Fun Lab ?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center space-y-4 group">
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
