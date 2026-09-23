import { motion } from 'framer-motion';

export default function BrandIntro() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-10 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: statement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="label-caps text-[#C8590A] text-xs mb-6">What is VEERAN?</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-[#1A1A18] leading-[1.15]">
              Products made for
              <br />
              <em className="not-italic">real everyday life.</em>
            </h2>
          </motion.div>

          {/* Right: explanation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-5"
          >
            <p className="text-[#6B6860] text-base lg:text-lg leading-relaxed">
              VEERAN makes bags, baskets, and storage built for how Indians actually live — markets, commutes, offices, homes. Nothing unnecessary. Everything considered.
            </p>
            <p className="text-[#6B6860] leading-relaxed">
              We focus on materials that improve with use, construction that holds under pressure, and designs that don't shout. Built for everyday. Made to last.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-8 h-px bg-[#C8590A]" />
              <span className="label-caps text-[#C8590A] text-xs">Est. India</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
