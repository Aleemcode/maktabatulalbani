import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, FloppyDisk } from '@phosphor-icons/react';
import { useCatalogue } from '../../context/CatalogueContext';
import { Book } from '../../types';

export const BookEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, categories, addBook, updateBook } = useCatalogue();

  const isEditing = Boolean(id);
  const existingBook = books.find((b) => b.id === id);

  const [formData, setFormData] = useState({
    title: '',
    arabic_title: '',
    author: '',
    publisher: '',
    translator: '',
    price: 0,
    discount_price: 0,
    category_id: categories[0]?.id || 'albani-works',
    cover_image: '',
    description: '',
    pages: 0,
    binding: 'Hardcover' as Book['binding'],
    language: 'English' as Book['language'],
    isbn: '',
    in_stock: true,
    featured: false
  });

  useEffect(() => {
    if (isEditing && existingBook) {
      setFormData({
        title: existingBook.title,
        arabic_title: existingBook.arabic_title || '',
        author: existingBook.author,
        publisher: existingBook.publisher || '',
        translator: existingBook.translator || '',
        price: existingBook.price,
        discount_price: existingBook.discount_price || 0,
        category_id: existingBook.category_id,
        cover_image: existingBook.cover_image,
        description: existingBook.description,
        pages: existingBook.pages || 0,
        binding: existingBook.binding || 'Hardcover',
        language: existingBook.language || 'English',
        isbn: existingBook.isbn || '',
        in_stock: existingBook.in_stock,
        featured: existingBook.featured
      });
    }
  }, [isEditing, existingBook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const payload = {
      ...formData,
      slug: existingBook?.slug || slug,
      discount_price: formData.discount_price > 0 ? formData.discount_price : undefined,
      pages: formData.pages > 0 ? formData.pages : undefined,
      isbn: formData.isbn.trim() || undefined,
      publisher: formData.publisher.trim() || undefined,
      translator: formData.translator.trim() || undefined,
      arabic_title: formData.arabic_title.trim() || undefined,
      cover_image:
        formData.cover_image.trim() ||
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
    };

    if (isEditing && id) {
      await updateBook(id, payload);
    } else {
      await addBook(payload);
    }

    navigate('/admin/books');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/books"
            className="p-2 rounded-xl bg-white border border-[#E8E4D8] text-[#0C3934] hover:border-[#0C3934] transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#0C3934]">
            {isEditing ? 'Edit Book Details' : 'Add New Book to Catalogue'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4D8] space-y-6 shadow-xs">
        {/* Title & Arabic Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0C3934] mb-1">
              Title (English / Romanized) *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. The Prophet's Prayer Described"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D8] bg-[#FBF9F4]/40 text-xs text-[#0C3934] focus:outline-none focus:border-[#0C3934]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0C3934] mb-1">
              Arabic Title (Optional)
            </label>
            <input
              type="text"
              name="arabic_title"
              value={formData.arabic_title}
              onChange={handleChange}
              placeholder="e.g. صفة صلاة النبي صلى الله عليه وسلم"
              dir="rtl"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4D8] bg-[#FBF9F4]/40 text-xs font-arabic text-[#0C3934] focus:outline-none focus:border-[#0C3934]"
            />
          </div>
        </div>

        {/* Author & Publisher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. Shaykh al-Albani"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              placeholder="e.g. Darussalam / Maktabah al-Maarif"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] bg-white focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Standard Price (₦) *</label>
            <input
              type="number"
              name="price"
              value={formData.price || ''}
              onChange={handleChange}
              placeholder="18500"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Discount Price (₦)</label>
            <input
              type="number"
              name="discount_price"
              value={formData.discount_price || ''}
              onChange={handleChange}
              placeholder="Optional discount price"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">ISBN Number</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="e.g. 978-9960241050"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs font-mono text-[#18181B] focus:outline-none"
            />
          </div>
        </div>

        {/* Attributes: Language, Binding, Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Language</label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] bg-white focus:outline-none"
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="Bilingual">Bilingual</option>
              <option value="Yoruba">Yoruba</option>
              <option value="Hausa">Hausa</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Binding Type</label>
            <select
              name="binding"
              value={formData.binding}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] bg-white focus:outline-none"
            >
              <option value="Hardcover">Hardcover</option>
              <option value="Paperback">Paperback</option>
              <option value="Leather">Leather</option>
              <option value="Box Set">Box Set</option>
              <option value="Softcover">Softcover</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Page Count</label>
            <input
              type="number"
              name="pages"
              value={formData.pages || ''}
              onChange={handleChange}
              placeholder="e.g. 288"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
          </div>
        </div>

        {/* Cover image URL */}
        <div>
          <label className="block text-xs font-semibold text-[#52525B] mb-1">Cover Image URL</label>
          <div className="flex gap-2">
            <input
              type="url"
              name="cover_image"
              value={formData.cover_image}
              onChange={handleChange}
              placeholder="https://example.com/book-cover.jpg"
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
            {formData.cover_image && (
              <img
                src={formData.cover_image}
                alt="Preview"
                className="w-10 h-10 object-cover rounded-lg border border-[#E4E4E7]"
              />
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-[#52525B] mb-1">Description / Overview *</label>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed synopsis of the book, topics covered, scholarly reception..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none leading-relaxed"
            required
          />
        </div>

        {/* Checkbox Toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#F4F4F5]">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-[#18181B]">
            <input
              type="checkbox"
              name="in_stock"
              checked={formData.in_stock}
              onChange={handleChange}
              className="rounded border-[#D4D4D8] text-[#18181B]"
            />
            <span>Currently In Stock</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-[#18181B]">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="rounded border-[#D4D4D8] text-[#18181B]"
            />
            <span>Feature on Homepage</span>
          </label>
        </div>

        {/* Submit action */}
        <div className="pt-4 border-t border-[#E8E4D8] flex items-center justify-end gap-3">
          <Link
            to="/admin/books"
            className="px-5 py-2.5 rounded-xl border border-[#E8E4D8] text-xs font-semibold text-[#5C6969] hover:border-[#0C3934] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0C3934] hover:bg-[#0C5149] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <FloppyDisk className="w-4 h-4 text-[#C59E42]" />
            <span>{isEditing ? 'Save Changes' : 'Publish Book Listing'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
