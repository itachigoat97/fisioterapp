'use client'

interface Field {
  key: string
  label: string
  type: 'text' | 'textarea' | 'json'
}

interface Section {
  section: string
  label: string
  fields: Field[]
}

interface ContentSectionProps {
  section: Section
  content: Record<string, string>
  isOpen: boolean
  onToggle: () => void
  onChange: (key: string, value: string) => void
}

export default function ContentSection({
  section,
  content,
  isOpen,
  onToggle,
  onChange,
}: ContentSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/50 overflow-hidden shadow-sm">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            isOpen ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-500'
          }`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
            </svg>
          </div>
          <span className="font-semibold text-stone-900">{section.label}</span>
          <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
            {section.fields.length} campi
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="border-t border-stone-100 p-5 space-y-5">
          {section.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                {field.label}
                {field.type === 'json' && (
                  <span className="ml-2 text-xs text-amber-600 font-normal">(Formato JSON)</span>
                )}
              </label>

              {field.type === 'text' && (
                <input
                  type="text"
                  value={content[field.key] || ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all bg-stone-50/50 hover:bg-white"
                  placeholder={`Inserisci ${field.label.toLowerCase()}...`}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  value={content[field.key] || ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all bg-stone-50/50 hover:bg-white resize-y"
                  placeholder={`Inserisci ${field.label.toLowerCase()}...`}
                />
              )}

              {field.type === 'json' && (
                <div>
                  <textarea
                    value={formatJson(content[field.key] || '[]')}
                    onChange={(e) => {
                      try {
                        // Valida che sia JSON valido
                        JSON.parse(e.target.value)
                        onChange(field.key, e.target.value)
                      } catch {
                        // Se non è JSON valido, salva comunque (l'utente sta ancora scrivendo)
                        onChange(field.key, e.target.value)
                      }
                    }}
                    rows={8}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all bg-stone-50/50 hover:bg-white resize-y font-mono text-sm"
                    placeholder="[]"
                  />
                  <p className="mt-2 text-xs text-stone-500">
                    Modifica con attenzione il JSON. Assicurati che sia valido prima di salvare.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Helper per formattare JSON in modo leggibile
function formatJson(jsonString: string): string {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 2)
  } catch {
    return jsonString
  }
}
