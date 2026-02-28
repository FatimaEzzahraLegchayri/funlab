import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Phone, Clock, Users, AlertCircle, MessageSquare, CreditCard } from 'lucide-react'
import { useMemo, useState } from 'react'

const ACTIVITIES = ["Peinture sur toile ", "Peinture sur miroir ", "Peinture sur tissu (coussin, tote bag ou votre propre vêtement)", "Modelage d’argile", "Peinture sur argile ou plâtre (vide poche, vase ou porte clé)", "Diamond art (sur toile ou miroir)", "Textured art (pour adultes seulement)"]
const PRICE_PER_PERSON = 250

export function Step1({ formData, handleChange, config, remainingSlots, isValidating, people, setPeople, onNext }: any) {
  
    const [errors, setErrors] = useState<Record<string, string>>({});
    const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.date) newErrors.date = "La date est requise.";
    
    const phoneRegex = /^(06|07)\d{8}$/;
    if (!formData.phone) {
        newErrors.phone = "Le téléphone est requis.";
    } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Format invalide (ex: 0612345678).";
    }

    if (!formData.startTime || !formData.endTime) {
        newErrors.time = "Veuillez choisir un créneau horaire complet.";
    }
    if (formData.allSameActivity === 'yes' || parseInt(formData.personCount) === 1) {
        if (!formData.globalActivity) newErrors.globalActivity = "L'activité est requise.";
    }else {
        if (people.some((p: any) => !p.activity)) {
          newErrors.activity = "Veuillez choisir une activité pour chaque participant.";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
    if (validateForm()) {
        onNext();
    }
    };
    
    const firstErrorMessage = useMemo(() => {
        const keys = Object.keys(errors);
        return keys.length > 0 ? errors[keys[0]] : null;
    }, [errors]);

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value);
        const maxAllowed = remainingSlots !== null ? remainingSlots : (config?.maxCapacityPerSlot || 10);
    
        if (value > maxAllowed) {
          value = maxAllowed;
        }
    
        if (isNaN(value) || value < 1) {
          handleChange('personCount', '1');
        } else {
          handleChange('personCount', value.toString());
        }
    }
    const totalPrice = useMemo(() => (parseInt(formData.personCount) || 0) * PRICE_PER_PERSON, [formData.personCount])

  const timeSlots = useMemo(() => {
    const slots = [];
    const duration = config?.slotDurationMinutes || 90; 
    let currentMinutes = 9 * 60; 
    const endMinutes = 20 * 60; 
    while (currentMinutes <= endMinutes) {
      const hours = Math.floor(currentMinutes / 60);
      const mins = currentMinutes % 60;
      slots.push(`${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`);
      currentMinutes += duration;
    }
    return slots;
  }, [config]);

  const handlePersonChange = (index: number, field: string, value: string) => {
    const updatedPeople = [...people]
    updatedPeople[index] = { ...updatedPeople[index], [field]: value }
    setPeople(updatedPeople)
    if (Object.keys(errors).length > 0) setErrors({});
  }

  return (
    <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="space-y-2">
        <Label className={`text-[10px] font-bold uppercase flex gap-2 ${errors.date ? 'text-red-500' : 'text-gray-500'}`}>
            <Calendar size={14} className="text-[#B35D89]"/> Date</Label>
          <Input 
            type="date" value={formData.date} min={new Date().toISOString().split("T")[0]} 
            onChange={(e) => handleChange('date', e.target.value)} 
          className={`rounded-xl h-11 ${errors.date ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EBE3DE]'}`}
          />
        </div>
       
        <div className="space-y-2">
          <Label className={`text-[10px] font-bold uppercase flex gap-2 ${errors.phone ? 'text-red-500' : 'text-gray-500'}`}>
            <Phone size={14} className={errors.phone ? 'text-red-500' : 'text-[#B35D89]'}/> Téléphone
          </Label>
          <Input type="tel" 
            placeholder="06..." 
            value={formData.phone} 
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`rounded-xl bg-white h-11 transition-colors ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EBE3DE]'}`}
            />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label className={`text-[10px] font-bold uppercase flex gap-2 ${errors.time ? 'text-red-500' : 'text-gray-500'}`}>
            <Clock size={14} className="text-[#B35D89]"/> Créneau Horaire</Label>
          <div className="grid grid-cols-2 gap-3">
            <Select value={formData.startTime} onValueChange={(v) => { handleChange('startTime', v); handleChange('endTime', ''); setErrors({});}}>
              <SelectTrigger className={`rounded-xl h-11 ${errors.time ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EBE3DE]'}`}><SelectValue placeholder="Début" /></SelectTrigger>
              <SelectContent>{timeSlots.slice(0, -1).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={formData.endTime} onValueChange={(v) => { handleChange('endTime', v); setErrors({}); }} disabled={!formData.startTime}>
              <SelectTrigger className={`rounded-xl h-11 ${errors.time ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EBE3DE]'}`}><SelectValue placeholder="Fin" /></SelectTrigger>
              <SelectContent>{timeSlots.filter(t => t > formData.startTime).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase text-gray-500 flex gap-2"><Users size={14} className="text-[#B35D89]"/> Participants</Label>
          <Input type="number" min="1" 
          max={remainingSlots !== null ? remainingSlots : (config?.maxCapacityPerSlot || 10)}
          value={formData.personCount} 
          onChange={handleCountChange}
          className="rounded-xl border-[#EBE3DE] bg-white h-11" />
          {remainingSlots !== null && <p className="text-[10px] italic text-gray-400 px-1">{remainingSlots} places disponibles</p>}
        </div>
      </div>

      <div className={`p-4 bg-white border rounded-2xl space-y-4 shadow-sm transition-colors ${errors.activity ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EBE3DE]'}`}>
        {parseInt(formData.personCount) > 1 && (
          <div className="flex items-center justify-between">
            <Label className="text-xs italic text-gray-600">Même activité pour tous ?</Label>
            <Select 
                value={formData.allSameActivity} 
                onValueChange={(v) => {handleChange('allSameActivity', v); setErrors({}); }}>
              <SelectTrigger className="w-24 rounded-full bg-[#F7F2EF] h-9"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="yes">Oui</SelectItem><SelectItem value="no">Non</SelectItem></SelectContent>
            </Select>
          </div>
        )}

        {(formData.allSameActivity === 'yes' || parseInt(formData.personCount) === 1) && (
          <div className="space-y-4">
            <div className="space-y-2">
            <Label className={`text-[10px] uppercase font-bold ${errors.globalActivity ? 'text-red-500' : 'text-gray-400'}`}>Activité choisie</Label>
              <Select 
                    value={formData.globalActivity} 
                    onValueChange={(v) => {
                        handleChange('globalActivity', v);
                        setErrors({});
                    }}>
                <SelectTrigger className={`rounded-xl h-auto min-h-[44px] py-2 text-left ${errors.globalActivity ? 'border-red-500 ring-1 ring-red-500' : 'border-[#EBE3DE]'}`}>
                        <SelectValue placeholder="Sélectionner une activité *" />
                </SelectTrigger>
                <SelectContent className="max-w-[calc(100vw-40px)] sm:max-w-md">
                    {ACTIVITIES.map(act => <SelectItem key={act} value={act}
                    className="whitespace-normal py-3 leading-snug">{act}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.globalActivity && <p className="text-[9px] text-red-500 font-bold px-1">{errors.globalActivity}</p>}
            </div>
            
            {formData.globalActivity && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <Label className="text-[10px] font-bold uppercase text-gray-500 flex gap-2"><MessageSquare size={14} className="text-[#B35D89]"/> Dites-nous comment rendre votre expérience plus spéciale...</Label>
                <Textarea 
                  placeholder="Envie d’une autre activité ? Partagez-la avec nous !"
                  value={formData.globalComment || ''}
                  onChange={(e) => handleChange('globalComment', e.target.value)}
                  className="rounded-xl border-[#EBE3DE] min-h-[80px]"
                />
                <p className="text-[9px] leading-tight text-gray-400 italic px-1">
                  Nous ferons de notre mieux pour répondre à votre demande, selon nos disponibilités (sans garantie).
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-[#B35D89] uppercase tracking-widest border-l-2 border-[#B35D89] pl-3">Détails des participants</h3>
        <div className="grid grid-cols-1 gap-3">
          {people.map((person: any, index: number) => {
            const isTexturedArt = (formData.allSameActivity === 'yes' ? formData.globalActivity : person.activity) === "Textured art (pour adultes seulement)";
            return (
              <div key={index} className="p-4 bg-white border border-[#EBE3DE] rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#F7F2EF] text-[#B35D89] text-[10px] flex items-center justify-center font-bold shrink-0">0{index + 1}</div>
                  <Select value={isTexturedArt ? 'Adult' : person.ageGroup} onValueChange={(val) => handlePersonChange(index, 'ageGroup', val)}>
                    <SelectTrigger className="w-full sm:w-32 rounded-xl h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Adult">Adulte</SelectItem>
                      {!isTexturedArt && <SelectItem value="Child">Enfant</SelectItem>}
                    </SelectContent>
                  </Select>
                  {formData.allSameActivity === 'no' && (
                    <Select value={person.activity} onValueChange={(val) => handlePersonChange(index, 'activity', val)}>
                      <SelectTrigger className="flex-1 rounded-xl h-auto whitespace-normal"><SelectValue placeholder="Choisir l'activité *" /></SelectTrigger>
                      <SelectContent className="max-w-[calc(100vw-60px)] sm:max-w-md">
                         {ACTIVITIES.map(act => 
                            <SelectItem 
                                key={act} 
                                value={act}
                                className="whitespace-normal py-3 leading-snug"
                            >
                            {act}
                            </SelectItem>)}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                {formData.allSameActivity === 'no' && person.activity && (
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase">Dites-nous comment rendre votre expérience plus spéciale... 0{index + 1}</Label>
                    <Textarea 
                      placeholder="Envie d’une autre activité ? Partagez-la avec nous !"
                      value={person.customComment || ''}
                      onChange={(e) => handlePersonChange(index, 'customComment', e.target.value)}
                      className="rounded-xl border-[#EBE3DE] text-sm min-h-[60px]"
                    />
                    <p className="text-[9px] leading-tight text-gray-400 italic px-1">
                      Nous ferons de notre mieux pour répondre à votre demande, selon nos disponibilités (sans garantie).
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-[#B35D89]/5 border border-[#B35D89]/20 flex justify-between items-center animate-in zoom-in-95 duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-full text-[#B35D89] shadow-sm">
            <CreditCard size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">Total à régler</p>
            <p className="text-xs text-gray-600 font-medium">{formData.personCount} x 250 DH</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-serif font-bold text-[#B35D89]">{totalPrice}</span>
          <span className="text-xs font-bold text-[#B35D89] ml-1">DH</span>
        </div>
      </div>

      {firstErrorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 animate-in slide-in-from-bottom-2 duration-300">
          <AlertCircle size={16} className="shrink-0" />
          <p className="text-xs font-bold">{firstErrorMessage}</p>
        </div>
      )}

      <Button 
        onClick={handleNext} 
        disabled={isValidating} 
        className="w-full rounded-full bg-[#B35D89] text-white h-11 shadow-md hover:opacity-95 transition-all">
            {isValidating ? (
                <div className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Validation...
                </div>
            ) : "Continuer vers le paiement"}
      </Button>
    </div>
  )
}