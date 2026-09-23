import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Lock, Percent, WhatsappLogo } from '@phosphor-icons/react';
import { useCatalogue } from '../../context/CatalogueContext';
import { createGeneralWhatsAppUrl } from '../../lib/whatsapp';

export const Footer: React.FC = () => {
  const { settings, categories } = useCatalogue();

  return (
    <footer className="relative overflow-hidden bg-[#0C3934] text-zinc-300 pt-16 pb-12 border-t border-[#0C5149]">
      {/* Large Subtle Logo Watermark on the Right-hand Side */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none select-none translate-x-12 translate-y-12 sm:translate-x-16 sm:translate-y-8 opacity-[0.045] mix-blend-screen"
        aria-hidden="true"
      >
        <img
          src="/logo.svg"
          alt=""
          className="w-[450px] sm:w-[580px] lg:w-[680px] h-auto object-contain filter invert"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[#0C5149]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0C5149] border border-[#0C5149]/80 flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#C59E42]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Authentic Scholarly Sourcing</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Strictly verified Islamic literature upon Quran & Sunnah</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0C5149] border border-[#0C5149]/80 flex items-center justify-center text-white shrink-0">
              <Truck className="w-6 h-6 text-[#C59E42]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Reliable Delivery Across Nigeria</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Safely dispatched from BothLife Centre and Library</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0C5149] border border-[#0C5149]/80 flex items-center justify-center text-white shrink-0">
              <Percent className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Weekly Jumu'ah Deals</h4>
              <p className="text-xs text-zinc-400 mt-0.5">10% of profits support Zādut-Tālib Trust</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Maktabah Logo" className="w-10 h-10 object-contain filter invert shrink-0" />
              <div>
                <span className="text-white font-bold text-base block leading-tight">{settings.store_name}</span>
                <span className="text-[#C59E42] text-[10.5px] sm:text-[11px] font-semibold tracking-wider uppercase block whitespace-nowrap">by BothLife Centre & Library</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              {settings.about_text?.slice(0, 160)}...
            </p>
            <div className="pt-2">
              <a
                href={createGeneralWhatsAppUrl(settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0C5149] hover:bg-[#0C5149]/80 text-white text-xs font-semibold transition-colors border border-emerald-800/40 whitespace-nowrap shadow-xs"
              >
                <WhatsappLogo size={18} weight="fill" className="text-[#25D366] shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
              <p className="text-[11px] text-[#C59E42] mt-1.5 font-medium">
                Abu Abdillah: +234 912 416 1597
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-wider font-bold mb-4 text-[#C59E42]">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/catalogue" className="hover:text-white transition-colors">Book Catalogue</Link>
              </li>
              <li>
                <Link to="/jumuah-deals" className="text-[#F7EEDB] font-semibold hover:text-white flex items-center gap-1 transition-colors">
                  <span>Jumu'ah Deals</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#C59E42] text-black text-[9px] font-bold">Special</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">Reading Guidance & Essays</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About BothLife & Maktabah</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-400">
                  <Lock className="w-3 h-3 text-[#C59E42]" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-wider font-bold mb-4 text-[#C59E42]">Collections</h4>
            <ul className="space-y-2.5 text-xs">
              {categories.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <Link to={`/catalogue?category=${cat.id}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels from Flyer */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-wider font-bold mb-4 text-[#C59E42]">BothLife Community</h4>
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              Follow BothLife Centre and Library across social media for daily reminders, book announcements, and Friday specials.
            </p>
            <div className="space-y-1.5 text-xs text-zinc-400">
              <p className="font-semibold text-white">BothLife Centre and Library</p>
              <p className="text-[11px]">Instagram • Facebook • X • Telegram</p>
              <p className="text-[11px] text-[#C59E42] font-mono">+234 912 416 1597</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#0C5149] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {settings.store_name}. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1 flex-wrap">
            <span>Official initiative of</span>
            <strong className="text-white font-semibold whitespace-nowrap">BothLife Centre and Library</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};
