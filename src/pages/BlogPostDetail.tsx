import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, WhatsappLogo, BookOpen, ShareNetwork } from '@phosphor-icons/react';
import { useCatalogue } from '../context/CatalogueContext';
import { formatCurrency, createBookWhatsAppUrl } from '../lib/whatsapp';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { posts, books, settings } = useCatalogue();
  const [copied, setCopied] = React.useState(false);

  const post = posts.find((p) => p.slug === slug || p.id === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#18181B]">Article Not Found</h2>
        <Link to="/blog" className="inline-block px-4 py-2 rounded-xl bg-[#18181B] text-white text-xs font-semibold">
          Return to Blog
        </Link>
      </div>
    );
  }

  const featuredBooks = books.filter((b) => post.featured_book_ids?.includes(b.id));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#71717A] hover:text-[#18181B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to articles</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-[#71717A]">
          <span className="flex items-center gap-1 font-semibold text-[#18181B]">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.read_time}</span>
          </span>
          <span>•</span>
          <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B] leading-tight font-serif-display">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-2 border-b border-[#EFECE6] pb-4">
          <span className="text-xs font-medium text-[#52525B]">By {post.author}</span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#18181B]"
          >
            <ShareNetwork className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-zinc max-w-none text-[#27272A] leading-relaxed text-sm sm:text-base space-y-6">
        {post.content.split('\n\n').map((paragraph, idx) => {
          if (paragraph.startsWith('# ')) {
            return (
              <h2 key={idx} className="text-2xl font-bold text-[#18181B] pt-4 font-serif-display">
                {paragraph.replace('# ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('## ')) {
            return (
              <h3 key={idx} className="text-xl font-bold text-[#18181B] pt-3 font-serif-display">
                {paragraph.replace('## ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1">
                {paragraph.split('\n').map((item, itemIdx) => (
                  <li key={itemIdx}>{item.replace('- ', '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </div>

      {/* Featured Books in this Article */}
      {featuredBooks.length > 0 && (
        <div className="pt-10 border-t border-[#EFECE6] space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#18181B]" />
            <h3 className="text-base font-bold text-[#18181B]">Titles Mentioned in this Essay</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredBooks.map((book) => (
              <div
                key={book.id}
                className="p-4 rounded-2xl bg-white border border-[#EFECE6] flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#18181B] line-clamp-1">{book.title}</h4>
                  <p className="text-[11px] text-[#71717A] mt-0.5">{book.author}</p>
                  <p className="text-xs font-bold text-[#18181B] mt-2">
                    {formatCurrency(book.discount_price || book.price, settings.currency_symbol)}
                  </p>
                </div>

                <a
                  href={createBookWhatsAppUrl(book, settings)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#25D366] text-white text-xs font-semibold"
                >
                  <WhatsappLogo size={16} weight="fill" className="text-white" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};
