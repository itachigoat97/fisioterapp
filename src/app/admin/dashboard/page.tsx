'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { QuizSubmission } from '@/types'
import RequestsTable from '@/components/admin/RequestsTable'
import ExportButton from '@/components/admin/ExportButton'

type StatusFilter = 'tutti' | 'nuovo' | 'contattato' | 'completato'

const statusConfig = {
  tutti: { label: 'Tutte', icon: '📋', gradient: 'from-stone-500 to-stone-600' },
  nuovo: { label: 'Nuove', icon: '🔵', gradient: 'from-blue-500 to-blue-600' },
  contattato: { label: 'Contattate', icon: '🟡', gradient: 'from-amber-500 to-amber-600' },
  completato: { label: 'Completate', icon: '🟢', gradient: 'from-green-500 to-green-600' },
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [requests, setRequests] = useState<QuizSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('tutti')
  const [searchQuery, setSearchQuery] = useState('')

  const fetchRequests = useCallback(async () => {
    try {
      let query = supabase
        .from('quiz_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (statusFilter !== 'tutti') {
        query = query.eq('status', statusFilter)
      }

      const { data, error } = await query

      if (error) throw error
      setRequests(data || [])
    } catch (err) {
      console.error('Error fetching requests:', err)
    } finally {
      setIsLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin')
        return
      }
      fetchRequests()
    }

    checkAuth()
  }, [router, fetchRequests])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const filteredRequests = requests.filter((r) =>
    searchQuery === '' ||
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.phone.includes(searchQuery)
  )

  const counts = {
    tutti: requests.length,
    nuovo: requests.filter((r) => r.status === 'nuovo').length,
    contattato: requests.filter((r) => r.status === 'contattato').length,
    completato: requests.filter((r) => r.status === 'completato').length,
  }

  const today = new Date().toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-green-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg shadow-green-600/20">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-900">Dashboard Admin</h1>
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
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-100 text-green-700 font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
              Richieste
            </div>
            <a
              href="/admin/dashboard/content"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Contenuti
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {(['tutti', 'nuovo', 'contattato', 'completato'] as const).map((status, index) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`group relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 ${
                statusFilter === status
                  ? 'bg-gradient-to-br ' + statusConfig[status].gradient + ' text-white shadow-lg scale-[1.02]'
                  : 'bg-white hover:shadow-md border border-stone-200/50 hover:border-stone-300'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl transition-opacity ${
                statusFilter === status ? 'bg-white/20 opacity-100' : 'opacity-0'
              }`} />

              <div className="relative">
                <div className={`text-4xl font-bold mb-1 ${
                  statusFilter === status ? 'text-white' : 'text-stone-900'
                }`}>
                  {counts[status]}
                </div>
                <div className={`text-sm font-medium ${
                  statusFilter === status ? 'text-white/90' : 'text-stone-500'
                }`}>
                  {statusConfig[status].label}
                </div>
              </div>

              {status !== 'tutti' && counts[status] > 0 && statusFilter !== status && (
                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                  status === 'nuovo' ? 'bg-blue-500' :
                  status === 'contattato' ? 'bg-amber-500' : 'bg-green-500'
                } ${status === 'nuovo' ? 'animate-pulse' : ''}`} />
              )}
            </button>
          ))}
        </div>

        {/* Search & Actions Bar */}
        <div className="bg-white rounded-2xl border border-stone-200/50 p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                placeholder="Cerca per nome, email o telefono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all bg-stone-50/50 hover:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-200 transition-colors"
                >
                  <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Export */}
            <ExportButton requests={filteredRequests} />
          </div>

          {/* Results count */}
          {searchQuery && (
            <div className="mt-3 pt-3 border-t border-stone-100">
              <p className="text-sm text-stone-500">
                {filteredRequests.length} risultat{filteredRequests.length === 1 ? 'o' : 'i'} per &quot;{searchQuery}&quot;
              </p>
            </div>
          )}
        </div>

        {/* Requests List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-stone-200/50">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />
            </div>
            <p className="mt-4 text-stone-500 font-medium">Caricamento richieste...</p>
          </div>
        ) : (
          <RequestsTable requests={filteredRequests} onUpdate={fetchRequests} />
        )}
      </div>
    </div>
  )
}
