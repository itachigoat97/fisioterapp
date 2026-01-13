import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Servizi',
  description: 'Scopri tutti i servizi di fisioterapia a domicilio: riabilitazione, massoterapia, ginnastica posturale, terapia manuale e molto altro a Roma.',
}

const services = [
  {
    id: 'riabilitazione',
    title: 'Riabilitazione Ortopedica',
    description: 'Recupero funzionale completo dopo interventi chirurgici, fratture, distorsioni e traumi sportivi. Programmi personalizzati per tornare alla piena attività.',
    details: [
      'Post-operatorio (protesi anca/ginocchio, ricostruzione legamenti)',
      'Fratture e distorsioni',
      'Lesioni muscolari',
      'Recupero post-infortunio sportivo',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    id: 'massoterapia',
    title: 'Massoterapia',
    description: 'Tecniche manuali specializzate per sciogliere contratture, ridurre tensioni muscolari e migliorare la circolazione. Ideale per chi soffre di stress e rigidità.',
    details: [
      'Massaggio decontratturante',
      'Massaggio sportivo',
      'Massaggio rilassante',
      'Trattamento trigger point',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
  },
  {
    id: 'posturale',
    title: 'Ginnastica Posturale',
    description: 'Esercizi mirati per correggere gli squilibri posturali, prevenire dolori cronici e migliorare la qualità della vita quotidiana.',
    details: [
      'Correzione atteggiamenti scorretti',
      'Prevenzione mal di schiena',
      'Rieducazione posturale globale',
      'Esercizi per lavoratori sedentari',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    id: 'manuale',
    title: 'Terapia Manuale',
    description: 'Tecniche avanzate di mobilizzazione articolare e manipolazione per ripristinare la corretta funzionalità delle strutture muscolo-scheletriche.',
    details: [
      'Mobilizzazione articolare',
      'Tecniche osteopatiche',
      'Trattamento fasciale',
      'Manipolazione vertebrale',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    id: 'domicilio',
    title: 'Visite a Domicilio',
    description: 'Tutti i nostri servizi sono disponibili comodamente a casa tua. Copriamo Roma e tutta la provincia con massima flessibilità oraria.',
    details: [
      'Nessuno spostamento necessario',
      'Orari flessibili (anche sera/weekend)',
      'Attrezzatura professionale portatile',
      'Ambiente familiare e rilassante',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: 'neurologica',
    title: 'Riabilitazione Neurologica',
    description: 'Trattamenti specializzati per pazienti con patologie neurologiche, mirati al recupero delle funzioni motorie e cognitive.',
    details: [
      'Post-ictus',
      'Sclerosi multipla',
      'Parkinson',
      'Lesioni midollari',
    ],
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
]

const conditions = [
  'Mal di schiena',
  'Cervicalgia',
  'Sciatalgia',
  'Ernia del disco',
  'Artrosi',
  'Tendiniti',
  'Epicondilite',
  'Sindrome del tunnel carpale',
  'Spalla congelata',
  'Fascite plantare',
  'Distorsioni',
  'Strappi muscolari',
]

export default function ServiziPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-green-50 relative overflow-hidden">
        <div className="organic-blob w-72 h-72 -top-10 -right-10 opacity-40" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">I Nostri Servizi</span>
            <h1 className="mt-3 mb-6">Trattamenti professionali per ogni esigenza</h1>
            <p className="text-xl text-stone-600 leading-relaxed">
              Dalla riabilitazione post-operatoria alla ginnastica posturale,
              offriamo una gamma completa di servizi fisioterapici direttamente a casa tua.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`flex flex-col lg:flex-row gap-10 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Icon & Title */}
                <div className="lg:w-1/3">
                  <div className="w-20 h-20 rounded-3xl bg-green-100 text-green-600 flex items-center justify-center mb-5">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl mb-3">{service.title}</h2>
                </div>

                {/* Content */}
                <div className="lg:w-2/3 bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
                  <p className="text-lg text-stone-600 mb-6">{service.description}</p>
                  <h4 className="font-semibold text-stone-900 mb-3">Include:</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-stone-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Treated */}
      <section className="py-20 bg-cream-dark">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">Patologie Trattate</span>
            <h2 className="mt-3 mb-4">Cosa possiamo curare insieme</h2>
            <p className="text-lg text-stone-600">
              Ecco alcune delle condizioni più comuni che trattiamo ogni giorno con successo.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {conditions.map((condition) => (
              <span
                key={condition}
                className="px-4 py-2 bg-white rounded-full text-stone-700 text-sm font-medium border border-stone-200 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-700">
        <div className="container text-center">
          <h2 className="text-white mb-4">Hai un problema specifico?</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Compila il quiz di valutazione e descrivici la tua situazione.
            Ti contatteremo per una consulenza personalizzata.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors"
          >
            Inizia il Quiz
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
