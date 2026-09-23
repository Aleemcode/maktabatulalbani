import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { useCatalogue } from '../context/CatalogueContext';

export const Blog: React.FC = () => {
  const { posts } = useCatalogue();
  const publishedPosts = posts.filter((p) => p.published);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#18181B] font-serif-display">
          Reader Guidance & Book Insights
        </h1>
        <p className="text-sm text-[#71717A] mt-2 leading-relaxed">
          Essays, scholarly perspectives, and practical guidance on cultivating an enduring habit of reading authentic Islamic literature.
        </p>
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publishedPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-3xl border border-[#EFECE6] p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div className="space-y-4">
              {/* Meta tags */}
              <div className="flex items-center gap-3 text-xs text-[#71717A]">
                <span className="flex items-center gap-1 font-semibold text-[#18181B]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.read_time}</span>
                </span>
                <span>•</span>
                <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>

              {/* Title */}
              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-xl font-bold text-[#18181B] group-hover:text-amber-800 transition-colors leading-snug">
                  {post.title}
                </h2>
              </Link>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F4F4F5] text-[11px] text-[#71717A] font-medium"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Read CTA */}
            <div className="pt-6 border-t border-[#F4F4F5] mt-6 flex items-center justify-between">
              <span className="text-xs text-[#71717A]">{post.author}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="text-xs font-semibold text-[#18181B] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
              >
                <span>Read Full Essay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
