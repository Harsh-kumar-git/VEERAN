import { motion } from 'framer-motion';
import { SectionCheckmark } from '../ui/VCheckmark';

const PRINCIPLES = [
  {
    mark: '✓',
    title: 'PRACTICAL',
    body: 'Every feature exists for a reason. Nothing is there to look good in a product photo and fail in real use.',
  },
  {
    mark: '✓',
    title: 'DURABLE',
    body: 'Reinforced seams, quality zippers, solid bases. Built to outlast the occasion it was bought for.',
  },
  {
    mark: '✓',
    title: 'REUSABLE',
    body: 'Products that improve with age. Canvas softens. Leather develops character. Nothing disposable.',
  },
  {
    mark: '✓',
    title: 'MADE FOR EVERYDAY',
    body: 'Not for special occasions. Not for display. For markets, commutes, offices, and everything in between.',
  },
];

export default function WhyVeeran() {
  return (
    <section className="py-24 lg:py-28 bg-[#1A1A18]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 lg:mb-20 flex items-start gap-6">
          <SectionCheckmark className="mt-1 flex-shrink-0" />
          <div>
            <p className="label-caps text-[#C8590A] text-xs mb-3">Our Commitments</p>
            <h2 className="font-display text-3xl lg:text-5xl font-medium text-[#F7F4EE] leading-tight">
              Why VEERAN
            </h2>
          </div>
        </div>

        {/* Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {PRINCIPLES.map((principle, i) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-[#1A1A18] p-8 lg:p-10 group hover:bg-[#2E2E2B] transition-colors"
            >
              {/* Animated checkmark */}
              <motion.div
                className="w-10 h-10 border border-[#C8590A]/30 flex items-center justify-center mb-8 group-hover:border-[#C8590A] transition-colors"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8590A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path
                    d="M4 13L9 18L20 6"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 + 0.3, ease: 'easeOut' }}
                  />
                </svg>
              </motion.div>

              <h3 className="label-caps text-[#F7F4EE] text-xs mb-4 tracking-widest">
                {principle.title}
              </h3>
              <p className="text-[#F7F4EE]/55 text-sm leading-relaxed">
                {principle.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
