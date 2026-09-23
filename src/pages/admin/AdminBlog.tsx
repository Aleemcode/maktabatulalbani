import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useCatalogue } from '../../context/CatalogueContext';

export const AdminBlog: React.FC = () => {
  const { posts, updatePost, deletePost } = useCatalogue();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete the article "${title}"?`)) {
      deletePost(id);
    }
  };

  const togglePublished = (id: string, current: boolean) => {
    updatePost(id, { published: !current });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#18181B]">Reader Blog Management</h1>
          <p className="text-xs text-[#71717A] mt-0.5">Write and publish guides, book reviews, and reading culture essays.</p>
        </div>

        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#18181B] text-white text-xs font-semibold hover:bg-black transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-[#E4E4E7] overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs text-[#52525B]">
          <thead className="bg-[#FAF9F6] text-[#71717A] uppercase text-[10px] font-bold border-b border-[#E4E4E7]">
            <tr>
              <th className="py-3.5 px-4">Article</th>
              <th className="py-3.5 px-4">Author</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4F4F5]">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-[#A1A1AA]">
                  No articles written yet.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#FAFAFA]">
                  <td className="py-3.5 px-4 max-w-sm">
                    <span className="font-bold text-[#18181B] block truncate">{post.title}</span>
                    <span className="text-[11px] text-[#71717A] block truncate">{post.excerpt}</span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-[#71717A]">
                    {post.author}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePublished(post.id, post.published)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        post.published
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-[#71717A]">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-right space-x-2">
                    <Link
                      to={`/admin/blog/edit/${post.id}`}
                      className="inline-flex items-center p-1.5 rounded-lg hover:bg-[#F4F4F5] text-[#52525B] hover:text-[#18181B]"
                      title="Edit article"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="inline-flex items-center p-1.5 rounded-lg hover:bg-red-50 text-[#A1A1AA] hover:text-red-600"
                      title="Delete article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
