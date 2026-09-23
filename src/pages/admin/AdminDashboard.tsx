import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, MessageCircle, AlertTriangle, Plus, ExternalLink } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';
import { formatCurrency, createGeneralWhatsAppUrl } from '../../lib/whatsapp';

export const AdminDashboard: React.FC = () => {
  const { books, posts, settings } = useCatalogue();

  const outOfStockCount = books.filter((b) => !b.in_stock).length;
  const publishedPostsCount = posts.filter((p) => p.published).length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#0C3934]">Store Overview</h1>
          <p className="text-xs text-[#5C6969] mt-0.5">Summary of your catalogue inventory, blog activity, and conversion channels.</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/books/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0C3934] hover:bg-[#0C5149] text-white text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 text-[#C59E42]" />
            <span>Add Book</span>
          </Link>
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#E8E4D8] text-[#0C3934] text-xs font-semibold hover:border-[#0C3934] transition-colors whitespace-nowrap shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Books */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4D8] space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-[#5C6969]">
            <span className="text-xs font-medium">Catalogue Volumes</span>
            <div className="w-8 h-8 rounded-lg bg-[#F6F2E9] flex items-center justify-center text-[#0C3934]">
              <BookOpen className="w-4 h-4 text-[#0C5149]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0C3934]">{books.length}</p>
          <p className="text-[11px] text-[#5C6969]">Active catalogue items</p>
        </div>

        {/* Out of stock */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4D8] space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-[#5C6969]">
            <span className="text-xs font-medium">Pre-order / Special Request</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0C3934]">{outOfStockCount}</p>
          <p className="text-[11px] text-[#5C6969]">Items awaiting stock</p>
        </div>

        {/* Blog Posts */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4D8] space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-[#5C6969]">
            <span className="text-xs font-medium">Published Essays</span>
            <div className="w-8 h-8 rounded-lg bg-[#F6F2E9] flex items-center justify-center text-[#0C3934]">
              <FileText className="w-4 h-4 text-[#C59E42]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0C3934]">{publishedPostsCount}</p>
          <p className="text-[11px] text-[#5C6969]">{posts.length} total drafts & articles</p>
        </div>

        {/* WhatsApp Conversion Channel */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4D8] space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-[#5C6969]">
            <span className="text-xs font-medium">WhatsApp Destination</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </div>
          </div>
          <p className="text-sm font-bold text-[#0C3934] truncate">+{settings.whatsapp_number}</p>
          <a
            href={createGeneralWhatsAppUrl(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#0C5149] font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>Test Chat Trigger</span>
            <ExternalLink className="w-3 h-3 text-[#C59E42]" />
          </a>
        </div>
      </div>

      {/* Recent Books */}
      <div className="bg-white rounded-2xl border border-[#E8E4D8] p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#F6F2E9]">
          <h2 className="text-sm font-bold text-[#0C3934]">Recently Added Titles</h2>
          <Link to="/admin/books" className="text-xs text-[#C59E42] hover:text-[#0C3934] font-semibold">
            View all ({books.length})
          </Link>
        </div>

        <div className="divide-y divide-[#F6F2E9]">
          {books.slice(0, 5).map((book) => (
            <div key={book.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-10 h-14 object-cover rounded-lg bg-[#F6F2E9] border border-[#E8E4D8] shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-[#0C3934] truncate">{book.title}</h3>
                  <p className="text-[11px] text-[#5C6969] truncate">{book.author}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-bold text-[#0C3934]">
                  {formatCurrency(book.discount_price || book.price, settings.currency_symbol)}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    book.in_stock ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-zinc-100 text-zinc-600'
                  }`}
                >
                  {book.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
                <Link
                  to={`/admin/books/edit/${book.id}`}
                  className="text-xs text-[#0C5149] hover:text-[#0C3934] font-semibold"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
