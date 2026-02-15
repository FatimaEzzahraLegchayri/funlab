'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Palette, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FCFAFA] p-4 text-center">
      <div className="mb-6 relative">
        <div className="h-24 w-24 bg-[#F5F0F2] rounded-full flex items-center justify-center animate-bounce">
          <Palette className="h-12 w-12 text-[#b3668a]" />
        </div>
        <span className="absolute -top-2 -right-2 bg-[#b3668a] text-white text-xs font-bold px-2 py-1 rounded-full">
          404
        </span>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">Oups ! Page introuvable</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        On dirait que vous vous êtes égaré dans le laboratoire. 
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          onClick={() => window.history.back()}
          className="rounded-xl border-gray-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        <Button 
          asChild 
          className="bg-[#b3668a] hover:bg-[#9a5574] rounded-xl"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Accueil
          </Link>
        </Button>
      </div>

      <div className="mt-12 opacity-20 pointer-events-none select-none">
        <h2 className="text-8xl font-black text-[#b3668a]">THE FUN LAB</h2>
      </div>
    </div>
  )
}