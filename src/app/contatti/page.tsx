import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPageContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta FisioterApp per fisioterapia a domicilio a Roma. Telefono, WhatsApp, email.',
}

interface ContactMethod {
  title: string
  value: string
  href: string
  description: string
}

interface ScheduleItem {
  day: string
  hours: string
}

const contactIcons: Record<string, React.ReactNode> = {
  Telefono: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  WhatsApp: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  Email: (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
}

export default async function ContattiPage() {
  const content = await getPageContent('contatti')

  // Parse contact methods from JSON
  let contactMethods: ContactMethod[] = []
  try {
    contactMethods = JSON.parse(content.methods.items)
  } catch {
    contactMethods = [
      { title: 'Telefono', value: '+39 366 199 3137', href: 'tel:+393661993137', description: 'Chiamami per informazioni' },
      { title: 'WhatsApp', value: '+39 366 199 3137', href: 'https://wa.me/393661993137', description: 'Scrivimi su WhatsApp' },
      { title: 'Email', value: 'lollo.sicari2003@gmail.com', href: 'mailto:lollo.sicari2003@gmail.com', description: 'Per richieste dettagliate' },
    ]
  }

  // Parse zones from JSON
  let zones: string[] = []
  try {
    zones = JSON.parse(content.zones.items)
  } catch {
    zones = ['Centro Storico', 'Prati', 'Trastevere', 'EUR', 'Monteverde', 'Parioli']
  }

  // Parse schedule from JSON
  let schedule: ScheduleItem[] = []
  try {
    schedule = JSON.parse(content.schedule.items)
  } catch {
    schedule = [
      { day: 'Lunedì - Venerdì', hours: '8:00 - 20:00' },
      { day: 'Sabato', hours: '9:00 - 14:00' },
      { day: 'Domenica', hours: 'Su appuntamento' },
    ]
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-green-50 relative overflow-hidden">
        <div className="organic-blob w-72 h-72 -top-10 -right-10 opacity-40" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.hero.label}</span>
            <h1 className="mt-3 mb-6">{content.hero.title}</h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              {content.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-white rounded-2xl p-8 border border-stone-200 hover:border-green-300 hover:shadow-lg transition-all text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-5 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {contactIcons[method.title] || contactIcons.Telefono}
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-1">{method.title}</h3>
                <p className="text-green-600 font-medium mb-2">{method.value}</p>
                <p className="text-stone-500 text-sm">{method.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Zone & Hours */}
      <section className="py-20 bg-cream-dark">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Zone Coperte */}
            <div>
              <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.zones.label}</span>
              <h2 className="mt-3 mb-6">{content.zones.title}</h2>
              <p className="text-lg text-stone-600 mb-8">
                {content.zones.subtitle}
              </p>

              <div className="flex flex-wrap gap-2">
                {zones.map((zone) => (
                  <span
                    key={zone}
                    className="px-4 py-2 bg-white rounded-full text-stone-700 text-sm font-medium border border-stone-200"
                  >
                    {zone}
                  </span>
                ))}
              </div>
            </div>

            {/* Orari */}
            <div>
              <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.schedule.label}</span>
              <h2 className="mt-3 mb-6">{content.schedule.title}</h2>
              <p className="text-lg text-stone-600 mb-8">
                {content.schedule.subtitle}
              </p>

              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                {schedule.map((item, index) => (
                  <div
                    key={item.day}
                    className={`flex justify-between items-center p-4 ${
                      index !== schedule.length - 1 ? 'border-b border-stone-100' : ''
                    }`}
                  >
                    <span className="font-medium text-stone-900">{item.day}</span>
                    <span className="text-green-600 font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-stone-500 text-sm">
                {content.schedule.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-700">
        <div className="container text-center">
          <h2 style={{ color: '#ffffff' }} className="mb-4">{content.cta.title}</h2>
          <p style={{ color: '#ffffff' }} className="text-lg max-w-2xl mx-auto mb-8">
            {content.cta.subtitle}
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors"
          >
            {content.cta.button}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
