import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi Sono',
  description: 'Scopri Lorenzo Sicari, fisioterapista professionista a Roma. Formazione, esperienza e approccio terapeutico personalizzato.',
}

const qualifications = [
  'Laurea in Fisioterapia',
  'Specializzazione in Terapia Manuale',
  'Formazione in Riabilitazione Sportiva',
  'Tecniche di Massoterapia Avanzata',
  'Ginnastica Posturale Metodo Mezieres',
  'Aggiornamento Professionale Continuo',
]

const values = [
  {
    title: 'Ascolto',
    description: 'Ogni paziente ha una storia unica. Dedico tempo ad ascoltare per capire veramente le tue esigenze.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: 'Personalizzazione',
    description: 'Creo percorsi terapeutici su misura, adattati ai tuoi obiettivi e al tuo stile di vita.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Risultati',
    description: 'Mi concentro su risultati concreti e misurabili, con un approccio basato su evidenze scientifiche.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
]

export default function ChiSonoPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-green-50 relative overflow-hidden">
        <div className="organic-blob w-72 h-72 -top-10 -left-10 opacity-40" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-green-200 to-green-300 overflow-hidden">
                  {/* Placeholder per foto - da sostituire con immagine reale */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-green-700">
                      <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                      <p className="text-sm opacity-70">Foto Lorenzo Sicari</p>
                    </div>
                  </div>
                </div>
                {/* Decorative Element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-600 rounded-2xl -z-10" />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <span className="text-green-600 font-medium text-sm uppercase tracking-wider">Chi Sono</span>
              <h1 className="mt-3 mb-6">Lorenzo Sicari</h1>
              <p className="text-2xl text-green-700 font-medium mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Fisioterapista
              </p>
              <p className="text-lg text-stone-600 leading-relaxed mb-6">
                Sono Lorenzo, fisioterapista con una passione per aiutare le persone a ritrovare
                il loro benessere fisico. Dopo anni di esperienza in cliniche e centri di
                riabilitazione, ho deciso di portare la fisioterapia direttamente a casa dei miei pazienti.
              </p>
              <p className="text-lg text-stone-600 leading-relaxed">
                Credo che ogni persona meriti cure di qualità nel comfort della propria casa,
                senza lo stress degli spostamenti. Il mio approccio è sempre personalizzato:
                ascolto, valuto e creo insieme a te il percorso più adatto ai tuoi obiettivi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-green-600 font-medium text-sm uppercase tracking-wider">Formazione</span>
              <h2 className="mt-3 mb-6">Qualifiche e Specializzazioni</h2>
              <p className="text-lg text-stone-600 mb-8">
                La formazione continua è fondamentale per offrire sempre il meglio ai miei pazienti.
                Ecco le mie principali qualifiche professionali.
              </p>

              <ul className="space-y-4">
                {qualifications.map((qual) => (
                  <li key={qual} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-stone-700 font-medium">{qual}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-stone-200 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">5+</div>
                <div className="text-stone-600">Anni di Esperienza</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-stone-600">Pazienti Trattati</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-stone-600">Soddisfazione</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-stone-200 text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">Roma</div>
                <div className="text-stone-600">e Provincia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-dark">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">Il Mio Approccio</span>
            <h2 className="mt-3 mb-4">Cosa mi guida nel lavoro</h2>
            <p className="text-lg text-stone-600">
              Tre principi fondamentali che definiscono il mio modo di lavorare con ogni paziente.
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
          <h2 className="text-white mb-4">Vuoi conoscermi meglio?</h2>
          <p className="text-white text-lg max-w-2xl mx-auto mb-8">
            Prenota una prima visita e parliamo insieme del tuo percorso di guarigione.
            Sarò felice di rispondere a tutte le tue domande.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-3 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors"
            >
              Prenota una Visita
            </Link>
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-3 bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Contattami
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
