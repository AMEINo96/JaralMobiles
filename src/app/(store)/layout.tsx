import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartDrawer from '@/components/CartDrawer'
import AnnouncementBar from '@/components/AnnouncementBar'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import TopBar from '@/components/TopBar'
import { client } from '@/sanity/lib/client'
import { getStoreSettingsQuery } from '@/sanity/lib/queries'

export const revalidate = 60

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const storeSettings = await client.fetch(getStoreSettingsQuery)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      <AnnouncementBar settings={storeSettings} />
      
      {/* Mobile Top Bar */}
      <TopBar />
      
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar settings={storeSettings} />
      </div>
      
      <CartDrawer settings={storeSettings} />
      
      <main className="flex-1 bg-slate-50">
        {children}
      </main>
      
      <WhatsAppFloat settings={storeSettings} />
      <Footer settings={storeSettings} />
    </div>
  )
}
