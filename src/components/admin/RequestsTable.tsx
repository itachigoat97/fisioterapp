'use client'

import { useState, useRef } from 'react'
import type { QuizSubmission } from '@/types'
import { supabase } from '@/lib/supabase/client'

interface RequestsTableProps {
  requests: QuizSubmission[]
  onUpdate: () => void
}

const statusConfig = {
  nuovo: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    label: 'Nuovo'
  },
  contattato: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
    label: 'Contattato'
  },
  prenotato: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    dot: 'bg-purple-500',
    label: 'Prenotato'
  },
  completato: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    dot: 'bg-green-500',
    label: 'Completato'
  },
}

const painZoneLabels: Record<string, string> = {
  schiena: 'Schiena',
  collo: 'Collo/Cervicale',
  spalla: 'Spalla',
  ginocchio: 'Ginocchio',
  caviglia: 'Caviglia/Piede',
  altro: 'Altro',
}

const durationLabels: Record<string, string> = {
  meno_1_settimana: '< 1 settimana',
  '1_4_settimane': '1-4 settimane',
  '1_3_mesi': '1-3 mesi',
  piu_3_mesi: '> 3 mesi',
}

const causeLabels: Record<string, string> = {
  trauma: 'Trauma/Infortunio',
  postura: 'Postura/Lavoro',
  sport: 'Sport',
  non_so: 'Non specificato',
}

export default function RequestsTable({ requests, onUpdate }: RequestsTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [showDatePicker, setShowDatePicker] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const dateInputRef = useRef<HTMLInputElement>(null)

  const handleStatusChange = async (id: string, newStatus: QuizSubmission['status'], bookingDate?: string) => {
    setUpdatingId(id)
    try {
      const updateData: { status: QuizSubmission['status']; booking_date?: string | null } = { status: newStatus }

      if (newStatus === 'prenotato' && bookingDate) {
        updateData.booking_date = bookingDate
      } else if (newStatus !== 'prenotato') {
        updateData.booking_date = null
      }

      const { error } = await supabase
        .from('quiz_submissions')
        .update(updateData)
        .eq('id', id)

      if (error) throw error
      setShowDatePicker(null)
      setSelectedDate('')
      onUpdate()
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Errore durante l\'aggiornamento dello stato')
    } finally {
      setUpdatingId(null)
    }
  }

  const handlePrenotatoClick = (id: string) => {
    setShowDatePicker(id)
    setSelectedDate('')
    setTimeout(() => dateInputRef.current?.focus(), 100)
  }

  const handleDateConfirm = (id: string) => {
    if (selectedDate) {
      handleStatusChange(id, 'prenotato', selectedDate)
    }
  }

  const formatBookingDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 1) return 'Adesso'
    if (diffHours < 24) return `${diffHours}h fa`
    if (diffDays === 1) return 'Ieri'
    if (diffDays < 7) return `${diffDays}g fa`

    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
    })
  }

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/50">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-stone-900 mb-1">Nessuna richiesta</h3>
        <p className="text-stone-500">Non ci sono richieste che corrispondono ai filtri</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {requests.map((request, index) => {
        const config = statusConfig[request.status]
        const isExpanded = expandedId === request.id

        return (
          <div
            key={request.id}
            className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 ${
              isExpanded
                ? 'shadow-lg border-green-200 ring-1 ring-green-100'
                : 'border-stone-200/50 hover:shadow-md hover:border-stone-300'
            }`}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {/* Header Row */}
            <div
              className="p-4 cursor-pointer flex items-center justify-between gap-4 group"
              onClick={() => setExpandedId(isExpanded ? null : request.id)}
            >
              <div className="flex items-center gap-4 min-w-0">
                {/* Avatar con iniziale */}
                <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isExpanded
                    ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/20'
                    : 'bg-gradient-to-br from-stone-100 to-stone-200 group-hover:from-green-100 group-hover:to-green-200'
                }`}>
                  <span className={`text-lg font-bold transition-colors ${
                    isExpanded ? 'text-white' : 'text-stone-600 group-hover:text-green-700'
                  }`}>
                    {request.name.charAt(0).toUpperCase()}
                  </span>
                  {/* Status dot */}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white ${config.dot}`} />
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-stone-900 truncate">{request.name}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-stone-500">{formatDate(request.created_at)}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-500 truncate">{painZoneLabels[request.pain_zone] || request.pain_zone}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {/* Status badge */}
                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
                  {config.label}
                </span>

                {/* Expand icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  isExpanded ? 'bg-green-100 rotate-180' : 'bg-stone-100 group-hover:bg-stone-200'
                }`}>
                  <svg
                    className={`w-4 h-4 transition-colors ${isExpanded ? 'text-green-600' : 'text-stone-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            <div className={`transition-all duration-300 ease-in-out ${
              isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
              <div className="px-4 pb-4 border-t border-stone-100">
                {/* Full date */}
                <p className="text-xs text-stone-400 pt-4 mb-4 capitalize">
                  {formatFullDate(request.created_at)}
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Contatti</h4>
                    <div className="space-y-2">
                      <a
                        href={`tel:${request.phone}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 hover:bg-green-50 text-stone-700 hover:text-green-700 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                        </div>
                        <span className="font-medium">{request.phone}</span>
                      </a>

                      <a
                        href={`mailto:${request.email}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 hover:bg-green-50 text-stone-700 hover:text-green-700 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </div>
                        <span className="font-medium truncate">{request.email}</span>
                      </a>

                      <a
                        href={`https://wa.me/${request.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </div>
                        <span className="font-semibold">Apri WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Quiz Data */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Dettagli Problema</h4>
                    <div className="bg-stone-50 rounded-xl p-4 space-y-3">
                      {request.age && (
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500 text-sm">Età</span>
                          <span className="font-semibold text-stone-900">{request.age} anni</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500 text-sm">Zona</span>
                        <span className="font-semibold text-stone-900">{painZoneLabels[request.pain_zone] || request.pain_zone}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500 text-sm">Durata</span>
                        <span className="font-semibold text-stone-900">{durationLabels[request.duration] || request.duration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500 text-sm">Intensità</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 rounded-full bg-stone-200 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                request.intensity <= 3 ? 'bg-green-500' :
                                request.intensity <= 6 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${request.intensity * 10}%` }}
                            />
                          </div>
                          <span className="font-semibold text-stone-900">{request.intensity}/10</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-stone-500 text-sm">Causa</span>
                        <span className="font-semibold text-stone-900">{causeLabels[request.cause] || request.cause}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {request.notes && (
                    <div className="sm:col-span-2 space-y-2">
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Note del paziente</h4>
                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                        <p className="text-stone-700 text-sm leading-relaxed">{request.notes}</p>
                      </div>
                    </div>
                  )}

                  {/* Booking Date Info */}
                  {request.status === 'prenotato' && request.booking_date && (
                    <div className="sm:col-span-2 space-y-2">
                      <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Appuntamento</h4>
                      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-purple-700 font-semibold capitalize">{formatBookingDate(request.booking_date)}</p>
                          <p className="text-purple-500 text-sm">Data appuntamento</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Status Actions */}
                  <div className="sm:col-span-2 pt-4 border-t border-stone-100">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Aggiorna stato</h4>
                    <div className="flex flex-wrap gap-2">
                      {(['nuovo', 'contattato'] as const).map((status) => {
                        const btnConfig = statusConfig[status]
                        const isActive = request.status === status
                        const isUpdating = updatingId === request.id

                        return (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(request.id, status)}
                            disabled={isActive || isUpdating}
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                              isActive
                                ? `${btnConfig.bg} ${btnConfig.text} border-2 ${btnConfig.border} cursor-default`
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border-2 border-transparent'
                            } disabled:opacity-50`}
                          >
                            {isUpdating ? (
                              <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                {isActive && <span className={`w-2 h-2 rounded-full ${btnConfig.dot}`} />}
                                {btnConfig.label}
                              </span>
                            )}
                          </button>
                        )
                      })}

                      {/* Prenotato button with date picker */}
                      {showDatePicker === request.id ? (
                        <div className="flex items-center gap-2 bg-purple-50 rounded-xl p-2 border-2 border-purple-200">
                          <input
                            ref={dateInputRef}
                            type="datetime-local"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-3 py-1.5 rounded-lg border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                          />
                          <button
                            onClick={() => handleDateConfirm(request.id)}
                            disabled={!selectedDate || updatingId === request.id}
                            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {updatingId === request.id ? (
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : 'Conferma'}
                          </button>
                          <button
                            onClick={() => { setShowDatePicker(null); setSelectedDate('') }}
                            className="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePrenotatoClick(request.id)}
                          disabled={request.status === 'prenotato' || updatingId === request.id}
                          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                            request.status === 'prenotato'
                              ? 'bg-purple-50 text-purple-700 border-2 border-purple-200 cursor-default'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border-2 border-transparent'
                          } disabled:opacity-50`}
                        >
                          <span className="flex items-center gap-2">
                            {request.status === 'prenotato' && <span className="w-2 h-2 rounded-full bg-purple-500" />}
                            Prenotato
                          </span>
                        </button>
                      )}

                      {/* Completato button */}
                      <button
                        onClick={() => handleStatusChange(request.id, 'completato')}
                        disabled={request.status === 'completato' || updatingId === request.id}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          request.status === 'completato'
                            ? 'bg-green-50 text-green-700 border-2 border-green-200 cursor-default'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border-2 border-transparent'
                        } disabled:opacity-50`}
                      >
                        {updatingId === request.id && request.status !== 'completato' ? (
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            {request.status === 'completato' && <span className="w-2 h-2 rounded-full bg-green-500" />}
                            Completato
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
