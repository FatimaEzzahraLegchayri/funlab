'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AlertCircle, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { StepIndicator } from './StepIndicator'
import { updateStudioBookingDraft, updateStudioBookingWithPayment } from '@/lib/service/bookingService'
import { getStudioConfig } from '@/lib/service/settingsService'
import { getRemainingSpots } from '@/lib/utils/helper'

import { Step1 } from './openStudioStep1'
import { Step2 } from './openStudioStep2'

const STORAGE_KEY = 'pending_openStudio_booking';

interface OpenStudioModalProps { 
  isOpen: boolean
  onClose: () => void
}

export function OpenStudioModal({ isOpen, onClose }: OpenStudioModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [config, setConfig] = useState<any>(null)
  const [remainingSlots, setRemainingSlots] = useState<number | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({});
  const initialFormData = {
    date: '',
    phone: '',
    personCount: '1',
    startTime: '',
    endTime: '',
    allSameActivity: 'yes',
    globalActivity: '',
    globalCustomActivity: '',
    globalComment: '',
    paymentProof: null as File | null,
  };

  const [formData, setFormData] = useState(initialFormData)
  const [people, setPeople] = useState([{ ageGroup: 'Adult', activity: '', customComment: '' }])

  const handleModalClose = () => {
    if (isSuccess) {
      localStorage.removeItem(STORAGE_KEY);
    }
    
    setFormData(initialFormData);
    setPeople([{ ageGroup: 'Adult', activity: '', customComment: '' }]);
    setStep(1);
    setIsSuccess(false);
    
    onClose();
  };

  useEffect(() => {
    const loadConfig = async () => {
      const data = await getStudioConfig();
      setConfig(data);
    };
    loadConfig();
  }, []);

  useEffect(() => {
    const count = Math.max(1, parseInt(formData.personCount) || 1)
    setPeople(prev => Array.from({ length: count }, (_, i) => 
      prev[i] || { ageGroup: 'Adult', activity: '', customComment: '' }
    ))
  }, [formData.personCount])

  useEffect(() => {
    if (isOpen && !isSuccess) {
      const savedSession = localStorage.getItem(STORAGE_KEY);
      if (savedSession) {
        try {
          const { data, people: savedPeople, step: savedStep } = JSON.parse(savedSession);
          
          if (savedStep === 2) {
            const bookingDate = new Date(data.date).getTime();
            const todayStart = new Date().setHours(0, 0, 0, 0);

            if (bookingDate >= todayStart) {
              setFormData(prev => ({ ...prev, ...data }));
              setPeople(savedPeople);
              setStep(2);
            } else {
              localStorage.removeItem(STORAGE_KEY); 
            }
          }
        } catch (e) {
          console.error("Failed to parse saved session", e);
        }
      }
    }
  }, [isOpen, isSuccess])

const hasPushedState = useRef(false);
useEffect(() => {
  if (isOpen) {
    if (!hasPushedState.current) {
      window.history.pushState({ modal: "open-studio", step: step }, "");
      hasPushedState.current = true;
    }

    window.history.replaceState({ modal: "open-studio", step: step }, "");

    const handlePopState = (event: PopStateEvent) => {
      if (step === 2) {
        setStep(1);
        window.history.pushState({ modal: "open-studio", step: 1 }, "");
      } else {
        hasPushedState.current = false;
        handleModalClose();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  } else {
    if (hasPushedState.current) {
      hasPushedState.current = false;
      if (window.history.state?.modal === "open-studio") {
        window.history.back();
      }
    }
  }
}, [isOpen, step]); 

  const handleStep1Complete = async () => {

    const newErrors: Record<string, string> = {};
    
    if (!formData.date) newErrors.date = "La date est requise.";
    
    const phoneRegex = /^(05|06|07)\d{8}$/;
    if (!formData.phone) {
      newErrors.phone = "Le téléphone est requis.";
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Format invalide (ex: 0612345678).";
    }

    if (!formData.startTime) newErrors.startTime = "Heure de début requise.";
    if (!formData.endTime) newErrors.endTime = "Heure de fin requise.";
    
    if (formData.allSameActivity === 'yes' || parseInt(formData.personCount) === 1) {
      if (!formData.globalActivity) newErrors.globalActivity = "L'activité est requise.";
    } else {
      if (people.some((p: any) => !p.activity)) newErrors.people = "Activités manquantes";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsValidating(true);
    setErrors({});
    try {
      const savedSession = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const result = await updateStudioBookingDraft(savedSession.draftId || null, formData, people);

      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        data: formData,
        people,
        step: 2,
        draftId: result.id 
      }));
  
      setStep(2);
    } catch (error: any) {
      alert("Erreur: " + error.message);
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    const checkCapacity = async () => {
      if (formData.date && formData.startTime && formData.endTime && config) {
        const spots = await getRemainingSpots(formData.date, formData.startTime, formData.endTime, config.maxCapacityPerSlot)
        setRemainingSlots(spots)
        if (parseInt(formData.personCount) > spots) handleChange('personCount', spots.toString())
      }
    }
    checkCapacity()
  }, [formData.date, formData.startTime, formData.endTime, config])

  const handleChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const savedSession = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  
    try {
      await updateStudioBookingWithPayment(savedSession.draftId, formData, people);
      setIsSuccess(true);
      setStep(3); 
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => !open && handleModalClose()}
    >
      <DialogContent className="w-[95vw] sm:max-w-2xl max-h-[92vh] overflow-y-auto rounded-[1.5rem] bg-[#FDFBF9] p-4 sm:p-6">
        {config && !config.isActive ? (
          <div className="py-12 text-center space-y-4">
            <AlertCircle size={48} className="mx-auto text-[#B35D89]" />
            <h2 className="text-xl font-serif">Studio Fermé</h2>
            <Button onClick={handleModalClose} variant="outline" className="rounded-full">Fermer</Button>
          </div>
        ) : (
          <>
            <DialogHeader className="pb-4 border-b border-[#EBE3DE] mb-6">
              <DialogTitle className="font-serif text-2xl text-center">Atelier privé</DialogTitle>
            </DialogHeader>

            <StepIndicator currentStep={step} />

            {isSuccess ? (
          <SuccessContent onClose={handleModalClose} />
        ) : (
              <>
                {step === 1 ? (
                  <Step1 
                    formData={formData} 
                    errors={errors}
                    setErrors={setErrors}
                    handleChange={handleChange} 
                    config={config} 
                    remainingSlots={remainingSlots}
                    isValidating={isValidating}
                    people={people}
                    setPeople={setPeople}
                    onNext={handleStep1Complete} 
                  />
                ) : (
                  <Step2 
                    formData={formData} 
                    handleChange={handleChange}
                    onBack={() => setStep(1)}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
function SuccessContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-6 animate-in zoom-in-95">
      <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center">
        <Check className="h-8 w-8"/>
      </div>
      <h2 className="font-serif text-2xl">C'est noté !</h2>
      <p className="text-gray-500 text-sm max-w-xs">L'administrateur confirmera votre créneau après vérification de votre paiement.</p>
      <Button onClick={onClose} className="rounded-full bg-[#B35D89] w-full max-w-xs h-11 shadow-md hover:opacity-90">Fermer</Button>
    </div>
  )
}