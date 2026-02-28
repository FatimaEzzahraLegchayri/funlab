import { Check } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { id: 1, label: 'Détails' },
    { id: 2, label: 'Paiement' },
    { id: 3, label: 'Fini' }
  ]

  return (
    <div className="relative flex justify-between w-full max-w-sm mx-auto mb-8">
      <div className="absolute top-3.5 left-0 w-full h-[2px] bg-gray-100 -z-0" />
      
      <div 
        className="absolute top-3.5 left-0 h-[2px] bg-[#B35D89] transition-all duration-500 ease-in-out -z-0" 
        style={{ width: `${currentStep === 1 ? 0 : currentStep === 2 ? 50 : 100}%` }}
      />

      {steps.map((step) => {
        const isActive = currentStep === step.id
        const isCompleted = currentStep > step.id

        return (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full text-[10px] flex items-center justify-center font-bold transition-all duration-500 border-2 ${
                isActive
                  ? 'bg-[#B35D89] text-white border-[#B35D89] shadow-md shadow-[#B35D89]/20'
                  : isCompleted
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-white text-gray-400 border-gray-100'
              }`}
            >
              {isCompleted ? <Check size={14} strokeWidth={3} /> : step.id}
            </div>
            <span
              className={`text-[9px] uppercase font-bold tracking-wider transition-colors duration-300 ${
                isActive ? 'text-[#B35D89]' : isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}