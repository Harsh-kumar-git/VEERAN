import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCategories, getProducts } from '../services/dataService';
import ProductCard from '../components/product/ProductCard';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Controls
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;

  useEffect(() => {
    setCategories(getCategories());
    setProducts(getProducts());
    
    // Simulate initial loading overhead for skeleton pops
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset to page 1 on filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [categorySlug, debouncedSearch, sortBy]);

  const category = categories.find(c => c.slug === categorySlug);
  
  // Apply filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (category) {
      result = result.filter(p => p.categoryId === category.id);
    }

    // Filter by Search
    if (debouncedSearch.trim() !== '') {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
    }

    return result;
  }, [products, category, sortBy, debouncedSearch]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleCategoryChange = (slug) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Header section */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-light text-stone-900 tracking-tight">
            {category ? category.name : 'All Products'}
          </h1>
          {category && (
            <p className="mt-2 text-stone-600">
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Control Bar */}
      <div className="mb-10 border border-stone-200 bg-stone-50 p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-stone-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-stone-200 bg-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900 text-sm text-stone-900 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Category Filter */}
          <div className="w-full sm:w-auto flex items-center shrink-0">
            <span className="text-sm font-medium text-stone-600 mr-2 whitespace-nowrap hidden sm:inline-block">Category:</span>
            <select
              value={categorySlug || ''}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full sm:w-48 bg-white border border-stone-200 text-stone-900 text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-colors"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="w-full sm:w-auto flex items-center shrink-0">
            <span className="text-sm font-medium text-stone-600 mr-2 whitespace-nowrap hidden sm:inline-block">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-48 bg-white border border-stone-200 text-stone-900 text-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-colors"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>
        </div>

      </div>

      {/* Results Count */}
      <div className="mb-6 text-sm text-stone-500 font-medium tracking-wide">
        SHOWING {filteredAndSortedProducts.length} RESULT{filteredAndSortedProducts.length !== 1 && 'S'}
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse flex flex-col h-full bg-white border border-stone-100">
              <div className="aspect-[4/5] bg-stone-200"></div>
              <div className="p-6 flex flex-col flex-1">
                <div className="h-3 bg-stone-200 w-1/4 mb-4 rounded"></div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="h-5 bg-stone-200 w-1/2 rounded"></div>
                  <div className="h-5 bg-stone-200 w-1/4 rounded"></div>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-stone-200 w-full rounded"></div>
                  <div className="h-3 bg-stone-200 w-full rounded"></div>
                  <div className="h-3 bg-stone-200 w-2/3 rounded"></div>
                </div>
                <div className="mt-auto h-10 bg-stone-200 w-full rounded-sm"></div>
              </div>
            </div>
          ))}
        </div>
      ) : paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {paginatedProducts.map((product, index) => {
            const prodCategory = categories.find(c => c.id === product.categoryId);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} category={prodCategory} />
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center bg-stone-50 border border-stone-100 flex flex-col items-center justify-center">
          <Search className="w-10 h-10 text-stone-300 mb-4" />
          <h3 className="text-lg font-medium text-stone-900">No products found</h3>
          <p className="mt-1 text-stone-500">Try adjusting your filters or search query.</p>
          {(categorySlug || searchQuery) && (
            <button 
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('');
              }}
              className="mt-6 px-6 py-2 border border-stone-300 text-stone-900 hover:bg-stone-100 transition-colors text-sm font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center border-t border-stone-200 pt-8">
          <nav className="flex items-center gap-2" aria-label="Pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 text-sm font-medium text-stone-900">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}

    </div>
  );
}
