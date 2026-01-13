import Link from 'next/link'

const services = [
  {
    title: 'Riabilitazione',
    description: 'Recupero funzionale post-trauma, post-operatorio e per patologie muscolo-scheletriche.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Massoterapia',
    description: 'Trattamenti manuali per alleviare tensioni, contratture e dolori muscolari.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
      </svg>
    ),
  },
  {
    title: 'Ginnastica Posturale',
    description: 'Esercizi mirati per correggere la postura e prevenire dolori cronici.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
]

const benefits = [
  {
    title: 'A Domicilio',
    description: 'Il fisioterapista viene direttamente a casa tua, senza stress da spostamenti.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: 'Professionalità',
    description: 'Fisioterapista laureato con anni di esperienza in riabilitazione.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: 'Prezzi Accessibili',
    description: 'Sedute a partire da 40€, con possibilità di pacchetti scontati.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Tutta Roma',
    description: 'Copertura completa di Roma e provincia per raggiungerti ovunque.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden grain-texture">
        {/* Background Decorations */}
        <div className="organic-blob w-96 h-96 -top-20 -right-20" />
        <div className="organic-blob w-72 h-72 bottom-20 -left-20" style={{ animationDelay: '-3s' }} />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Fisioterapia a Domicilio Roma
            </div>

            {/* Headline */}
            <h1 className="mb-6">
              Il tuo benessere,{' '}
              <span className="text-green-600 italic">a casa tua</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-stone-600 mb-8 max-w-2xl leading-relaxed">
              Trattamenti fisioterapici professionali direttamente a domicilio.
              Niente code, niente spostamenti. Solo il meglio per la tua salute.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quiz" className="btn btn-primary text-lg px-8 py-4">
                Prenota una Visita
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/servizi" className="btn btn-outline text-lg px-8 py-4">
                Scopri i Servizi
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-8 text-stone-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Fisioterapista Laureato</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">A partire da 40€</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Tutta Roma e Provincia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-white relative">
        <div className="container">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">I Nostri Servizi</span>
            <h2 className="mt-3 mb-4">Trattamenti su misura per te</h2>
            <p className="text-lg">
              Ogni percorso è personalizzato in base alle tue esigenze specifiche,
              con tecniche moderne e un approccio attento al paziente.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="card group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center mb-5 group-hover:bg-green-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-stone-600">{service.description}</p>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link
              href="/servizi"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              Vedi tutti i servizi
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-cream-dark relative overflow-hidden">
        <div className="organic-blob w-80 h-80 top-10 right-10 opacity-30" />

        <div className="container relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-green-600 font-medium text-sm uppercase tracking-wider">Perché Sceglierci</span>
            <h2 className="mt-3 mb-4">La fisioterapia che viene da te</h2>
            <p className="text-lg">
              Dimentica le sale d&apos;attesa e lo stress del traffico.
              Con FisioterApp, la cura arriva comodamente a casa tua.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-green-300 hover:shadow-lg transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-semibold text-stone-900 mb-2">{benefit.title}</h4>
                <p className="text-stone-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-green-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                              radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-white mb-6">Pronto a stare meglio?</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto mb-10">
            Compila il nostro quiz di valutazione e riceverai una consulenza personalizzata
            per il tuo percorso di guarigione.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 bg-white text-green-700 px-10 py-5 rounded-xl font-semibold text-lg hover:bg-green-50 transition-colors shadow-lg"
          >
            Inizia il Quiz Gratuito
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="mt-6 text-white/60 text-sm">
            Rispondi a 5 semplici domande - Tempo stimato: 2 minuti
          </p>
        </div>
      </section>
    </>
  )
}
