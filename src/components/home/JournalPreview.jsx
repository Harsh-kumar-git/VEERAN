import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import journalData from '../../data/journal.json';

export default function JournalPreview() {
  const posts = journalData.slice(0, 3);

  return (
    <section className="py-24 lg:py-28 bg-[#EDE9E1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label-caps text-[#C8590A] text-xs mb-3">Editorial</p>
            <h2 className="font-display text-3xl lg:text-4xl font-medium text-[#1A1A18]">
              The VEERAN Journal
            </h2>
          </div>
          <Link
            to="/journal"
            className="hidden md:flex items-center gap-2 text-sm text-[#6B6860] hover:text-[#C8590A] transition-colors group"
          >
            All Articles
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/journal/${post.slug}`} className="group block">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden bg-[#1A1A18] mb-5">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-600"
                    loading="lazy"
                  />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="label-caps text-[#C8590A] text-[9px]">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[#E2DDDA]" />
                  <span className="text-[#6B6860] text-xs">{post.readTime}</span>
                </div>

                <h3 className="font-display text-lg font-medium text-[#1A1A18] group-hover:text-[#C8590A] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-[#6B6860] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#1A1A18] group-hover:text-[#C8590A] transition-colors">
                  Read more <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
