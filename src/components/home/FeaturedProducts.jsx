import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getProducts, getCategories } from '../../services/dataService';
import ProductCard from '../product/ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const allProducts = getProducts();
    const allCats = getCategories();
    setCategories(allCats);
    setProducts(allProducts.filter(p => p.featured).slice(0, 4));
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-24 lg:py-28 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="label-caps text-[#C8590A] text-xs mb-3">Hand-Picked</p>
            <h2 className="font-display text-3xl lg:text-4xl font-medium text-[#1A1A18]">
              Featured Selections
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:flex items-center gap-2 text-sm text-[#6B6860] hover:text-[#C8590A] transition-colors group"
          >
            View All
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, i) => {
            const category = categories.find(c => c.id === product.categoryId);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} category={category} />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile view all */}
        <div className="mt-10 text-center md:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm text-[#1A1A18] font-medium underline underline-offset-4"
          >
            View All Products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
