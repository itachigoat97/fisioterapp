// Contenuti di default per tutte le pagine
// Usati come fallback se il database è vuoto

export const defaultContent = {
  home: {
    hero: {
      badge: 'Fisioterapia a Domicilio Roma',
      title: 'Il tuo benessere,',
      titleHighlight: 'a casa tua',
      subtitle: 'Trattamenti fisioterapici professionali direttamente a domicilio. Niente code, niente spostamenti. Solo il meglio per la tua salute.',
      ctaPrimary: 'Prenota una Visita',
      ctaSecondary: 'Scopri i Servizi',
      trust1: 'Fisioterapista Laureato',
      trust2: 'A partire da 40€',
      trust3: 'Tutta Roma e Provincia',
    },
    services: {
      label: 'I Nostri Servizi',
      title: 'Trattamenti su misura per te',
      subtitle: 'Ogni percorso è personalizzato in base alle tue esigenze specifiche, con tecniche moderne e un approccio attento al paziente.',
      service1Title: 'Riabilitazione',
      service1Desc: 'Recupero funzionale post-trauma, post-operatorio e per patologie muscolo-scheletriche.',
      service2Title: 'Massoterapia',
      service2Desc: 'Trattamenti manuali per alleviare tensioni, contratture e dolori muscolari.',
      service3Title: 'Ginnastica Posturale',
      service3Desc: 'Esercizi mirati per correggere la postura e prevenire dolori cronici.',
      link: 'Vedi tutti i servizi',
    },
    benefits: {
      label: 'Perché Sceglierci',
      title: 'La fisioterapia che viene da te',
      subtitle: 'Dimentica le sale d\'attesa e lo stress del traffico. Con FisioterApp, la cura arriva comodamente a casa tua.',
      benefit1Title: 'A Domicilio',
      benefit1Desc: 'Un fisioterapista qualificato viene direttamente a casa tua, senza stress da spostamenti.',
      benefit2Title: 'Professionalità',
      benefit2Desc: 'Fisioterapisti laureati con anni di esperienza in riabilitazione.',
      benefit3Title: 'Prezzi Accessibili',
      benefit3Desc: 'Sedute a partire da 40€, con possibilità di pacchetti scontati.',
      benefit4Title: 'Tutta Roma',
      benefit4Desc: 'Copertura completa di Roma per raggiungerti ovunque.',
    },
    cta: {
      title: 'Pronto a stare meglio?',
      subtitle: 'Compila il nostro quiz di valutazione e riceverai una consulenza personalizzata per il tuo percorso di guarigione.',
      button: 'Inizia il Quiz Gratuito',
      note: 'Rispondi a 5 semplici domande - Tempo stimato: 2 minuti',
    },
  },

  servizi: {
    hero: {
      label: 'I Nostri Servizi',
      title: 'Trattamenti professionali per ogni esigenza',
      subtitle: 'Dalla riabilitazione post-operatoria alla ginnastica posturale, offriamo una gamma completa di servizi fisioterapici direttamente a casa tua.',
    },
    services: {
      items: JSON.stringify([
        {
          id: 'riabilitazione',
          title: 'Riabilitazione Ortopedica',
          description: 'Recupero funzionale completo dopo interventi chirurgici, fratture, distorsioni e traumi sportivi. Programmi personalizzati per tornare alla piena attività.',
          details: ['Post-operatorio (protesi anca/ginocchio, ricostruzione legamenti)', 'Fratture e distorsioni', 'Lesioni muscolari', 'Recupero post-infortunio sportivo'],
        },
        {
          id: 'massoterapia',
          title: 'Massoterapia',
          description: 'Tecniche manuali specializzate per sciogliere contratture, ridurre tensioni muscolari e migliorare la circolazione. Ideale per chi soffre di stress e rigidità.',
          details: ['Massaggio decontratturante', 'Massaggio sportivo', 'Massaggio rilassante', 'Trattamento trigger point'],
        },
        {
          id: 'posturale',
          title: 'Ginnastica Posturale',
          description: 'Esercizi mirati per correggere gli squilibri posturali, prevenire dolori cronici e migliorare la qualità della vita quotidiana.',
          details: ['Correzione atteggiamenti scorretti', 'Prevenzione mal di schiena', 'Rieducazione posturale globale', 'Esercizi per lavoratori sedentari'],
        },
        {
          id: 'manuale',
          title: 'Terapia Manuale',
          description: 'Tecniche avanzate di mobilizzazione articolare e manipolazione per ripristinare la corretta funzionalità delle strutture muscolo-scheletriche.',
          details: ['Mobilizzazione articolare', 'Tecniche osteopatiche', 'Trattamento fasciale', 'Manipolazione vertebrale'],
        },
        {
          id: 'domicilio',
          title: 'Visite a Domicilio',
          description: 'Tutti i nostri servizi sono disponibili comodamente a casa tua. Copriamo Roma con massima flessibilità oraria.',
          details: ['Nessuno spostamento necessario', 'Orari flessibili (anche sera/weekend)', 'Attrezzatura professionale portatile', 'Ambiente familiare e rilassante'],
        },
        {
          id: 'neurologica',
          title: 'Riabilitazione Neurologica',
          description: 'Trattamenti specializzati per pazienti con patologie neurologiche, mirati al recupero delle funzioni motorie e cognitive.',
          details: ['Post-ictus', 'Sclerosi multipla', 'Parkinson', 'Lesioni midollari'],
        },
      ]),
    },
    conditions: {
      label: 'Patologie Trattate',
      title: 'Cosa possiamo curare insieme',
      subtitle: 'Ecco alcune delle condizioni più comuni che trattiamo ogni giorno con successo.',
      items: JSON.stringify([
        'Mal di schiena', 'Cervicalgia', 'Sciatalgia', 'Ernia del disco',
        'Artrosi', 'Tendiniti', 'Epicondilite', 'Sindrome del tunnel carpale',
        'Spalla congelata', 'Fascite plantare', 'Distorsioni', 'Strappi muscolari',
      ]),
    },
    cta: {
      title: 'Hai un problema specifico?',
      subtitle: 'Compila il quiz di valutazione e descrivici la tua situazione. Ti contatteremo per una consulenza personalizzata.',
      button: 'Inizia il Quiz',
    },
  },

  prezzi: {
    hero: {
      label: 'Listino Prezzi',
      title: 'Prezzi chiari e trasparenti',
      subtitle: 'Nessuna sorpresa, nessun costo nascosto. Scegli la formula più adatta alle tue esigenze e inizia il tuo percorso verso il benessere.',
    },
    packages: {
      items: JSON.stringify([
        {
          name: 'Seduta Singola',
          price: 40,
          unit: 'seduta',
          description: 'Ideale per valutazione iniziale o trattamento occasionale',
          features: ['Durata 45-60 minuti', 'Valutazione iniziale inclusa', 'Piano terapeutico personalizzato', 'A domicilio in tutta Roma'],
          popular: false,
          cta: 'Prenota Ora',
        },
        {
          name: 'Pacchetto 5 Sedute',
          price: 180,
          unit: 'pacchetto',
          description: 'Percorso consigliato per problematiche acute',
          features: ['36€ a seduta (risparmi 20€)', 'Durata 45-60 minuti/seduta', 'Monitoraggio progressi', 'Esercizi da fare a casa', 'Supporto WhatsApp'],
          popular: true,
          cta: 'Scegli Pacchetto',
        },
        {
          name: 'Pacchetto 10 Sedute',
          price: 320,
          unit: 'pacchetto',
          description: 'Percorso completo per riabilitazione o dolori cronici',
          features: ['32€ a seduta (risparmi 80€)', 'Durata 45-60 minuti/seduta', 'Report progressi mensile', 'Programma esercizi personalizzato', 'Priorità appuntamenti', 'Supporto WhatsApp prioritario'],
          popular: false,
          cta: 'Scegli Pacchetto',
        },
      ]),
      note: 'Tutti i prezzi sono IVA inclusa. Fattura sanitaria disponibile per detrazione fiscale.',
    },
    included: {
      label: 'Tutto Incluso',
      title: 'Cosa comprende ogni seduta',
      item1Title: 'A Domicilio',
      item1Desc: 'Vengo direttamente a casa tua',
      item2Title: '45-60 Minuti',
      item2Desc: 'Durata completa della seduta',
      item3Title: 'Valutazione',
      item3Desc: 'Analisi completa inclusa',
      item4Title: 'Fattura',
      item4Desc: 'Per detrazione fiscale',
    },
    faq: {
      label: 'FAQ',
      title: 'Domande Frequenti',
      items: JSON.stringify([
        { question: 'Il prezzo include lo spostamento a domicilio?', answer: 'Sì, il prezzo indicato è tutto incluso. Non ci sono costi aggiuntivi per lo spostamento a Roma.' },
        { question: 'Accettate pagamenti elettronici?', answer: 'Sì, accettiamo contanti, bonifico bancario, carta di credito/debito e pagamenti tramite app (Satispay, PayPal).' },
        { question: 'Posso detrarre le spese dalla dichiarazione dei redditi?', answer: 'Sì, rilascio regolare fattura sanitaria che potrai utilizzare per la detrazione fiscale delle spese mediche.' },
        { question: 'I pacchetti hanno una scadenza?', answer: 'I pacchetti hanno validità 3 mesi dalla data di acquisto per garantire la continuità del percorso terapeutico.' },
        { question: 'Cosa succede se devo annullare un appuntamento?', answer: 'Puoi annullare o spostare gratuitamente con almeno 24 ore di preavviso. Cancellazioni tardive comportano il 50% del costo.' },
      ]),
    },
    cta: {
      title: 'Pronto a iniziare?',
      subtitle: 'Compila il quiz di valutazione gratuito e riceverai una proposta personalizzata per il tuo percorso di guarigione.',
      button: 'Inizia il Quiz Gratuito',
    },
  },

  'chi-siamo': {
    hero: {
      label: 'Chi Siamo',
      title: 'FisioterApp',
      subtitle: 'FisioterApp è la piattaforma che rende la fisioterapia a domicilio semplice, veloce e accessibile.',
    },
    howItWorks: {
      patientsLabel: 'Come Funziona',
      patientsTitle: 'Per i Pazienti',
      patientsText1: 'Il paziente prenota online in pochi passaggi e viene automaticamente assegnato a un fisioterapista qualificato, selezionato in base alle sue esigenze, alla zona e alla disponibilità.',
      patientsText2: 'Nessuna ricerca complessa, nessuna attesa: pensiamo noi a individuare il professionista più adatto.',
      prosLabel: 'Per i Professionisti',
      prosTitle: 'Per i Fisioterapisti',
      prosText1: 'I fisioterapisti ricevono le prenotazioni e svolgono la seduta direttamente a domicilio, offrendo un servizio professionale e personalizzato.',
      prosText2: 'Valorizziamo il lavoro dei professionisti, permettendo loro di concentrarsi su ciò che sanno fare meglio: prendersi cura dei pazienti.',
    },
    mission: {
      label: 'La Nostra Missione',
      title: 'Semplificare l\'accesso alla fisioterapia',
      description: 'Il nostro obiettivo è semplificare l\'accesso alla fisioterapia, offrendo ai pazienti un\'esperienza comoda, affidabile e trasparente, e valorizzando il lavoro dei professionisti.',
    },
    values: {
      label: 'I Nostri Valori',
      title: 'Cosa ci guida',
      subtitle: 'Tre principi fondamentali che definiscono il nostro modo di lavorare.',
      value1Title: 'Semplicità',
      value1Desc: 'Prenoti online in pochi passaggi e vieni automaticamente assegnato al fisioterapista più adatto. Nessuna ricerca complessa.',
      value2Title: 'Affidabilità',
      value2Desc: 'Selezioniamo fisioterapisti qualificati in base alle tue esigenze, alla zona e alla disponibilità.',
      value3Title: 'Trasparenza',
      value3Desc: 'Un\'esperienza comoda, affidabile e trasparente per i pazienti, valorizzando il lavoro dei professionisti.',
    },
    cta: {
      title: 'Pronto a provare?',
      subtitle: 'Prenota la tua prima visita in pochi click e scopri quanto è semplice ricevere fisioterapia di qualità a domicilio.',
      buttonPrimary: 'Prenota una Visita',
      buttonSecondary: 'Contattaci',
    },
  },

  contatti: {
    hero: {
      label: 'Contatti',
      title: 'Parliamo del tuo benessere',
      subtitle: 'Hai domande o vuoi prenotare una visita? Contattami attraverso il canale che preferisci. Rispondo sempre entro 24 ore.',
    },
    methods: {
      items: JSON.stringify([
        { title: 'Telefono', value: '+39 366 199 3137', href: 'tel:+393661993137', description: 'Chiamami per informazioni o prenotazioni' },
        { title: 'WhatsApp', value: '+39 366 199 3137', href: 'https://wa.me/393661993137', description: 'Scrivimi su WhatsApp per risposta rapida' },
        { title: 'Email', value: 'lollo.sicari2003@gmail.com', href: 'mailto:lollo.sicari2003@gmail.com', description: 'Per richieste dettagliate o documentazione' },
      ]),
    },
    zones: {
      label: 'Zone Coperte',
      title: 'Roma',
      subtitle: 'I nostri fisioterapisti raggiungono i pazienti in tutta Roma. Ecco alcune delle zone principali dove operiamo regolarmente:',
      items: JSON.stringify([
        'Centro Storico', 'Prati', 'Trastevere', 'EUR', 'Monteverde', 'Parioli',
        'Flaminio', 'San Giovanni', 'Testaccio', 'Ostiense', 'Tuscolano', 'Nomentano',
        'Trieste', 'Balduina', 'Aurelio', 'Tiburtino',
      ]),
    },
    schedule: {
      label: 'Orari',
      title: 'Quando sono disponibile',
      subtitle: 'Offro massima flessibilità per adattarmi ai tuoi impegni. Prenota l\'orario più comodo per te.',
      items: JSON.stringify([
        { day: 'Lunedì - Venerdì', hours: '8:00 - 20:00' },
        { day: 'Sabato', hours: '9:00 - 14:00' },
        { day: 'Domenica', hours: 'Su appuntamento' },
      ]),
      note: '* Per urgenze o esigenze particolari, contattami e troveremo una soluzione.',
    },
    cta: {
      title: 'Preferisci iniziare con il quiz?',
      subtitle: 'Se non sei sicuro di cosa hai bisogno, compila il nostro quiz di valutazione. Ti contatterò io con una proposta personalizzata.',
      button: 'Inizia il Quiz',
    },
  },
}

export type DefaultContent = typeof defaultContent
