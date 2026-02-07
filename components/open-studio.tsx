import { Button } from "./ui/button"

export function OpenStudio() {
  return (
    <section id="open-studio" className="relative w-full bg-[#EBE3DE] py-20 lg:py-32">
      {/* Main Container: 'max-w-7xl mx-auto' keeps it perfectly aligned with your navbar.
          'grid-cols-1 lg:grid-cols-2' creates the side-by-side look.
      */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col text-left">
          <span className="text-[#E66E68] uppercase tracking-widest text-sm font-semibold mb-4">
            Un espace de liberté
          </span>
          
          {/* <h2 className="mb-6 text-4xl md:text-6xl font-light uppercase tracking-tight text-black leading-[1.1]">
            LIBERTÉ DE <br /> <span className="font-medium">CRÉATION</span>
          </h2> */}
          <h2
                className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance transition-all duration-1000 delay-200`}
            >
              LIBERTÉ DE <br /> <span className="font-medium">CRÉATION</span>
            </h2>

          <p className="text-[#666666] text-lg leading-relaxed my-6">
          Un espace ouvert aux individus, aux familles et aux amis. 
            Créez ensemble ou seul, avec un coup de pouce si besoin. 
            Session limitée à 10 personnes pour une ambiance sereine et conviviale.
          </p>

          <p className="text-[#666666] text-lg leading-relaxed mb-10">
            Therefore, you can safely entrust them not only the classic tasks but also the 
            implementation of any idea of transformation!
          </p>

          <div>
            <Button 
              size="lg"
              className="text-white px-10 py-6 rouded-full uppercase tracking-wider font-bold text-sm transition-colors"
              variant="workshop"
            >
              Réserver Open Studio
            </Button>
          </div>
        </div>

        {/* Right Side: Image with organic shape background */}
        <div className="relative flex justify-center lg:justify-end">
          {/* The decorative circle/organic shape behind the image */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#F2EAE5] rounded-full opacity-50" />
          
          <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden">
            <img 
              src="/diverse-group-of-people-joyfully-painting-tote-bag.jpg" 
              alt="Beauty Studio"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
