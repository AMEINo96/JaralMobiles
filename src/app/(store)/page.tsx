import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getFeaturedProductsQuery, getHeroBannerQuery, getStoreSettingsQuery } from "@/sanity/lib/queries";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  MessageCircle, 
  Wrench, 
  Smartphone 
} from "lucide-react";

export const revalidate = 60;

export default async function HomePage() {
  const [products, heroBanner, storeSettings] = await Promise.all([
    client.fetch(getFeaturedProductsQuery),
    client.fetch(getHeroBannerQuery),
    client.fetch(getStoreSettingsQuery),
  ]);

  const hasSlides = heroBanner?.slides && heroBanner.slides.length > 0;
  
  const heroBadge = storeSettings?.heroBadge || "Trusted by 2000+ Customers";
  const heroTitle = storeSettings?.heroTitle || "Fast & Reliable Mobile Repairs, Genuine Accessories";
  const heroSubtitle = storeSettings?.heroSubtitle || "Your one-stop destination for premium mobile phone accessories and expert repair services. Quality guaranteed.";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      {hasSlides ? (
        <section className="w-full">
          <HeroCarousel slides={heroBanner.slides} />
        </section>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full">
                {heroBadge}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                {heroTitle}
              </h1>
              
              <p className="text-lg text-slate-600 max-w-xl">
                {heroSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-7 rounded-xl shadow-lg shadow-blue-600/25 transition-all"
                >
                  Browse Accessories
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link 
                  href="/book-repair"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold py-3.5 px-7 rounded-xl transition-all"
                >
                  <Wrench className="w-5 h-5" />
                  Book a Repair
                </Link>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay"></div>
                <Smartphone className="w-48 h-48 text-blue-600 drop-shadow-xl z-10" strokeWidth={1} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trust & Guarantees Bar */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Original Parts", subtitle: "Certified quality", icon: ShieldCheck },
              { title: "24-48h Turnaround", subtitle: "Fast repair service", icon: Zap },
              { title: "Easy Payment", subtitle: "Secure transactions", icon: CreditCard },
              { title: "WhatsApp Support", subtitle: "Always here for you", icon: MessageCircle }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-slate-500">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Featured Products</h2>
              <p className="mt-2 text-slate-600">Discover our most popular accessories.</p>
            </div>
            <Link 
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-10 sm:hidden">
            <Link 
              href="/shop"
              className="flex w-full items-center justify-center bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3.5 px-4 rounded-xl hover:bg-slate-100 transition-colors"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
