import React from 'react';
import { ShieldCheck, BookOpen, MessageCircle } from 'lucide-react';
import { useCatalogue } from '../context/CatalogueContext';
import { createGeneralWhatsAppUrl } from '../lib/whatsapp';

export const About: React.FC = () => {
  const { settings } = useCatalogue();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Brand Profile Banner */}
      <div className="bg-white rounded-3xl border border-[#EFECE6] p-8 sm:p-12 text-center flex flex-col items-center space-y-4">
        <img src="/logo.svg" alt="Maktabah Emblem" className="w-28 h-28 object-contain" />
        <h1 className="text-3xl font-bold text-[#18181B] font-serif-display">
          Maktabah Imam Albani
        </h1>
        <p className="text-xs font-semibold text-[#71717A] tracking-wider uppercase">
          An Authentic Literature Initiative by BothLife
        </p>
        <p className="text-sm text-[#52525B] max-w-xl leading-relaxed">
          {settings.about_text}
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#EFECE6] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#EFECE6] flex items-center justify-center text-[#18181B]">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-sm font-bold text-[#18181B]">Authentic Sourcing</h3>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Strict commitment to texts anchored in the Quran, verified Sunnah, and the classical methodology of the Salaf.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EFECE6] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#EFECE6] flex items-center justify-center text-[#18181B]">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-sm font-bold text-[#18181B]">Reader Empowerment</h3>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Fostering true reading discipline, library cultivation, and student of knowledge guidance.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#EFECE6] space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#EFECE6] flex items-center justify-center text-[#18181B]">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
          </div>
          <h3 className="text-sm font-bold text-[#18181B]">Personalized Service</h3>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Direct consultative book selection and reliable order fulfillment right through WhatsApp.
          </p>
        </div>
      </div>

      {/* Direct Contact CTA */}
      <div className="p-8 rounded-3xl bg-[#FAF9F6] border border-[#EFECE6] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-[#18181B]">Speak with our Head Bookseller</h3>
          <p className="text-xs text-[#71717A] mt-1">Have questions about book editions, translations, or volume sets?</p>
        </div>
        <a
          href={createGeneralWhatsAppUrl(settings)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#22c55e] transition-colors shrink-0 shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Message on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
