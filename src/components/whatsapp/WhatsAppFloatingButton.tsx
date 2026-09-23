import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';
import { createGeneralWhatsAppUrl } from '../../lib/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings } = useCatalogue();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 bg-[#18181B] text-white text-xs font-medium rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Chat with our bookseller
      </span>

      {/* WhatsApp Action Button */}
      <a
        href={createGeneralWhatsAppUrl(settings)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct inquiry on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
      </a>
    </div>
  );
};
