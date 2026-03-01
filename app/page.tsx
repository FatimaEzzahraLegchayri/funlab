import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorkshopsSection } from "@/components/workshops-section"
import { BenefitsSection } from "@/components/benefits-section"
import { BookingProcessSection } from "@/components/booking-process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { OpenStudio } from "@/components/open-studio"
import { OwnerSection } from "@/components/owner-section"
import { CtaSection } from "@/components/cta-section"
import PrivateEvents from "@/components/PrivateEvents"
import SpaceRental from "@/components/SpaceRental"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <BenefitsSection />
        <OpenStudio />
        <BookingProcessSection />
        <PrivateEvents />
        <SpaceRental />
        <OwnerSection />
        <TestimonialsSection />
        <CtaSection />
        <ContactSection /> 
      </main>
      <Footer />
    </div>
  )
}
