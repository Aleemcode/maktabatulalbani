import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, List, X, WhatsappLogo } from '@phosphor-icons/react';
import { useCatalogue } from '../../context/CatalogueContext';
import { useCart } from '../../context/CartContext';
import { createGeneralWhatsAppUrl } from '../../lib/whatsapp';

export const Navbar: React.FC = () => {
  const { settings } = useCatalogue();
  const { totalCount, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Catalogue', path: '/catalogue' },
    { name: "Jumu'ah Deals", path: '/jumuah-deals', badge: 'Friday Special' },
    { name: 'Reading Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F4]/95 backdrop-blur-md border-b border-[#E8E4D8]">
      {/* Announcement banner with BothLife pine & gold palette */}
      {settings.announcement_banner && (
        <div className="bg-[#0C3934] text-[#F7EEDB] text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 text-center font-medium tracking-wide border-b border-[#0C5149]">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59E42] shrink-0" />
            <span className="leading-tight">{settings.announcement_banner}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0 pr-1">
            <img
              src="/logo.svg"
              alt="Maktabah Imam Albani Emblem"
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105 shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-sm sm:text-base md:text-lg tracking-tight text-[#0C3934] leading-tight truncate">
                {settings.store_name}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] text-[#C59E42] font-semibold tracking-wide uppercase whitespace-nowrap leading-none mt-0.5">
                by BothLife Centre & Library
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 ${
                  isActive(link.path)
                    ? 'text-[#0C3934] font-bold'
                    : 'text-[#5C6969] hover:text-[#0C3934]'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#C59E42]/15 text-[#99772B] text-[9px] font-bold tracking-normal border border-[#C59E42]/30">
                    {link.badge}
                  </span>
                )}
                {isActive(link.path) && (
                  <span className="absolute -bottom-2.5 left-0 right-0 h-0.5 bg-[#C59E42] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTAs: Inquire Cart + WhatsApp Conversion CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Inquiry / Selection Bag */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-[#F6F2E9] text-[#0C3934] transition-colors cursor-pointer"
              aria-label="View selected books for inquiry"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-[#C59E42] text-white text-[9px] sm:text-[10px] font-bold w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-xs">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Contact CTA */}
            <a
              href={createGeneralWhatsAppUrl(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-[#0C3934] text-[#F7EEDB] text-xs font-semibold hover:bg-[#0C5149] transition-all shadow-xs border border-[#0C5149] whitespace-nowrap"
            >
              <WhatsappLogo size={18} weight="fill" className="text-[#25D366] shrink-0" />
              <span>Ask on WhatsApp</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg text-[#0C3934] hover:bg-[#F6F2E9] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E4D8] bg-[#FBF9F4] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold ${
                isActive(link.path)
                  ? 'bg-[#F6F2E9] text-[#0C3934]'
                  : 'text-[#5C6969]'
              }`}
            >
              <span>{link.name}</span>
              {link.badge && (
                <span className="px-2 py-0.5 rounded-full bg-[#C59E42]/20 text-[#99772B] text-[10px] font-bold">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
          <a
            href={createGeneralWhatsAppUrl(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full mt-4 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm shadow-sm whitespace-nowrap"
          >
            <WhatsappLogo size={20} weight="fill" className="text-white shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}
    </header>
  );
};
