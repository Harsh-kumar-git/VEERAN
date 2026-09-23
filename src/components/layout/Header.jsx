import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getSettings } from '../../services/dataService';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [siteName, setSiteName] = useState('VEERAN');
  const { count, setIsMiniCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const settings = getSettings();
    setSiteName(settings.siteName || 'VEERAN');
  }, []);

  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Shop', to: '/shop' },
    { label: 'Collections', to: '/collections' },
    { label: 'Our Story', to: '/our-story' },
    { label: 'Journal', to: '/journal' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F4EE]/95 backdrop-blur-md shadow-[0_1px_0_0_#E2DDDA]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-medium tracking-[0.25em] text-[#1A1A18] hover:text-[#C8590A] transition-colors"
              aria-label="VEERAN home"
            >
              {siteName}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10" aria-label="Main navigation">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm transition-all duration-200 relative group ${
                      isActive ? 'text-[#C8590A]' : 'text-[#1A1A18] hover:text-[#C8590A]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute -bottom-1 left-0 h-px bg-[#C8590A] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(v => !v)}
                className="p-2.5 text-[#1A1A18] hover:text-[#C8590A] transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsMiniCartOpen(true)}
                className="p-2.5 text-[#1A1A18] hover:text-[#C8590A] transition-colors relative"
                aria-label={`Cart, ${count} items`}
              >
                <ShoppingBag size={18} />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.6 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C8590A] text-white text-[9px] font-semibold flex items-center justify-center rounded-full"
                  >
                    {count > 9 ? '9+' : count}
                  </motion.span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMobileOpen(v => !v)}
                className="lg:hidden p-2.5 text-[#1A1A18] hover:text-[#C8590A] transition-colors ml-1"
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-[#E2DDDA]"
              >
                <div className="py-4 flex items-center gap-3">
                  <Search size={16} className="text-[#6B6860] flex-shrink-0" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    autoFocus
                    className="flex-1 bg-transparent text-sm text-[#1A1A18] placeholder:text-[#6B6860] outline-none"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
                      }
                    }}
                  />
                  <Link
                    to={`/shop${searchQuery.trim() ? `?search=${encodeURIComponent(searchQuery.trim())}` : ''}`}
                    className="label-caps text-[#C8590A] text-xs hover:underline"
                  >
                    Go
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1A1A18]/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28 }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[#F7F4EE] z-50 lg:hidden flex flex-col pt-20 px-8 pb-10"
              aria-label="Mobile navigation"
            >
              <div className="space-y-1">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `block py-3.5 text-2xl font-display font-medium border-b border-[#E2DDDA] transition-colors ${
                        isActive ? 'text-[#C8590A]' : 'text-[#1A1A18]'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <div className="mt-auto">
                <p className="label-caps text-[#6B6860] text-xs">VEERAN — Built for everyday.</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
