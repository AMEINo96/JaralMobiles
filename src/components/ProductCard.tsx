'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star } from 'lucide-react';
import { urlForImage } from '@/sanity/lib/image';
import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }: { product: any }) {
  const addItem = useCartStore((state) => state.addItem);
  const mainImage = product.images?.[0];
  const inStock = product.stock > 0 || product.inStock !== false;

  return (
    <div className="bg-white rounded-lg border border-slate-100 overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
      <Link href={`/product/${product.slug?.current || product._id}`} className="relative aspect-square bg-slate-50 block">
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
        
        {/* Top Left Badge */}
        {!inStock && (
          <span className="absolute top-2 left-2 bg-red-50/90 backdrop-blur-sm text-red-600 text-[9px] font-bold px-2 py-0.5 rounded-sm">
            Out of Stock
          </span>
        )}

        {/* Rating Pill (Bottom Center overlapping) */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#FFF8E1] border border-amber-100 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm z-10 whitespace-nowrap">
          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          <span>4.9</span>
        </div>
      </Link>

      <div className="p-3 md:p-4 flex flex-col flex-1 mt-2">
        <span className="text-[9px] md:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
          {product.category?.title || 'Accessories'}
        </span>
        
        <Link href={`/product/${product.slug?.current || product._id}`} className="group-hover:text-blue-600 transition-colors mb-2">
          <h3 className="text-xs md:text-sm font-semibold text-slate-800 line-clamp-2 leading-tight flex flex-wrap gap-1 items-start">
            {product.title}
            <span className="inline-block bg-emerald-700 text-white text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded-sm leading-none mt-0.5">
              SALE
            </span>
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="text-sm md:text-lg font-extrabold text-slate-900">
            Rs. {product.price?.toLocaleString() || 0}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({ _id: product._id, title: product.title, price: product.price, image: mainImage });
            }}
            disabled={!inStock}
            className="w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-100 disabled:text-slate-300 text-white rounded-full md:rounded-lg flex items-center justify-center transition-colors shrink-0 shadow-sm"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline text-sm font-semibold">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
