import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCategories, getProducts } from '../services/dataService';
import ProductCard from '../components/product/ProductCard';
import Carousel from '../components/ui/Carousel';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setCategories(getCategories());
    
    // Fetch and slice featured products
    const products = getProducts();
    setAllProducts(products);
    
    const featured = products.filter(p => p.featured).slice(0, 4);
    setFeaturedProducts(featured);
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <Carousel />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="w-full py-24 border-t border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-2xl md:text-3xl font-medium text-stone-900 tracking-tight">Featured Selections</h2>
              <Link to="/products" className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors hidden sm:block">
                View All Products
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product, index) => {
                const category = categories.find(c => c.id === product.categoryId);
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} category={category} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Browse by Category */}
      <section className="w-full bg-stone-50 py-24 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-medium text-stone-900 tracking-tight">Browse by Category</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category, index) => {
              const count = allProducts.filter(p => p.categoryId === category.id).length;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link 
                    to={`/products?category=${category.slug}`}
                    className="group block relative aspect-square md:aspect-[4/5] overflow-hidden bg-white border border-stone-100 p-8 flex flex-col justify-end hover:border-stone-200 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-stone-200/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="z-10 relative">
                      <h3 className="text-xl font-medium text-stone-900 mb-2">{category.name}</h3>
                      <div className="flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <p className="text-sm text-stone-600 max-w-[80%] line-clamp-2">
                          {category.description}
                        </p>
                        <span className="text-xs font-medium text-stone-400 tabular-nums">
                          {count} {count === 1 ? 'Item' : 'Items'}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
