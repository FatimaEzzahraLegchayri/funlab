"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, CheckCircle2, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { newWorkshopBooking } from "@/lib/service/bookingService";

interface Workshop {
  id: string; 
  title: string;
  date: string;
  time: string;
  price: string;
  spots: number;
}

interface WorkshopBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: Workshop | null;
}

export function WorkshopBookingModal({ isOpen, onClose, workshop }: WorkshopBookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [count, setCount] = useState(1);
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState<File | null>(null);

  if (!workshop) return null;

  const unitPrice = parseInt(workshop.price);
  const totalPrice = unitPrice * count;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!file) {
      alert("Veuillez uploader votre preuve de paiement.");
      return;
    }
  
    setLoading(true);
  
    try {
      const form = e.currentTarget;
      
      const bookingData = {
        workshopId: workshop.id, 
        name: (form.elements.namedItem("name") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        phone: phone,
        count: count,
        paymentImage: file, 
      };
  
      await newWorkshopBooking(bookingData);

      toast({
        title: "Réservation envoyée !",
        description: "C'est confirmé ! Préparez-vous à passer un moment créatif et fun avec nous.",
        variant: "default", 
      });

      onClose();

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de réservation",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setCount(1);
      setPhone("");
      setFile(null);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* Structural match to your "good" modal for perfect mobile scrolling */}
      <DialogContent className="w-[95vw] sm:max-w-[500px] max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-[1.5rem] sm:rounded-[2rem] border-[#EBE3DE] bg-[#FDFBF9] p-0">
        {!isSubmitted ? (
          <>
            {/* Header section - matched padding to your good modal logic */}
            <div className="p-6 sm:p-8 bg-accent/5 flex items-center justify-center border-b border-[#EBE3DE] sticky top-0 z-20 bg-[#FDFBF9]">
              <div className="text-center">
                <DialogTitle className="font-serif text-2xl md:text-3xl text-foreground">
                  {workshop.title}
                </DialogTitle>
              </div>
            </div>
  
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center bg-white border border-[#EBE3DE] p-4 rounded-2xl text-sm">
                <div className="flex items-center gap-2 font-medium text-gray-600">
                  <Calendar className="w-4 h-4 text-[#B35D89]" /> {workshop.date}
                </div>
                <div className="flex items-center gap-2 font-medium text-gray-600">
                  <Clock className="w-4 h-4 text-[#B35D89]" /> {workshop.time}
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Nom complet</Label>
                  <Input name="name" required placeholder="Votre nom" className="rounded-xl border-[#EBE3DE] bg-white h-11" />
                </div>
  
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Téléphone</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">+212</span>
                    <Input 
                      required 
                      type="tel"
                      placeholder="612345678" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                      className="pl-14 rounded-xl border-[#EBE3DE] bg-white h-11" 
                    />
                  </div>
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Nombre de places</Label>
                  <Input 
                    type="number" 
                    min={1} 
                    max={workshop.spots} 
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="rounded-xl border-[#EBE3DE] bg-white h-11"
                  />
                </div>
  
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email</Label>
                  <Input name="email" required type="email" placeholder="Email" className="rounded-xl border-[#EBE3DE] bg-white h-11" />
                </div>
              </div>
  
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Preuve de paiement (Image)</Label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-[#EBE3DE] bg-white rounded-2xl p-4 flex items-center justify-center gap-3 group-hover:border-[#B35D89]/50 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#B35D89]" />
                    <span className="text-sm text-gray-500 truncate max-w-[200px]">
                      {file ? file.name : "Uploader le reçu"}
                    </span>
                  </div>
                </div>
              </div>
  
              {/* Buttons stack vertically on mobile (reverse) to keep "Annuler" at bottom */}
              <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={loading}
                    className="w-full sm:flex-1 rounded-full h-12 text-gray-500 border-[#EBE3DE]"
                >
                    Annuler
                </Button>
                <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:flex-[2] bg-[#B35D89] hover:bg-[#9a5574] text-white rounded-full h-12 text-lg font-bold shadow-md transition-all active:scale-[0.98]"
                >
                    {loading ? <Loader2 className="animate-spin" /> : `Réserver`}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="p-8 sm:p-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">Merci !</h3>
              <p className="text-gray-500 mt-2 text-sm sm:text-base leading-relaxed">
                Votre demande pour <span className="text-foreground font-semibold">{count} personne(s)</span> est en cours de validation.
              </p>
            </div>
            <Button onClick={handleClose} variant="outline" className="rounded-full px-10 h-11 border-[#EBE3DE]">Fermer</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

}