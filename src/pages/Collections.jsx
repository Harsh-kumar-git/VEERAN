import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCategories, getProducts } from '../services/dataService';

const COLLECTIONS = [
  {
    id: 'everyday-carry',
    title: 'Everyday Carry',
    description: 'The bag you leave the house with, every single day. Light, organized, and ready.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
    filter: 'everyday',
  },
  {
    id: 'market-ready',
    title: 'Market Ready',
    description: 'Load-bearing, structured, and easy to clean. For the weekly shop and beyond.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200',
    filter: 'shopping',
  },
  {
    id: 'home-organised',
    title: 'Home Organised',
    description: 'Baskets, bins, and containers that actually fit Indian home sizes.',
    image: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&q=80&w=1200',
    filter: 'home',
  },
  {
    id: 'work-essentials',
    title: 'Work Essentials',
    description: 'From desk to commute and back. Professional without being uncomfortable.',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200',
    filter: 'business',
  },
];

export default function Collections() {
  const [categories, setCategories] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  useEffect(() => {
    const cats = getCategories();
    const products = getProducts();
    setCategories(cats);
    const counts = {};
    cats.forEach(c => {
      counts[c.id] = products.filter(p => p.categoryId === c.id).length;
    });
    setProductCounts(counts);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-16 lg:pt-20">
      {/* Header */}
      <div className="py-16 lg:py-20 px-6 lg:px-10 border-b border-[#E2DDDA]">
        <div className="max-w-7xl mx-auto">
          <p className="label-caps text-[#C8590A] text-xs mb-3">Explore</p>
          <h1 className="font-display text-4xl lg:text-6xl font-medium text-[#1A1A18]">Collections</h1>
          <p className="mt-4 text-[#6B6860] max-w-md">
            Products grouped by how you actually use them — not just what they are.
          </p>
        </div>
      </div>

      {/* Curated collections */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
        <p className="label-caps text-[#6B6860] text-xs mb-8">Curated for everyday</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/shop?usecase=${col.filter}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-[#1A1A18]"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/80 via-[#1A1A18]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-9">
                  <h2 className="font-display text-2xl lg:text-3xl text-white font-medium mb-2">{col.title}</h2>
                  <p className="text-white/65 text-sm mb-5 max-w-xs">{col.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-[#C8590A] transition-colors">
                    Explore <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* By category */}
      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16 border-t border-[#E2DDDA]">
          <p className="label-caps text-[#6B6860] text-xs mb-8">By Category</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="group flex items-center justify-between p-6 bg-white border border-[#E2DDDA] hover:border-[#C8590A] transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-[#1A1A18] group-hover:text-[#C8590A] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#6B6860] mt-1">
                      {productCounts[cat.id] || 0} products
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-[#E2DDDA] group-hover:text-[#C8590A] group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
