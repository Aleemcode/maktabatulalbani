import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MagnifyingGlass, WhatsappLogo, Plus, Check } from '@phosphor-icons/react';
import { useCatalogue } from '../context/CatalogueContext';
import { useCart } from '../context/CartContext';
import { formatCurrency, createBookWhatsAppUrl } from '../lib/whatsapp';

export const Catalogue: React.FC = () => {
  const { books, categories, settings } = useCatalogue();
  const { addToCart, items } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategoryParam = searchParams.get('category') || 'all';
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const isBookInCart = (id: string) => items.some((item) => item.book.id === id);

  const languages = [
    { label: 'All', value: 'all' },
    { label: 'Arabic', value: 'Arabic' },
    { label: 'English', value: 'English' },
    { label: 'Bilingual', value: 'Bilingual' },
  ];

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Category filter
      if (activeCategoryParam !== 'all' && book.category_id !== activeCategoryParam) {
        return false;
      }
      // Language filter
      if (selectedLanguage !== 'all' && book.language !== selectedLanguage) {
        return false;
      }
      // Stock filter
      if (inStockOnly && !book.in_stock) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchTitle = book.title.toLowerCase().includes(query);
        const matchAuthor = book.author.toLowerCase().includes(query);
        const matchArabic = book.arabic_title?.toLowerCase().includes(query);
        const matchIsbn = book.isbn?.toLowerCase().includes(query);
        return matchTitle || matchAuthor || matchArabic || matchIsbn;
      }
      return true;
    });
  }, [books, activeCategoryParam, selectedLanguage, inStockOnly, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title & Description */}
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-widest text-[#C59E42] font-semibold">
          BothLife Centre & Library
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0C3934] font-serif-display">
          Book Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#5C6969] max-w-2xl leading-relaxed">
          Browse verified scholarly works, classical mutoon, and commentaries. Inquire and purchase directly via WhatsApp.
        </p>
      </div>

      {/* Bespoke Styled Filter & Search Control Panel */}
      <div className="bg-white rounded-3xl border border-[#E8E4D8] p-5 sm:p-6 space-y-5 shadow-xs">
        {/* Top Row: Search Input + Language Segmented Filter + Custom Stock Toggle */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          {/* Custom Search Input */}
          <div className="relative flex-1">
            <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C9898]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, author, or keyword..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-[#E8E4D8] bg-[#FBF9F4] text-xs sm:text-sm text-[#0C3934] placeholder:text-[#8C9898] focus:outline-none focus:border-[#0C3934] focus:ring-1 focus:ring-[#0C3934] transition-all"
            />
          </div>

          {/* Controls Cluster */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Custom Language Segmented Buttons */}
            <div className="flex items-center p-1 rounded-2xl bg-[#F6F2E9] border border-[#E8E4D8]">
              <span className="text-[11px] font-semibold text-[#5C6969] px-2.5 hidden sm:inline-block">
                Language:
              </span>
              <div className="flex items-center gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    type="button"
                    onClick={() => setSelectedLanguage(lang.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedLanguage === lang.value
                        ? 'bg-[#0C3934] text-white shadow-xs'
                        : 'text-[#5C6969] hover:text-[#0C3934]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bespoke Tactile In-Stock Toggle Pill */}
            <button
              type="button"
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all whitespace-nowrap cursor-pointer select-none ${
                inStockOnly
                  ? 'bg-[#0C3934] text-white border-[#0C3934] shadow-xs'
                  : 'bg-white text-[#5C6969] border-[#E8E4D8] hover:border-[#0C3934]'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                  inStockOnly
                    ? 'bg-[#C59E42] border-[#C59E42] text-white'
                    : 'bg-[#FBF9F4] border-[#D4D4D8]'
                }`}
              >
                {inStockOnly && <Check size={12} weight="bold" />}
              </span>
              <span>In Stock Only</span>
            </button>
          </div>
        </div>

        {/* Bottom Row: Category Pills Bar */}
        <div className="pt-4 border-t border-[#F6F2E9]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSearchParams({})}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors whitespace-nowrap ${
                activeCategoryParam === 'all'
                  ? 'bg-[#0C3934] text-white'
                  : 'bg-[#F6F2E9] text-[#5C6969] hover:text-[#0C3934]'
              }`}
            >
              All Categories ({books.length})
            </button>
            {categories.map((cat) => {
              const count = books.filter((b) => b.category_id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSearchParams({ category: cat.id })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors whitespace-nowrap ${
                    activeCategoryParam === cat.id
                      ? 'bg-[#0C3934] text-white'
                      : 'bg-[#F6F2E9] text-[#5C6969] hover:text-[#0C3934]'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#5C6969] px-1">
        <span>Showing {filteredBooks.length} of {books.length} titles</span>
      </div>

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8E4D8] p-12 text-center space-y-4">
          <p className="text-base font-bold text-[#0C3934]">No books match your selection</p>
          <p className="text-xs text-[#5C6969] max-w-sm mx-auto leading-relaxed">
            Try adjusting your search terms or filter selection. If you need a specific scholarly text not listed here, contact Abu Abdillah on WhatsApp.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedLanguage('all');
              setInStockOnly(false);
              setSearchParams({});
            }}
            className="px-5 py-2.5 rounded-xl bg-[#0C3934] text-xs font-semibold text-white hover:bg-[#0C5149] transition-colors whitespace-nowrap"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const inCart = isBookInCart(book.id);
            const price = formatCurrency(book.discount_price || book.price, settings.currency_symbol);
            const originalPrice = book.discount_price
              ? formatCurrency(book.price, settings.currency_symbol)
              : null;

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
                    {!book.in_stock && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0C3934]/90 text-white text-[10px] font-bold backdrop-blur-xs">
                        Pre-order
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
                      <span className="text-xs text-[#8C9898] line-through">{originalPrice}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(book)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap ${
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
                      className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-[#25D366] hover:bg-[#22c55e] text-white text-xs font-semibold transition-colors whitespace-nowrap"
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
      )}
    </div>
  );
};
