# FisioterApp - Architettura

## Stack Tecnologico
- **Frontend**: Next.js 16 (App Router)
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS v4
- **Hosting**: Vercel (free tier)

## Struttura Progetto

```
src/
├── app/                      # App Router pages
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout con Header/Footer
│   ├── globals.css          # Design system e stili globali
│   ├── servizi/page.tsx     # Lista servizi
│   ├── chi-sono/page.tsx    # Bio fisioterapista
│   ├── prezzi/page.tsx      # Listino prezzi
│   ├── contatti/page.tsx    # Info contatto
│   ├── quiz/page.tsx        # Quiz prenotazione
│   └── admin/
│       ├── page.tsx         # Login admin
│       └── dashboard/
│           ├── page.tsx     # Dashboard richieste
│           └── content/page.tsx # CMS gestione contenuti
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Navigazione responsive
│   │   └── Footer.tsx       # Footer con contatti
│   ├── quiz/
│   │   ├── QuizContainer.tsx # Stato e logica quiz
│   │   ├── ProgressBar.tsx   # Indicatore progresso
│   │   ├── StepPainZone.tsx  # Step 1: zona dolore
│   │   ├── StepDuration.tsx  # Step 2: durata
│   │   ├── StepIntensity.tsx # Step 3: intensità (slider)
│   │   ├── StepCause.tsx     # Step 4: causa
│   │   └── StepContact.tsx   # Step 5: dati contatto
│   └── admin/
│       ├── RequestsTable.tsx  # Tabella richieste espandibile
│       ├── ExportButton.tsx   # Export CSV
│       ├── ContentEditor.tsx  # Editor CMS principale
│       └── ContentSection.tsx # Sezione accordion CMS
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Client browser
│   │   └── server.ts        # Client server
│   ├── content.ts           # Funzioni fetch/save contenuti CMS
│   ├── default-content.ts   # Contenuti fallback (hardcoded)
│   └── storage.ts           # Upload immagini CMS
└── types/
    └── index.ts             # TypeScript types (Quiz + CMS)
```

## Database Schema

### Tabella: quiz_submissions
| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | UUID | PK auto-generated |
| created_at | TIMESTAMP | Data creazione |
| pain_zone | TEXT | schiena/collo/spalla/ginocchio/caviglia/altro |
| duration | TEXT | meno_1_settimana/1_4_settimane/1_3_mesi/piu_3_mesi |
| intensity | INT | 1-10 |
| cause | TEXT | trauma/postura/sport/non_so |
| name | TEXT | Nome cliente |
| phone | TEXT | Telefono |
| email | TEXT | Email |
| notes | TEXT | Note (nullable) |
| status | TEXT | nuovo/contattato/completato |

### RLS Policies (quiz_submissions)
- **INSERT**: Pubblico (chiunque può inviare quiz)
- **SELECT/UPDATE**: Solo utenti autenticati

### Tabella: site_content (CMS)
| Colonna | Tipo | Descrizione |
|---------|------|-------------|
| id | UUID | PK auto-generated |
| page | VARCHAR(50) | Nome pagina (home, servizi, prezzi, chi-siamo, contatti) |
| section | VARCHAR(50) | Sezione (hero, services, cta, etc.) |
| content_key | VARCHAR(100) | Chiave contenuto (title, subtitle, etc.) |
| content_value | TEXT | Valore contenuto |
| content_type | VARCHAR(20) | Tipo (text, json, image) |
| sort_order | INT | Ordine visualizzazione |
| updated_at | TIMESTAMP | Data ultima modifica |

**Unique constraint**: (page, section, content_key)

### RLS Policies (site_content)
- **SELECT**: Pubblico (contenuti visibili a tutti)
- **INSERT/UPDATE/DELETE**: Solo utenti autenticati

## Design System

### Colori (CSS Variables)
- `--green-600`: Colore primario (#476f47)
- `--cream`: Background (#fdfbf7)
- `--stone-*`: Grigi caldi

### Font
- Display: DM Serif Display (titoli)
- Body: Source Sans 3 (testo)

## Flussi Principali

### Quiz Flow
1. Utente apre /quiz
2. Compila 5 step (zona, durata, intensità, causa, contatto)
3. Submit → INSERT in Supabase
4. Pagina conferma con riepilogo

### Admin Flow
1. Lorenzo accede a /admin
2. Login con Supabase Auth
3. Redirect a /admin/dashboard
4. Visualizza richieste con filtri
5. Cambia stato (nuovo → contattato → completato)
6. Export CSV

### CMS Flow (Gestione Contenuti)
1. Admin accede a /admin/dashboard/content
2. Seleziona la pagina da modificare (Home, Servizi, Prezzi, Chi Siamo, Contatti)
3. Espande le sezioni (Hero, Services, CTA, etc.)
4. Modifica i testi nei campi
5. Clicca "Salva Modifiche"
6. I contenuti vengono salvati nel DB
7. Le pagine pubbliche mostrano i nuovi contenuti

## Configurazione

### Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
```

### Setup Admin
1. Vai su Supabase Dashboard → Authentication → Users
2. Crea utente admin con email/password
3. Usa quelle credenziali per accedere a /admin

## Deploy
1. Push su GitHub
2. Collega repo a Vercel
3. Configura environment variables su Vercel
4. Deploy automatico su ogni push
5. Configura dominio personalizzato
