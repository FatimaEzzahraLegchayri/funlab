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
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
            Témoignages
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Ce que disent nos participants
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className={`border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <CardContent className="p-6 md:p-8 space-y-4 flex flex-col h-full">
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#AB507B]/20 shrink-0" />

                <p className="text-muted-foreground leading-relaxed italic text-sm md:text-base flex-grow">
                  "{testimonial.quote}"
                </p>

                <div className="pt-4 border-t border-border mt-auto">
                  <p className="font-bold text-foreground text-base">
                    {testimonial.author}
                  </p>
                  <p className="text-xs md:text-sm text-[#AB507B] font-medium">
                    {testimonial.workshop}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}