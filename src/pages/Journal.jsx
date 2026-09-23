import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import journalData from '../data/journal.json';

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay }
  };
}

export default function Journal() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-[#1A1A18] py-20 lg:py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.p className="label-caps text-[#C8590A] text-xs mb-4" {...fade()}>Editorial</motion.p>
          <motion.h1
            className="font-display text-4xl lg:text-6xl font-medium text-[#F7F4EE]"
            {...fade(0.1)}
          >
            The VEERAN Journal
          </motion.h1>
          <motion.p className="mt-4 text-[#F7F4EE]/60 max-w-md" {...fade(0.2)}>
            Material stories, product guides, organization ideas, and behind-the-scenes.
          </motion.p>
        </div>
      </div>

      {/* Featured post */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 border-b border-[#E2DDDA]">
        <motion.article {...fade()}>
          <Link to={`/journal/${journalData[0].slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="aspect-[16/10] overflow-hidden bg-[#EDE9E1]">
              <img
                src={journalData[0].imageUrl}
                alt={journalData[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="label-caps text-[#C8590A] text-[9px] bg-[#C8590A]/10 px-2.5 py-1">{journalData[0].category}</span>
                <span className="text-xs text-[#6B6860]">{journalData[0].readTime}</span>
              </div>
              <h2 className="font-display text-2xl lg:text-4xl font-medium text-[#1A1A18] group-hover:text-[#C8590A] transition-colors leading-snug mb-4">
                {journalData[0].title}
              </h2>
              <p className="text-[#6B6860] text-sm lg:text-base leading-relaxed mb-6">
                {journalData[0].excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A18] group-hover:text-[#C8590A] transition-colors">
                Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.article>
      </div>

      {/* Rest of posts */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {journalData.slice(1).map((post, i) => (
            <motion.article key={post.id} {...fade(i * 0.1)}>
              <Link to={`/journal/${post.slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden bg-[#EDE9E1] mb-5">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="label-caps text-[#C8590A] text-[9px]">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[#E2DDDA]" />
                  <span className="text-[#6B6860] text-xs">{post.readTime}</span>
                </div>
                <h3 className="font-display text-lg lg:text-xl font-medium text-[#1A1A18] group-hover:text-[#C8590A] transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-[#6B6860] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#1A1A18] group-hover:text-[#C8590A] transition-colors">
                  Read more <ArrowRight size={11} />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* No more posts note */}
        <div className="mt-16 pt-10 border-t border-[#E2DDDA] text-center">
          <p className="text-sm text-[#6B6860]">More articles coming soon.</p>
        </div>
      </div>
    </div>
  );
}
