import { client } from '@/sanity/lib/client';
import { getServicesQuery, getStoreSettingsQuery } from '@/sanity/lib/queries';
import { 
  Printer, 
  Camera, 
  Smartphone, 
  FileText, 
  Image as ImageIcon, 
  Wifi, 
  CreditCard, 
  Download, 
  Monitor, 
  Scissors,
  MessageCircle
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  printer: Printer,
  camera: Camera,
  smartphone: Smartphone,
  'file-text': FileText,
  image: ImageIcon,
  wifi: Wifi,
  'credit-card': CreditCard,
  download: Download,
  monitor: Monitor,
  scissors: Scissors,
};

export default async function ServicesSection() {
  const [services, storeSettings] = await Promise.all([
    client.fetch(getServicesQuery),
    client.fetch(getStoreSettingsQuery)
  ]);

  if (!services || services.length === 0) {
    return null;
  }

  const defaultWhatsapp = "+923154883812";
  const whatsappNumber = storeSettings?.whatsappNumber || defaultWhatsapp;
  const formattedNumber = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section className="bg-slate-900 py-16 md:py-24 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            Digital & In-Store Services
          </h2>
          <p className="text-slate-400 text-sm md:text-base">
            Beyond physical products, we offer a range of instant digital and in-store services. 
            Tap any service to request it instantly via WhatsApp!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any) => {
            const IconComponent = service.iconName ? iconMap[service.iconName as string] || FileText : FileText;
            const waMsg = encodeURIComponent(service.whatsappMessage || `Hi, I am interested in your ${service.title} service.`);
            const waLink = `https://wa.me/${formattedNumber}?text=${waMsg}`;

            return (
              <a 
                key={service._id}
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{service.description}</p>
                
                <div className="mt-auto w-full flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white font-medium py-2.5 rounded-xl transition-colors duration-300">
                  <MessageCircle className="w-4 h-4" />
                  Request on WhatsApp
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
