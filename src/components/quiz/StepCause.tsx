'use client'

import type { Cause } from '@/types'

interface StepCauseProps {
  value: string
  onChange: (value: Cause) => void
  onNext: () => void
  onBack: () => void
}

const causes: { id: Cause; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'trauma',
    label: 'Trauma / Infortunio',
    description: 'Caduta, incidente, colpo',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    id: 'postura',
    label: 'Postura / Lavoro sedentario',
    description: 'Ufficio, scrivania, PC',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    id: 'sport',
    label: 'Attività sportiva',
    description: 'Allenamento, gara, sovraccarico',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    id: 'non_so',
    label: 'Non lo so',
    description: 'Causa non identificata',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
]

export default function StepCause({ value, onChange, onNext, onBack }: StepCauseProps) {
  const handleSelect = (id: Cause) => {
    onChange(id)
    setTimeout(onNext, 300)
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl text-center mb-3">Possibile causa?</h2>
      <p className="text-stone-600 text-center mb-8">
        Scegli quella che ti sembra più probabile
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {causes.map((cause) => (
          <button
            key={cause.id}
            onClick={() => handleSelect(cause.id)}
            className={`p-6 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${
              value === cause.id
                ? 'border-green-600 bg-green-50 shadow-md'
                : 'border-stone-200 bg-white hover:border-green-300 hover:shadow-sm'
            }`}
          >
            <div className={`flex-shrink-0 ${value === cause.id ? 'text-green-600' : 'text-stone-400'}`}>
              {cause.icon}
            </div>
            <div>
              <div className={`font-medium ${value === cause.id ? 'text-green-700' : 'text-stone-700'}`}>
                {cause.label}
              </div>
              <div className="text-sm text-stone-500">{cause.description}</div>
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
