import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STAGES = [
  {
    number: '01',
    label: 'MATERIAL',
    headline: 'Chosen with purpose.',
    body: 'We start with canvas, jute, and cotton. Materials that age well, clean easily, and hold their shape. No fast-fashion shortcuts.',
    image: 'https://images.unsplash.com/photo-1558171813-c56ddc8d3a55?auto=format&fit=crop&q=80&w=1200',
  },
  {
    number: '02',
    label: 'CRAFT',
    headline: 'Stitched for strength.',
    body: "Every seam is reinforced. Every buckle tested. The construction is designed to outlast the product's first year, and then some.",
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=1200',
  },
  {
    number: '03',
    label: 'PRODUCT',
    headline: 'Designed to be used.',
    body: 'The final form is shaped by actual use. Pocket placement, strap width, base structure — each decision made against real-world scenarios.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
  },
  {
    number: '04',
    label: 'EVERYDAY',
    headline: 'Goes where you go.',
    body: 'Markets, offices, weekends, commutes. A VEERAN bag is not an occasion — it is a daily companion. That is the standard we build to.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200',
  },
];

function StageCard({ stage, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.2'] });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0.6]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[70vh] ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <img
          src={stage.image}
          alt={stage.label}
          className="w-full h-full object-cover min-h-[300px] lg:min-h-full"
          loading="lazy"
        />
        {/* Number overlay */}
        <div className="absolute top-6 right-6 font-display text-7xl lg:text-9xl font-bold text-white/10 leading-none select-none">
          {stage.number}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center px-8 lg:px-16 py-14 lg:py-20 bg-[#1A1A18] ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <p className="label-caps text-[#C8590A] text-xs mb-4">{stage.number} — {stage.label}</p>
        <h3 className="font-display text-3xl lg:text-4xl text-[#F7F4EE] font-medium leading-snug mb-6">
          {stage.headline}
        </h3>
        <p className="text-[#F7F4EE]/65 text-base leading-relaxed max-w-sm">
          {stage.body}
        </p>
        {/* Decorative line */}
        <div className="mt-10 flex items-center gap-4">
          <div className="w-12 h-px bg-[#C8590A]" />
          <span className="label-caps text-[#C8590A]/60 text-[9px]">VEERAN</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CraftStory() {
  return (
    <section className="py-0 overflow-hidden" aria-label="Material to Everyday story">
      {/* Header */}
      <div className="py-20 lg:py-24 px-6 lg:px-10 bg-[#F7F4EE] border-t border-[#E2DDDA] text-center">
        <motion.p
          className="label-caps text-[#C8590A] text-xs mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Process
        </motion.p>
        <motion.h2
          className="font-display text-3xl md:text-5xl font-medium text-[#1A1A18]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Material → Craft → Product → Life
        </motion.h2>
      </div>

      {/* Stages */}
      {STAGES.map((stage, i) => (
        <StageCard key={stage.number} stage={stage} index={i} />
      ))}
    </section>
  );
}
