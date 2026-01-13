'use client'

import type { PainZone } from '@/types'

interface StepPainZoneProps {
  value: string
  onChange: (value: PainZone | string) => void
  onNext: () => void
}

const painZones: { id: PainZone; label: string; icon: React.ReactNode }[] = [
  {
    id: 'schiena',
    label: 'Schiena',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: 'collo',
    label: 'Collo / Cervicale',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
  {
    id: 'spalla',
    label: 'Spalla',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    id: 'ginocchio',
    label: 'Ginocchio',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    id: 'caviglia',
    label: 'Caviglia / Piede',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    id: 'altro',
    label: 'Altra zona',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function StepPainZone({ value, onChange, onNext }: StepPainZoneProps) {
  const handleSelect = (id: PainZone) => {
    onChange(id)
    if (id !== 'altro') {
      setTimeout(onNext, 300)
    }
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl text-center mb-3">Dove senti dolore?</h2>
      <p className="text-stone-600 text-center mb-8">
        Seleziona la zona principale del tuo disagio
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {painZones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => handleSelect(zone.id)}
            className={`p-6 rounded-2xl border-2 transition-all text-center ${
              value === zone.id
                ? 'border-green-600 bg-green-50 shadow-md'
                : 'border-stone-200 bg-white hover:border-green-300 hover:shadow-sm'
            }`}
          >
            <div className={`mx-auto mb-3 ${value === zone.id ? 'text-green-600' : 'text-stone-400'}`}>
              {zone.icon}
            </div>
            <span className={`font-medium ${value === zone.id ? 'text-green-700' : 'text-stone-700'}`}>
              {zone.label}
            </span>
          </button>
        ))}
      </div>

      {value === 'altro' && (
        <div className="mt-6">
          <input
            type="text"
            placeholder="Specifica la zona del dolore..."
            className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-green-500 focus:outline-none transition-colors"
            onChange={(e) => onChange(e.target.value || 'altro')}
          />
          <button
            onClick={onNext}
            className="mt-4 w-full btn btn-primary"
          >
            Continua
          </button>
        </div>
      )}
    </div>
  )
}
