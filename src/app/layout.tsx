import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { client } from '@/sanity/lib/client'
import { getStoreSettingsQuery } from '@/sanity/lib/queries'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(getStoreSettingsQuery)
  
  return {
    title: settings?.siteTitle || 'New Jaral Mobiles - Premium Accessories & Expert Repairs',
    description: settings?.siteDescription || 'Your trusted destination for genuine mobile accessories, fast chargers, premium cases, and expert device repairs. EasyPaisa, JazzCash & Bank Transfer accepted.',
    verification: {
      google: '7C6vBiS67ysVtiFDPstqY3QNHKX-4bTgVwKIGvkvAS8',
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await client.fetch(getStoreSettingsQuery)
  
  // By default (or if not set), no class is applied, falling back to original Tailwind blue.
  const themeClass = settings?.activeTheme && settings.activeTheme !== 'default' 
    ? `theme-${settings.activeTheme}` 
    : ''

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${themeClass} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
