import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getFeaturedProductsQuery, getHeroBannerQuery, getStoreSettingsQuery } from "@/sanity/lib/queries";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryRibbon from "@/components/CategoryRibbon";
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
  const layout = heroBanner?.layout || 'full';
  
  const heroBadge = storeSettings?.heroBadge || "Trusted by 2000+ Customers";
  const heroTitle = storeSettings?.heroTitle || "Fast & Reliable Mobile Repairs, Genuine Accessories";
  const heroSubtitle = storeSettings?.heroSubtitle || "Your one-stop destination for premium mobile phone accessories and expert repair services. Quality guaranteed.";

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      {hasSlides && layout === 'full' ? (
        <section className="w-full">
          <HeroCarousel slides={heroBanner.slides} />
        </section>
      ) : (
        <section className="w-full max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8 md:py-16 lg:py-24 bg-white md:bg-transparent">
          <div className="flex flex-col lg:flex-row items-center md:gap-12">
            {/* Desktop Left Column / Mobile Text below */}
            <div className="w-full lg:w-1/2 space-y-4 md:space-y-8 px-4 py-8 md:p-0 order-2 lg:order-1">
              <div className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full">
                {heroBadge}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                {heroTitle}
              </h1>
              <p className="text-base md:text-lg text-slate-600 max-w-xl">
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
            
            {/* Right Column (Hero Image/Slider) */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              {hasSlides && layout === 'split' ? (
                <div className="md:rounded-3xl overflow-hidden md:shadow-2xl bg-white md:border border-slate-100">
                  <HeroCarousel slides={heroBanner.slides} />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-50 to-slate-100 md:rounded-3xl p-8 aspect-[21/9] md:aspect-square flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-600/5 mix-blend-overlay"></div>
                  <Smartphone className="w-24 h-24 md:w-48 md:h-48 text-blue-600 drop-shadow-xl z-10" strokeWidth={1} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Mobile Category Ribbon */}
      <CategoryRibbon />

      {/* Secondary Promo (Mobile Only) */}
      <div className="md:hidden mx-4 my-4 rounded-xl overflow-hidden bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 opacity-90 mix-blend-multiply"></div>
        <div className="relative p-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-sm tracking-tight">Need a Repair?</h3>
            <p className="text-white/80 text-[10px] mt-0.5">Expert Technicians & Genuine Parts</p>
          </div>
          <Link href="/book-repair" className="bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span className="text-white text-[10px] font-bold tracking-wider uppercase">Book Now</span>
          </Link>
        </div>
      </div>

      {/* Trust & Guarantees Bar (Hidden on Mobile, replaced by Promo above and native feel) */}
      <section className="hidden md:block bg-slate-50 py-16">
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

      {/* Themed Top Deals Section */}
      <section className="bg-emerald-600 md:bg-white rounded-t-3xl md:rounded-none mt-2 md:mt-0 pt-5 md:pt-20 pb-6 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-5 md:mb-10">
            <div>
              <h2 className="text-xl md:text-3xl font-extrabold text-white md:text-slate-900 tracking-tight">Top Deals</h2>
              <p className="text-white/80 md:text-slate-600 text-xs md:text-base mt-0.5 md:mt-2">Featured Accessories & Essentials</p>
            </div>
            <Link 
              href="/shop"
              className="bg-white md:bg-transparent text-emerald-700 md:text-blue-600 text-[11px] md:text-base font-bold px-3 py-1.5 md:px-0 md:py-0 rounded-full shadow-sm md:shadow-none hover:md:text-blue-700 flex items-center gap-1 transition-all"
            >
              View all
              <ArrowRight className="hidden md:block w-4 h-4" />
            </Link>
          </div>

          {/* Horizontally scrolling products container for mobile, grid for desktop */}
          <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:gap-8">
            {products?.map((product: any) => (
              <div key={product._id} className="min-w-[150px] max-w-[150px] md:min-w-0 md:max-w-none flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
