import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionCheckmark } from '../components/ui/VCheckmark';

const STORY_SECTIONS = [
  {
    label: 'Why VEERAN exists',
    headline: 'Designed around the way Indians actually live.',
    body: [
      'Most products that reach Indian consumers are designed for someone else — another climate, another set of problems, another daily routine. We started VEERAN to close that gap.',
      'The idea is straightforward: make products for the specific requirements of Indian everyday life. Markets, commutes, monsoons, storage-challenged apartments, family-sized shopping. Real conditions. Real use.'
    ],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'The materials',
    headline: 'We choose materials that earn their place.',
    body: [
      'Every material we use is chosen for performance first. Canvas, jute, and woven cottons are not aesthetic choices — they are practical ones. They are strong, they age well, they clean easily, and they don\'t fall apart when actually used.',
      'We avoid synthetic coatings that crack, plastics that peel, and finishes that look good in photographs and fail within months.'
    ],
    image: 'https://images.unsplash.com/photo-1558171813-c56ddc8d3a55?auto=format&fit=crop&q=80&w=1200',
  },
  {
    label: 'The process',
    headline: 'Built to be used, not displayed.',
    body: [
      'VEERAN products go through a practical review before production. We test prototypes in real conditions — at markets, on commutes, in offices — and change what doesn\'t work.',
      'Seams are reinforced at stress points. Zippers are tested to outlast the product. Base structures are chosen for load-bearing, not shape. The details that matter are the ones you never notice because they work without demanding attention.'
    ],
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=1200',
  },
];

function fade(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.6, delay }
  };
}

export default function OurStory() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative h-[55vh] lg:h-[65vh] overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=85&w=2000"
          alt="VEERAN workshop"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/80 via-[#1A1A18]/30 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-14 lg:pb-20">
          <motion.p className="label-caps text-[#C8590A] text-xs mb-4" {...fade()}>Our Story</motion.p>
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-medium text-[#F7F4EE] leading-tight max-w-2xl"
            {...fade(0.1)}
          >
            Practical things, built well.
          </motion.h1>
        </div>
      </section>

      {/* Intro statement */}
      <section className="py-20 lg:py-24 px-6 lg:px-10 bg-[#1A1A18]">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          {...fade()}
        >
          <p className="font-display text-2xl lg:text-3xl text-[#F7F4EE] leading-relaxed font-medium">
            "We make products for the life you actually live — not the aspirational version of it."
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-[#C8590A]" />
            <span className="label-caps text-[#C8590A] text-xs">VEERAN FOUNDERS</span>
            <div className="w-12 h-px bg-[#C8590A]" />
          </div>
        </motion.div>
      </section>

      {/* Story sections */}
      {STORY_SECTIONS.map((section, i) => (
        <section
          key={section.label}
          className={`py-0 ${i % 2 === 0 ? 'bg-[#F7F4EE]' : 'bg-[#EDE9E1]'}`}
        >
          <div className={`max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
            {/* Image */}
            <motion.div
              className={`relative overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={section.image}
                alt={section.headline}
                className="w-full h-full object-cover min-h-[350px] lg:min-h-[500px]"
                loading="lazy"
              />
            </motion.div>

            {/* Content */}
            <div className={`px-8 lg:px-16 py-14 lg:py-20 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <motion.div {...fade(0.1)}>
                <p className="label-caps text-[#C8590A] text-xs mb-5">{section.label}</p>
                <h2 className="font-display text-2xl lg:text-3xl font-medium text-[#1A1A18] leading-snug mb-7">
                  {section.headline}
                </h2>
                {section.body.map((para, j) => (
                  <p key={j} className="text-[#6B6860] text-sm lg:text-base leading-relaxed mb-4 last:mb-0">
                    {para}
                  </p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Philosophy */}
      <section className="py-24 lg:py-32 px-6 lg:px-10 bg-[#1A1A18]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fade()}>
              <div className="flex items-start gap-5 mb-10">
                <SectionCheckmark />
                <div>
                  <p className="label-caps text-[#C8590A] text-xs mb-3">Our Philosophy</p>
                  <h2 className="font-display text-3xl lg:text-4xl text-[#F7F4EE] font-medium leading-tight">
                    Less, but better.
                  </h2>
                </div>
              </div>
              <p className="text-[#F7F4EE]/60 leading-relaxed">
                We don't chase trends. We don't add features to product pages that don't exist in the product. We don't claim sustainability credentials we haven't earned.
              </p>
              <p className="text-[#F7F4EE]/60 leading-relaxed mt-4">
                VEERAN is built on a simple commitment: make something genuinely useful, make it well, and stand behind it.
              </p>
            </motion.div>

            <motion.div className="space-y-5" {...fade(0.15)}>
              {[
                { title: 'No exaggerated claims', body: 'We say what our products do. We don\'t say what they don\'t.' },
                { title: 'No seasonal obsolescence', body: 'Our products are not collections. They are tools. The design doesn\'t expire.' },
                { title: 'No fast-fashion approach', body: 'We would rather make fewer products that last than many that don\'t.' },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-5 border border-white/10 hover:border-[#C8590A]/30 transition-colors">
                  <div className="mt-0.5 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8590A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 13L9 18L20 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#F7F4EE] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#F7F4EE]/55 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-10 bg-[#F7F4EE] text-center border-t border-[#E2DDDA]">
        <motion.div {...fade()}>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-[#1A1A18] mb-6">
            Ready to find your everyday?
          </h2>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#1A1A18] text-white px-10 py-4 text-sm font-medium hover:bg-[#C8590A] transition-colors group"
          >
            SHOP VEERAN
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
