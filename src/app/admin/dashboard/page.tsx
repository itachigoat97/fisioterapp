'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { QuizSubmission } from '@/types'
import RequestsTable from '@/components/admin/RequestsTable'
import ExportButton from '@/components/admin/ExportButton'

type StatusFilter = 'tutti' | 'nuovo' | 'contattato' | 'completato'

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
    // Check authentication
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

  // Filter by search query
  const filteredRequests = requests.filter((r) =>
    searchQuery === '' ||
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.phone.includes(searchQuery)
  )

  // Count by status
  const counts = {
    tutti: requests.length,
    nuovo: requests.filter((r) => r.status === 'nuovo').length,
    contattato: requests.filter((r) => r.status === 'contattato').length,
    completato: requests.filter((r) => r.status === 'completato').length,
  }

  return (
    <div className="min-h-screen bg-cream-dark">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-stone-900">FisioterApp Admin</h1>
              <p className="text-sm text-stone-500">Gestione richieste</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Esci
          </button>
        </div>
      </header>

      <div className="container py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 border border-stone-200">
            <div className="text-3xl font-bold text-stone-900">{counts.tutti}</div>
            <div className="text-sm text-stone-500">Totale</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-stone-200">
            <div className="text-3xl font-bold text-blue-600">{counts.nuovo}</div>
            <div className="text-sm text-stone-500">Nuove</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-stone-200">
            <div className="text-3xl font-bold text-yellow-600">{counts.contattato}</div>
            <div className="text-sm text-stone-500">Contattate</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-stone-200">
            <div className="text-3xl font-bold text-green-600">{counts.completato}</div>
            <div className="text-sm text-stone-500">Completate</div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Cerca per nome, email o telefono..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-green-500 focus:outline-none transition-colors bg-white"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            {(['tutti', 'nuovo', 'contattato', 'completato'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-green-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Export */}
          <ExportButton requests={filteredRequests} />
        </div>

        {/* Requests List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <svg className="animate-spin w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : (
          <RequestsTable requests={filteredRequests} onUpdate={fetchRequests} />
        )}
      </div>
    </div>
  )
}
