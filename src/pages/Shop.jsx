import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProducts, getCategories } from '../services/dataService';
import ProductCard from '../components/product/ProductCard';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

const PER_PAGE = 12;

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-[#E2DDDA]" />
      <div className="pt-4 space-y-2">
        <div className="h-3 bg-[#E2DDDA] w-1/4" />
        <div className="h-4 bg-[#E2DDDA] w-3/4" />
        <div className="h-4 bg-[#E2DDDA] w-1/4" />
      </div>
    </div>
  );
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    setCategories(getCategories());
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Reset page on filter change
  useEffect(() => setCurrentPage(1), [categorySlug, debouncedSearch, sortBy]);

  const selectedCategory = categories.find(c => c.slug === categorySlug);

  const filtered = useMemo(() => {
    let r = [...products];
    if (selectedCategory) r = r.filter(p => p.categoryId === selectedCategory.id);
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      r = r.filter(p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case 'price-low': return r.sort((a, b) => a.price - b.price);
      case 'price-high': return r.sort((a, b) => b.price - a.price);
      case 'name-asc': return r.sort((a, b) => a.name.localeCompare(b.name));
      default: return r.sort((a, b) => String(b.id).localeCompare(String(a.id)));
    }
  }, [products, selectedCategory, debouncedSearch, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const setCategory = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug) params.set('category', slug);
    else params.delete('category');
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-20 lg:pt-24">
      {/* Page header */}
      <div className="border-b border-[#E2DDDA] bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <p className="label-caps text-[#C8590A] text-xs mb-2">All Products</p>
          <h1 className="font-display text-4xl lg:text-5xl font-medium text-[#1A1A18]">
            {selectedCategory ? selectedCategory.name : 'Shop'}
          </h1>
          {selectedCategory?.description && (
            <p className="mt-3 text-[#6B6860] max-w-lg">{selectedCategory.description}</p>
          )}
        </div>

        {/* Category tabs */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex gap-1 overflow-x-auto pb-0 scrollbar-none">
            <button
              onClick={() => setCategory('')}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                !categorySlug ? 'border-[#C8590A] text-[#C8590A]' : 'border-transparent text-[#6B6860] hover:text-[#1A1A18]'
              }`}
            >
              All
            </button>
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setCategory(c.slug)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  categorySlug === c.slug ? 'border-[#C8590A] text-[#C8590A]' : 'border-transparent text-[#6B6860] hover:text-[#1A1A18]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6860]" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E2DDDA] text-sm text-[#1A1A18] placeholder:text-[#6B6860] focus:outline-none focus:border-[#C8590A] transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Result count */}
            <span className="text-xs text-[#6B6860] flex-1 sm:flex-none">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </span>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white border border-[#E2DDDA] text-sm text-[#1A1A18] py-2.5 px-3 focus:outline-none focus:border-[#C8590A] transition-colors"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filters */}
        {(categorySlug || debouncedSearch) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory && (
              <button
                onClick={() => setCategory('')}
                className="flex items-center gap-1.5 text-xs bg-[#1A1A18] text-white px-3 py-1.5 hover:bg-[#C8590A] transition-colors"
              >
                {selectedCategory.name} <X size={10} />
              </button>
            )}
            {debouncedSearch && (
              <button
                onClick={() => { setSearch(''); setDebouncedSearch(''); }}
                className="flex items-center gap-1.5 text-xs bg-[#1A1A18] text-white px-3 py-1.5 hover:bg-[#C8590A] transition-colors"
              >
                "{debouncedSearch}" <X size={10} />
              </button>
            )}
          </div>
        )}

        {/* Product grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : paginated.length === 0 ? (
          <div className="py-28 text-center">
            <p className="font-display text-2xl text-[#1A1A18] mb-2">No products found</p>
            <p className="text-[#6B6860] text-sm mb-8">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(''); setCategory(''); }}
              className="text-sm font-medium text-[#C8590A] underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            <AnimatePresence>
              {paginated.map((product, i) => {
                const category = categories.find(c => c.id === product.categoryId);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <ProductCard product={product} category={category} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-16 pt-8 border-t border-[#E2DDDA]">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2.5 border border-[#E2DDDA] text-[#6B6860] hover:border-[#1A1A18] hover:text-[#1A1A18] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-[#1A1A18]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2.5 border border-[#E2DDDA] text-[#6B6860] hover:border-[#1A1A18] hover:text-[#1A1A18] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
