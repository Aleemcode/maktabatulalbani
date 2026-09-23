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
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-display text-[#0C3934]">Reader Blog Management</h1>
          <p className="text-xs text-[#5C6969] mt-0.5">Write and publish guides, book reviews, and reading culture essays.</p>
        </div>

        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0C3934] hover:bg-[#0C5149] text-white text-xs font-semibold shadow-xs transition-colors shrink-0 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 text-[#C59E42]" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-[#E8E4D8] overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs text-[#5C6969]">
          <thead className="bg-[#F6F2E9] text-[#0C3934] uppercase text-[10px] font-bold border-b border-[#E8E4D8]">
            <tr>
              <th className="py-3.5 px-4">Article</th>
              <th className="py-3.5 px-4">Author</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F6F2E9]">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-[#A9B8B5]">
                  No articles written yet.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-[#FBF9F4] transition-colors">
                  <td className="py-3.5 px-4 max-w-sm">
                    <span className="font-bold text-[#0C3934] block truncate">{post.title}</span>
                    <span className="text-[11px] text-[#5C6969] block truncate">{post.excerpt}</span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-[#5C6969]">
                    {post.author}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePublished(post.id, post.published)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                        post.published
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-[#5C6969]">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-right space-x-2">
                    <Link
                      to={`/admin/blog/edit/${post.id}`}
                      className="inline-flex items-center p-1.5 rounded-lg hover:bg-[#F6F2E9] text-[#0C5149] hover:text-[#0C3934] transition-colors"
                      title="Edit article"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="inline-flex items-center p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
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
