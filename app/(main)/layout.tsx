import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '@/app/globals.css'
import './layout.css'

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({children, }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css'/>
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css'/>
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}