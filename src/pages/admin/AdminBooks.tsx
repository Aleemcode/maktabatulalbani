import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MagnifyingGlass, PencilSimple, Trash, CheckCircle, XCircle, Star } from '@phosphor-icons/react';
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
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#0C3934]">Catalogue Inventory</h1>
          <p className="text-xs text-[#5C6969] mt-0.5">Manage and organize all book listings, pricing, and stock status.</p>
        </div>

        <Link
          to="/admin/books/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0C3934] hover:bg-[#0C5149] text-white text-xs font-semibold shadow-xs transition-colors shrink-0 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 text-[#C59E42]" />
          <span>Add New Book</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E4D8] flex flex-col sm:flex-row gap-3 shadow-xs">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A9B8B5]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search book title or author..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8E4D8] text-xs text-[#0C3934] bg-[#FBF9F4]/50 focus:outline-none focus:border-[#0C3934]"
          />
        </div>

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-[#E8E4D8] text-xs font-medium text-[#0C3934] bg-white focus:outline-none focus:border-[#0C3934]"
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
      <div className="bg-white rounded-2xl border border-[#E8E4D8] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#5C6969]">
            <thead className="bg-[#F6F2E9] text-[#0C3934] uppercase text-[10px] font-bold border-b border-[#E8E4D8]">
              <tr>
                <th className="py-3.5 px-4">Book</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F6F2E9]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[#A9B8B5]">
                    No books found.
                  </td>
                </tr>
              ) : (
                filtered.map((book) => {
                  const category = categories.find((c) => c.id === book.category_id);
                  return (
                    <tr key={book.id} className="hover:bg-[#FBF9F4] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={book.cover_image}
                            alt=""
                            className="w-9 h-12 object-cover rounded-md bg-[#F6F2E9] border border-[#E8E4D8] shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-[#0C3934] block truncate max-w-xs">
                              {book.title}
                            </span>
                            <span className="text-[11px] text-[#5C6969] block truncate max-w-xs">
                              {book.author}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-[#5C6969] whitespace-nowrap">
                        {category?.name || '—'}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-bold text-[#0C3934]">
                          {formatCurrency(book.discount_price || book.price, settings.currency_symbol)}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleStock(book.id, book.in_stock)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            book.in_stock
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200'
                          }`}
                        >
                          {book.in_stock ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-[#0C5149]" />
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
                          className={`p-1 rounded-md transition-colors ${
                            book.featured ? 'text-[#C59E42] hover:text-[#b89a4f]' : 'text-zinc-300 hover:text-zinc-400'
                          }`}
                          title="Toggle featured status"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-right space-x-2">
                        <Link
                          to={`/admin/books/edit/${book.id}`}
                          className="inline-flex items-center p-1.5 rounded-lg hover:bg-[#F6F2E9] text-[#0C5149] hover:text-[#0C3934] transition-colors"
                          title="Edit book"
                        >
                          <PencilSimple className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(book.id, book.title)}
                          className="inline-flex items-center p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                          title="Delete book"
                        >
                          <Trash className="w-3.5 h-3.5" />
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
