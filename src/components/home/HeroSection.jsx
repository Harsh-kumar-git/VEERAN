import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=85&w=2000"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Gradient overlay — warm, not cold */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A18]/80 via-[#1A1A18]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-20 lg:pt-36"
      >
        <div className="max-w-2xl">
          {/* Pre-label */}
          <motion.p
            className="label-caps text-[#C8590A] text-xs mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ✓ New Collection Available
          </motion.p>

          {/* Main headline */}
          <motion.h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#F7F4EE] leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Built for
            <br />
            everyday.
            <br />
            <em className="not-italic text-[#C8590A]">Made to last.</em>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mt-6 text-base lg:text-lg text-[#F7F4EE]/75 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Practical, well-made products for real everyday use.
            No excess. No compromise.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-[#C8590A] text-white px-8 py-4 text-sm font-medium hover:bg-[#A34507] transition-colors duration-300"
            >
              EXPLORE PRODUCTS
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/our-story"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-[#F7F4EE] border border-[#F7F4EE]/30 hover:border-[#F7F4EE] hover:bg-[#F7F4EE]/10 transition-all duration-300"
            >
              DISCOVER VEERAN
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="label-caps text-[#F7F4EE]/40 text-[9px]">Scroll</span>
          <motion.div
            className="w-px h-10 bg-[#F7F4EE]/30 origin-top"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
