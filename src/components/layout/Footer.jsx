import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSettings, getCategories } from '../../services/dataService';

export default function Footer() {
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState({ siteName: 'VEERAN', contactEmail: '', whatsappNumber: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setSettings(getSettings());
    setCategories(getCategories());
  }, []);

  const displayPhone = settings.whatsappNumber
    ? `+${settings.whatsappNumber.replace(/(\d{2})(\d{5})(\d{5})/, '$1 $2 $3')}`
    : '+91 00000 00000';

  return (
    <footer className="bg-[#1A1A18] text-[#F7F4EE] mt-auto">
      {/* Brand statement band */}
      <div className="border-b border-white/10 py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-[#F7F4EE] leading-tight">
            Built for everyday.<br />
            <em className="not-italic text-[#C8590A]">Made to last.</em>
          </p>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="text-xl font-medium tracking-[0.25em] text-[#F7F4EE] hover:text-[#C8590A] transition-colors">
              {settings.siteName}
            </Link>
            <p className="text-sm text-[#F7F4EE]/60 leading-relaxed max-w-sm">
              Practical, well-designed products made for real Indian everyday life. We believe useful things can also be beautiful.
            </p>
            {/* Social placeholders */}
            <div className="flex gap-3 pt-2">
              {['Instagram', 'Pinterest'].map(s => (
                <span
                  key={s}
                  className="text-xs text-[#F7F4EE]/40 border border-white/10 px-3 py-1.5 cursor-not-allowed"
                  title="Coming soon"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div className="space-y-5">
            <h4 className="label-caps text-[#C8590A] text-xs">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-sm text-[#F7F4EE]/70 hover:text-[#F7F4EE] transition-colors">All Products</Link></li>
              {categories.map(c => (
                <li key={c.id}>
                  <Link to={`/shop?category=${c.slug}`} className="text-sm text-[#F7F4EE]/70 hover:text-[#F7F4EE] transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li><Link to="/collections" className="text-sm text-[#F7F4EE]/70 hover:text-[#F7F4EE] transition-colors">Collections</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="label-caps text-[#C8590A] text-xs">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${settings.contactEmail || 'hello@veeran.in'}`} className="group block">
                  <span className="label-caps text-[#F7F4EE]/40 text-[10px] block mb-0.5">Email</span>
                  <span className="text-sm text-[#F7F4EE]/70 group-hover:text-[#F7F4EE] transition-colors">
                    {settings.contactEmail || 'hello@veeran.in'}
                  </span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${settings.whatsappNumber?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="group block">
                  <span className="label-caps text-[#F7F4EE]/40 text-[10px] block mb-0.5">WhatsApp</span>
                  <span className="text-sm text-[#F7F4EE]/70 group-hover:text-[#F7F4EE] transition-colors">{displayPhone}</span>
                </a>
              </li>
              <li>
                <Link to="/our-story" className="group block">
                  <span className="label-caps text-[#F7F4EE]/40 text-[10px] block mb-0.5">Company</span>
                  <span className="text-sm text-[#F7F4EE]/70 group-hover:text-[#F7F4EE] transition-colors">Our Story</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-6 lg:px-10 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#F7F4EE]/40">
          <p>&copy; {year} {settings.siteName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/admin" className="hover:text-[#F7F4EE]/70 transition-colors">Admin</Link>
            <a href="#" className="hover:text-[#F7F4EE]/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#F7F4EE]/70 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
