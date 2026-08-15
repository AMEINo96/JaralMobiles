'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { urlForImage } from '@/sanity/lib/image';
import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const mainImage = product.images?.[0];
  const inStock = product.stock > 0 || product.inStock !== false;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
      <Link href={`/product/${product.slug?.current || product._id}`} className="relative aspect-square bg-slate-50 overflow-hidden block">
        {mainImage ? (
          <Image
            src={urlForImage(mainImage).url()}
            alt={product.title || 'Product Image'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
            <span className="text-slate-400 text-sm">No Image</span>
          </div>
        )}
        
        {inStock ? (
          <span className="absolute top-3 left-3 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
            In Stock
          </span>
        ) : (
          <span className="absolute top-3 left-3 bg-red-50 text-red-600 text-[11px] font-semibold px-2.5 py-1 rounded-full">
            Out of Stock
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mb-1.5">
          {product.category?.title || 'Accessories'}
        </span>
        <Link href={`/product/${product.slug?.current || product._id}`} className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-blue-600 mb-3">
          {product.title}
        </Link>
        <div className="text-lg font-bold text-slate-900 mt-auto mb-4">
          Rs. {product.price?.toLocaleString() || 0}
        </div>
        <button
          onClick={() => addItem({ _id: product._id, title: product.title, price: product.price, image: mainImage })}
          disabled={!inStock}
          className="w-full bg-slate-900 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
