'use client'

import type { Duration } from '@/types'

interface StepDurationProps {
  value: string
  onChange: (value: Duration) => void
  onNext: () => void
  onBack: () => void
}

const durations: { id: Duration; label: string; description: string }[] = [
  {
    id: 'meno_1_settimana',
    label: 'Meno di 1 settimana',
    description: 'È iniziato da poco',
  },
  {
    id: '1_4_settimane',
    label: '1-4 settimane',
    description: 'Qualche settimana fa',
  },
  {
    id: '1_3_mesi',
    label: '1-3 mesi',
    description: 'Da qualche mese',
  },
  {
    id: 'piu_3_mesi',
    label: 'Più di 3 mesi',
    description: 'Dolore cronico',
  },
]

export default function StepDuration({ value, onChange, onNext, onBack }: StepDurationProps) {
  const handleSelect = (id: Duration) => {
    onChange(id)
    setTimeout(onNext, 300)
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl text-center mb-3">Da quanto tempo?</h2>
      <p className="text-stone-600 text-center mb-8">
        Indica da quanto tempo avverti questo dolore
      </p>

      <div className="space-y-3 max-w-md mx-auto">
        {durations.map((duration) => (
          <button
            key={duration.id}
            onClick={() => handleSelect(duration.id)}
            className={`w-full p-5 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
              value === duration.id
                ? 'border-green-600 bg-green-50 shadow-md'
                : 'border-stone-200 bg-white hover:border-green-300 hover:shadow-sm'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                value === duration.id ? 'border-green-600 bg-green-600' : 'border-stone-300'
              }`}
            >
              {value === duration.id && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <div className={`font-medium ${value === duration.id ? 'text-green-700' : 'text-stone-700'}`}>
                {duration.label}
              </div>
              <div className="text-sm text-stone-500">{duration.description}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onBack}
          className="text-stone-500 hover:text-stone-700 flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Indietro
        </button>
      </div>
    </div>
  )
}
