'use client'

import { Sparkles, Quote, Heart } from "lucide-react"

export function OwnerSection() {
  return (
    <section className="py-20 md:py-32 bg-[#FDFBF7] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="relative w-full lg:w-5/12 max-w-[450px] lg:max-w-none mx-auto">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#AB507B]/5 rounded-full blur-3xl" />
            
            <div className="relative group">
              <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border-[12px] border-white">
                <img 
                  src="/friendly-female-artist-instructor-smiling-in-creat.jpg" 
                  alt="Mariam - Fondatrice du Fun Lab" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 bg-white p-5 rounded-2xl shadow-xl z-20 border border-zinc-50">
                <div className="flex items-center gap-4">
                  <div className="bg-[#AB507B]/10 p-2.5 rounded-xl">
                    <Sparkles className="h-5 w-5 text-[#AB507B]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold leading-none mb-1">Depuis</p>
                    <p className="text-xl font-serif font-bold text-zinc-800 leading-none">2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-[#AB507B] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block opacity-80">
                L'âme du studio
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-zinc-900 leading-tight">
                Derrière <span className="italic text-[#AB507B]">The Fun Lab</span>
              </h2>
            </div>

            <div className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              <p>
                Animée par une passion pour l’art sous toutes ses formes, j’ai imaginé le Fun Lab comme un espace où l'on peut libérer sa créativité. Ici, il n’y a pas de “mauvais” coup de pinceau, seulement l’expression de votre curiosité et de vos envies. 
              </p>
              
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10 border-y border-zinc-200/60">
              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-[#AB507B]">
                  <Heart size={18} fill="currentColor" className="opacity-20" />
                  <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Mission</h4>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed italic">
                  Offrir un espace chaleureux où chacun peut expérimenter, s’amuser et laisser sa créativité s’exprimer — sans limite.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-[#AB507B]">
                  <Quote size={18} fill="currentColor" className="opacity-20" />
                  <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Philosophie</h4>
                </div>
                <p className="text-sm text-zinc-600 font-serif text-lg leading-snug">
                  “La créativité, c’est une intelligence qui s’amuse.”
                </p>
              </div>
            </div>

            <div className="pt-2">
              <p className="font-serif text-3xl md:text-4xl text-zinc-900">Mariam</p>
              <p className="text-[#AB507B] font-medium tracking-widest text-xs uppercase mt-1">Fondatrice et artiste passionnée</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}