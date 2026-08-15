'use client';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat({ settings }: { settings: any }) {
  const whatsappNumber = settings?.whatsappNumber || '+92 315 4883812';
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello, I need some help!')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative flex items-center justify-center bg-[#25D366] hover:bg-[#1ebd5a] text-white p-4 rounded-full shadow-xl shadow-[#25D366]/30 hover:scale-110 transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
}
