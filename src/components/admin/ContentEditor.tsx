'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import ContentSection from './ContentSection'

interface ContentEditorProps {
  page: string
  defaultContent: Record<string, Record<string, string>>
  onSave: (items: Array<{ page: string; section: string; key: string; value: string }>) => Promise<void>
  isSaving: boolean
}

// Configurazione sezioni per ogni pagina
const pageConfig: Record<string, Array<{ section: string; label: string; fields: Array<{ key: string; label: string; type: 'text' | 'textarea' | 'json' }> }>> = {
  home: [
    {
      section: 'hero',
      label: 'Hero Section',
      fields: [
        { key: 'badge', label: 'Badge', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'titleHighlight', label: 'Titolo (parte evidenziata)', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'ctaPrimary', label: 'Bottone Primario', type: 'text' },
        { key: 'ctaSecondary', label: 'Bottone Secondario', type: 'text' },
        { key: 'trust1', label: 'Trust Indicator 1', type: 'text' },
        { key: 'trust2', label: 'Trust Indicator 2', type: 'text' },
        { key: 'trust3', label: 'Trust Indicator 3', type: 'text' },
      ],
    },
    {
      section: 'services',
      label: 'Sezione Servizi',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'service1Title', label: 'Servizio 1 - Titolo', type: 'text' },
        { key: 'service1Desc', label: 'Servizio 1 - Descrizione', type: 'textarea' },
        { key: 'service2Title', label: 'Servizio 2 - Titolo', type: 'text' },
        { key: 'service2Desc', label: 'Servizio 2 - Descrizione', type: 'textarea' },
        { key: 'service3Title', label: 'Servizio 3 - Titolo', type: 'text' },
        { key: 'service3Desc', label: 'Servizio 3 - Descrizione', type: 'textarea' },
        { key: 'link', label: 'Testo Link', type: 'text' },
      ],
    },
    {
      section: 'benefits',
      label: 'Sezione Benefici',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'benefit1Title', label: 'Beneficio 1 - Titolo', type: 'text' },
        { key: 'benefit1Desc', label: 'Beneficio 1 - Descrizione', type: 'textarea' },
        { key: 'benefit2Title', label: 'Beneficio 2 - Titolo', type: 'text' },
        { key: 'benefit2Desc', label: 'Beneficio 2 - Descrizione', type: 'textarea' },
        { key: 'benefit3Title', label: 'Beneficio 3 - Titolo', type: 'text' },
        { key: 'benefit3Desc', label: 'Beneficio 3 - Descrizione', type: 'textarea' },
        { key: 'benefit4Title', label: 'Beneficio 4 - Titolo', type: 'text' },
        { key: 'benefit4Desc', label: 'Beneficio 4 - Descrizione', type: 'textarea' },
      ],
    },
    {
      section: 'cta',
      label: 'Call to Action',
      fields: [
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'button', label: 'Testo Bottone', type: 'text' },
        { key: 'note', label: 'Nota', type: 'text' },
      ],
    },
  ],
  servizi: [
    {
      section: 'hero',
      label: 'Hero Section',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
      ],
    },
    {
      section: 'services',
      label: 'Lista Servizi',
      fields: [
        { key: 'items', label: 'Servizi (JSON)', type: 'json' },
      ],
    },
    {
      section: 'conditions',
      label: 'Patologie Trattate',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'items', label: 'Lista Patologie (JSON)', type: 'json' },
      ],
    },
    {
      section: 'cta',
      label: 'Call to Action',
      fields: [
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'button', label: 'Testo Bottone', type: 'text' },
      ],
    },
  ],
  prezzi: [
    {
      section: 'hero',
      label: 'Hero Section',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
      ],
    },
    {
      section: 'packages',
      label: 'Pacchetti Prezzi',
      fields: [
        { key: 'items', label: 'Pacchetti (JSON)', type: 'json' },
        { key: 'note', label: 'Nota', type: 'text' },
      ],
    },
    {
      section: 'included',
      label: 'Cosa è Incluso',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'item1Title', label: 'Item 1 - Titolo', type: 'text' },
        { key: 'item1Desc', label: 'Item 1 - Descrizione', type: 'text' },
        { key: 'item2Title', label: 'Item 2 - Titolo', type: 'text' },
        { key: 'item2Desc', label: 'Item 2 - Descrizione', type: 'text' },
        { key: 'item3Title', label: 'Item 3 - Titolo', type: 'text' },
        { key: 'item3Desc', label: 'Item 3 - Descrizione', type: 'text' },
        { key: 'item4Title', label: 'Item 4 - Titolo', type: 'text' },
        { key: 'item4Desc', label: 'Item 4 - Descrizione', type: 'text' },
      ],
    },
    {
      section: 'faq',
      label: 'FAQ',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'items', label: 'Domande e Risposte (JSON)', type: 'json' },
      ],
    },
    {
      section: 'cta',
      label: 'Call to Action',
      fields: [
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'button', label: 'Testo Bottone', type: 'text' },
      ],
    },
  ],
  'chi-siamo': [
    {
      section: 'hero',
      label: 'Hero Section',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
      ],
    },
    {
      section: 'howItWorks',
      label: 'Come Funziona',
      fields: [
        { key: 'patientsLabel', label: 'Pazienti - Etichetta', type: 'text' },
        { key: 'patientsTitle', label: 'Pazienti - Titolo', type: 'text' },
        { key: 'patientsText1', label: 'Pazienti - Testo 1', type: 'textarea' },
        { key: 'patientsText2', label: 'Pazienti - Testo 2', type: 'textarea' },
        { key: 'prosLabel', label: 'Professionisti - Etichetta', type: 'text' },
        { key: 'prosTitle', label: 'Professionisti - Titolo', type: 'text' },
        { key: 'prosText1', label: 'Professionisti - Testo 1', type: 'textarea' },
        { key: 'prosText2', label: 'Professionisti - Testo 2', type: 'textarea' },
      ],
    },
    {
      section: 'mission',
      label: 'Missione',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'description', label: 'Descrizione', type: 'textarea' },
      ],
    },
    {
      section: 'values',
      label: 'Valori',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'value1Title', label: 'Valore 1 - Titolo', type: 'text' },
        { key: 'value1Desc', label: 'Valore 1 - Descrizione', type: 'textarea' },
        { key: 'value2Title', label: 'Valore 2 - Titolo', type: 'text' },
        { key: 'value2Desc', label: 'Valore 2 - Descrizione', type: 'textarea' },
        { key: 'value3Title', label: 'Valore 3 - Titolo', type: 'text' },
        { key: 'value3Desc', label: 'Valore 3 - Descrizione', type: 'textarea' },
      ],
    },
    {
      section: 'cta',
      label: 'Call to Action',
      fields: [
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'buttonPrimary', label: 'Bottone Primario', type: 'text' },
        { key: 'buttonSecondary', label: 'Bottone Secondario', type: 'text' },
      ],
    },
  ],
  contatti: [
    {
      section: 'hero',
      label: 'Hero Section',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
      ],
    },
    {
      section: 'methods',
      label: 'Metodi di Contatto',
      fields: [
        { key: 'items', label: 'Contatti (JSON)', type: 'json' },
      ],
    },
    {
      section: 'zones',
      label: 'Zone Coperte',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'items', label: 'Zone (JSON)', type: 'json' },
      ],
    },
    {
      section: 'schedule',
      label: 'Orari',
      fields: [
        { key: 'label', label: 'Etichetta', type: 'text' },
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'items', label: 'Orari (JSON)', type: 'json' },
        { key: 'note', label: 'Nota', type: 'text' },
      ],
    },
    {
      section: 'cta',
      label: 'Call to Action',
      fields: [
        { key: 'title', label: 'Titolo', type: 'text' },
        { key: 'subtitle', label: 'Sottotitolo', type: 'textarea' },
        { key: 'button', label: 'Testo Bottone', type: 'text' },
      ],
    },
  ],
}

export default function ContentEditor({ page, defaultContent, onSave, isSaving }: ContentEditorProps) {
  const [content, setContent] = useState<Record<string, Record<string, string>>>({})
  const [openSections, setOpenSections] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)

  // Carica contenuti dal database
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('section, content_key, content_value')
          .eq('page', page)

        if (error) throw error

        // Inizia con i default
        const merged = JSON.parse(JSON.stringify(defaultContent))

        // Sovrascrive con i valori dal DB
        if (data) {
          for (const item of data) {
            if (merged[item.section]) {
              merged[item.section][item.content_key] = item.content_value
            }
          }
        }

        setContent(merged)
        setHasChanges(false)
      } catch {
        // Silenzioso - usa i contenuti di default se il DB non è configurato
        setContent(defaultContent)
      } finally {
        setIsLoading(false)
      }
    }

    loadContent()
  }, [page, defaultContent])

  const handleFieldChange = (section: string, key: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const handleSave = async () => {
    const items: Array<{ page: string; section: string; key: string; value: string }> = []

    for (const [section, fields] of Object.entries(content)) {
      for (const [key, value] of Object.entries(fields)) {
        items.push({ page, section, key, value })
      }
    }

    await onSave(items)
    setHasChanges(false)
  }

  const handleReset = () => {
    setContent(defaultContent)
    setHasChanges(true)
  }

  const sections = pageConfig[page] || []

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200/50 p-12 text-center">
        <div className="w-8 h-8 rounded-full border-4 border-green-200 border-t-green-600 animate-spin mx-auto" />
        <p className="mt-4 text-stone-500">Caricamento contenuti...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Save Bar */}
      {hasChanges && (
        <div className="sticky top-[73px] z-30 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-amber-800 font-medium">Hai modifiche non salvate</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Ripristina Default
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Salvataggio...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Salva Modifiche
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Content Sections */}
      {sections.map((section) => (
        <ContentSection
          key={section.section}
          section={section}
          content={content[section.section] || {}}
          isOpen={openSections.includes(section.section)}
          onToggle={() => toggleSection(section.section)}
          onChange={(key, value) => handleFieldChange(section.section, key, value)}
        />
      ))}
    </div>
  )
}
