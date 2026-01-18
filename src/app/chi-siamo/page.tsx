import Link from 'next/link'
import type { Metadata } from 'next'
import { getPageContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'FisioterApp è la piattaforma che rende la fisioterapia a domicilio semplice, veloce e accessibile a Roma.',
}

const valueIcons = [
  <svg key="1" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="2" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>,
  <svg key="3" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
]

export default async function ChiSiamoPage() {
  const content = await getPageContent('chi-siamo')

  const values = [
    { title: content.values.value1Title, description: content.values.value1Desc, icon: valueIcons[0] },
    { title: content.values.value2Title, description: content.values.value2Desc, icon: valueIcons[1] },
    { title: content.values.value3Title, description: content.values.value3Desc, icon: valueIcons[2] },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-green-50 relative overflow-hidden">
        <div className="organic-blob w-72 h-72 -top-10 -left-10 opacity-40" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.hero.label}</span>
            <h1 className="mt-3 mb-6">{content.hero.title}</h1>
            <p className="text-xl text-stone-600 leading-relaxed mb-8">
              {content.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.howItWorks.patientsLabel}</span>
              <h2 className="mt-3 mb-6">{content.howItWorks.patientsTitle}</h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                {content.howItWorks.patientsText1}
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                {content.howItWorks.patientsText2}
              </p>
            </div>

            <div>
              <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.howItWorks.prosLabel}</span>
              <h2 className="mt-3 mb-6">{content.howItWorks.prosTitle}</h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                {content.howItWorks.prosText1}
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                {content.howItWorks.prosText2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-cream-dark">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.mission.label}</span>
            <h2 className="mt-3 mb-6">{content.mission.title}</h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              {content.mission.description}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.values.label}</span>
            <h2 className="mt-3 mb-4">{content.values.title}</h2>
            <p className="text-lg text-stone-600">
              {content.values.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 border border-stone-200">
                <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-stone-600">{value.description}</p>
              </div>
            ))}
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-3 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors"
            >
              {content.cta.buttonPrimary}
            </Link>
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-3 bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              {content.cta.buttonSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
