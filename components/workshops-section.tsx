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
    <section id="ateliers" className="py-16 md:py-24 z-21">
    <div className="container mx-auto px-4">

      <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-16">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance tracking-tight px-2">
          Ateliers guidés
        </h2>

        <div className="space-y-4 max-w-3xl mx-auto px-2">
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed font-light">
            Le Fun Lab organise occasionnellement des ateliers guidés pour te faire découvrir de 
            <span className="text-foreground/80 font-medium px-1">nouvelles techniques créatives.</span>
          </p>

          <p className="text-[11px] md:text-sm lg:text-base text-muted-foreground/80 leading-relaxed italic max-w-2xl mx-auto">
            Parfois autour d’un thème, parfois pour une occasion spéciale — chaque atelier est unique, 
            pensé avec soin… et toujours animé avec le sourire.
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <div className="w-8 h-[1px] bg-[#AB507B]/30" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-accent" />
        </div>
      ) : workshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {workshops.map((workshop) => (
            <Card
              key={workshop.id} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-border bg-card flex flex-col"
            >
              <div className="relative h-48 md:h-56 overflow-hidden bg-muted">
                <img
                  src={workshop.image || "/placeholder.svg"}
                  alt={workshop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader className="space-y-2 p-5 md:p-6">
                <CardTitle className="font-serif text-xl md:text-2xl text-balance">
                  {workshop.title}
                </CardTitle>
                <CardDescription className="text-sm md:text-base leading-relaxed line-clamp-2">
                  {workshop.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 p-5 md:p-6 pt-0 flex-grow">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{workshop.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{workshop.startTime} - {workshop.endTime}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xl md:text-2xl font-bold text-foreground">
                      {workshop.price} MAD
                    </span>
                  </div>

                  <Badge 
                    className={`flex items-center gap-1 text-[10px] md:text-xs text-white py-1 ${
                      (workshop.capacity - (workshop.bookedSeats || 0)) <= 0 
                        ? "bg-muted-foreground" 
                        : "bg-[#E77872]"
                    }`}
                  >
                    <Users className="w-3 h-3" />
                    <span className="whitespace-nowrap">
                      {Math.max(0, workshop.capacity - (workshop.bookedSeats || 0))} places
                    </span>
                  </Badge>
                </div>
              </CardContent>

              <CardFooter className="p-5 md:p-6 pt-0">
                <Button 
                  disabled={workshop.capacity - (workshop.bookedSeats || 0) <= 0}
                  className="w-full rounded-full h-11 md:h-12 font-medium" 
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

        <div className="max-w-md mx-auto text-center py-12 md:py-20 px-6 bg-muted/30 rounded-[1.5rem] md:rounded-[2rem] border-2 border-dashed border-muted-foreground/20">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-background mb-4 md:6 shadow-sm">
            <Palette className="w-6 h-6 md:w-8 md:h-8 text-accent/60" />
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
            Nouvelles sessions en préparation
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground mb-6 md:mb-8">
            Toutes nos sessions actuelles sont complètes. Nous préparons de nouveaux moments de création pour vous !
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