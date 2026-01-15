'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { QuizFormData, PainZone, Duration, Cause } from '@/types'
import ProgressBar from './ProgressBar'
import StepPainZone from './StepPainZone'
import StepDuration from './StepDuration'
import StepIntensity from './StepIntensity'
import StepCause from './StepCause'
import StepContact from './StepContact'
import Link from 'next/link'

const TOTAL_STEPS = 5

export default function QuizContainer() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<QuizFormData>({
    pain_zone: '',
    duration: '',
    intensity: 5,
    cause: '',
    name: '',
    age: null,
    phone: '',
    email: '',
    notes: '',
  })

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const { error: supabaseError } = await supabase
        .from('quiz_submissions')
        .insert([{
          pain_zone: formData.pain_zone,
          duration: formData.duration,
          intensity: formData.intensity,
          cause: formData.cause,
          name: formData.name,
          age: formData.age,
          phone: formData.phone,
          email: formData.email,
          notes: formData.notes || null,
          status: 'nuovo',
        }])

      if (supabaseError) {
        throw supabaseError
      }

      setIsComplete(true)
    } catch (err) {
      console.error('Error submitting quiz:', err)
      setError('Si è verificato un errore. Riprova o contattaci direttamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success Screen
  if (isComplete) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl mb-4">Grazie, {formData.name.split(' ')[0]}!</h2>
        <p className="text-lg text-stone-600 max-w-md mx-auto mb-8">
          La tua richiesta è stata inviata con successo. Ti contatterò entro 24 ore
          per organizzare la tua prima visita.
        </p>
        <div className="bg-green-50 rounded-2xl p-6 max-w-sm mx-auto mb-8">
          <p className="text-sm text-stone-600 mb-2">Ti contatterò al numero:</p>
          <p className="text-lg font-semibold text-green-700">{formData.phone}</p>
        </div>
        <Link href="/" className="btn btn-outline">
          Torna alla Home
        </Link>
      </div>
    )
  }

  return (
    <div>
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
          {error}
        </div>
      )}

      {/* Steps */}
      <div className="min-h-[400px]">
        {currentStep === 0 && (
          <StepPainZone
            value={formData.pain_zone}
            onChange={(value) => setFormData({ ...formData, pain_zone: value as PainZone | string })}
            onNext={handleNext}
          />
        )}

        {currentStep === 1 && (
          <StepDuration
            value={formData.duration}
            onChange={(value) => setFormData({ ...formData, duration: value as Duration })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 2 && (
          <StepIntensity
            value={formData.intensity}
            onChange={(value) => setFormData({ ...formData, intensity: value })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <StepCause
            value={formData.cause}
            onChange={(value) => setFormData({ ...formData, cause: value as Cause })}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <StepContact
            value={{
              name: formData.name,
              age: formData.age,
              phone: formData.phone,
              email: formData.email,
              notes: formData.notes || '',
            }}
            onChange={(value) => setFormData({
              ...formData,
              name: value.name,
              age: value.age,
              phone: value.phone,
              email: value.email,
              notes: value.notes,
            })}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  )
}
