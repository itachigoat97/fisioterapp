'use client'

import { useState } from 'react'
import type { QuizSubmission } from '@/types'
import { supabase } from '@/lib/supabase/client'

interface RequestsTableProps {
  requests: QuizSubmission[]
  onUpdate: () => void
}

const statusColors = {
  nuovo: 'bg-blue-100 text-blue-700',
  contattato: 'bg-yellow-100 text-yellow-700',
  completato: 'bg-green-100 text-green-700',
}

const statusLabels = {
  nuovo: 'Nuovo',
  contattato: 'Contattato',
  completato: 'Completato',
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

  const handleStatusChange = async (id: string, newStatus: QuizSubmission['status']) => {
    setUpdatingId(id)
    try {
      const { error } = await supabase
        .from('quiz_submissions')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      onUpdate()
    } catch (err) {
      console.error('Error updating status:', err)
      alert('Errore durante l\'aggiornamento dello stato')
    } finally {
      setUpdatingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
        <svg className="w-12 h-12 text-stone-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
        <p className="text-stone-500">Nessuna richiesta trovata</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div
          key={request.id}
          className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-shadow hover:shadow-md"
        >
          {/* Header Row */}
          <div
            className="p-4 cursor-pointer flex items-center justify-between gap-4"
            onClick={() => setExpandedId(expandedId === request.id ? null : request.id)}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-green-700 font-semibold">
                  {request.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-stone-900 truncate">{request.name}</h3>
                <p className="text-sm text-stone-500">{formatDate(request.created_at)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                {statusLabels[request.status]}
              </span>
              <span className="text-stone-400">
                <svg
                  className={`w-5 h-5 transition-transform ${expandedId === request.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>

          {/* Expanded Details */}
          {expandedId === request.id && (
            <div className="px-4 pb-4 border-t border-stone-100">
              <div className="pt-4 grid sm:grid-cols-2 gap-4">
                {/* Contact Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">Contatto</h4>
                  <div className="space-y-2">
                    <a
                      href={`tel:${request.phone}`}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      {request.phone}
                    </a>
                    <a
                      href={`mailto:${request.email}`}
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                      {request.email}
                    </a>
                    <a
                      href={`https://wa.me/${request.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>

                {/* Quiz Data */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">Problema</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Zona dolore:</span>
                      <span className="font-medium">{painZoneLabels[request.pain_zone] || request.pain_zone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Durata:</span>
                      <span className="font-medium">{durationLabels[request.duration] || request.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Intensità:</span>
                      <span className="font-medium">{request.intensity}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Causa:</span>
                      <span className="font-medium">{causeLabels[request.cause] || request.cause}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {request.notes && (
                  <div className="sm:col-span-2 space-y-2">
                    <h4 className="text-sm font-semibold text-stone-700 uppercase tracking-wide">Note</h4>
                    <p className="text-stone-600 text-sm bg-stone-50 rounded-lg p-3">{request.notes}</p>
                  </div>
                )}

                {/* Status Actions */}
                <div className="sm:col-span-2 pt-4 border-t border-stone-100">
                  <h4 className="text-sm font-semibold text-stone-700 uppercase tracking-wide mb-3">Cambia stato</h4>
                  <div className="flex flex-wrap gap-2">
                    {(['nuovo', 'contattato', 'completato'] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(request.id, status)}
                        disabled={request.status === status || updatingId === request.id}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          request.status === status
                            ? statusColors[status] + ' cursor-default'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        } disabled:opacity-50`}
                      >
                        {updatingId === request.id ? '...' : statusLabels[status]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
