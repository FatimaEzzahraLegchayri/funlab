import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Une expérience merveilleuse ! L'atelier d'aquarelle m'a permis de découvrir ma passion pour la peinture. L'ambiance est chaleureuse et l'accompagnement exceptionnel.",
    author: "Sophia",
    workshop: "Atelier Aquarelle",
  },
  {
    quote:
      "J'ai adoré l'atelier de poterie. L'instructeur était patient et passionné. J'ai créé mon premier bol et je suis tellement fière du résultat !",
    author: "Yahya",
    workshop: "Atelier Poterie",
  },
  {
    quote:
      "The Fun Lab est devenu mon refuge créatif. Chaque atelier est une nouvelle aventure artistique. Je recommande vivement à tous ceux qui veulent explorer leur créativité.",
    author: "Marie",
    workshop: "Ateliers Multiples",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">Témoignages</h2>
          <p className="text-lg text-muted-foreground">Ce que disent nos participants</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-4">
                <Quote className="w-10 h-10 text-accent/30" />

                <p className="text-muted-foreground leading-relaxed italic">"{testimonial.quote}"</p>

                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.workshop}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
