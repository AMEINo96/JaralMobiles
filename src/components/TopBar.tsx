import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="md:hidden sticky top-0 z-50 bg-blue-600 px-4 pt-4 pb-3 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <button className="text-white p-1 -ml-1">
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          New Jaral <span className="opacity-90">Mobiles</span>
        </Link>
        <div className="w-6 h-6"></div> {/* Spacer for centering */}
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
  );
}
