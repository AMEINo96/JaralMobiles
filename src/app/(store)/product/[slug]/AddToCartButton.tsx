'use client'

import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem)
  const mainImage = product.images?.[0]

  return (
    <button
      onClick={() => addItem({
        _id: product._id,
        title: product.title,
        price: product.price,
        image: mainImage,
      })}
      disabled={!product.inStock}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-4 px-8 rounded-xl transition-colors flex justify-center items-center gap-2 shadow-lg shadow-blue-600/25 w-full"
    >
      <ShoppingBag className="w-5 h-5" />
      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
    </button>
  )
}
