'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, X, Home, Grid, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { usePathname } from 'next/navigation';

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, openDrawer, getTotal } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = typeof getTotal === 'function' ? getTotal() : 0;
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-50 shadow-sm relative">
      <div className="bg-blue-600 px-4 pt-4 pb-3 md:py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-8">
          
          {/* Top Row for Mobile / Left side for Desktop */}
          <div className="flex items-center justify-between md:justify-start gap-4">
            <button 
              className="text-white p-1 -ml-1 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <Link href="/" className="text-white font-bold text-lg md:text-xl tracking-tight whitespace-nowrap">
              New Jaral <span className="opacity-90">Mobiles</span>
            </Link>
            
            {/* Mobile Cart (hidden on md) */}
            <button 
              onClick={openDrawer} 
              className="text-white p-1 -mr-1 relative md:hidden"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center border border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Search Bar (Middle on Desktop) */}
          <div className="relative w-full md:max-w-xl lg:max-w-2xl flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search for accessories, repairs..." 
              className="w-full bg-white rounded-md py-2 pl-10 pr-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>

          {/* Desktop Links & Cart (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <Link href="/" className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-white' : 'text-blue-100 hover:text-white'}`}>Home</Link>
            <Link href="/shop" className={`text-sm font-semibold transition-colors ${pathname === '/shop' ? 'text-white' : 'text-blue-100 hover:text-white'}`}>Accessories</Link>
            <Link href="/book-repair" className={`text-sm font-semibold transition-colors ${pathname === '/book-repair' ? 'text-white' : 'text-blue-100 hover:text-white'}`}>Repairs</Link>
            
            <div className="w-px h-6 bg-blue-500/50"></div>

            <button onClick={openDrawer} className="flex items-center space-x-2 group cursor-pointer text-white hover:text-blue-50 transition-colors">
              <div className="relative">
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center border-2 border-blue-600">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold">
                Rs. {cartTotal.toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden md:hidden">
          <nav className="flex flex-col">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 active:bg-slate-50">
              <Home className="w-5 h-5 text-blue-600" />
              <span className="text-slate-800 font-medium">Home</span>
            </Link>
            
            <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 active:bg-slate-50">
              <Grid className="w-5 h-5 text-blue-600" />
              <span className="text-slate-800 font-medium">Categories</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
