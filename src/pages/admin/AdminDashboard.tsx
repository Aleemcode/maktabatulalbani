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
          <h1 className="text-2xl font-bold text-[#18181B]">Store Overview</h1>
          <p className="text-xs text-[#71717A] mt-0.5">Summary of your catalogue inventory, blog activity, and conversion channels.</p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/books/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#18181B] text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Book</span>
          </Link>
          <Link
            to="/admin/blog/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E4E4E7] text-[#18181B] text-xs font-semibold hover:bg-[#F4F4F5] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Books */}
        <div className="bg-white p-5 rounded-2xl border border-[#E4E4E7] space-y-2">
          <div className="flex items-center justify-between text-[#71717A]">
            <span className="text-xs font-medium">Catalogue Volumes</span>
            <BookOpen className="w-4 h-4 text-[#18181B]" />
          </div>
          <p className="text-2xl font-bold text-[#18181B]">{books.length}</p>
          <p className="text-[11px] text-[#71717A]">Active catalogue items</p>
        </div>

        {/* Out of stock */}
        <div className="bg-white p-5 rounded-2xl border border-[#E4E4E7] space-y-2">
          <div className="flex items-center justify-between text-[#71717A]">
            <span className="text-xs font-medium">Pre-order / Out of Stock</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-[#18181B]">{outOfStockCount}</p>
          <p className="text-[11px] text-[#71717A]">Need replenishment</p>
        </div>

        {/* Blog Posts */}
        <div className="bg-white p-5 rounded-2xl border border-[#E4E4E7] space-y-2">
          <div className="flex items-center justify-between text-[#71717A]">
            <span className="text-xs font-medium">Published Essays</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-[#18181B]">{publishedPostsCount}</p>
          <p className="text-[11px] text-[#71717A]">{posts.length} total drafts & articles</p>
        </div>

        {/* WhatsApp Conversion Channel */}
        <div className="bg-white p-5 rounded-2xl border border-[#E4E4E7] space-y-2">
          <div className="flex items-center justify-between text-[#71717A]">
            <span className="text-xs font-medium">WhatsApp Destination</span>
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </div>
          <p className="text-sm font-bold text-[#18181B] truncate">+{settings.whatsapp_number}</p>
          <a
            href={createGeneralWhatsAppUrl(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#25D366] font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>Test Chat Trigger</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Recent Books */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#18181B]">Recently Added Titles</h2>
          <Link to="/admin/books" className="text-xs text-[#71717A] hover:text-[#18181B] font-semibold">
            View all ({books.length})
          </Link>
        </div>

        <div className="divide-y divide-[#F4F4F5]">
          {books.slice(0, 5).map((book) => (
            <div key={book.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-10 h-14 object-cover rounded bg-[#F4F4F5] shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-[#18181B] truncate">{book.title}</h3>
                  <p className="text-[11px] text-[#71717A] truncate">{book.author}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-bold text-[#18181B]">
                  {formatCurrency(book.discount_price || book.price, settings.currency_symbol)}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    book.in_stock ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-600'
                  }`}
                >
                  {book.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
                <Link
                  to={`/admin/books/edit/${book.id}`}
                  className="text-xs text-blue-600 hover:underline font-semibold"
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
