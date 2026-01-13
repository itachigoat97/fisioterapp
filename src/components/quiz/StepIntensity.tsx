'use client'

interface StepIntensityProps {
  value: number
  onChange: (value: number) => void
  onNext: () => void
  onBack: () => void
}

export default function StepIntensity({ value, onChange, onNext, onBack }: StepIntensityProps) {
  const getIntensityColor = (val: number) => {
    if (val <= 3) return 'bg-green-500'
    if (val <= 6) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getIntensityLabel = (val: number) => {
    if (val <= 2) return 'Leggero'
    if (val <= 4) return 'Moderato'
    if (val <= 6) return 'Significativo'
    if (val <= 8) return 'Intenso'
    return 'Molto intenso'
  }

  const getIntensityDescription = (val: number) => {
    if (val <= 2) return 'Fastidio minimo, gestibile'
    if (val <= 4) return 'Dolore presente ma sopportabile'
    if (val <= 6) return 'Influenza le attività quotidiane'
    if (val <= 8) return 'Dolore difficile da ignorare'
    return 'Dolore che limita fortemente'
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl text-center mb-3">Quanto è intenso?</h2>
      <p className="text-stone-600 text-center mb-8">
        Indica l&apos;intensità del dolore su una scala da 1 a 10
      </p>

      <div className="max-w-md mx-auto">
        {/* Current Value Display */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getIntensityColor(value)} text-white text-4xl font-bold mb-3`}>
            {value}
          </div>
          <div className="text-xl font-medium text-stone-900">{getIntensityLabel(value)}</div>
          <div className="text-stone-500">{getIntensityDescription(value)}</div>
        </div>

        {/* Slider */}
        <div className="px-4">
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right,
                #22c55e 0%,
                #22c55e 30%,
                #eab308 30%,
                #eab308 60%,
                #ef4444 60%,
                #ef4444 100%)`,
            }}
          />
          <div className="flex justify-between mt-2 text-sm text-stone-500">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>

        {/* Quick Select Buttons */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 3, 5, 7, 10].map((num) => (
            <button
              key={num}
              onClick={() => onChange(num)}
              className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                value === num
                  ? 'bg-green-600 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex justify-between items-center">
          <button
            onClick={onBack}
            className="text-stone-500 hover:text-stone-700 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Indietro
          </button>
          <button
            onClick={onNext}
            className="btn btn-primary"
          >
            Continua
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
