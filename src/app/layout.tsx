import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar/Navbar'
import { Footer } from './Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Faremos a sua carteira chorar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Navbar />
        <main className='max-w-7xl min-w-[300px] min-h-[calc(100vh-268px)] p-4 mx-auto'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
