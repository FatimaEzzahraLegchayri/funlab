"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Loader2, Palette } from "lucide-react";

import { WorkshopBookingModal } from "./modals/workshopBookingModal"; 
import { getWorkshops } from "@/lib/service/workshopService"; 
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export function WorkshopsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const workshopsRef = collection(db, "workshops");
    const q = query(
      workshopsRef, 
      where("status", "==", "published"),
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const publicWorkshops = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setWorkshops(publicWorkshops);
      setLoading(false);
    }, (error : any) => {
      console.error("Live update error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleBookClick = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  return (
    <section id="ateliers" className="py-24 z-21">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">Nos Ateliers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des expériences créatives uniques pour tous les niveaux
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-accent" />
          </div>
        ) : workshops.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((workshop) => (
              <Card
                key={workshop.id} 
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
                  <CardDescription className="text-base leading-relaxed line-clamp-2">
                    {workshop.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{workshop.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{workshop.startTime} - {workshop.endTime}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-foreground">{workshop.price} MAD</span>
                    </div>

                    <Badge 
                      className={`flex items-center gap-1 text-white ${
                        (workshop.capacity - (workshop.bookedSeats || 0)) <= 0 
                          ? "bg-muted-foreground" 
                          : "bg-[#E77872]"
                      }`}
                    >
                      <Users className="w-3 h-3" />
                      <span>
                        {Math.max(0, workshop.capacity - (workshop.bookedSeats || 0))} places restantes
                      </span>
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    disabled={workshop.capacity - (workshop.bookedSeats || 0) <= 0}
                    className="w-full rounded-full" 
                    variant="workshop"
                    onClick={() => handleBookClick(workshop)}
                  >
                    Réserver ma place
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (

      <div className="max-w-md mx-auto text-center py-20 px-6 bg-muted/30 rounded-[2rem] border-2 border-dashed border-muted-foreground/20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background mb-6 shadow-sm">
              <Palette className="w-8 h-8 text-accent/60" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
              Nouvelles sessions en préparation
            </h3>
            <p className="text-muted-foreground mb-8">
              Toutes nos sessions actuelles sont complètes ou terminées. Nous préparons de nouveaux moments de création pour vous !
            </p>

          </div>
        )}
      </div>

      {isModalOpen && (
        <WorkshopBookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          workshop={selectedWorkshop}
        />
      )}
    </section>
  )
}