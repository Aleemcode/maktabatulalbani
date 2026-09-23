import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Star } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';
import { formatCurrency } from '../../lib/whatsapp';

export const AdminBooks: React.FC = () => {
  const { books, categories, settings, updateBook, deleteBook } = useCatalogue();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'all' || b.category_id === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from the catalogue?`)) {
      deleteBook(id);
    }
  };

  const toggleStock = (id: string, current: boolean) => {
    updateBook(id, { in_stock: !current });
  };

  const toggleFeatured = (id: string, current: boolean) => {
    updateBook(id, { featured: !current });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#18181B]">Catalogue Inventory</h1>
          <p className="text-xs text-[#71717A] mt-0.5">Manage and organize all book listings, pricing, and stock status.</p>
        </div>

        <Link
          to="/admin/books/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#18181B] text-white text-xs font-semibold hover:bg-black transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Book</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E4E4E7] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search book title or author..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-3 py-2 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] bg-white focus:outline-none"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#52525B]">
            <thead className="bg-[#FAF9F6] text-[#71717A] uppercase text-[10px] font-bold border-b border-[#E4E4E7]">
              <tr>
                <th className="py-3.5 px-4">Book</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F4F5]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#A1A1AA]">
                    No books found.
                  </td>
                </tr>
              ) : (
                filtered.map((book) => {
                  const category = categories.find((c) => c.id === book.category_id);
                  return (
                    <tr key={book.id} className="hover:bg-[#FAFAFA]">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={book.cover_image}
                            alt=""
                            className="w-9 h-12 object-cover rounded bg-[#F4F4F5] shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-[#18181B] block truncate max-w-xs">
                              {book.title}
                            </span>
                            <span className="text-[11px] text-[#71717A] block truncate max-w-xs">
                              {book.author}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-[#71717A] whitespace-nowrap">
                        {category?.name || '—'}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-bold text-[#18181B]">
                          {formatCurrency(book.discount_price || book.price, settings.currency_symbol)}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleStock(book.id, book.in_stock)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            book.in_stock
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                          }`}
                        >
                          {book.in_stock ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>In Stock</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-zinc-500" />
                              <span>Out of Stock</span>
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleFeatured(book.id, book.featured)}
                          className={`p-1 rounded-md ${
                            book.featured ? 'text-amber-500 hover:text-amber-600' : 'text-zinc-300 hover:text-zinc-400'
                          }`}
                          title="Toggle featured status"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-right space-x-2">
                        <Link
                          to={`/admin/books/edit/${book.id}`}
                          className="inline-flex items-center p-1.5 rounded-lg hover:bg-[#F4F4F5] text-[#52525B] hover:text-[#18181B]"
                          title="Edit book"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(book.id, book.title)}
                          className="inline-flex items-center p-1.5 rounded-lg hover:bg-red-50 text-[#A1A1AA] hover:text-red-600"
                          title="Delete book"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
