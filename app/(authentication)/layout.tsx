import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '@/app/globals.css'
import "@flaticon/flaticon-uicons/css/all/all.css";

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'SolveChess',
}

export default function RootLayout({children, }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico?v=2' type='icon'/>
      </head>
      <body className={`${montserrat.className} bg-text`}>{children}</body>
    </html>
  )
}
