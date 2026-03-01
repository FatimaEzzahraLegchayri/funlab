"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { createWorkshopBookingDraft, updateWorkshopBookingDraft } from "@/lib/service/bookingService";
import { useToast } from "@/hooks/use-toast";

interface Step1Props {
  workshop: any;
  existingBookingId: string | null;
  formData: {
    name: string;
    email: string;
    phone: string;
    count: number;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    count: number;
  }>>;
  onSuccess: (id: string) => void;
  onCancel: () => void;
}

export function WorkshopStep1({ 
  workshop, 
  existingBookingId, 
  formData, 
  setFormData, 
  onSuccess, 
  onCancel 
}: Step1Props) {
  const { toast } = useToast(); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (existingBookingId) {
        result = await updateWorkshopBookingDraft(existingBookingId, { 
          ...formData, 
          workshopId: workshop.id,
          unitPrice: parseInt(workshop.price) 
        });
      } else {
        result = await createWorkshopBookingDraft({ 
          ...formData, 
          workshopId: workshop.id 
        });
      }
      onSuccess(result.id);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Vérifiez vos informations",
        description: error.message || "Une erreur est survenue.",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">

        <div className="flex justify-between items-center bg-white border border-[#EBE3DE] p-4 rounded-2xl text-xs">
          <div className="flex items-center gap-2 font-medium text-gray-600">
            <Calendar className="w-3.5 h-3.5 text-[#B35D89]" /> {workshop.date}
          </div>
          <div className="flex items-center gap-2 font-medium text-gray-600">
            <Clock className="w-3.5 h-3.5 text-[#B35D89]" /> {workshop.time}
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Nom complet</Label>
            <Input 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Votre nom" 
              className="rounded-xl border-[#EBE3DE] h-11 bg-white focus:ring-[#B35D89]" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email</Label>
              <Input 
                required 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="email@exemple.com" 
                className="rounded-xl border-[#EBE3DE] h-11 bg-white focus:ring-[#B35D89]" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Téléphone</Label>
              <Input 
                required 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="06..." 
                className="rounded-xl border-[#EBE3DE] h-11 bg-white focus:ring-[#B35D89]" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              Nombre de participants (Max: {workshop.spots})
            </Label>
            <Input 
              type="number"
              min={1}
              max={workshop.spots}
              required
              value={formData.count}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setFormData({ ...formData, count: isNaN(val) ? 1 : val });
              }}
              className="rounded-xl border-[#EBE3DE] h-11 bg-white focus:ring-[#B35D89]" 
            />
          </div>
        </div>

        <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel} 
            className="w-full sm:flex-1 rounded-full h-12 text-gray-500 border-[#EBE3DE]"
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full sm:flex-[2] bg-[#B35D89] hover:bg-[#9a5574] text-white rounded-full h-12 font-bold transition-all active:scale-95 shadow-md"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Continuer vers le paiement"}
          </Button>
        </div>
      </form>
    </>
  );
}