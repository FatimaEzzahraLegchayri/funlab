'use client'

import { Sparkles, Quote, Fingerprint } from "lucide-react"

export function OwnerSection() {
  return (
    <section className="py-24 bg-[#FDFBF7] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side: Editorial Style */}
          <div className="relative w-full lg:w-5/12">
            {/* Decorative background shape using your brand color #AB507B */}
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-[#AB507B]/5 rounded-full blur-3xl" />
            
            <div className="relative">
              {/* Main Image with a premium thick border/offset effect */}
              <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
                <img 
                  src="/friendly-female-artist-instructor-smiling-in-creat.jpg" 
                  alt="Fondatrice de The Fun Lab" 
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block border border-zinc-100">
                <div className="flex items-center gap-4">
                  <div className="bg-[#AB507B] p-3 rounded-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Fondée en</p>
                    <p className="text-xl font-serif font-bold text-zinc-800">2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12 space-y-8">
            <div className="space-y-4">
              <span className="text-[#AB507B] uppercase tracking-[0.3em] text-sm font-bold block">
                L'âme du studio
              </span>
              <h2 className="text-5xl md:text-6xl font-serif text-zinc-900 leading-tight">
                Derrière <span className="italic">The Fun Lab</span>
              </h2>
            </div>

            <div className="space-y-6 text-zinc-600 text-lg leading-relaxed max-w-xl">
              <p>
                Passionnée par l'art sous toutes ses formes, j'ai imaginé ce lieu comme une parenthèse créative dans le tumulte du quotidien. Ici, il n'y a pas de "mauvais" coup de pinceau, seulement l'expression de votre curiosité.
              </p>
              <p>
                Mon rôle est de vous offrir les outils, l'espace et l'inspiration nécessaires pour que vous puissiez redécouvrir le plaisir pur de créer, sans jugement et avec passion.
              </p>
            </div>

            {/* Signature Stats Area */}
            <div className="grid grid-cols-2 gap-8 py-8 border-y border-zinc-200">
              <div className="flex items-start gap-4">
                <Fingerprint className="h-6 w-6 text-[#AB507B] shrink-0" />
                <div>
                  <h4 className="font-bold text-zinc-900">Vision Unique</h4>
                  <p className="text-sm text-zinc-500">Un espace pensé pour la liberté totale.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Quote className="h-6 w-6 text-[#AB507B] shrink-0" />
                <div>
                  <h4 className="font-bold text-zinc-900">Philosophie</h4>
                  <p className="text-sm text-zinc-500">"L'art est un jeu qui se partage."</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="font-serif text-2xl text-zinc-900">Mariam</p>
              <p className="text-[#AB507B] font-medium tracking-wide">Fondatrice</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}