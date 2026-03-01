"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, MessageCircle, ChevronLeft, Info } from "lucide-react";
import { confirmWorkshopBooking } from "@/lib/service/bookingService";
import { useToast } from "@/hooks/use-toast";

interface Step2Props {
  workshop: any;
  bookingId: string;
  onSuccess: () => void;
  onBack: () => void;
}

export function WorkshopStep2({ workshop, bookingId, onSuccess, onBack }: Step2Props) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Bonjour Mariam, je souhaite réserver l'atelier "${workshop.title}". Pourriez-vous me transmettre le RIB pour effectuer le virement ?`
  )}`;

  const handleFinalSubmit = async () => {
    if (!file) return;
    setLoading(true);
    
    try {
      await confirmWorkshopBooking(bookingId, file);
      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec de l'envoi",
        description: error.message || "Impossible d'envoyer votre reçu. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        
        <div className="bg-[#FDFBF9] border border-[#EBE3DE] p-4 rounded-2xl">
          <div className="flex items-start gap-3">
            <div className="mt-1 bg-[#B35D89]/10 p-1.5 rounded-full shrink-0">
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#B35D89]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-700">Comment finaliser ?</h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed">
                1. Cliquez sur le bouton WhatsApp pour **demander le RIB**. <br />
                2. Effectuez votre virement bancaire. <br />
                3. **Revenez ici** pour uploader le reçu.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#25D366]/5 border border-[#25D366]/20 p-4 sm:p-5 rounded-2xl space-y-3">
          <p className="text-[10px] sm:text-[11px] font-medium text-gray-600 leading-relaxed text-center">
            Contactez-nous pour recevoir le RIB ou pour toute question.
          </p>
          <Button asChild variant="outline" className="w-full rounded-xl border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all h-10 sm:h-11 bg-transparent text-xs sm:text-sm">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Demander le RIB
            </a>
          </Button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="text-center space-y-1">
            <h4 className="text-[10px] sm:text-[11px] font-bold text-gray-700 uppercase tracking-widest">Preuve de virement</h4>
            <p className="text-[9px] sm:text-[10px] text-gray-400 font-medium px-2">Capture d'écran ou PDF du reçu</p>
          </div>

          <div className="relative group">
            <input
              type="file"
              accept="image/*,application/pdf"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            <div className={`border-2 border-dashed rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-2 transition-all ${
              file 
                ? 'border-[#B35D89] bg-[#B35D89]/5' 
                : 'border-[#EBE3DE] bg-white group-hover:border-[#B35D89]/30'
            }`}>
              <div className={`p-2 sm:p-2.5 rounded-full transition-colors ${
                file ? 'bg-[#B35D89] text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'
              }`}>
                <Upload size={18} className="sm:w-5 sm:h-5" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-gray-600 text-center px-2 truncate max-w-full">
                {file ? file.name : "Uploader le reçu"}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 space-y-2 sm:space-y-3">
          <Button 
            onClick={handleFinalSubmit}
            disabled={!file || loading}
            className="w-full bg-[#B35D89] hover:bg-[#9a5574] text-white rounded-full h-11 sm:h-12 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Validation...
              </>
            ) : (
              "Confirmer ma réservation"
            )}
          </Button>

          <Button 
            type="button"
            variant="ghost" 
            onClick={onBack}
            disabled={loading}
            className="w-full text-gray-400 hover:text-[#B35D89] hover:bg-transparent text-[9px] sm:text-[10px] uppercase tracking-widest font-bold h-8 transition-colors"
          >
            <ChevronLeft className="w-3 h-3 mr-1" /> Retour
          </Button>
        </div>
      </div>
    </>
  );
}