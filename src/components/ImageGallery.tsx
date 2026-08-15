'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

export default function ImageGallery({ images }: { images: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative w-full aspect-square bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <Image
          src={urlForImage(images[currentIndex]).url()}
          alt="Product Image"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Thumbnails row */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto hide-scrollbar pb-2">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all shrink-0 ${
                currentIndex === index
                  ? 'border-2 border-blue-600 ring-2 ring-blue-600/20'
                  : 'border-2 border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={urlForImage(image).url()}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
