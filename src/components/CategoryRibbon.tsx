import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { getAllCategoriesQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
import { Grid } from 'lucide-react';

export default async function CategoryRibbon() {
  const categories = await client.fetch(getAllCategoriesQuery);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-b border-slate-100">
      <div className="flex overflow-x-auto hide-scrollbar py-4 px-2 gap-4 md:justify-center md:gap-8 md:py-6">
        {categories.map((category: any) => (
          <Link 
            key={category._id} 
            href={`/shop?category=${category.slug?.current}`}
            className="flex flex-col items-center justify-center min-w-[70px] gap-2 group"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors overflow-hidden">
              {category.icon ? (
                <Image 
                  src={urlForImage(category.icon).width(48).height(48).url()} 
                  alt={category.title}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              ) : (
                <Grid className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
              )}
            </div>
            <span className="text-[10px] text-slate-600 font-medium tracking-tight">
              {category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
