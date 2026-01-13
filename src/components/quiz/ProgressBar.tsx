'use client'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

const stepLabels = [
  'Zona',
  'Durata',
  'Intensità',
  'Causa',
  'Contatti',
]

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep) / totalSteps) * 100

  return (
    <div className="mb-10">
      {/* Step Indicators */}
      <div className="flex justify-between mb-3">
        {stepLabels.map((label, index) => (
          <div
            key={label}
            className={`flex flex-col items-center ${
              index < currentStep
                ? 'text-green-600'
                : index === currentStep
                ? 'text-green-700'
                : 'text-stone-400'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                index < currentStep
                  ? 'bg-green-600 text-white'
                  : index === currentStep
                  ? 'bg-green-100 text-green-700 ring-2 ring-green-600'
                  : 'bg-stone-100 text-stone-400'
              }`}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className="text-xs mt-1 hidden sm:block">{label}</span>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
