import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const USE_CASES = [
  {
    id: 'home',
    label: 'Home',
    description: 'Baskets, organisers, and storage for your living space.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    description: 'Totes and bags that carry more and look better doing it.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'storage',
    label: 'Storage',
    description: 'Practical containers for kitchens, closets, and offices.',
    image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Work-ready bags built for the Indian professional.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'everyday',
    label: 'Everyday',
    description: 'The things you grab before you leave. Every single day.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
  },
];

export default function UseCaseGrid() {
  return (
    <section className="py-24 lg:py-28 bg-[#EDE9E1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 lg:mb-16">
          <div>
            <p className="label-caps text-[#C8590A] text-xs mb-3">Find Your Fit</p>
            <h2 className="font-display text-3xl lg:text-4xl font-medium text-[#1A1A18]">
              What are you <em className="not-italic">looking for?</em>
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-sm text-[#6B6860] hover:text-[#C8590A] transition-colors group"
          >
            All Products
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid: 1 large + 4 small */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

          {/* Large featured tile */}
          <motion.div
            className="col-span-2 row-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/shop?usecase=${USE_CASES[0].id}`}
              className="group relative block h-full min-h-[300px] lg:min-h-[500px] overflow-hidden bg-[#1A1A18]"
            >
              <img
                src={USE_CASES[0].image}
                alt={USE_CASES[0].label}
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="label-caps text-[#C8590A] text-xs mb-2">{USE_CASES[0].label}</p>
                <h3 className="font-display text-2xl text-white font-medium">{USE_CASES[0].description}</h3>
                <span className="mt-4 inline-flex items-center gap-2 text-white/70 text-xs group-hover:text-white transition-colors">
                  Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Smaller tiles */}
          {USE_CASES.slice(1).map((useCase, i) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
            >
              <Link
                to={`/shop?usecase=${useCase.id}`}
                className="group relative block h-full min-h-[140px] lg:min-h-[235px] overflow-hidden bg-[#1A1A18]"
              >
                <img
                  src={useCase.image}
                  alt={useCase.label}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                  <p className="label-caps text-[#C8590A] text-[9px] mb-1">{useCase.label}</p>
                  <p className="text-white text-xs leading-snug font-medium line-clamp-2">{useCase.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
