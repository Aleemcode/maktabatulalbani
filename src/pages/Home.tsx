import React from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, ArrowRight, WhatsappLogo, Sparkle, Plus, Check, Percent } from '@phosphor-icons/react';
import { useCatalogue } from '../context/CatalogueContext';
import { useCart } from '../context/CartContext';
import { formatCurrency, createBookWhatsAppUrl, createGeneralWhatsAppUrl } from '../lib/whatsapp';

export const Home: React.FC = () => {
  const { books, categories, posts, settings, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCatalogue();
  const { addToCart, items } = useCart();

  const featuredBooks = books.filter(b => b.featured);
  const latestPosts = posts.filter(p => p.published).slice(0, 3);

  const isBookInCart = (id: string) => items.some(item => item.book.id === id);

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E8E4D8] bg-white p-5 sm:p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 shadow-xs">
          <div className="space-y-5 sm:space-y-6 max-w-2xl w-full">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#F6F2E9] border border-[#E8E4D8] text-[10px] sm:text-xs font-semibold text-[#0C3934] max-w-full">
              <Sparkle size={14} weight="fill" className="text-[#C59E42] shrink-0" />
              <span className="truncate">BothLife Centre & Library • Official Catalogue</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0C3934] leading-tight font-serif-display">
              Curated Scholarly Works & Essential Islamic Literature
            </h1>

            <p className="text-sm sm:text-lg text-[#5C6969] leading-relaxed">
              Explore authentic classical texts, the seminal works of Imam al-Albani, and essential study guides for students of knowledge. Inquire and purchase directly via WhatsApp.
            </p>

            {/* Search Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <div className="relative flex-1">
                <MagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title, author, or keyword (e.g. Albani, Hadith)..."
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-[#E8E4D8] bg-[#FBF9F4] text-xs sm:text-sm text-[#0C3934] focus:outline-none focus:ring-2 focus:ring-[#0C3934]/10"
                />
              </div>
              <Link
                to="/catalogue"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-[#0C3934] text-white font-semibold text-xs sm:text-sm hover:bg-[#0C5149] transition-all shadow-xs whitespace-nowrap"
              >
                <span>Browse All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero Emblem Showcase */}
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-[#F6F2E9] rounded-3xl border border-[#E8E4D8] shrink-0 w-full lg:w-auto">
            <img src="/logo.svg" alt="Maktabah Emblem" className="w-28 h-28 sm:w-40 sm:h-40 object-contain" />
            <span className="font-arabic text-lg sm:text-xl font-bold mt-3 sm:mt-4 text-[#0C3934]">مكتبة الإمام الألباني</span>
            <span className="text-[10px] sm:text-xs text-[#C59E42] mt-1 font-semibold tracking-wider uppercase whitespace-nowrap">by BothLife Centre & Library</span>
          </div>
        </div>
      </section>

      {/* Jumu'ah Deals Feature Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0C3934] border border-[#0C5149] p-5 sm:p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
          {/* Subtle Logo Watermark */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.05] select-none mix-blend-screen translate-x-12"
            aria-hidden="true"
          >
            <img
              src="/logo.svg"
              alt=""
              className="w-[320px] sm:w-[400px] h-auto object-contain filter invert"
            />
          </div>

          <div className="space-y-2 text-center md:text-left z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C59E42]/20 border border-[#C59E42]/40 text-[10px] sm:text-xs font-semibold text-[#F7EEDB] whitespace-nowrap">
              <Percent className="w-3.5 h-3.5 text-[#C59E42] shrink-0" />
              <span>Happening Every Friday — After Jumu'ah</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-display text-white">
              Friday <span className="text-[#C59E42]">Jumu'ah Deals</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              10% of all profits go directly to Zādut-Tālib Trust. Enjoy pocket-friendly prices, instalment options, and discounted delivery across Nigeria.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 z-10 w-full sm:w-auto">
            {/* Mini Book Stack Preview */}
            <div className="hidden lg:flex items-center -space-x-3">
              <img
                src="/books/al-mumti-ajrumiyyah.jpg"
                alt="Book preview"
                className="w-12 h-16 object-cover rounded-md border border-white/20 -rotate-6 shadow-md"
              />
              <img
                src="/books/at-tibyan-an-nawawi.jpg"
                alt="Book preview"
                className="w-14 h-18 object-cover rounded-md border border-[#C59E42] shadow-lg z-10"
              />
              <img
                src="/books/al-mahajjah-al-bayda.jpg"
                alt="Book preview"
                className="w-12 h-16 object-cover rounded-md border border-white/20 rotate-6 shadow-md"
              />
            </div>

            <Link
              to="/jumuah-deals"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C59E42] hover:bg-[#b89a4f] text-[#0C3934] text-xs font-bold transition-all shadow-sm whitespace-nowrap"
            >
              <span>Explore Jumu'ah Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-[#0C3934]">Browse Collections</h2>
          <Link to="/catalogue" className="text-xs font-semibold text-[#C59E42] hover:text-[#0C3934] flex items-center gap-1">
            <span>View all categories</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-colors ${
              selectedCategory === null
                ? 'bg-[#0C3934] text-white'
                : 'bg-white border border-[#E8E4D8] text-[#5C6969] hover:border-[#0C3934]'
            }`}
          >
            All Collections
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#0C3934] text-white'
                  : 'bg-white border border-[#E8E4D8] text-[#5C6969] hover:border-[#0C3934]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Books Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0C3934] font-serif-display">Available In Stock Titles</h2>
            <p className="text-xs text-[#5C6969] mt-0.5">Handpicked scholarly works and foundational references</p>
          </div>
          <Link to="/catalogue" className="text-xs font-semibold text-[#0C5149] hover:text-[#0C3934] flex items-center gap-1">
            <span>See entire catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => {
            const inCart = isBookInCart(book.id);
            const price = formatCurrency(book.discount_price || book.price, settings.currency_symbol);
            const originalPrice = book.discount_price ? formatCurrency(book.price, settings.currency_symbol) : null;

            return (
              <div
                key={book.id}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-[#E8E4D8] p-4 hover:shadow-md transition-all"
              >
                <div>
                  <Link to={`/book/${book.slug}`} className="block relative aspect-3/4 rounded-xl overflow-hidden bg-[#F6F2E9] mb-4">
                    <img
                      src={book.cover_image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {book.discount_price && (
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md bg-[#C59E42] text-white text-[10px] font-bold shadow-xs">
                        Special Offer
                      </span>
                    )}
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
                    {originalPrice && (
                      <span className="text-xs text-[#A1A1AA] line-through">{originalPrice}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(book)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-1.5 sm:px-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap cursor-pointer ${
                        inCart
                          ? 'bg-[#F6F2E9] border-[#C59E42] text-[#0C3934]'
                          : 'border-[#E8E4D8] hover:border-[#0C3934] text-[#0C3934]'
                      }`}
                    >
                      {inCart ? <Check size={14} weight="bold" className="text-[#0C5149] shrink-0" /> : <Plus size={14} weight="bold" className="shrink-0" />}
                      <span className="truncate">{inCart ? 'Selected' : 'Select'}</span>
                    </button>

                    <a
                      href={createBookWhatsAppUrl(book, settings)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-1.5 sm:px-2 rounded-lg bg-[#25D366] hover:bg-[#22c55e] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <WhatsappLogo size={16} weight="fill" className="text-white shrink-0" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Reader Guidance & Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0C3934] font-serif-display">Reader Guidance & Insights</h2>
            <p className="text-xs text-[#5C6969] mt-0.5">Reflections on books, scholarly methodology, and cultivating a reading life</p>
          </div>
          <Link to="/blog" className="text-xs font-semibold text-[#0C5149] hover:text-[#0C3934] flex items-center gap-1">
            <span>Read all articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl border border-[#E8E4D8] p-6 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#5C6969]">
                  <span className="font-semibold text-[#0C3934]">{post.read_time}</span>
                  <span>•</span>
                  <span>{post.tags[0]}</span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-bold text-[#0C3934] group-hover:text-[#0C5149] transition-colors leading-snug">
                    {post.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-[#5C6969] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F6F2E9] mt-4 flex items-center justify-between">
                <span className="text-xs text-[#5C6969]">{post.author}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-[#0C3934] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Continue reading</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WhatsApp Direct Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0C3934] text-white rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center space-y-4 border border-[#0C5149] shadow-md">
          <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
            <WhatsappLogo size={28} weight="fill" className="text-[#25D366]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-display max-w-xl">
            Looking for a specific title or need student recommendations?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-md leading-relaxed">
            Contact <strong className="text-[#C59E42]">Abu Abdillah Al-Badr</strong> directly on WhatsApp for edition inquiries, book recommendations, and fast dispatch across Nigeria.
          </p>
          <a
            href={createGeneralWhatsAppUrl(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#22c55e] text-white font-bold text-xs sm:text-sm transition-all shadow-md mt-2 whitespace-nowrap"
          >
            <WhatsappLogo size={18} weight="fill" className="text-white shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
          <p className="text-[11px] text-[#C59E42] font-semibold">
            Abu Abdillah: +234 912 416 1597
          </p>
        </div>
      </section>
    </div>
  );
};
