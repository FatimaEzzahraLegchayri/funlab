"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent , DialogTitle, DialogDescription} from "@/components/ui/dialog";
import { WorkshopStep1 } from "./WorkshopStep1";
import { WorkshopStep2 } from "./WorkshopStep2";
import { StepIndicator } from "./StepIndicator";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

export function WorkshopBookingModal({ isOpen, onClose, workshop }: WorkshopBookingModalProps) {

  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined" && workshop) {
      const saved = localStorage.getItem(`workshop_draft_${workshop.id}`);
      if (saved) {
        return JSON.parse(saved).savedData;
      }
    }
    return { name: "", email: "", phone: "", count: 1 };
  });

  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== "undefined" && workshop) {
      const saved = localStorage.getItem(`workshop_draft_${workshop.id}`);
      if (saved) {
        return JSON.parse(saved).step || 1;
      }
    }
    return 1;
  });

  const [bookingId, setBookingId] = useState<string | null>(() => {
    if (typeof window !== "undefined" && workshop) {
      const saved = localStorage.getItem(`workshop_draft_${workshop.id}`);
      if (saved) {
        return JSON.parse(saved).id || null;
      }
    }
    return null;
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const isClosingRef = useRef(false);

  const hasPushedState = useRef(false);

  useEffect(() => {
    if (isOpen) {
      if (!hasPushedState.current) {
        window.history.pushState({ modal: "workshop" }, "");
        hasPushedState.current = true;
      }
  
      const handlePopState = (event: PopStateEvent) => {
        hasPushedState.current = false; 
        onClose();
      };
  
      window.addEventListener("popstate", handlePopState);
  
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    } else {
      if (hasPushedState.current) {
        hasPushedState.current = false;
        if (window.history.state?.modal === "workshop") {
          window.history.back();
        }
      }
    }
  }, [isOpen, onClose]);

  const handleStep1Success = (id: string) => {
    setBookingId(id);
    setCurrentStep(2);
    
    localStorage.setItem(`workshop_draft_${workshop!.id}`, JSON.stringify({ 
      id, 
      step: 2, 
      savedData: formData 
    }));
  };

  const handleStep2Success = () => {
    localStorage.removeItem(`workshop_draft_${workshop!.id}`);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setBookingId(null);
        setFormData({ name: "", email: "", phone: "", count: 1 });
      }, 300);
    }
  };

  if (!workshop) return null;

 
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] sm:max-w-[500px] max-h-[92vh] overflow-y-auto rounded-[2rem] border-[#EBE3DE] bg-[#FDFBF9] p-0 outline-none">
        <DialogTitle className="sr-only">
          Réservation d'atelier: {workshop.title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Remplissez le formulaire pour réserver votre place à l'atelier.
        </DialogDescription>
        <div className="pt-8 pb-4 px-8 border-b border-[#EBE3DE] sticky top-0 z-20 bg-[#FDFBF9]">
          <StepIndicator currentStep={isSubmitted ? 3 : currentStep} />
          {!isSubmitted && (
            <h2 className="font-serif text-xl text-center text-foreground mt-2">
              {workshop.title}
            </h2>
          )}
        </div>
        
        {!isSubmitted ? (
          <div className="animate-in fade-in duration-300">
            {currentStep === 1 ? (
              <WorkshopStep1 
                workshop={workshop} 
                formData={formData}        
                setFormData={setFormData}  
                onSuccess={handleStep1Success} 
                onCancel={handleClose}
                existingBookingId={bookingId}
              />
            ) : (
              <WorkshopStep2 
                workshop={workshop} 
                bookingId={bookingId!} 
                onSuccess={handleStep2Success}
                onBack={() => {
                  setCurrentStep(1);
                  localStorage.setItem(`workshop_draft_${workshop.id}`, JSON.stringify({ 
                    id: bookingId, 
                    step: 1, 
                    savedData: formData 
                  }));
                }}
              />
            )}
          </div>
        ) : (
          <div className="p-10 text-center space-y-6 animate-in zoom-in-95 duration-500">

    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
        <Check size={28} strokeWidth={3} />
      </div>
    </div>

    <div className="space-y-3">
      <h3 className="font-serif text-2xl font-bold text-gray-800">
        C'est tout bon !
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
        Merci <span className="text-[#B35D89] font-bold">{formData.name}</span>, 
        votre demande de réservation a été envoyée.
      </p>
    </div>

    <div className="pt-4">
      <Button 
        onClick={handleClose}
        className="px-8 bg-[#B35D89] hover:bg-[#9a5574] text-white rounded-full h-12 font-bold transition-all"
      >
        Fermer la fenêtre
      </Button>
    </div>
  </div>
        )}
      </DialogContent>
    </Dialog>
  );
}