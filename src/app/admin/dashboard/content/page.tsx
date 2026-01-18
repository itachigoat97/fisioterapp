'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'
import { defaultContent } from '@/lib/default-content'
import ContentEditor from '@/components/admin/ContentEditor'

const pages = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'servizi', label: 'Servizi', icon: '🛠️' },
  { id: 'prezzi', label: 'Prezzi', icon: '💰' },
  { id: 'chi-siamo', label: 'Chi Siamo', icon: '👥' },
  { id: 'contatti', label: 'Contatti', icon: '📞' },
]

export default function ContentManagementPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activePage, setActivePage] = useState('home')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin')
        return
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const handleSave = async (contentItems: Array<{ page: string; section: string; key: string; value: string }>) => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const records = contentItems.map((item) => ({
        page: item.page,
        section: item.section,
        content_key: item.key,
        content_value: item.value,
        content_type: 'text',
      }))

      const { error } = await supabase
        .from('site_content')
        .upsert(records, {
          onConflict: 'page,section,content_key',
        })

      if (error) throw error

      setSaveMessage({ type: 'success', text: 'Contenuti salvati con successo!' })
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (err) {
      console.error('Error saving content:', err)
      setSaveMessage({ type: 'error', text: 'Errore nel salvataggio. Riprova.' })
    } finally {
      setIsSaving(false)
    }
  }

  const today = new Date().toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-green-50/30 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />
          <p className="mt-4 text-stone-500 font-medium">Caricamento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-green-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg shadow-green-600/20">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-900">Gestione Contenuti</h1>
                <p className="text-sm text-stone-500 capitalize">{today}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-stone-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              <span className="hidden sm:inline font-medium">Esci</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container pt-6 pb-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-stone-200/50 p-2 mb-6 shadow-sm">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
              Richieste
            </Link>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-100 text-green-700 font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Contenuti
            </div>
          </div>
        </div>

        {/* Page Selector */}
        <div className="bg-white rounded-2xl border border-stone-200/50 p-4 mb-6 shadow-sm">
          <h3 className="text-sm font-medium text-stone-500 mb-3">Seleziona pagina da modificare</h3>
          <div className="flex flex-wrap gap-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  activePage === page.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>{page.icon}</span>
                {page.label}
              </button>
            ))}
          </div>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            saveMessage.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {saveMessage.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              )}
            </svg>
            {saveMessage.text}
          </div>
        )}

        {/* Content Editor */}
        <ContentEditor
          page={activePage}
          defaultContent={defaultContent[activePage as keyof typeof defaultContent]}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </div>
    </div>
  )
}
