import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Upload, X, Loader2, ArrowLeft, MessageSquare, Send, Search } from 'lucide-react'
import { useState } from 'react'

export function Step2({ formData, handleChange, onBack, onSubmit, isSubmitting }: any) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleChange('paymentProof', file)
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const openWhatsApp = () => {
    const msg = encodeURIComponent(`Bonjour, je souhaite recevoir le RIB pour confirmer ma réservation de ${formData.personCount} personne(s) le ${formData.date} à ${formData.startTime}.`)
    window.open(`https://wa.me/212600000000?text=${msg}`, '_blank')
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      <div className="bg-white border border-[#EBE3DE] rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
        <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest flex items-center gap-2">
           Comment ça marche ?
        </h4>
        
        <div className="grid grid-cols-1 gap-6 sm:gap-4">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
              <MessageSquare size={18} />
            </div>
            <div className="flex-1">
              <p className="text-[12px] sm:text-sm font-bold text-gray-700">Demandez le RIB</p>
              <p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">
                Contactez-nous sur WhatsApp pour recevoir nos coordonnées bancaires.
              </p>
              <Button 
                onClick={openWhatsApp} 
                className="mt-3 w-full sm:w-auto h-9 px-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white text-[11px] flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                Envoyer un message
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              <Send size={18} />
            </div>
            <div>
              <p className="text-[12px] sm:text-sm font-bold text-gray-700">Effectuez le virement</p>
              <p className="text-[10px] sm:text-[11px] text-gray-500">
                Montant total: <span className="font-bold text-[#B35D89] text-xs sm:text-sm">{parseInt(formData.personCount) * 250} DH</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-t border-dashed border-gray-100 pt-4">
            <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <Search size={18} />
            </div>
            <div>
              <p className="text-[12px] sm:text-sm font-bold text-gray-700">Vérification</p>
              <p className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">
                Une fois votre preuve envoyée, nous validons votre place sous 24h.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-[10px] sm:text-[11px] font-bold uppercase text-gray-500 flex gap-2 items-center px-1">
          <Upload size={14} className="text-[#B35D89]"/> Télécharger votre preuve de paiement
        </Label>
        
        <div className={`group relative border-2 border-dashed rounded-2xl p-6 sm:p-10 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px] transition-all cursor-pointer ${preview ? 'border-[#B35D89] bg-[#B35D89]/5' : 'border-[#EBE3DE] bg-white hover:border-[#B35D89]/50 hover:bg-gray-50/50'}`}>
          
          <Input 
            type="file" 
            accept="image/*" 
            onChange={handleFile} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
          />

          {!preview ? (
            <div className="flex flex-col items-center text-center pointer-events-none z-10">
              <div className="p-4 bg-[#F7F2EF] rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                <Upload className="text-[#B35D89]" size={24} />
              </div>
              <p className="text-sm font-semibold text-gray-700">Ajouter la capture d'écran</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">PNG, JPG ou JPEG</p>
            </div>
          ) : (
            <div className="relative animate-in zoom-in-95 z-30 group/preview">
              <img 
                src={preview} 
                className="w-48 h-48 sm:w-56 sm:h-56 object-cover rounded-2xl shadow-xl border-4 border-white transition-transform group-hover/preview:scale-[1.02]" 
                alt="Proof" 
              />
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); 
                  setPreview(null); 
                  handleChange('paymentProof', null);
                }} 
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2.5 shadow-xl hover:bg-red-600 transition-colors border-2 border-white"
              >
                <X size={16} strokeWidth={3}/>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-[#EBE3DE]">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          disabled={isSubmitting}
          className="w-full sm:flex-1 rounded-full text-gray-400 text-xs sm:text-sm hover:text-gray-600 h-11"
        >
          <ArrowLeft size={16} className="mr-2"/> Retour
        </Button>
        <Button 
          onClick={onSubmit} 
          disabled={isSubmitting || !formData.paymentProof} 
          className="w-full sm:flex-[2] rounded-full bg-[#B35D89] hover:bg-[#964d73] text-white h-12 shadow-lg disabled:opacity-50 transition-all font-bold text-sm"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              <span>Traitement...</span>
            </div>
          ) : (
            'Finaliser ma demande'
          )}
        </Button>
      </div>
    </div>
  )
}