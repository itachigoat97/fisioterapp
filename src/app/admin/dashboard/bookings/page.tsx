'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import type { QuizSubmission } from '@/types'

type TimeFilter = 'tutti' | 'oggi' | 'settimana' | 'mese'

export default function BookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<QuizSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('tutti')

  const fetchBookings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_submissions')
        .select('*')
        .eq('status', 'prenotato')
        .not('booking_date', 'is', null)
        .order('booking_date', { ascending: true })

      if (error) throw error
      setBookings(data || [])
    } catch (err) {
      console.error('Error fetching bookings:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/admin')
        return
      }
      fetchBookings()
    }

    checkAuth()
  }, [router, fetchBookings])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  const getFilteredBookings = () => {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfToday = new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000)
    const endOfWeek = new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000)
    const endOfMonth = new Date(startOfToday.getTime() + 30 * 24 * 60 * 60 * 1000)

    return bookings.filter((b) => {
      if (!b.booking_date) return false
      const bookingDate = new Date(b.booking_date)

      switch (timeFilter) {
        case 'oggi':
          return bookingDate >= startOfToday && bookingDate < endOfToday
        case 'settimana':
          return bookingDate >= startOfToday && bookingDate < endOfWeek
        case 'mese':
          return bookingDate >= startOfToday && bookingDate < endOfMonth
        default:
          return true
      }
    })
  }

  const filteredBookings = getFilteredBookings()

  const isImminente = (dateString: string) => {
    const bookingDate = new Date(dateString)
    const now = new Date()
    const diffHours = (bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60)
    return diffHours > 0 && diffHours <= 24
  }

  const isPast = (dateString: string) => {
    return new Date(dateString) < new Date()
  }

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  }

  const formatBookingDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const painZoneLabels: Record<string, string> = {
    schiena: 'Schiena',
    collo: 'Collo/Cervicale',
    spalla: 'Spalla',
    ginocchio: 'Ginocchio',
    caviglia: 'Caviglia/Piede',
    altro: 'Altro',
  }

  const today = new Date().toLocaleDateString('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  const counts = {
    tutti: bookings.length,
    oggi: bookings.filter((b) => {
      if (!b.booking_date) return false
      const d = new Date(b.booking_date)
      const now = new Date()
      return d.toDateString() === now.toDateString()
    }).length,
    settimana: bookings.filter((b) => {
      if (!b.booking_date) return false
      const d = new Date(b.booking_date)
      const now = new Date()
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      return d >= now && d < weekFromNow
    }).length,
    mese: bookings.filter((b) => {
      if (!b.booking_date) return false
      const d = new Date(b.booking_date)
      const now = new Date()
      const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      return d >= now && d < monthFromNow
    }).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-purple-50/30">
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
            <a
              href="/admin/dashboard"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
              </svg>
              Richieste
            </a>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-100 text-purple-700 font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Prenotazioni
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

        {/* Time Filter */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {(['tutti', 'oggi', 'settimana', 'mese'] as const).map((filter) => {
            const labels = {
              tutti: 'Tutte',
              oggi: 'Oggi',
              settimana: 'Prossimi 7gg',
              mese: 'Prossimi 30gg',
            }

            return (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 ${
                  timeFilter === filter
                    ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg scale-[1.02]'
                    : 'bg-white hover:shadow-md border border-stone-200/50 hover:border-stone-300'
                }`}
              >
                <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl transition-opacity ${
                  timeFilter === filter ? 'bg-white/20 opacity-100' : 'opacity-0'
                }`} />
                <div className="relative">
                  <div className={`text-4xl font-bold mb-1 ${
                    timeFilter === filter ? 'text-white' : 'text-stone-900'
                  }`}>
                    {counts[filter]}
                  </div>
                  <div className={`text-sm font-medium ${
                    timeFilter === filter ? 'text-white/90' : 'text-stone-500'
                  }`}>
                    {labels[filter]}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Bookings List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-stone-200/50">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
            </div>
            <p className="mt-4 text-stone-500 font-medium">Caricamento prenotazioni...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200/50">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-1">Nessuna prenotazione</h3>
            <p className="text-stone-500">Non ci sono appuntamenti per questo periodo</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredBookings.map((booking, index) => {
              const imminente = booking.booking_date ? isImminente(booking.booking_date) : false
              const passato = booking.booking_date ? isPast(booking.booking_date) : false

              return (
                <div
                  key={booking.id}
                  className={`bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-md ${
                    imminente
                      ? 'border-purple-300 ring-2 ring-purple-100'
                      : passato
                      ? 'border-stone-200 opacity-60'
                      : 'border-stone-200/50 hover:border-stone-300'
                  }`}
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Calendar icon with date */}
                      <div className={`relative flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center ${
                        imminente
                          ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                          : passato
                          ? 'bg-stone-100 text-stone-400'
                          : 'bg-purple-50 text-purple-700'
                      }`}>
                        {booking.booking_date && isValidDate(booking.booking_date) ? (
                          <>
                            <span className="text-xs font-medium uppercase opacity-80">
                              {new Date(booking.booking_date).toLocaleDateString('it-IT', { month: 'short' })}
                            </span>
                            <span className="text-xl font-bold leading-none">
                              {new Date(booking.booking_date).getDate()}
                            </span>
                          </>
                        ) : (
                          <span className="text-xs text-center">Data<br/>non valida</span>
                        )}
                        {imminente && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-stone-900 truncate">{booking.name}</h3>
                          {imminente && (
                            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                              Imminente
                            </span>
                          )}
                          {passato && (
                            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 text-xs font-semibold">
                              Passato
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-stone-500">
                          {booking.booking_date && isValidDate(booking.booking_date) && (
                            <>
                              <span className="capitalize">{formatShortDate(booking.booking_date)}</span>
                              <span className="text-stone-300">|</span>
                            </>
                          )}
                          <span>{painZoneLabels[booking.pain_zone] || booking.pain_zone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a
                        href={`tel:${booking.phone}`}
                        className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-green-100 flex items-center justify-center text-stone-500 hover:text-green-600 transition-colors"
                        title="Chiama"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </a>
                      <a
                        href={`https://wa.me/${booking.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-600 transition-colors"
                        title="WhatsApp"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
