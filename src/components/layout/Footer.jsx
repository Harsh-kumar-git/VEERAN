import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getSettings } from '../../services/dataService';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState([]);
  const [siteConfig, setSiteConfig] = useState({
    siteName: 'VEERAN',
    contactEmail: '',
    whatsappNumber: ''
  });

  useEffect(() => {
    setCategories(getCategories());
    setSiteConfig(getSettings());
  }, []);

  // Format phone number for display if available
  const displayPhone = siteConfig.whatsappNumber 
    ? `+${siteConfig.whatsappNumber.replace(/(\d{2})(\d{5})(\d{5})/, '$1 $2 $3')}`
    : '';

  return (
    <footer className="bg-stone-50 border-t border-stone-100 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Info */}
          <div className="space-y-4">
            <Link to="/" className="text-xl font-medium tracking-widest text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm">
              {siteConfig.siteName}
            </Link>
            <p className="text-sm text-stone-600 max-w-sm leading-relaxed">
              Curated essentials for the modern space. We believe in minimal, functional, and timeless design that elevates everyday living.
            </p>
          </div>

          {/* Quick Links / Categories */}
          <div className="space-y-5">
            <h4 className="text-sm font-medium text-stone-900 uppercase tracking-widest">Shop Collection</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/products?category=${category.slug}`}
                    className="text-sm text-stone-600 hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-sm font-medium text-stone-900 uppercase tracking-widest">Contact & Support</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                >
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Email</span>
                  <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">{siteConfig.contactEmail || 'hello@veeran.com'}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${siteConfig.whatsappNumber.replace(/\D/g, '')}`}
                  className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                >
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">Phone</span>
                  <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">{displayPhone || '+91 00000 00000'}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
                >
                  <span className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-1">WhatsApp</span>
                  <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">Start a Conversation</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200/80 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p className="tracking-wide">
            &copy; {currentYear} {siteConfig.siteName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm">Privacy Policy</a>
            <a href="#" className="hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
