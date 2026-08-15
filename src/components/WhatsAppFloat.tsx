'use client';

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
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.764.463 3.491 1.341 5.01L2 22l5.127-1.343c1.472.825 3.136 1.258 4.904 1.258 5.542 0 10.031-4.49 10.031-10.031C22.062 6.49 17.573 2 12.031 2zm0 18.232c-1.503 0-2.977-.394-4.281-1.14l-.307-.182-3.18.832.846-3.1-1.2-1.905c-.86-1.365-1.314-2.951-1.314-4.606 0-4.647 3.784-8.431 8.436-8.431 4.653 0 8.438 3.784 8.438 8.431 0 4.647-3.785 8.431-8.438 8.431zM16.666 14.157c-.254-.127-1.504-.741-1.737-.826-.233-.085-.403-.127-.571.127-.17.254-.658.826-.806.994-.148.169-.297.19-.551.063-2.029-.987-3.327-2.73-3.719-3.411-.148-.255.148-.254.398-.755.085-.17.042-.319-.021-.446-.063-.127-.571-1.378-.782-1.888-.207-.497-.417-.43-.571-.438-.148-.008-.318-.008-.487-.008s-.445.064-.678.318c-.233.254-.89 .87-.89 2.12 0 1.251.91 2.463 1.037 2.632.127.169 1.79 2.732 4.332 3.829 1.488.643 2.189.721 2.946.6.611-.097 1.504-.615 1.716-1.209.212-.594.212-1.103.148-1.209-.063-.106-.233-.17-.487-.297z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
