import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { client } from '@/sanity/lib/client'
import { getStoreSettingsQuery } from '@/sanity/lib/queries'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(getStoreSettingsQuery)
  
  return {
    title: settings?.siteTitle || 'New Jaral Mobiles - Premium Accessories & Expert Repairs',
    description: settings?.siteDescription || 'Your trusted destination for genuine mobile accessories, fast chargers, premium cases, and expert device repairs. EasyPaisa, JazzCash & Bank Transfer accepted.',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
