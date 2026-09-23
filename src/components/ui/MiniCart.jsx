import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function MiniCart() {
  const { cart, count, total, isMiniCartOpen, setIsMiniCartOpen, removeFromCart, updateQuantity, checkoutViaWhatsApp } = useCart();

  // Close on ESC
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') setIsMiniCartOpen(false); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [setIsMiniCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isMiniCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMiniCartOpen]);

  return (
    <AnimatePresence>
      {isMiniCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-[60]"
            onClick={() => setIsMiniCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F7F4EE] z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2DDDA]">
              <div>
                <p className="label-caps text-[#6B6860]">Your Bag</p>
                <p className="text-lg font-medium text-[#1A1A18]">{count} {count === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={() => setIsMiniCartOpen(false)}
                className="p-2 hover:bg-[#E2DDDA] rounded-sm transition-colors"
                aria-label="Close cart"
              >
                <X size={20} className="text-[#1A1A18]" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag size={40} className="text-[#E2DDDA]" />
                  <div>
                    <p className="font-medium text-[#1A1A18]">Your bag is empty</p>
                    <p className="text-sm text-[#6B6860] mt-1">Add something you love</p>
                  </div>
                  <button
                    onClick={() => setIsMiniCartOpen(false)}
                    className="text-sm font-medium text-[#C8590A] hover:underline underline-offset-2 mt-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <AnimatePresence initial={false}>
                    {cart.map(item => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4 pb-5 border-b border-[#E2DDDA] last:border-0"
                      >
                        {/* Image */}
                        <div className="w-20 h-24 bg-[#EDE9E1] flex-shrink-0 overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#1A1A18] text-sm leading-tight truncate">{item.name}</p>
                          <p className="text-[#C8590A] font-medium text-sm mt-1">₹{item.price.toLocaleString('en-IN')}</p>

                          {/* Quantity control */}
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center border border-[#E2DDDA] hover:border-[#1A1A18] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center border border-[#E2DDDA] hover:border-[#1A1A18] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6B6860] hover:text-[#C8590A] transition-colors self-start mt-0.5"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#E2DDDA] px-6 py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="label-caps text-[#6B6860]">Subtotal</span>
                  <span className="text-xl font-medium text-[#1A1A18]">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-xs text-[#6B6860]">Shipping and taxes calculated at checkout via WhatsApp</p>

                <button
                  onClick={checkoutViaWhatsApp}
                  className="w-full bg-[#1A1A18] text-white py-4 font-medium text-sm tracking-wide hover:bg-[#C8590A] transition-colors duration-300"
                >
                  ENQUIRE ON WHATSAPP
                </button>

                <Link
                  to="/cart"
                  onClick={() => setIsMiniCartOpen(false)}
                  className="block text-center text-sm text-[#6B6860] hover:text-[#1A1A18] transition-colors underline-offset-2 hover:underline"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
