"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { addWorkshop, updateWorkshop } from "@/lib/service/workshopService";
import { getFriendlyErrorMessage, isNetworkError } from "@/lib/utils/errorHandler";

interface AddWorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; 
  workshopToEdit?: any;
}

export function AddWorkshopModal({ isOpen, onClose, onSuccess, workshopToEdit }: AddWorkshopModalProps) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const isEditMode = !!workshopToEdit;

  useEffect(() => {
    if (workshopToEdit?.image) {
      setImagePreview(workshopToEdit.image);
    } else {
      setImagePreview(null);
    }
  }, [workshopToEdit, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const workshopData: any = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        date: formData.get("date") as string,
        startTime: formData.get("startTime") as string,
        endTime: formData.get("endTime") as string,
        capacity: formData.get("capacity") as string,
        price: formData.get("price") as string,
        status: formData.get("status") as string,
        image: workshopToEdit?.image || null,
      };

      if (isEditMode) {
        await updateWorkshop(workshopToEdit.id, workshopData, imageFile);
        toast({ title: "Succès !", description: "Atelier mis à jour." });
      } else {
        await addWorkshop(workshopData, imageFile);
        toast({ title: "Succès !", description: "Atelier créé." });
      }

      onSuccess?.();
      handleClose();
    } catch (error: any) {
      const isOffline = isNetworkError(error);
      toast({
        variant: "destructive",
        title: isOffline ? "Problème de connexion" : "Erreur",
        description: getFriendlyErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setImageFile(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] sm:max-w-[600px] h-fit max-h-[96vh] p-0 border-none shadow-2xl flex flex-col overflow-hidden rounded-[2rem]">
        
        {/* FIXED HEADER */}
        <DialogHeader className="p-5 sm:p-8 pb-4 border-b bg-[#FDFBF9] shrink-0">
          <DialogTitle className="font-serif text-xl sm:text-3xl">
            {isEditMode ? "Modifier l'Atelier" : "Nouvel Atelier"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {isEditMode ? "Modifiez les informations." : "Configurez votre prochaine session."}
          </DialogDescription>
        </DialogHeader>
  
        {/* SCROLLABLE FORM AREA */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-4 sm:space-y-6">
            
            {/* Cover Image - More compact on mobile */}
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Image de couverture</Label>
              <div className="relative group h-28 sm:h-40 w-full bg-[#F7F2EF] rounded-2xl overflow-hidden border-2 border-dashed border-[#EBE3DE] flex items-center justify-center transition-all hover:border-[#B35D89]">
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(null); }}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 z-20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center gap-1 w-full h-full justify-center">
                    <ImageIcon className="w-6 h-6 text-[#B35D89]" />
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">Uploader une photo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-[10px] uppercase font-bold text-gray-500" htmlFor="title">Titre</Label>
                <Input id="title" name="title" required defaultValue={workshopToEdit?.title} className="rounded-xl h-10 sm:h-11 bg-white border-[#EBE3DE]" />
              </div>
  
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-[10px] uppercase font-bold text-gray-500" htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={workshopToEdit?.description} className="rounded-xl min-h-[80px] bg-white border-[#EBE3DE]" />
              </div>
  
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase font-bold text-gray-500" htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" required defaultValue={workshopToEdit?.date} className="rounded-xl h-10 bg-white border-[#EBE3DE]" />
              </div>
  
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-gray-500">Début</Label>
                  <Input id="startTime" name="startTime" type="time" required defaultValue={workshopToEdit?.startTime} className="rounded-xl h-10 text-xs bg-white border-[#EBE3DE]" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-gray-500">Fin</Label>
                  <Input id="endTime" name="endTime" type="time" required defaultValue={workshopToEdit?.endTime} className="rounded-xl h-10 text-xs bg-white border-[#EBE3DE]" />
                </div>
              </div>
  
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase font-bold text-gray-500">Capacité</Label>
                <Input id="capacity" name="capacity" type="number" min="1" required defaultValue={workshopToEdit?.capacity} className="rounded-xl h-10 bg-white border-[#EBE3DE]" />
              </div>
  
              <div className="space-y-1.5">
                <Label className="text-[10px] uppercase font-bold text-gray-500">Prix (MAD)</Label>
                <Input id="price" name="price" type="number" required defaultValue={workshopToEdit?.price} className="rounded-xl h-10 bg-white border-[#EBE3DE]" />
              </div>
  
              <div className="space-y-1.5 md:col-span-2">
                <Label className="text-[10px] uppercase font-bold text-gray-500">Statut</Label>
                <Select name="status" defaultValue={workshopToEdit?.status || "draft"}>
                  <SelectTrigger className="rounded-xl h-10 bg-white border-[#EBE3DE]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="published">Publié</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
  
            {/* ACTION BUTTONS: Now part of the scroll or pinned below */}
            <div className="pt-2 flex flex-col gap-2 pb-2">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#B35D89] text-white hover:bg-[#9a5574] rounded-full h-12 font-bold shadow-md order-1"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEditMode ? "Enregistrer les modifications" : "Créer l'atelier")}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleClose}
                className="w-full rounded-full h-10 text-gray-500 hover:bg-gray-100 order-2"
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );

}