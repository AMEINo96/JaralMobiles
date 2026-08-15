'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, X, Home, Grid, Bell, User, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, openDrawer } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="md:hidden sticky top-0 z-50 shadow-sm relative">
      <div className="bg-blue-600 px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <button 
            className="text-white p-1 -ml-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <Link href="/" className="text-white font-bold text-lg tracking-tight">
            New Jaral <span className="opacity-90">Mobiles</span>
          </Link>
          
          <button 
            onClick={openDrawer} 
            className="text-white p-1 -mr-1 relative"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center border border-white">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search for accessories, repairs..." 
            className="w-full bg-white rounded-md py-2 pl-10 pr-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Mobile Hamburger Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden">
          <nav className="flex flex-col">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 active:bg-slate-50">
              <Home className="w-5 h-5 text-blue-600" />
              <span className="text-slate-800 font-medium">Home</span>
            </Link>
            
            <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 active:bg-slate-50">
              <Grid className="w-5 h-5 text-blue-600" />
              <span className="text-slate-800 font-medium">Categories</span>
            </Link>

            <button onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between px-6 py-4 border-b border-slate-100 active:bg-slate-50 w-full text-left">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-600" />
                <span className="text-slate-800 font-medium">Alerts</span>
              </div>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2 New</span>
            </button>
            
            <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-6 py-4 active:bg-slate-50 w-full text-left">
              <User className="w-5 h-5 text-blue-600" />
              <span className="text-slate-800 font-medium">Account</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
