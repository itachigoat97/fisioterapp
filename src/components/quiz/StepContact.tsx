'use client'

import { useState } from 'react'

interface ContactData {
  name: string
  phone: string
  email: string
  notes: string
}

interface StepContactProps {
  value: ContactData
  onChange: (value: ContactData) => void
  onSubmit: () => void
  onBack: () => void
  isSubmitting: boolean
}

export default function StepContact({ value, onChange, onSubmit, onBack, isSubmitting }: StepContactProps) {
  const [errors, setErrors] = useState<Partial<ContactData>>({})

  const validate = () => {
    const newErrors: Partial<ContactData> = {}

    if (!value.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio'
    }

    if (!value.phone.trim()) {
      newErrors.phone = 'Il telefono è obbligatorio'
    } else if (!/^[+]?[\d\s-]{8,}$/.test(value.phone)) {
      newErrors.phone = 'Inserisci un numero valido'
    }

    if (!value.email.trim()) {
      newErrors.email = "L'email è obbligatoria"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) {
      newErrors.email = 'Inserisci una email valida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit()
    }
  }

  const handleChange = (field: keyof ContactData, val: string) => {
    onChange({ ...value, [field]: val })
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined })
    }
  }

  return (
    <div>
      <h2 className="text-2xl md:text-3xl text-center mb-3">Come ti contattiamo?</h2>
      <p className="text-stone-600 text-center mb-8">
        Inserisci i tuoi dati per ricevere la consulenza gratuita
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
            Nome e Cognome *
          </label>
          <input
            type="text"
            id="name"
            value={value.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
              errors.name
                ? 'border-red-300 focus:border-red-500'
                : 'border-stone-200 focus:border-green-500'
            }`}
            placeholder="Mario Rossi"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
            Telefono *
          </label>
          <input
            type="tel"
            id="phone"
            value={value.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
              errors.phone
                ? 'border-red-300 focus:border-red-500'
                : 'border-stone-200 focus:border-green-500'
            }`}
            placeholder="+39 333 1234567"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={value.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-colors ${
              errors.email
                ? 'border-red-300 focus:border-red-500'
                : 'border-stone-200 focus:border-green-500'
            }`}
            placeholder="mario@esempio.it"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-stone-700 mb-1">
            Note aggiuntive <span className="text-stone-400">(opzionale)</span>
          </label>
          <textarea
            id="notes"
            value={value.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-green-500 focus:outline-none transition-colors resize-none"
            placeholder="Descrivi brevemente la tua situazione..."
          />
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-stone-500 text-center">
          Inviando questo form accetti che i tuoi dati vengano utilizzati per contattarti
          in merito alla tua richiesta. Non condivideremo mai i tuoi dati con terze parti.
        </p>

        {/* Navigation */}
        <div className="pt-4 flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            className="text-stone-500 hover:text-stone-700 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Indietro
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Invio in corso...
              </>
            ) : (
              <>
                Invia Richiesta
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
