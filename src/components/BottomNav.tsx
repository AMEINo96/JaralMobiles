'use client';

import Link from 'next/link';
import { Home, Bell, Grid, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function BottomNav() {
  const items = useCartStore((state) => state.items);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 py-2 px-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex flex-col items-center gap-1 p-1">
          <Home className="w-6 h-6 text-blue-600" />
          <span className="text-[10px] font-medium text-blue-600">Home</span>
        </Link>
        
        <button className="flex flex-col items-center gap-1 p-1 relative text-slate-500 hover:text-slate-900">
          <div className="relative">
            <Grid className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-medium">Categories</span>
        </button>

        <button className="flex flex-col items-center gap-1 p-1 relative text-slate-500 hover:text-slate-900">
          <div className="relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center border border-white shadow-sm">
              2
            </span>
          </div>
          <span className="text-[10px] font-medium">Alerts</span>
        </button>
        
        <Link href="/checkout" className="flex flex-col items-center gap-1 p-1 relative text-slate-500 hover:text-slate-900">
          <div className="relative">
            <ShoppingBag className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full text-[9px] font-bold w-4 h-4 flex items-center justify-center border border-white shadow-sm">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">Cart</span>
        </Link>
        
        <button className="flex flex-col items-center gap-1 p-1 relative text-slate-500 hover:text-slate-900">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Account</span>
        </button>
      </div>
    </div>
  );
}
