'use client';

import React, { useState } from 'react';
import { Button } from "./ui/button"
import { OpenStudioModal } from "@/components/modals/openStudioModal";

export function OpenStudio() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="open-studio" className="relative w-full bg-[#EBE3DE] py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <div className="flex flex-col order-2 lg:order-1 text-center lg:text-left">
            
            <div className="mb-6 md:mb-8">
              <span className="text-[#E66E68] uppercase tracking-[0.2em] text-xs md:text-sm font-bold mb-3 md:mb-4 block">
                Un espace de liberté
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1] text-balance">
                LIBERTÉ DE <br className="hidden md:block" /> 
                <span className="font-medium italic lg:not-italic">CRÉATION</span>
              </h2>
            </div>

            <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
              <p className="text-[#666666] text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Un espace ouvert aux individus, aux familles et aux amis. 
                Créez ensemble ou seul, avec un coup de pouce si besoin. 
                Session limitée à 10 personnes pour une ambiance sereine et conviviale.
              </p>

              <p className="text-[#666666] text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 opacity-80">
                Safe space pour l'expression artistique : nous vous accompagnons dans la 
                réalisation de vos idées les plus audacieuses, du concept à la création finale.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button 
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="w-full sm:w-auto text-white px-10 py-7 md:py-8 rounded-full uppercase tracking-widest font-bold text-xs md:text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#E66E68]/20"
                variant="workshop"
              >
                Réserver Open Studio
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-4 lg:mb-0">
            <div className="absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#F2EAE5] rounded-full opacity-60 blur-2xl lg:blur-3xl" />
            
            <div className="relative w-full max-w-[320px] md:max-w-[450px] aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl rotate-1 lg:rotate-2 transition-transform hover:rotate-0 duration-700">
              <img 
                src="/diverse-group-of-people-joyfully-painting-tote-bag.jpg" 
                alt="Open Studio FunLab"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      <OpenStudioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}