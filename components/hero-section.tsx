"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { OpenStudioModal } from "@/components/modals/openStudioModal";

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-8 order-2 lg:order-1">
            <div
              className={`inline-block transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2EAE5] border border-[#AB507B] text-sm text-[#AB507B] font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#AB507B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#AB507B]"></span>
                </span>
                Nouveaux ateliers disponibles
              </span>
            </div>

            <div className="space-y-4 px-4">
              <p
                className={`text-sm tracking-widest text-muted-foreground uppercase transition-all duration-700 delay-100 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
              >
                Bienvenue chez
              </p>
              <h1
                className={`font-serif text-4xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight text-balance transition-all duration-1000 delay-200 ${
                  mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{
                  textShadow: "0 2px 40px rgba(0,0,0,0.05)",
                }}
              >
                The Fun Lab
              </h1>
            </div>

            <p
              className={`px-4 text-lg text-justify px-2 text-muted-foreground leading-relaxed transition-all duration-1000 delay-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Un espace sans jugement où l'on expérimente, on se salit les mains et on repart avec une création unique. Ateliers guidés par des pros ou accès libre au studio : à vous de choisir votre aventure.
            </p>

            <div
              className={`flex flex-col sm:flex-row items-center gap-4 pt-4 transition-all duration-1000 delay-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link href="">
                <Button
                  size="lg"
                  variant="workshop"
                onClick={() => setIsModalOpen(true)}
                  className="rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:-translate-y-1"
                >
                  Réserver Open Studion
                </Button>
              </Link>
              <Link href="#ateliers" scroll={true}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-medium bg-transparent border-2 hover:bg-foreground/5 hover:text-foreground hover:scale-105 transition-all duration-300 hover:-translate-y-1"
              >
                Réserver un workshop
              </Button>
              </Link>
            </div>
          </div>

          <div
            className={`relative order-1 lg:order-2 transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl animate-pulse" />
              <div
                className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl bg-gradient-to-tr from-accent/20 to-primary/20 blur-xl"
                style={{
                  animation: "float 8s ease-in-out infinite",
                }}
              />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-background">
                <Image
                  src="/diverse-group-of-people-joyfully-painting-tote-bag.jpg"
                  alt="Atelier d'art créatif avec des personnes en train de créer"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 mix-blend-overlay" />
              </div>

              <div
                className="absolute -bottom-4 -left-4 bg-background rounded-2xl shadow-xl p-4 border border-primary/20"
                style={{
                  animation: "float 6s ease-in-out infinite 1s",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">25+</p>
                    <p className="text-xs text-muted-foreground">Ateliers</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -top-4 -right-4 bg-background rounded-2xl shadow-xl p-4 border border-secondary/20"
                style={{
                  animation: "float 7s ease-in-out infinite 2s",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">500+</p>
                    <p className="text-xs text-muted-foreground">Participants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute bottom-25 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Découvrez plus</p>
            <svg className="w-4 h-6 text-primary" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 -left-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl transition-all duration-[3000ms] ${
            mounted ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
          }`}
          style={{
            animation: "float 8s ease-in-out infinite",
          }}
        />

        <div
          className={`absolute top-40 -right-32 w-80 h-80 rounded-full bg-secondary/25 blur-3xl transition-all duration-[3000ms] delay-300 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
          style={{
            animation: "float 10s ease-in-out infinite 2s",
          }}
        />

        <div
          className={`absolute bottom-32 left-1/4 w-48 h-48 rounded-full bg-accent/20 blur-2xl transition-all duration-[3000ms] delay-500 ${
            mounted ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
          style={{
            animation: "float 7s ease-in-out infinite 1s",
          }}
        />
      </div>

      <svg
        className={`absolute top-10 left-0 w-32 md:w-40 h-32 md:h-40 text-primary transition-all duration-1000 ${
          mounted ? "opacity-40 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10,100 Q50,20 100,50 T190,100"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: mounted ? 0 : 300,
            transition: "stroke-dashoffset 2s ease-out",
          }}
        />
      </svg>

      <svg
        className={`absolute bottom-20 right-0 w-32 md:w-40 h-32 md:h-40 text-secondary transition-all duration-1000 delay-200 ${
          mounted ? "opacity-40 translate-x-0" : "opacity-0 translate-x-10"
        }`}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M190,100 Q150,20 100,50 T10,100"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: 300,
            strokeDashoffset: mounted ? 0 : 300,
            transition: "stroke-dashoffset 2s ease-out 0.2s",
          }}
        />
      </svg>

      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }
      `}</style>

    <OpenStudioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
    />

    </section>
  )
}
