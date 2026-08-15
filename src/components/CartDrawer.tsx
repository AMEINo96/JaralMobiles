'use client'

import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'

export default function CartDrawer({ settings }: { settings?: any }) {
  const { isDrawerOpen, closeDrawer, items, updateQuantity, removeItem, getTotal } = useCartStore()

  if (!isDrawerOpen) return null

  const total = getTotal()

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" 
        onClick={closeDrawer}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Shopping Cart</h2>
            <p className="text-sm text-slate-400">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={closeDrawer} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500">Your cart is empty</p>
              <button 
                onClick={closeDrawer}
                className="text-blue-600 font-medium hover:text-blue-700"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex gap-4 p-3 bg-slate-50 rounded-xl">
                {/* Image */}
                <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden border border-slate-100 shrink-0">
                  {item.image && (
                    <Image
                      src={urlForImage(item.image).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between gap-2">
                    <h3 className="text-sm font-medium text-slate-900 line-clamp-2">{item.title}</h3>
                    <button 
                      onClick={() => removeItem(item._id)}
                      className="text-slate-300 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-blue-600 font-semibold">Rs. {item.price.toLocaleString()}</div>
                  
                  {/* Quantity controls */}
                  <div className="inline-flex items-center bg-white border border-slate-200 rounded-lg w-fit">
                    <button 
                      onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                      className="p-1.5 text-slate-400 hover:text-blue-600"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="p-1.5 text-slate-400 hover:text-blue-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 p-6 bg-white space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-xl font-bold text-slate-900">Rs. {total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-slate-400">Shipping and taxes calculated at checkout.</p>
            <Link 
              href="/checkout"
              onClick={closeDrawer}
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition-all"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
