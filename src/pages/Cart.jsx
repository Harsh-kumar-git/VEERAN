import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import VCheckmark from '../components/ui/VCheckmark';

export default function Cart() {
  const { cart, count, total, removeFromCart, updateQuantity, clearCart, checkoutViaWhatsApp } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] pt-20 flex flex-col items-center justify-center px-6 text-center">
        <ShoppingBag size={56} className="text-[#E2DDDA] mb-6" />
        <h1 className="font-display text-3xl font-medium text-[#1A1A18] mb-3">Your bag is empty</h1>
        <p className="text-[#6B6860] mb-10 max-w-xs">You haven't added anything yet. Find something you'll reach for every day.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-[#1A1A18] text-white px-8 py-4 text-sm font-medium hover:bg-[#C8590A] transition-colors group"
        >
          Start Shopping
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-10 pb-6 border-b border-[#E2DDDA]">
          <div>
            <p className="label-caps text-[#C8590A] text-xs mb-1">Review</p>
            <h1 className="font-display text-3xl lg:text-4xl font-medium text-[#1A1A18]">
              Your Bag ({count})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-[#6B6860] hover:text-[#C8590A] transition-colors underline-offset-2 hover:underline"
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-5 sm:gap-7 pb-6 border-b border-[#E2DDDA] last:border-0"
              >
                {/* Image */}
                <Link to={`/products/${item.id}`} className="flex-shrink-0 w-24 sm:w-28 aspect-[3/4] bg-[#EDE9E1] overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className={`w-full h-full ${item.categoryId === '5' ? 'object-contain p-1' : 'object-cover'}`} loading="lazy" />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <Link to={`/products/${item.id}`} className="font-medium text-[#1A1A18] hover:text-[#C8590A] transition-colors line-clamp-2">
                    {item.name}
                  </Link>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto gap-4 pt-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-[#E2DDDA] w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-[#EDE9E1] transition-colors"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 text-sm font-medium min-w-[32px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-[#EDE9E1] transition-colors"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price & remove */}
                    <div className="flex items-center gap-5">
                      <span className="font-medium text-[#1A1A18]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#6B6860] hover:text-[#C8590A] transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E2DDDA] p-7 sticky top-24">
              <h2 className="font-medium text-[#1A1A18] mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 text-sm">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-[#6B6860] truncate mr-4">{item.name} ×{item.quantity}</span>
                    <span className="text-[#1A1A18] font-medium flex-shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E2DDDA] pt-4 mb-7">
                <div className="flex justify-between items-baseline">
                  <span className="label-caps text-[#6B6860] text-xs">Subtotal</span>
                  <span className="font-display text-2xl font-medium text-[#1A1A18]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-xs text-[#6B6860] mt-2">Shipping and final pricing confirmed via WhatsApp</p>
              </div>

              <button
                onClick={checkoutViaWhatsApp}
                className="w-full bg-[#1A1A18] text-white py-4 text-sm font-medium hover:bg-[#C8590A] transition-colors duration-300 mb-3"
              >
                ENQUIRE ON WHATSAPP
              </button>

              <Link
                to="/shop"
                className="block text-center text-sm text-[#6B6860] hover:text-[#1A1A18] transition-colors underline-offset-2 hover:underline"
              >
                Continue Shopping
              </Link>

              {/* Trust markers */}
              <div className="mt-7 pt-6 border-t border-[#E2DDDA] space-y-3">
                {[
                  'Verified Indian seller',
                  'Quality guaranteed',
                  'Responsive support',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#6B6860]">
                    <VCheckmark size={12} color="#C8590A" animated={false} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
