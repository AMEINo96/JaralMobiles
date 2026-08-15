'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ArrowRight, Loader2, ShoppingBag, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    setError('')

    try {
      const orderID = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`
      const totalAmount = getTotal()

      // Save to Firestore
      await addDoc(collection(db, 'Orders'), {
        orderID,
        customerInfo: formData,
        cartItems: items.map(i => ({ _id: i._id, title: i.title, quantity: i.quantity, price: i.price })),
        totalAmount,
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
          totalAmount,
        }),
      })

      if (!res.ok) {
        console.error('Failed to send email notification')
      }

      // Success
      clearCart()
      router.push(`/success?orderID=${orderID}&total=${totalAmount}`)
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
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Complete Shipping Address</label>
                  <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="House 123, Street 4, City..." />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
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
                <span>Rs. {getTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-sm text-slate-600">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
              
              <div className="border-t border-slate-100 my-4"></div>
              
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="text-xl font-bold text-slate-900">Rs. {getTotal().toLocaleString()}</span>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-6">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">Manual Payment</span>
                </div>
                <p className="text-sm text-blue-800">
                  Payment instructions for EasyPaisa, JazzCash, or Bank Transfer will be provided on the next screen after you place your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
