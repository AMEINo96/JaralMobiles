import { client } from '@/sanity/lib/client';
import { getServicesQuery, getStoreSettingsQuery } from '@/sanity/lib/queries';
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
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

export const revalidate = 60;

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

export default async function ServicesPage() {
  const [services, storeSettings] = await Promise.all([
    client.fetch(getServicesQuery),
    client.fetch(getStoreSettingsQuery)
  ]);

  const defaultWhatsapp = "+923154883812";
  const whatsappNumber = storeSettings?.whatsappNumber || defaultWhatsapp;
  const formattedNumber = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Digital & In-Store Services
          </h1>
          <p className="text-slate-600 text-base sm:text-lg">
            Beyond physical products, we offer a range of instant digital and in-store services. 
            Tap any service to request it instantly via WhatsApp!
          </p>
        </div>

        {(!services || services.length === 0) ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">No services available right now</h3>
            <p className="text-slate-500 mt-2">Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any) => {
              const IconComponent = service.iconName ? iconMap[service.iconName as string] || FileText : FileText;
              const waMsg = encodeURIComponent(service.whatsappMessage || `Hi, I am interested in your ${service.title} service.`);
              const waLink = `https://wa.me/${formattedNumber}?text=${waMsg}`;
              const hasImage = !!service.image;

              return (
                <a 
                  key={service._id}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-6 transition-all duration-300 flex flex-col items-start shadow-sm hover:shadow-md"
                >
                  {hasImage ? (
                    <div className="w-16 h-16 rounded-xl overflow-hidden mb-5 bg-slate-100 flex-shrink-0 border border-slate-200">
                      <Image 
                        src={urlForImage(service.image).width(128).height(128).url()} 
                        alt={service.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-8 h-8" />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">{service.description}</p>
                  
                  <div className="mt-auto w-full flex items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white font-semibold py-3 rounded-xl transition-colors duration-300">
                    <MessageCircle className="w-5 h-5" />
                    Request on WhatsApp
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
