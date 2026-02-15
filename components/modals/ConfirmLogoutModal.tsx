'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from "lucide-react"
import { useState } from "react"

interface ConfirmLogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function ConfirmLogoutModal({ isOpen, onClose, onConfirm }: ConfirmLogoutModalProps) {
  const [isPending, setIsPending] = useState(false)

  const handleLogout = async () => {
    setIsPending(true)
    try {
      await onConfirm()
    } finally {
      setIsPending(false)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
            <LogOut className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl">Déconnexion</DialogTitle>
          <DialogDescription className="text-center">
            Êtes-vous sûr de vouloir vous déconnecter de votre session "The Fun Lab" ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="flex-1 rounded-xl"
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleLogout}
            className="flex-1 bg-[#b3668a] hover:bg-[#9a5574] text-white rounded-xl"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Se déconnecter"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}