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

// CMS Types
export interface SiteContent {
  id: string
  page: string
  section: string
  content_key: string
  content_value: string
  content_type: 'text' | 'json' | 'image'
  sort_order: number
  updated_at: string
}

export interface ContentSection {
  section: string
  label: string
  fields: ContentField[]
}

export interface ContentField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'json' | 'image'
  placeholder?: string
}

export type PageContent = Record<string, Record<string, string>>
