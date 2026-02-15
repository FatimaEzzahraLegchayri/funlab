
'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Users, Clock, AlertCircle, Upload, Loader2, Check, Phone, X } from 'lucide-react'

import { openStudioBookings } from '@/lib/service/bookingService'
import { getStudioConfig } from '@/lib/service/settingsService'
import { getRemainingSpots } from '@/lib/utils/helper'


interface OpenStudioModalProps { 
  isOpen: boolean
  onClose: () => void
}

const ACTIVITIES = ["penture sur mirroire", "penture canva", 
  "penture tissu ( coussan/totbag)", "penture sur argile",
   "textured art", "diamond art", "Other"]
const START_HOUR = 9
const END_HOUR = 21

export function OpenStudioModal({ isOpen, onClose }: OpenStudioModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    phone: '',
    personCount: '1',
    startTime: '',
    endTime: '',
    allSameActivity: 'yes',
    globalActivity: '',
    globalCustomActivity: '',
    paymentProof: null as File | null,
  })

  const [remainingSlots, setRemainingSlots] = useState<number | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const [config, setConfig] = useState<{
    slotDurationMinutes: number;
    maxCapacityPerSlot: number;
    isActive: boolean;
  } | null>(null);
  const [people, setPeople] = useState([{ ageGroup: 'Adult', activity: '', customActivity: '' }])
  const ActivityDisclaimer = () => (
    <p className="mt-2 text-[10px] text-[#B35D89] italic flex items-center gap-1.5 px-1 animate-in fade-in duration-500">
      <AlertCircle size={12} />
        Nous ferons de notre mieux, mais nous ne le garantissons pas.
      </p>
    )
// FETCH ADMIN CONFIG ON OPEN
  useEffect(() => {
    if (isOpen) {
      const loadConfig = async () => {
        const data = await getStudioConfig()
        if (data) setConfig(data)
      }
      loadConfig()
    }
  }, [isOpen])

  useEffect(() => {
    const checkCapacity = async () => {
      if (formData.date && formData.startTime && formData.endTime && config) {
        setIsValidating(true);
        
        const spots = await getRemainingSpots(
          formData.date,
          formData.startTime,
          formData.endTime,
          config.maxCapacityPerSlot
        );
        
        setRemainingSlots(spots);
        setIsValidating(false);
  
        if (parseInt(formData.personCount) > spots) {
          handleChange('personCount', spots.toString());
        }
      }
    };
  
    checkCapacity();
  }, [formData.date, formData.startTime, formData.endTime, config]);

  useEffect(() => {
    const checkCapacity = async () => {
      if (formData.date && formData.startTime && formData.endTime && config) {
        setIsValidating(true)
        const spots = await getRemainingSpots(
          formData.date,
          formData.startTime,
          formData.endTime,
          config.maxCapacityPerSlot
        )
        setRemainingSlots(spots)
        setIsValidating(false)

        if (parseInt(formData.personCount) > spots) {
          handleChange('personCount', spots.toString())
        }
      }
    };
    checkCapacity()
  }, [formData.date, formData.startTime, formData.endTime, config])

  const timeSlots = useMemo(() => {
    const slots = [];

    const duration = config?.slotDurationMinutes || 90; 
    let currentMinutes = START_HOUR * 60;
    const endMinutes = END_HOUR * 60;
  
    while (currentMinutes <= endMinutes) {
      const hours = Math.floor(currentMinutes / 60);
      const mins = currentMinutes % 60;
      slots.push(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
      currentMinutes += duration;
    }
    return slots;
  }, [config]); 

  const availableEndTimes = useMemo(() => {
    if (!formData.startTime) return []
    return timeSlots.filter(time => time > formData.startTime)
  }, [formData.startTime, timeSlots])

  const validation = useMemo(() => {
    const errors = []
    const count = parseInt(formData.personCount)
    if (!formData.date) errors.push("Date manquante")
    if (formData.phone.length < 9) errors.push("Numéro de téléphone invalide")
    
    if (remainingSlots !== null && count > remainingSlots) {
        errors.push(`Seulement ${remainingSlots} places dispos`)
    } else if (count > (config?.maxCapacityPerSlot || 10)) {
        errors.push("Maximum atteint")
    }

    if (!formData.startTime || !formData.endTime) errors.push("Horaire non défini")
    if (!formData.paymentProof) errors.push("Preuve de paiement requise")
  
      if (formData.allSameActivity === 'yes' || count === 1) {
        if (!formData.globalActivity) {
          errors.push("Veuillez choisir une activité")
        } else if (formData.globalActivity === 'Other' && !formData.globalCustomActivity.trim()) {
          errors.push("Précisez l'activité personnalisée")
        }
      } else {
        const missingActivity = people.some(p => !p.activity)
        const missingCustom = people.some(p => p.activity === 'Other' && !p.customActivity.trim())
        
        if (missingActivity) errors.push("Activité manquante pour un participant")
        if (missingCustom) errors.push("Précisez l'activité 'Autre'")
      }

    return { isValid: errors.length === 0, firstError: errors[0] }
  }, [formData, remainingSlots, config])

  // SYNC PEOPLE ARRAY
  useEffect(() => {
    const count = Math.max(1, parseInt(formData.personCount) || 1)
    if (people.length !== count) {
      setPeople(prev => Array.from({ length: count }, (_, i) => 
        prev[i] || { ageGroup: 'Adult', activity: '', customActivity: '' }
      ))
    }
  }, [formData.personCount])

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePersonChange = (index: number, field: string, value: string) => {
    const updatedPeople = [...people]
    updatedPeople[index] = { ...updatedPeople[index], [field]: value }
    setPeople(updatedPeople)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleChange('paymentProof', file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setFormData({
      date: '', phone: '', personCount: '1', startTime: '', endTime: '',
      allSameActivity: 'yes', globalActivity: '', globalCustomActivity: '', paymentProof: null,
    })
    setPeople([{ ageGroup: 'Adult', activity: '', customActivity: '' }])
    setImagePreview(null)
    setIsSuccess(false)
    setRemainingSlots(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const result = await openStudioBookings(formData, people)
      console.log("Booking successful", result)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
        resetForm()
      }, 3000)
    } catch (error) {
      alert("Erreur: " + (error as Error).message)
      const updatedConfig = await getStudioConfig();
    const spots = await getRemainingSpots(
      formData.date, 
      formData.startTime, 
      formData.endTime, 
      updatedConfig?.maxCapacityPerSlot || 10
    );
    setRemainingSlots(spots);
    } finally {
      setIsSubmitting(false)
    }
  }


  useEffect(() => {
    if (isOpen) {
      const fetchSettings = async () => {
        const settings = await getStudioConfig();
        setConfig(settings as { slotDurationMinutes: number; maxCapacityPerSlot: number; isActive: boolean; });
      };
      fetchSettings();
    }else {
      resetForm()
    }
  }, [isOpen]);

 
  useEffect(() => {
    const targetCount = Math.max(1, parseInt(formData.personCount) || 1);
    if (people.length !== targetCount) {
      setPeople(prev => {
        return Array.from({ length: targetCount }, (_, i) => 
          prev[i] || { ageGroup: 'Adult', activity: '', customActivity: '' }
        );
      });
    }
  }, [formData.personCount]);


return (
  <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-[1.5rem] sm:rounded-[2rem] border-[#EBE3DE] bg-[#FDFBF9] p-4 sm:p-6">
      
      {config && !config.isActive ? (
        <div className="py-12 sm:py-20 text-center space-y-4">
          <AlertCircle size={48} className="mx-auto text-[#B35D89] animate-pulse" />
          <h2 className="text-xl sm:text-2xl font-serif">Studio Fermé</h2>
          <p className="text-gray-500 text-sm">Les réservations sont désactivées pour le moment.</p>
          <Button onClick={onClose} variant="outline" className="rounded-full">Fermer</Button>
        </div>
      ) : isSuccess ? (
        <div className="flex flex-col items-center justify-center py-10 sm:py-16 text-center space-y-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F2EF] text-[#B35D89] rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 sm:h-10 sm:w-10 animate-bounce"/>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl">C'est noté !</h2>
          <p className="text-gray-500 text-sm sm:text-base">L'administrateur confirmera votre créneau après vérification.</p>
        </div>
      ) : (
        <>
          <DialogHeader className="pb-4 border-b border-[#EBE3DE]">
            <DialogTitle className="font-serif text-2xl sm:text-3xl">Open Studio</DialogTitle>
            <DialogDescription className="text-[#B35D89] font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">
              Réserver votre session créative
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Date Input */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">
                  <Calendar size={14} className="text-[#B35D89]" /> Date
                </Label>
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="rounded-xl border-[#EBE3DE] bg-white h-11"
                  required
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">
                  <Phone size={14} className="text-[#B35D89]" /> Téléphone
                </Label>
                <Input
                  type="tel"
                  placeholder="06..."
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="rounded-xl border-[#EBE3DE] bg-white h-11"
                  required
                />
              </div>

              {/* Time Slots - Grid inside grid for responsiveness */}
              <div className="md:col-span-2 space-y-2">
                <Label className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">
                  <Clock size={14} className="text-[#B35D89]" /> Créneau Horaire
                </Label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <Select value={formData.startTime} onValueChange={(val) => {
                      handleChange('startTime', val);
                      handleChange('endTime', '');
                    }}>
                    <SelectTrigger className="rounded-xl bg-white h-11"><SelectValue placeholder="Début" /></SelectTrigger>
                    <SelectContent>
                      {timeSlots.slice(0, -1).map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={formData.endTime} onValueChange={(val) => handleChange('endTime', val)} disabled={!formData.startTime}>
                    <SelectTrigger className="rounded-xl bg-white h-11"><SelectValue placeholder="Fin" /></SelectTrigger>
                    <SelectContent>
                      {availableEndTimes.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Participant Count */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">
                  <Users size={14} className="text-[#B35D89]" /> Participants
                </Label>
                <Input
                  type="number"
                  min="1"
                  max={remainingSlots !== null ? remainingSlots : config?.maxCapacityPerSlot || 10}
                  value={formData.personCount}
                  onChange={(e) => handleChange('personCount', e.target.value)}
                  disabled={isValidating || remainingSlots === 0}
                  className="rounded-xl border-[#EBE3DE] bg-white h-11"
                  required
                />
                {remainingSlots !== null && !isValidating && (
                  <p className={`text-[10px] italic px-1 ${remainingSlots === 0 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                    {remainingSlots === 0 ? "Complet" : `${remainingSlots} places dispos`}
                  </p>
                )}
                {isValidating && <p className="text-[10px] text-gray-400 animate-pulse">Vérification...</p>}
              </div>

            </div>

            {/* Global Activity Box */}
            <div className="p-4 sm:p-6 bg-white border border-[#EBE3DE] rounded-[1.25rem] sm:rounded-[1.5rem] space-y-4 sm:space-y-6 shadow-sm">
              {parseInt(formData.personCount) > 1 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <Label className="text-sm italic font-medium text-gray-600">Même activité pour tous ?</Label>
                  <Select value={formData.allSameActivity} onValueChange={(val) => handleChange('allSameActivity', val)}>
                    <SelectTrigger className="w-full sm:w-24 rounded-full border-[#EBE3DE] bg-[#F7F2EF] h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-[#EBE3DE]">
                      <SelectItem value="yes">Oui</SelectItem>
                      <SelectItem value="no">Non</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {(formData.allSameActivity === 'yes' || parseInt(formData.personCount) === 1) && (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <Label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Activité choisie</Label>
                  <Select value={formData.globalActivity} onValueChange={(val) => handleChange('globalActivity', val)}>
                    <SelectTrigger className="rounded-xl border-[#EBE3DE] bg-white h-11">
                      <SelectValue placeholder="Sélectionner une activité *" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-[#EBE3DE]">
                      {ACTIVITIES.map(act => <SelectItem key={act} value={act}>{act}</SelectItem>)}
                    </SelectContent>
                  </Select>

                  {formData.globalActivity === 'Other' && (
                    <div className="animate-in zoom-in-95 duration-200 space-y-2">
                      <Input
                        placeholder="Précisez l'activité souhaitée..."
                        value={formData.globalCustomActivity}
                        onChange={(e) => handleChange('globalCustomActivity', e.target.value)}
                        className="rounded-xl border-[#EBE3DE] focus-visible:ring-[#B35D89] bg-white h-11"
                        required
                      />
                      <ActivityDisclaimer />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Participant Details */}
            <div className="space-y-4">
              <h3 className="text-[10px] sm:text-[11px] font-bold text-[#B35D89] uppercase tracking-widest border-l-2 border-[#B35D89] pl-3">
                Détails des participants
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {people.map((person, index) => {
                  const currentActivity = formData.allSameActivity === 'yes' ? formData.globalActivity : person.activity;
                  const isTexturedArt = currentActivity === "textured art";

                  return (
                    <div key={index} className="p-4 bg-white border border-[#EBE3DE] rounded-2xl space-y-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-[#F7F2EF] text-[#B35D89] text-[10px] flex items-center justify-center font-bold shrink-0">
                            0{index + 1}
                          </div>
                          <Select 
                            value={isTexturedArt ? 'Adult' : person.ageGroup} 
                            onValueChange={(val) => handlePersonChange(index, 'ageGroup', val)}
                          >
                            <SelectTrigger className="flex-1 sm:flex-none sm:w-32 rounded-xl border-[#EBE3DE] bg-white h-10">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-[#EBE3DE]">
                              <SelectItem value="Adult">Adulte</SelectItem>
                              {!isTexturedArt && <SelectItem value="Child">Enfant</SelectItem>}
                            </SelectContent>
                          </Select>
                        </div>

                        {formData.allSameActivity === 'no' && (
                          <div className="w-full">
                            <Select 
                              value={person.activity} 
                              onValueChange={(val) => handlePersonChange(index, 'activity', val)}
                            >
                              <SelectTrigger className="w-full rounded-xl border-[#EBE3DE] bg-white h-10">
                                <SelectValue placeholder="Activité spécifique *" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-[#EBE3DE]">
                                {ACTIVITIES.map(act => <SelectItem key={act} value={act}>{act}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      {formData.allSameActivity === 'no' && person.activity === 'Other' && (
                        <div className="animate-in slide-in-from-top-1 duration-200 space-y-2">
                          <Input
                            placeholder="Quelle activité ?"
                            value={person.customActivity}
                            onChange={(e) => handlePersonChange(index, 'customActivity', e.target.value)}
                            className="rounded-xl border-[#EBE3DE] focus-visible:ring-[#B35D89] bg-white h-10"
                            required
                          />
                          <ActivityDisclaimer />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Payment Proof */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold">
                <Upload size={14} className="text-[#B35D89]" /> Preuve de paiement
              </Label>
              <div className={`relative border-2 border-dashed rounded-2xl p-4 sm:p-6 transition-all ${imagePreview ? 'border-[#B35D89] bg-[#FDFBF9]' : 'border-[#EBE3DE] bg-white hover:border-[#B35D89]/50'}`}>
                {!imagePreview && (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    required
                  />
                )}
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  {imagePreview ? (
                    <div className="relative group">
                      <img src={imagePreview} alt="Preview" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg mx-auto border border-[#EBE3DE]" />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          handleChange('paymentProof', null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors z-30"
                      >
                        <X size={16} /> 
                      </button>
                      <p className="text-[9px] sm:text-[10px] text-[#B35D89] font-bold mt-2 flex items-center justify-center gap-1">
                        <Check size={12}/> IMAGE CHARGÉE
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="p-3 bg-[#F7F2EF] rounded-full text-[#B35D89]">
                        <Upload size={20} />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Cliquez pour ajouter une capture d'écran</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="space-y-4 pt-6 border-t border-[#EBE3DE]">
              {!validation.isValid && !isSubmitting && formData.date && (
                <p className="text-[10px] sm:text-[11px] text-[#B35D89] font-medium flex items-center justify-center gap-2 bg-[#F7F2EF] py-2 px-3 rounded-lg text-center animate-pulse">
                  <AlertCircle size={12} /> {validation.firstError}
                </p>
              )}

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 sm:pt-6">
                <Button type="button" variant="outline" onClick={onClose} className="w-full sm:flex-1 rounded-full h-11">Annuler</Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !validation.isValid}
                  className="w-full sm:flex-[2] rounded-full bg-[#B35D89] text-white h-11"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirmer'}
                </Button>
              </div>
            </div>
          </form>
        </>
      )}
    </DialogContent>
  </Dialog>
)

}

