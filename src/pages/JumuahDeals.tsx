import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle,
  Percent,
  Truck,
  CreditCard,
  WhatsappLogo,
  Question,
  ShieldCheck,
  Plus,
  Check,
  ArrowRight
} from '@phosphor-icons/react';
import { useCatalogue } from '../context/CatalogueContext';
import { useCart } from '../context/CartContext';
import { formatCurrency, createBookWhatsAppUrl, sanitizeWhatsAppNumber } from '../lib/whatsapp';

export const JumuahDeals: React.FC = () => {
  const { books, settings } = useCatalogue();
  const { addToCart, items } = useCart();

  const isBookInCart = (id: string) => items.some((item) => item.book.id === id);

  const perks = [
    { title: 'Quality Books', desc: 'Authentic publications from trusted Islamic publishing houses', icon: ShieldCheck },
    { title: 'Reliable Authors', desc: 'Verified scholarship upon the Quran and authentic Sunnah', icon: CheckCircle },
    { title: 'Pocket-Friendly Prices', desc: 'Special reduced prices negotiated for students of knowledge', icon: Percent },
    { title: 'Instalment Payment', desc: 'Flexible payment arrangements available for bulk student purchases', icon: CreditCard },
    { title: 'Discounted Delivery', desc: 'Reduced delivery rates to your doorstep across Nigeria', icon: Truck },
    { title: 'Customer Guide & Support', desc: 'Consultative guidance to help build your personal study curriculum', icon: Question },
  ];

  const handleGeneralDealWhatsApp = () => {
    const phone = sanitizeWhatsAppNumber(settings.whatsapp_number);
    const text = encodeURIComponent(
      `*Assalamu Alaykum Abu Abdillah Al-Badr,*\n\nI am contacting you regarding the *Jumu'ah Deals* from Maktabah Imam Albani / BothLife Centre.\n\nPlease share the available titles and bundle offers for this week's Jumu'ah special.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Showcase with BothLife Brand Palette */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#0C3934] text-white p-6 sm:p-12 lg:p-14 border border-[#0C5149] shadow-xl">
          {/* Subtle Decorative Arch Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0C5149]/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C59E42]/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

          {/* BothLife Logo Watermark in Background */}
          <div 
            className="absolute right-0 lg:right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.055] select-none mix-blend-screen translate-x-8 sm:translate-x-4"
            aria-hidden="true"
          >
            <img
              src="/logo.svg"
              alt=""
              className="w-[360px] sm:w-[480px] lg:w-[560px] h-auto object-contain filter invert"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Information & Conversion */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Reward Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C59E42]/20 border border-[#C59E42]/50 text-xs font-semibold text-[#F7EEDB]">
                <Percent className="w-3.5 h-3.5 text-[#C59E42]" />
                <span>10% of all profits go directly to Zādut-Tālib Trust</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <span className="block text-xs uppercase tracking-widest text-[#C59E42] font-semibold">
                  BothLife Centre and Library Presents
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-display tracking-tight text-white leading-tight">
                  Jumu'ah <span className="text-[#C59E42]">Deals</span>
                </h1>
                <p className="text-sm sm:text-base font-medium text-emerald-100 tracking-wide">
                  HAPPENING EVERY FRIDAY — AFTER JUMU'AH
                </p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                Take advantage of our exclusive Friday bookstore specials. Whether you are assembling a home library, stocking mutoon for memorization, or gifting authentic Islamic literature, our weekly Jumu'ah Deals offer unbeatable value.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleGeneralDealWhatsApp}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#22c55e] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-98 whitespace-nowrap"
                >
                  <WhatsappLogo size={18} weight="fill" className="text-white shrink-0" />
                  <span>Chat with Abu Abdillah</span>
                </button>

                <a
                  href="/jumuah-deals-flyer.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition-colors whitespace-nowrap"
                >
                  <span>View Official Flyer</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Column: Engaging Books Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
              <div className="relative w-full max-w-xs sm:max-w-sm flex items-center justify-center py-6">
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-radial from-[#C59E42]/20 via-transparent to-transparent blur-2xl pointer-events-none" />

                {/* Left Angled Book */}
                <div className="absolute left-2 sm:left-4 z-10 -rotate-8 -translate-y-2 hover:-rotate-4 transition-all duration-300 w-28 sm:w-36 aspect-3/4 rounded-xl overflow-hidden shadow-2xl border border-white/15 bg-[#0C3934]">
                  <img
                    src="/books/al-mumti-ajrumiyyah.jpg"
                    alt="الممتع في شرح الآجرّوميّة"
                    className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Right Angled Book */}
                <div className="absolute right-2 sm:right-4 z-10 rotate-8 -translate-y-1 hover:rotate-4 transition-all duration-300 w-28 sm:w-36 aspect-3/4 rounded-xl overflow-hidden shadow-2xl border border-white/15 bg-[#0C3934]">
                  <img
                    src="/books/al-mahajjah-al-bayda.jpg"
                    alt="المحجة البيضاء"
                    className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Center Foreground Hero Book */}
                <div className="relative z-20 w-36 sm:w-44 aspect-3/4 rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.8)] border-2 border-[#C59E42] bg-[#0C3934] transform hover:scale-105 transition-transform duration-300 group">
                  <img
                    src="/books/at-tibyan-an-nawawi.jpg"
                    alt="التبيان في آداب حملة القرآن"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#C59E42] text-[#0C3934] text-[9px] sm:text-[10px] font-bold shadow-xs">
                    Featured
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C3934]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-center">
                    <span className="text-[11px] font-bold text-white leading-tight">التبيان للإمام النووي</span>
                    <span className="text-[10px] text-[#C59E42] font-semibold">₦3,500</span>
                  </div>
                </div>

                {/* Floating Bottom Trust Label */}
                <div className="absolute -bottom-2 z-30 px-3.5 py-1.5 rounded-full bg-[#0C3934]/95 border border-[#C59E42]/80 shadow-lg text-[11px] font-semibold text-[#F7EEDB] flex items-center gap-1.5 backdrop-blur-xs whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <span>Curated Jumu'ah Special Copies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-[#C59E42] uppercase tracking-wider">
            Curated Value & Student Support
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0C3934] font-serif-display">
            What You Get With Every Jumu'ah Deal
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-[#E8E4D8] hover:border-[#C59E42] transition-colors space-y-3 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F6F2E9] border border-[#E8E4D8] flex items-center justify-center text-[#0C3934]">
                  <Icon className="w-5 h-5 text-[#0C5149]" />
                </div>
                <h3 className="text-sm font-bold text-[#0C3934]">{perk.title}</h3>
                <p className="text-xs text-[#5C6969] leading-relaxed">{perk.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Jumu'ah Deals Titles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0C3934] font-serif-display">
              Featured Friday Selections
            </h2>
            <p className="text-xs text-[#5C6969] mt-0.5">
              Authentic copies available for instant order closure via WhatsApp
            </p>
          </div>
          <Link
            to="/catalogue"
            className="text-xs font-semibold text-[#0C5149] hover:text-[#0C3934] flex items-center gap-1"
          >
            <span>Browse entire collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.slice(0, 5).map((book) => {
            const inCart = isBookInCart(book.id);
            const price = formatCurrency(book.discount_price || book.price, settings.currency_symbol);

            return (
              <div
                key={book.id}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-[#E8E4D8] p-4 hover:shadow-md transition-all"
              >
                <div>
                  <Link
                    to={`/book/${book.slug}`}
                    className="block relative aspect-3/4 rounded-xl overflow-hidden bg-[#F6F2E9] mb-4"
                  >
                    <img
                      src={book.cover_image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#C59E42] text-white text-[10px] font-bold shadow-xs">
                      Jumu'ah Special
                    </span>
                  </Link>

                  <div className="space-y-1">
                    <p className="text-[11px] font-medium text-[#C59E42] uppercase tracking-wider">
                      {book.language} • {book.binding || 'Book'}
                    </p>
                    <Link to={`/book/${book.slug}`}>
                      <h3 className="text-sm font-bold text-[#0C3934] group-hover:text-[#0C5149] transition-colors line-clamp-2">
                        {book.title}
                      </h3>
                    </Link>
                    {book.arabic_title && (
                      <p className="text-xs font-arabic text-[#5C6969] line-clamp-1">
                        {book.arabic_title}
                      </p>
                    )}
                    <p className="text-xs text-[#5C6969] line-clamp-1">{book.author}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F6F2E9] mt-4 space-y-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-[#0C3934]">{price}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(book)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium border transition-colors ${
                        inCart
                          ? 'bg-[#F6F2E9] border-[#C59E42] text-[#0C3934]'
                          : 'border-[#E8E4D8] hover:border-[#0C3934] text-[#0C3934]'
                      }`}
                    >
                      {inCart ? <Check size={14} weight="bold" className="text-[#0C5149]" /> : <Plus size={14} weight="bold" />}
                      <span>{inCart ? 'Selected' : 'Select'}</span>
                    </button>

                    <a
                      href={createBookWhatsAppUrl(book, settings)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#25D366] hover:bg-[#22c55e] text-white text-xs font-semibold transition-colors"
                    >
                      <WhatsappLogo size={16} weight="fill" className="text-white" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Official Bookseller Contact Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0C3934] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#0C5149]">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Have Questions About Jumu'ah Deals?</h3>
            <p className="text-xs text-zinc-300">
              Speak directly with our dedicated bookseller: <strong className="text-[#C59E42]">Abu Abdillah Al-Badr</strong>
            </p>
          </div>

          <a
            href="https://wa.me/2349124161597?text=Assalamu%20Alaykum%20Abu%20Abdillah%20Al-Badr%2C%20I%20am%20inquiring%20about%20the%20Jumu%27ah%20Deals."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#22c55e] text-white text-xs font-bold transition-all shrink-0 whitespace-nowrap"
          >
            <WhatsappLogo size={18} weight="fill" className="text-white shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};
