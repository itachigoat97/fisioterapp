// Quiz submission type
export interface QuizSubmission {
  id: string
  created_at: string
  pain_zone: string
  duration: string
  intensity: number
  cause: string
  name: string
  age: number | null
  phone: string
  email: string
  notes: string | null
  status: 'nuovo' | 'contattato' | 'completato'
}

// Quiz form data (without id, created_at, status)
export interface QuizFormData {
  pain_zone: string
  duration: string
  intensity: number
  cause: string
  name: string
  age: number | null
  phone: string
  email: string
  notes?: string
}

// Quiz step types
export type PainZone = 'schiena' | 'collo' | 'spalla' | 'ginocchio' | 'caviglia' | 'altro'
export type Duration = 'meno_1_settimana' | '1_4_settimane' | '1_3_mesi' | 'piu_3_mesi'
export type Cause = 'trauma' | 'postura' | 'sport' | 'non_so'
