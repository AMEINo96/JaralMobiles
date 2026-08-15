import Link from 'next/link';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export default function Footer({ settings }: { settings: any }) {
  const whatsappNumber = settings?.whatsappNumber || '+92 315 4883812';
  const emailAddress = settings?.emailAddress || 'support@newjaralmobiles.com';
  const address = settings?.address || 'Shop Address';
  const workingHours = settings?.workingHours || 'Mon - Sat: 10 AM - 9 PM';
  const googleMapsLink = settings?.googleMapsLink;

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - About */}
          <div>
            <div className="text-xl font-bold mb-4">
              <span className="text-slate-900">New Jaral </span>
              <span className="text-blue-600">Mobiles</span>
            </div>
            <p className="text-sm text-slate-500 mb-6">
              Your trusted shop for premium mobile accessories, repairs, and the latest gadgets.
            </p>
            <div className="flex items-center gap-3">
              {settings?.facebookLink && (
                <a href={settings.facebookLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {settings?.instagramLink && (
                <a href={settings.instagramLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
            <div className="space-y-1">
              <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 py-1.5 block">Home</Link>
              <Link href="/shop" className="text-sm text-slate-500 hover:text-blue-600 py-1.5 block">Shop Accessories</Link>
              <Link href="/repair" className="text-sm text-slate-500 hover:text-blue-600 py-1.5 block">Book a Repair</Link>
            </div>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Contact</h4>
            <div className="flex items-start gap-3 text-sm text-slate-500 mb-3">
              <Phone className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
              <span>{whatsappNumber}</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-500 mb-3">
              <Mail className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
              <span>{emailAddress}</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-slate-500 mb-3">
              <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
              <span>{address}</span>
            </div>
          </div>

          {/* Column 4 - Working Hours */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Working Hours</h4>
            <div className="flex items-start gap-3 text-sm text-slate-500 mb-6">
              <Clock className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" />
              <span>{workingHours}</span>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-3">We Accept</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">EasyPaisa</span>
                <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">JazzCash</span>
                <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>

        {googleMapsLink && (
          <div className="mt-12 rounded-2xl overflow-hidden h-48 border border-slate-200">
            <iframe 
              src={googleMapsLink} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-100 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} New Jaral Mobiles. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
