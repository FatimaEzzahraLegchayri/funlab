'use client'

import { Sparkles, Quote, Fingerprint } from "lucide-react"

export function OwnerSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          <div className="relative w-full lg:w-5/12 max-w-[450px] lg:max-w-none mx-auto">
            <div className="absolute -top-6 -left-6 w-48 h-48 md:w-64 md:h-64 bg-[#AB507B]/5 rounded-full blur-3xl" />
            
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img 
                  src="/friendly-female-artist-instructor-smiling-in-creat.jpg" 
                  alt="Fondatrice de The Fun Lab" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 bg-white p-4 md:p-6 rounded-xl shadow-xl z-20 border border-zinc-100">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="bg-[#AB507B] p-2 md:p-3 rounded-lg">
                    <Sparkles className="h-5 w-5 md:h-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 font-bold">Fondée en</p>
                    <p className="text-lg md:text-xl font-serif font-bold text-zinc-800">2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-[#AB507B] uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm font-bold block">
                L'âme du studio
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-zinc-900 leading-tight text-balance">
                Derrière <span className="italic">The Fun Lab</span>
              </h2>
            </div>

            <div className="space-y-6 text-zinc-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              <p>
                Passionnée par l'art sous toutes ses formes, j'ai imaginé ce lieu comme une parenthèse créative dans le tumulte du quotidien. Ici, il n'y a pas de "mauvais" coup de pinceau, seulement l'expression de votre curiosité.
              </p>
              <p>
                Mon rôle est de vous offrir les outils, l'espace et l'inspiration nécessaires pour que vous puissiez redécouvrir le plaisir pur de créer, sans jugement et avec passion.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 py-8 border-y border-zinc-200">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <Fingerprint className="h-6 w-6 text-[#AB507B] shrink-0" />
                <div>
                  <h4 className="font-bold text-zinc-900">Vision Unique</h4>
                  <p className="text-sm text-zinc-500">Un espace pensé pour la liberté totale.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <Quote className="h-6 w-6 text-[#AB507B] shrink-0" />
                <div>
                  <h4 className="font-bold text-zinc-900">Philosophie</h4>
                  <p className="text-sm text-zinc-500">"L'art est un jeu qui se partage."</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="font-serif text-2xl md:text-3xl text-zinc-900">Mariam</p>
              <p className="text-[#AB507B] font-medium tracking-wide">Fondatrice</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}