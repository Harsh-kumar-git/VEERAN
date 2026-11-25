import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import VCheckmark from '../ui/VCheckmark';

export default function ProductCard({ product, category, showAddToCart = true }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.in_stock) return;
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden bg-[#EDE9E1] aspect-[3/4]">

        {/* Main image */}
        <motion.img
          src={product.imageUrl}
          alt={product.name}
          className={`absolute inset-0 w-full h-full ${product.categoryId === '5' ? 'object-contain p-2' : 'object-cover'}`}
          loading="lazy"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.featured && (
            <span className="label-caps text-[9px] bg-[#C8590A] text-white px-2 py-1">
              Featured
            </span>
          )}
          {!product.in_stock && (
            <span className="label-caps text-[9px] bg-[#1A1A18] text-white px-2 py-1">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick view on hover */}
        <motion.div
          className="absolute bottom-3 left-3 right-3 z-10"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            to={`/products/${product.id}`}
            className="flex items-center justify-center gap-2 bg-[#F7F4EE]/95 backdrop-blur-sm py-2.5 text-xs font-medium text-[#1A1A18] hover:bg-white transition-colors"
          >
            <Eye size={13} />
            Quick View
          </Link>
        </motion.div>
      </Link>

      {/* Product info */}
      <div className="pt-4 flex flex-col gap-1.5">
        {category && (
          <p className="label-caps text-[#6B6860] text-[10px]">{category.name}</p>
        )}
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-[#1A1A18] leading-snug hover:text-[#C8590A] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-1">
          <p className="text-base font-medium text-[#1A1A18]">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          {showAddToCart && (
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              aria-label={isAdded ? 'Added to bag' : `Add ${product.name} to bag`}
              className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                !product.in_stock
                  ? 'border-[#E2DDDA] text-[#E2DDDA] cursor-not-allowed'
                  : isAdded
                  ? 'border-[#C8590A] bg-[#C8590A] text-white'
                  : 'border-[#E2DDDA] text-[#6B6860] hover:border-[#1A1A18] hover:text-[#1A1A18]'
              }`}
            >
              {isAdded ? (
                <VCheckmark size={14} color="white" animated />
              ) : (
                <ShoppingBag size={14} />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
