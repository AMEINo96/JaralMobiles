import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { getStoreSettingsQuery } from '@/sanity/lib/queries'
import { CheckCircle2, MessageCircle } from 'lucide-react'

export const revalidate = 60

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const orderID = params.orderID as string
  const total = params.total as string

  const storeSettings = await client.fetch(getStoreSettingsQuery)

  const defaultWhatsapp = "+923154883812"
  const whatsappNumber = storeSettings?.whatsappNumber || defaultWhatsapp
  
  const whatsappMsg = `Hello, I am sending the payment screenshot for Order ID: ${orderID}. Amount: Rs. ${total}`
  const waUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-slate-600 mb-6">Thank you for shopping with us. Your order has been recorded.</p>
        
        <div className="bg-slate-100 text-slate-900 inline-block px-4 py-2 rounded-lg font-mono text-sm mb-8">
          Order ID: <span className="font-bold text-blue-600">{orderID}</span>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 text-left mb-8">
          <h3 className="font-semibold text-slate-900 mb-3">Payment Instructions</h3>
          <p className="text-sm text-slate-700 mb-5">
            Please transfer <span className="font-bold text-slate-900">Rs. {total}</span> to any of the following accounts and send us a screenshot on WhatsApp.
          </p>

          <div className="space-y-3">
            {storeSettings?.easypaisaDetails && (
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-1">EasyPaisa</p>
                <p className="font-medium text-slate-900">{storeSettings.easypaisaDetails}</p>
              </div>
            )}
            {storeSettings?.jazzcashDetails && (
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-1">JazzCash</p>
                <p className="font-medium text-slate-900">{storeSettings.jazzcashDetails}</p>
              </div>
            )}
            {storeSettings?.bankDetails && (
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-1">Bank Transfer</p>
                <p className="font-medium text-slate-900 whitespace-pre-line break-all">{storeSettings.bankDetails}</p>
              </div>
            )}
          </div>
        </div>

        <a 
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-[#25D366]/30 mb-8"
        >
          <MessageCircle className="w-5 h-5" />
          Send Screenshot on WhatsApp
        </a>

        <div>
          <Link href="/shop" className="text-slate-400 hover:text-blue-600 font-medium transition-colors text-sm">
            Return to shop
          </Link>
        </div>
      </div>
    </div>
  )
}
