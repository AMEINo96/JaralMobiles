import { client } from "@/sanity/lib/client";
import { getProductBySlugQuery } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import ImageGallery from "@/components/ImageGallery";

export const revalidate = 60;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await client.fetch(getProductBySlugQuery, { slug });

  if (!product) {
    notFound();
  }

  const categoryName = product.category?.name || "Uncategorized";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Image Gallery */}
        <div className="lg:w-1/2">
          <ImageGallery images={product.images || []} />
        </div>

        {/* Right: Product Details */}
        <div className="lg:w-1/2 flex flex-col">
          {/* Breadcrumb */}
          <div className="text-sm text-slate-400 mb-6">
            Home &gt; Shop &gt; {categoryName}
          </div>

          {/* Category Pill */}
          <div className="mb-3">
            <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              {categoryName}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            {product.name}
          </h1>

          {/* Price */}
          <div className="text-3xl font-bold text-slate-900 mb-6">
            £{product.price?.toFixed(2)}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-6">
            {product.stock > 0 ? (
              <>
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-600 font-medium text-sm">
                  In Stock
                </span>
              </>
            ) : (
              <>
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                <span className="text-red-600 font-medium text-sm">
                  Out of Stock
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="text-slate-600 leading-relaxed mb-8 prose prose-slate">
            {product.description || "No description available for this product."}
          </div>

          {/* Add to Cart */}
          <div className="mb-8">
            <AddToCartButton product={product} />
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto border-t border-slate-100 pt-8">
            <div className="bg-slate-50 p-4 rounded-xl flex flex-col items-center text-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <span className="text-xs font-semibold text-slate-700">
                1 Year Warranty
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl flex flex-col items-center text-center gap-2">
              <Truck className="w-6 h-6 text-blue-600" />
              <span className="text-xs font-semibold text-slate-700">
                Fast Delivery
              </span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl flex flex-col items-center text-center gap-2">
              <RotateCcw className="w-6 h-6 text-blue-600" />
              <span className="text-xs font-semibold text-slate-700">
                30-Day Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
