import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden bg-[#F7F4EE]">
      {/* Large decorative V in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[40vw] font-bold text-[#1A1A18]/[0.025] leading-none">
          V
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="label-caps text-[#C8590A] text-xs mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#C8590A]" />
            VEERAN
            <span className="w-8 h-px bg-[#C8590A]" />
          </p>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-medium text-[#1A1A18] leading-[1.08]">
            Find your everyday
            <br />
            <em className="not-italic text-[#C8590A]">essential.</em>
          </h2>

          <p className="mt-6 text-[#6B6860] text-base lg:text-lg max-w-md mx-auto leading-relaxed">
            Practical things, built well. For the life you actually live.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 bg-[#1A1A18] text-white px-10 py-4 text-sm font-medium hover:bg-[#C8590A] transition-colors duration-300"
            >
              SHOP VEERAN
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/our-story"
              className="text-sm text-[#6B6860] font-medium hover:text-[#1A1A18] underline-offset-4 hover:underline transition-colors"
            >
              Learn our story →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
