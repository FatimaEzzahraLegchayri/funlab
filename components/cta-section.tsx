"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import React, { useState } from "react"
import { OpenStudioModal } from "./modals/openStudioModal";

export function CtaSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative py-20 md:py-32 px-6 bg-[#FDFBF7] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#AB507B]/20 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#AB507B]/5 rounded-full blur-3xl opacity-60" />

      <div className="relative z-10 mx-auto max-w-4xl text-center space-y-10 md:space-y-12">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-[#AB507B] leading-[1.15] text-balance">
          Envie de créer, de vous détendre et de vivre un moment différent ?
          </h2>
          
          <p className="text-base md:text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto text-pretty">
          Pas besoin d’être artiste — juste l’envie de passer un bon moment et de laisser libre cours à votre créativité.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="workshop"
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto min-h-[56px] px-8 shadow-lg shadow-[#AB507B]/20 rounded-full text-sm md:text-base font-bold uppercase tracking-widest transition-transform hover:scale-105 active:scale-95"
          >
            Réserver un atelier privé
          </Button>

          <Link href="#ateliers" scroll={true} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-h-[56px] border-2 border-[#AB507B] text-[#AB507B] hover:bg-[#AB507B]/5 hover:text-[#AB507B] rounded-full uppercase tracking-widest text-xs md:text-sm font-bold px-10 transition-all hover:scale-105 active:scale-95"
            >
               Voir les prochains ateliers
            </Button>
          </Link>
        </div>
      </div>

      <OpenStudioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}