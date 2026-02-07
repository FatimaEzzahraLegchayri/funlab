import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users } from "lucide-react"

const workshops = [
  {
    title: "Aquarelle Florale",
    description: "Apprenez les techniques de l'aquarelle en créant de magnifiques compositions florales.",
    date: "15 Février 2026",
    time: "14h00 - 17h00",
    price: "650", // Updated prices to MAD (approximately 10x euro value)
    spots: 8,
    image: "/hands-shaping-clay-bowl-on-pottery-wheel-in-worksh.jpg",
  },
  {
    title: "Poterie & Céramique",
    description: "Découvrez l'art de la poterie en créant votre propre bol ou vase au tour.",
    date: "18 Février 2026",
    time: "10h00 - 13h00",
    price: "750",
    spots: 6,
    image: "/hands-shaping-clay-bowl-on-pottery-wheel-in-worksh.jpg",
  },
  {
    title: "Peinture Acrylique Abstraite",
    description: "Explorez votre créativité avec les techniques de la peinture abstraite contemporaine.",
    date: "22 Février 2026",
    time: "15h00 - 18h00",
    price: "600",
    spots: 10,
    image: "/hands-shaping-clay-bowl-on-pottery-wheel-in-worksh.jpg ",
  },
  {
    title: "Sculpture sur Bois",
    description: "Initiez-vous à la sculpture sur bois et créez votre première œuvre sculptée.",
    date: "25 Février 2026",
    time: "14h00 - 17h30",
    price: "700",
    spots: 7,
    image: "/hands-shaping-clay-bowl-on-pottery-wheel-in-worksh.jpg",
  },
  {
    title: "Calligraphie Moderne",
    description: "Maîtrisez l'art de la belle écriture avec les techniques de calligraphie contemporaine.",
    date: "28 Février 2026",
    time: "13h00 - 16h00",
    price: "550",
    spots: 12,
    image: "/hands-shaping-clay-bowl-on-pottery-wheel-in-worksh.jpg",
  },
  {
    title: "Macramé & Tissage",
    description: "Créez de superbes décorations murales avec les techniques du macramé et tissage.",
    date: "2 Mars 2026",
    time: "10h00 - 13h00",
    price: "500",
    spots: 10,
    image: "/hands-shaping-clay-bowl-on-pottery-wheel-in-worksh.jpg",
  },
]

export function WorkshopsSection() {
  return (
    <section id="ateliers" className="py-24 z-21">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">Nos Ateliers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des expériences créatives uniques pour tous les niveaux
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((workshop, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border bg-card"
            >
              <div className="relative h-56 overflow-hidden bg-muted">
                <img
                  src={workshop.image || "/placeholder.svg"}
                  alt={workshop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="space-y-3">
                <CardTitle className="font-serif text-2xl text-balance">{workshop.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{workshop.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>{workshop.date}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>{workshop.time}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">{workshop.price} MAD</span>
                  </div>

                  <Badge className="flex items-center gap-1 bg-[#E77872] text-white">
                    <Users className="w-3 h-3" />
                    <span>{workshop.spots} places</span>
                  </Badge>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full rounded-full" variant="workshop">Réserver ma place</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
