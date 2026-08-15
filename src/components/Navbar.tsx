'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, MapPin, Clock, Phone } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';

export default function Navbar({ settings }: { settings?: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items, getTotal, openDrawer } = useCartStore();

  const cartItemCount = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const cartTotal = typeof getTotal === 'function' ? getTotal() : 0;

  const address = settings?.address || 'Shop Address';
  const workingHours = settings?.workingHours || 'Mon - Sat: 10 AM - 9 PM';
  const whatsappNumber = settings?.whatsappNumber || '+92 315 4883812';

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop Accessories', href: '/shop' },
    { name: 'Book a Repair', href: '/book-repair' },
  ];

  return (
    <header className="w-full flex flex-col z-50">
      {/* Section 1: Top Info Bar */}
      <div className="w-full bg-slate-900 text-slate-400 text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left side */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{address}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{workingHours}</span>
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center space-x-1 w-full sm:w-auto justify-center sm:justify-end text-slate-300">
            <Phone className="w-3 h-3" />
            <span>{whatsappNumber}</span>
          </div>
        </div>
      </div>

      {/* Section 2: Main Header */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            {settings?.siteLogo ? (
              <div className="relative h-9 w-36">
                <Image
                  src={urlForImage(settings.siteLogo).height(72).url()}
                  alt={settings?.siteTitle || 'New Jaral Mobiles'}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            ) : (
              <>
                <span className="font-bold text-xl text-slate-900 tracking-tight">New Jaral</span>
                <span className="font-bold text-xl text-blue-600 tracking-tight">Mobiles</span>
              </>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm transition-colors hover:text-blue-600 ${
                    isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 font-medium'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button onClick={openDrawer} className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative p-2 text-slate-600 group-hover:text-blue-600 transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-blue-600 rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:block text-sm font-semibold text-slate-900">
                Rs. {cartTotal.toLocaleString()}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg">
            <nav className="px-4 pt-2 pb-4 flex flex-col">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 border-b border-slate-100 text-base transition-colors ${
                      isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 font-medium hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
