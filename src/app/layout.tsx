import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'FisioterApp - Fisioterapia a Domicilio Roma | Lorenzo Sicari',
    template: '%s | FisioterApp',
  },
  description:
    'Fisioterapia professionale a domicilio in tutta Roma. Trattamenti personalizzati per mal di schiena, dolori cervicali, riabilitazione e molto altro. Prenota ora la tua visita a soli 40€.',
  keywords: [
    'fisioterapia roma',
    'fisioterapista domicilio',
    'fisioterapia a domicilio roma',
    'riabilitazione roma',
    'mal di schiena roma',
    'massoterapia roma',
    'lorenzo sicari fisioterapista',
  ],
  authors: [{ name: 'Lorenzo Sicari' }],
  creator: 'FisioterApp',
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://fisioterapp.it',
    siteName: 'FisioterApp',
    title: 'FisioterApp - Fisioterapia a Domicilio Roma',
    description:
      'Fisioterapia professionale a domicilio in tutta Roma. Prenota ora la tua visita a soli 40€.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[var(--header-height)]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
