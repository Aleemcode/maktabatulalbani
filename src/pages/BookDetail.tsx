import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Check, Plus, Share2 } from 'lucide-react';
import { useCatalogue } from '../context/CatalogueContext';
import { useCart } from '../context/CartContext';
import { formatCurrency, createBookWhatsAppUrl } from '../lib/whatsapp';

export const BookDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { books, categories, settings } = useCatalogue();
  const { addToCart, items } = useCart();
  const [copied, setCopied] = React.useState(false);

  const book = books.find((b) => b.slug === slug || b.id === slug);

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#18181B]">Book Not Found</h2>
        <p className="text-xs text-[#71717A]">The book you requested could not be located in our catalogue.</p>
        <Link to="/catalogue" className="inline-block px-4 py-2 rounded-xl bg-[#18181B] text-white text-xs font-semibold">
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === book.category_id);
  const relatedBooks = books
    .filter((b) => b.category_id === book.category_id && b.id !== book.id)
    .slice(0, 4);

  const inCart = items.some((item) => item.book.id === book.id);
  const price = formatCurrency(book.discount_price || book.price, settings.currency_symbol);
  const originalPrice = book.discount_price ? formatCurrency(book.price, settings.currency_symbol) : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#71717A] hover:text-[#18181B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to collection</span>
        </button>
      </div>

      {/* Main Book Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl border border-[#EFECE6] p-6 sm:p-10">
        {/* Cover Preview (Left 5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-[#F4F4F5] border border-[#EFECE6] shadow-xs">
            <img
              src={book.cover_image}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            {book.discount_price && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold shadow-xs">
                Special Offer
              </span>
            )}
          </div>

          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#EFECE6] bg-[#FDFCFB] hover:bg-[#F4F4F5] text-xs font-medium text-[#52525B] transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Link copied to clipboard!' : 'Share this title'}</span>
          </button>
        </div>

        {/* Book Specs & Conversion (Right 7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category tag */}
            {category && (
              <Link
                to={`/catalogue?category=${category.id}`}
                className="inline-block px-3 py-1 rounded-full bg-[#F4F4F5] text-[#52525B] text-xs font-medium hover:bg-[#E4E4E7]"
              >
                {category.name}
              </Link>
            )}

            {/* Titles */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] leading-tight font-serif-display">
              {book.title}
            </h1>

            {book.arabic_title && (
              <p className="text-lg font-arabic text-[#71717A] leading-relaxed">
                {book.arabic_title}
              </p>
            )}

            <p className="text-sm font-medium text-[#52525B]">
              Author:{' '}
              <span className="text-[#18181B] font-semibold">{book.author}</span>
            </p>

            {/* Price badge */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl sm:text-3xl font-bold text-[#18181B]">{price}</span>
              {originalPrice && (
                <span className="text-base text-[#A1A1AA] line-through">{originalPrice}</span>
              )}
              {book.in_stock ? (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  In Stock
                </span>
              ) : (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-semibold">
                  Pre-order / Special Request
                </span>
              )}
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-[#F4F4F5]">
              <h3 className="text-xs font-semibold text-[#18181B] uppercase tracking-wider mb-2">Synopsis & Overview</h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>

            {/* Specifications Matrix */}
            <div className="pt-4 border-t border-[#F4F4F5]">
              <h3 className="text-xs font-semibold text-[#18181B] uppercase tracking-wider mb-3">Book Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {book.publisher && (
                  <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#EFECE6]">
                    <span className="text-[#71717A] block text-[10px]">Publisher</span>
                    <span className="font-semibold text-[#18181B]">{book.publisher}</span>
                  </div>
                )}
                {book.binding && (
                  <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#EFECE6]">
                    <span className="text-[#71717A] block text-[10px]">Binding</span>
                    <span className="font-semibold text-[#18181B]">{book.binding}</span>
                  </div>
                )}
                <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#EFECE6]">
                  <span className="text-[#71717A] block text-[10px]">Language</span>
                  <span className="font-semibold text-[#18181B]">{book.language}</span>
                </div>
                {book.pages && (
                  <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#EFECE6]">
                    <span className="text-[#71717A] block text-[10px]">Pages</span>
                    <span className="font-semibold text-[#18181B]">{book.pages}</span>
                  </div>
                )}
                {book.isbn && (
                  <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#EFECE6]">
                    <span className="text-[#71717A] block text-[10px]">ISBN</span>
                    <span className="font-semibold text-[#18181B] font-mono text-[11px]">{book.isbn}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Primary Conversion CTAs */}
          <div className="space-y-3 pt-6 border-t border-[#EFECE6]">
            {/* WhatsApp direct order */}
            <a
              href={createBookWhatsAppUrl(book, settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#22c55e] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all active:scale-98"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              <span>Order / Inquire for this Copy on WhatsApp</span>
            </a>

            {/* Add to multi-selection inquiry */}
            <button
              onClick={() => addToCart(book)}
              className={`w-full py-3 px-6 rounded-2xl text-xs sm:text-sm font-semibold border flex items-center justify-center gap-2 transition-all ${
                inCart
                  ? 'bg-[#F4F4F5] border-[#D4D4D8] text-[#18181B]'
                  : 'bg-white border-[#E4E4E7] hover:border-[#18181B] text-[#18181B]'
              }`}
            >
              {inCart ? <Check className="w-4 h-4 text-emerald-600" /> : <Plus className="w-4 h-4" />}
              <span>{inCart ? 'Added to Selection Bag' : 'Add to Multi-Book WhatsApp Inquiry'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-[#18181B]">More from this Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedBooks.map((rel) => (
              <Link
                key={rel.id}
                to={`/book/${rel.slug}`}
                className="group bg-white rounded-2xl border border-[#EFECE6] p-3 hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-3/4 rounded-xl overflow-hidden bg-[#F4F4F5] mb-3">
                    <img src={rel.cover_image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="text-xs font-bold text-[#18181B] group-hover:text-amber-800 line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-[11px] text-[#71717A] mt-1">{rel.author}</p>
                </div>
                <div className="pt-2 mt-2 border-t border-[#F4F4F5]">
                  <span className="text-xs font-bold text-[#18181B]">
                    {formatCurrency(rel.discount_price || rel.price, settings.currency_symbol)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
