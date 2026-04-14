import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getCategories, getSettings } from '../../services/dataService';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [siteConfig, setSiteConfig] = useState({ siteName: 'VEERAN' });
  const location = useLocation();

  useEffect(() => {
    setCategories(getCategories());
    setSiteConfig(getSettings());
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Products', path: '/products' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 lg:h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-medium tracking-widest text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 rounded-sm"
          >
            {siteConfig.siteName}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm transition-all border-b-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 rounded-sm ${
                    isActive 
                      ? 'border-stone-900 text-stone-900 font-medium' 
                      : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-200'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            {/* Categories Dropdown */}
            <div className="relative group flex items-center h-full cursor-pointer text-sm text-stone-600 hover:text-stone-900 transition-colors">
              <span className={`py-1 border-b-2 transition-all ${location.search.includes('category=') ? 'border-stone-900 text-stone-900 font-medium' : 'border-transparent group-hover:border-stone-200'}`}>
                Categories
              </span>
              
              <div className="absolute top-10 lg:top-12 left-1/2 -translate-x-1/2 w-48 bg-white border border-stone-100 shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col py-2 z-50">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.slug}`}
                    className="px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:bg-stone-50"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base rounded-md tracking-wider transition-colors ${
                      isActive 
                        ? 'bg-stone-50 text-stone-900 font-medium' 
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              <div className="px-3 py-2 text-stone-400 font-medium mt-4 tracking-wider uppercase text-xs">Categories</div>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded-md ml-4 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
