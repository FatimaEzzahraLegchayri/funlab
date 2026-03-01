'use client';

import React, { useState } from 'react';
import { Button } from "./ui/button"
import { OpenStudioModal } from "@/components/modals/openStudioModal";

export function OpenStudio() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="open-studio" className="relative w-full bg-[#EBE3DE] py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
  
        <div className="flex flex-col order-2 lg:order-1 text-center lg:text-left">
          
          <div className="mb-8 md:mb-10">
            <span className="text-[#AB507B] uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 block opacity-80">
              Un espace de liberté
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] text-balance">
              Ateliers 
              <span className="italic font-medium text-[#AB507B]"> privés</span>
            </h2>
          </div>

          <div className="space-y-6 mb-10 md:mb-12">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
            Découvrez une expérience créative unique et sur mesure à Casablanca, dans un cadre chaleureux et convivial. 
            Seul(e), en famille ou entre amis, chacun est le bienvenu, petits et grands. Choisis ton projet et profites d’un moment agréable, adapté à tes envies.

            
            </p>

            <div className="h-[1px] w-12 bg-[#AB507B]/30 mx-auto lg:mx-0" />

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 opacity-70 italic font-serif">
            Je suis toujours là pour t’accompagner, t’encourager et m’assurer que tu passes un moment mémorable. 
            </p>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Button 
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="w-full sm:w-auto bg-[#AB507B] hover:bg-[#913d64] text-white px-12 py-7 rounded-full uppercase tracking-[0.15em] font-bold text-[10px] md:text-xs transition-all hover:translate-y-[-2px] shadow-xl shadow-[#AB507B]/20"
            >
              Réserver un atelier privé
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="absolute -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#AB507B]/5 rounded-full blur-3xl" />
          
          <div className="relative w-full max-w-[340px] md:max-w-[480px] group">
            <div className="absolute inset-0 border border-[#AB507B]/20 translate-x-4 translate-y-4 rounded-2xl -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 duration-500" />
            
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white p-3">
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <img 
                  src="/diverse-group-of-people-joyfully-painting-tote-bag.jpg" 
                  alt="Atelier privé FunLab"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#AB507B]/5 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-[#F2EAE5] hidden md:block animate-in fade-in slide-in-from-left-4 duration-1000">
              <p className="text-[10px] font-bold text-[#AB507B] uppercase tracking-widest">Capacité</p>
              <p className="text-sm font-serif italic text-foreground">Max 10 participants</p>
            </div>
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