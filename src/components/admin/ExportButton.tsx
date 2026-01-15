'use client'

import type { QuizSubmission } from '@/types'

interface ExportButtonProps {
  requests: QuizSubmission[]
}

export default function ExportButton({ requests }: ExportButtonProps) {
  const handleExport = () => {
    if (requests.length === 0) {
      alert('Nessun dato da esportare')
      return
    }

    // Create CSV content
    const headers = [
      'Data',
      'Nome',
      'Età',
      'Telefono',
      'Email',
      'Zona Dolore',
      'Durata',
      'Intensità',
      'Causa',
      'Note',
      'Stato',
    ]

    const rows = requests.map((r) => [
      new Date(r.created_at).toLocaleDateString('it-IT'),
      r.name,
      r.age?.toString() || '',
      r.phone,
      r.email,
      r.pain_zone,
      r.duration,
      r.intensity.toString(),
      r.cause,
      r.notes || '',
      r.status,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n')

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `richieste_fisioterapp_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl text-stone-700 hover:bg-stone-50 transition-colors"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      Esporta CSV
    </button>
  )
}
