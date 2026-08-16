'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { Loader2, ShoppingBag, CreditCard, Building2, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { getStoreSettingsQuery } from '@/sanity/lib/queries'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: 'Pakistan',
    province: '',
    city: '',
    addressLine: '',
    landmark: '',
  })
  
  const [settings, setSettings] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [settingsLoading, setSettingsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await client.fetch(getStoreSettingsQuery)
        setSettings(data)
      } catch (err) {
        console.error("Failed to fetch store settings", err)
      } finally {
        setSettingsLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Calculate totals
  const subtotal = getTotal()
  const shippingFee = settings?.shippingFee || 0
  const taxRate = settings?.taxRate || 0
  const taxAmount = (subtotal * taxRate) / 100
  const finalTotal = subtotal + shippingFee + taxAmount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    setError('')

    try {
      const orderID = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`

      // Save to Firestore
      await addDoc(collection(db, 'Orders'), {
        orderID,
        customerInfo: formData,
        cartItems: items.map(i => ({ _id: i._id, title: i.title, quantity: i.quantity, price: i.price })),
        billing: {
          subtotal,
          shippingFee,
          taxRate,
          taxAmount,
          finalTotal
        },
        status: 'pending_payment',
        createdAt: serverTimestamp()
      })

      // Send Email via Next.js API route
      const res = await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderID,
          customerInfo: formData,
          cartItems: items.map(i => ({ title: i.title, quantity: i.quantity, price: i.price })),
          billing: {
            subtotal,
            shippingFee,
            taxAmount,
            finalTotal
          },
        }),
      })

      if (!res.ok) {
        console.error('Failed to send email notification')
      }

      // Success
      clearCart()
      router.push(`/success?orderID=${orderID}&total=${finalTotal}`)
    } catch (err: any) {
      console.error(err)
      setError('An error occurred while placing your order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/shop" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-blue-600/25">
            Return to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
          <div className="text-sm text-slate-400 mt-2 flex items-center gap-2">
            <Link href="/cart" className="hover:text-slate-600 transition-colors">Cart</Link>
            <span>&gt;</span>
            <span className="text-slate-900">Checkout</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Delivery Details</h2>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="0300 1234567" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
                
                <div className="border-t border-slate-100 pt-6 mt-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Shipping Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Country</label>
                      <input required type="text" name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 outline-none" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Province</label>
                      <select required name="province" value={formData.province} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all">
                        <option value="">Select Province</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                        <option value="KPK">KPK</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Gilgit Baltistan">Gilgit Baltistan</option>
                        <option value="AJK">AJK</option>
                        <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                      <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Lahore" />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Street Address</label>
                    <input required type="text" name="addressLine" value={formData.addressLine} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="House 123, Street 4, Phase 5..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Landmark <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <input type="text" name="landmark" value={formData.landmark} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Near National Bank" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading || settingsLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex justify-center items-center gap-2 mt-8"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-24 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item._id} className="flex justify-between items-start text-sm">
                    <div className="flex-1 pr-4">
                      <span className="text-slate-600">{item.quantity} × </span>
                      <span className="font-medium text-slate-900">{item.title}</span>
                    </div>
                    <span className="font-medium text-slate-900 whitespace-nowrap">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 my-4"></div>
              
              <div className="flex justify-between items-center mb-4 text-sm text-slate-600">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              
              {settingsLoading ? (
                <div className="flex justify-between items-center mb-4 text-sm text-slate-400">
                  <span>Calculating shipping...</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4 text-sm text-slate-600">
                    <span>Shipping</span>
                    <span className={shippingFee === 0 ? "text-emerald-600 font-medium" : "text-slate-900 font-medium"}>
                      {shippingFee === 0 ? 'Free' : `Rs. ${shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  {taxRate > 0 && (
                    <div className="flex justify-between items-center mb-4 text-sm text-slate-600">
                      <span>Tax ({taxRate}%)</span>
                      <span className="text-slate-900 font-medium">Rs. {taxAmount.toLocaleString()}</span>
                    </div>
                  )}
                </>
              )}
              
              <div className="border-t border-slate-100 my-4"></div>
              
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-xl font-bold text-slate-900">
                  Rs. {settingsLoading ? '...' : finalTotal.toLocaleString()}
                </span>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Payment Methods
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Please transfer the exact total to one of the accounts below, then send a screenshot of your receipt to our WhatsApp number.
                </p>

                {settings?.easypaisaDetails && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span className="font-semibold text-emerald-900 text-sm">EasyPaisa</span>
                    </div>
                    <p className="text-sm text-emerald-800 whitespace-pre-wrap">{settings.easypaisaDetails}</p>
                  </div>
                )}

                {settings?.jazzcashDetails && (
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Smartphone className="w-4 h-4 text-orange-600" />
                      <span className="font-semibold text-orange-900 text-sm">JazzCash</span>
                    </div>
                    <p className="text-sm text-orange-800 whitespace-pre-wrap">{settings.jazzcashDetails}</p>
                  </div>
                )}

                {settings?.bankDetails && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-blue-900 text-sm">Bank Transfer</span>
                    </div>
                    <p className="text-sm text-blue-800 whitespace-pre-wrap">{settings.bankDetails}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
