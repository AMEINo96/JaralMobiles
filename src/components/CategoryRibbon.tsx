import Link from 'next/link';
import { Smartphone, Headphones, Watch, Cable, BatteryCharging, Shield, Wrench } from 'lucide-react';

const categories = [
  { name: 'Mobiles', icon: Smartphone, href: '/shop' },
  { name: 'Repairs', icon: Wrench, href: '/book-repair' },
  { name: 'Earbuds', icon: Headphones, href: '/shop' },
  { name: 'Watches', icon: Watch, href: '/shop' },
  { name: 'Cables', icon: Cable, href: '/shop' },
  { name: 'Chargers', icon: BatteryCharging, href: '/shop' },
  { name: 'Cases', icon: Shield, href: '/shop' },
];

export default function CategoryRibbon() {
  return (
    <div className="bg-white border-b border-slate-100">
      <div className="flex overflow-x-auto hide-scrollbar py-4 px-2 gap-4 md:justify-center md:gap-8 md:py-6">
        {categories.map((category) => (
          <Link 
            key={category.name} 
            href={category.href}
            className="flex flex-col items-center justify-center min-w-[70px] gap-2 group"
          >
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
              <category.icon className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
            </div>
            <span className="text-[10px] text-slate-600 font-medium tracking-tight">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
