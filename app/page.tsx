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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <BenefitsSection />
        <OpenStudio />
        <WorkshopsSection />
        <BookingProcessSection />
        <OwnerSection />
        {/* <AboutSection /> */}
        <TestimonialsSection />
        <CtaSection />
        <ContactSection /> 
        {/* add contact pge */}
      </main>
      <Footer />
    </div>
  )
}
