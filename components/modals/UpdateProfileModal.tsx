'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfile } from '@/lib/service/profileService'
import { toast } from '@/hooks/use-toast'
import { Loader2, KeyRound } from 'lucide-react'

export function UpdateProfileModal({ isOpen, onClose, currentName, onSuccess }: any) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: currentName || '',
    password: '',
    currentPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submissionData: any = { name: formData.name }
      if (formData.password) {
        submissionData.password = formData.password
        submissionData.currentPassword = formData.currentPassword
      }

      await updateProfile(submissionData)
      toast({ title: "Profil mis à jour", description: "Vos modifications ont été enregistrées." })
      onSuccess()
      onClose()
    } catch (err: any) {
      toast({ variant: "destructive", title: "Erreur", description: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le profil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>

          <div className="pt-4 border-t space-y-4">
            <div className="flex items-center gap-2 text-[#b3668a] font-medium text-sm">
              <KeyRound className="size-4" /> Changement de mot de passe (optionnel)
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input 
                id="newPassword" 
                type="password" 
                placeholder="Laisser vide pour ne pas changer"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {formData.password && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                <Label htmlFor="currPassword" title="Requis pour changer le mot de passe">
                  Mot de passe actuel <span className="text-red-500">*</span>
                </Label>
                <Input 
                  id="currPassword" 
                  type="password" 
                  required
                  className="border-[#b3668a]/50"
                  onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                />
              </div>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Annuler</Button>
            <Button type="submit" className="bg-[#b3668a] hover:bg-[#9a5574]" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sauvegarder
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}