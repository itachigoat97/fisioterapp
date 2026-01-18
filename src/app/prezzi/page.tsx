import Link from 'next/link'
import type { Metadata } from 'next'
import { getPageContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Prezzi',
  description: 'Listino prezzi fisioterapia a domicilio Roma. Sedute singole da 40€ e pacchetti scontati. Trasparenza e qualità.',
}

interface Package {
  name: string
  price: number
  unit: string
  description: string
  features: string[]
  popular: boolean
  cta: string
}

interface FAQ {
  question: string
  answer: string
}

export default async function PrezziPage() {
  const content = await getPageContent('prezzi')

  // Parse packages from JSON
  let packages: Package[] = []
  try {
    packages = JSON.parse(content.packages.items)
  } catch {
    packages = [
      { name: 'Seduta Singola', price: 40, unit: 'seduta', description: 'Valutazione iniziale', features: ['45-60 minuti', 'Valutazione inclusa'], popular: false, cta: 'Prenota' },
      { name: 'Pacchetto 5', price: 180, unit: 'pacchetto', description: 'Problematiche acute', features: ['36€/seduta', '45-60 minuti'], popular: true, cta: 'Scegli' },
      { name: 'Pacchetto 10', price: 320, unit: 'pacchetto', description: 'Riabilitazione completa', features: ['32€/seduta', '45-60 minuti'], popular: false, cta: 'Scegli' },
    ]
  }

  // Parse FAQs from JSON
  let faqs: FAQ[] = []
  try {
    faqs = JSON.parse(content.faq.items)
  } catch {
    faqs = [{ question: 'Il prezzo include lo spostamento?', answer: 'Sì, tutto incluso.' }]
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

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-white rounded-3xl p-8 border-2 transition-all ${
                  pkg.popular
                    ? 'border-green-500 shadow-xl scale-105'
                    : 'border-stone-200 hover:border-green-300 hover:shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Più Richiesto
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl mb-2">{pkg.name}</h3>
                  <p className="text-stone-600 text-sm mb-4">{pkg.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-green-600">€{pkg.price}</span>
                    <span className="text-stone-500">/{pkg.unit}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-stone-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/quiz"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-colors ${
                    pkg.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-stone-500 mt-8 text-sm">
            {content.packages.note}
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-cream-dark">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.included.label}</span>
            <h2 className="mt-3 mb-4">{content.included.title}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h4 className="font-semibold text-stone-900 mb-1">{content.included.item1Title}</h4>
              <p className="text-stone-600 text-sm">{content.included.item1Desc}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-stone-900 mb-1">{content.included.item2Title}</h4>
              <p className="text-stone-600 text-sm">{content.included.item2Desc}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                </svg>
              </div>
              <h4 className="font-semibold text-stone-900 mb-1">{content.included.item3Title}</h4>
              <p className="text-stone-600 text-sm">{content.included.item3Desc}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </div>
              <h4 className="font-semibold text-stone-900 mb-1">{content.included.item4Title}</h4>
              <p className="text-stone-600 text-sm">{content.included.item4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-green-600 font-medium text-sm uppercase tracking-wider">{content.faq.label}</span>
              <h2 className="mt-3">{content.faq.title}</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="bg-white rounded-2xl p-6 border border-stone-200">
                  <h4 className="font-semibold text-stone-900 mb-2">{faq.question}</h4>
                  <p className="text-stone-600">{faq.answer}</p>
                </div>
              ))}
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
