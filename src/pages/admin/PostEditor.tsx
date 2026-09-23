import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, BookOpen } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';

export const PostEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, books, addPost, updatePost } = useCatalogue();

  const isEditing = Boolean(id);
  const existingPost = posts.find((p) => p.id === id);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: 'Maktabah Imam Albani Editorial',
    read_time: '5 min read',
    tags: 'Reading Culture, Seeker of Knowledge',
    published: true,
    featured_book_ids: [] as string[]
  });

  useEffect(() => {
    if (isEditing && existingPost) {
      setFormData({
        title: existingPost.title,
        excerpt: existingPost.excerpt,
        content: existingPost.content,
        author: existingPost.author,
        read_time: existingPost.read_time,
        tags: existingPost.tags.join(', '),
        published: existingPost.published,
        featured_book_ids: existingPost.featured_book_ids || []
      });
    }
  }, [isEditing, existingPost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBookToggle = (bookId: string) => {
    setFormData((prev) => {
      const current = prev.featured_book_ids;
      if (current.includes(bookId)) {
        return { ...prev, featured_book_ids: current.filter((id) => id !== bookId) };
      }
      return { ...prev, featured_book_ids: [...current, bookId] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      slug: existingPost?.slug || slug,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author,
      read_time: formData.read_time,
      tags: tagsArray.length > 0 ? tagsArray : ['Books'],
      published: formData.published,
      featured_book_ids: formData.featured_book_ids
    };

    if (isEditing && id) {
      await updatePost(id, payload);
    } else {
      await addPost(payload);
    }

    navigate('/admin/blog');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/blog"
            className="p-2 rounded-xl bg-white border border-[#E4E4E7] text-[#52525B] hover:text-[#18181B]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-[#18181B]">
            {isEditing ? 'Edit Article' : 'Write New Article'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E4E4E7] space-y-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-[#52525B] mb-1">Article Headline *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Why Every Muslim Seeker Needs a Personal Library"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-sm font-bold text-[#18181B] focus:outline-none"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-semibold text-[#52525B] mb-1">Short Excerpt / Teaser *</label>
          <textarea
            name="excerpt"
            rows={2}
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Brief 1-2 sentence hook explaining the key value of this article..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-semibold text-[#52525B] mb-1">Article Body (Supports Headings & Bullet Points) *</label>
          <textarea
            name="content"
            rows={12}
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your article here..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs font-mono text-[#18181B] focus:outline-none leading-relaxed"
            required
          />
        </div>

        {/* Author, Read time, Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Author Name</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Estimated Read Time</label>
            <input
              type="text"
              name="read_time"
              value={formData.read_time}
              onChange={handleChange}
              placeholder="e.g. 5 min read"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#52525B] mb-1">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. Reading Culture, Sunnah, Hadith"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E4E7] text-xs text-[#18181B] focus:outline-none"
            />
          </div>
        </div>

        {/* Linked Books (Direct Conversion in Article) */}
        <div>
          <label className="block text-xs font-semibold text-[#52525B] mb-2">
            Link Books to this Article (Shows direct WhatsApp order buttons inside the post)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-3 rounded-xl border border-[#E4E4E7] bg-[#FAF9F6]">
            {books.map((book) => {
              const selected = formData.featured_book_ids.includes(book.id);
              return (
                <button
                  type="button"
                  key={book.id}
                  onClick={() => handleBookToggle(book.id)}
                  className={`flex items-center gap-2 p-2 rounded-lg text-left text-xs border transition-colors ${
                    selected
                      ? 'bg-white border-[#18181B] font-bold text-[#18181B]'
                      : 'bg-transparent border-transparent hover:bg-white text-[#71717A]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{book.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Publish Checkbox */}
        <div className="pt-2 border-t border-[#F4F4F5]">
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-[#18181B]">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
              className="rounded border-[#D4D4D8] text-[#18181B]"
            />
            <span>Publish immediately (visible to all readers)</span>
          </label>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#E4E4E7] flex items-center justify-end gap-3">
          <Link
            to="/admin/blog"
            className="px-4 py-2.5 rounded-xl border border-[#E4E4E7] text-xs font-semibold text-[#52525B] hover:bg-[#F4F4F5]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#18181B] hover:bg-black text-white text-xs font-semibold transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Article' : 'Publish Article'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
