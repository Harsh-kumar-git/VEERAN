import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Plus, Minus, Share2 } from 'lucide-react';
import { getProducts, getCategories } from '../services/dataService';
import { useCart } from '../context/CartContext';
import VCheckmark from '../components/ui/VCheckmark';
import ProductCard from '../components/product/ProductCard';
import reviews from '../data/reviews.json';

function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? '#C8590A' : 'none'}
          stroke="#C8590A" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [related, setRelated] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [shareMsg, setShareMsg] = useState('');

  useEffect(() => {
    const products = getProducts();
    const cats = getCategories();
    setCategories(cats);
    const found = products.find(p => p.id === id);
    if (!found) { navigate('/shop'); return; }
    setProduct(found);
    const cat = cats.find(c => c.id === found.categoryId);
    setCategory(cat);
    // Related: same category, exclude self
    const rel = products.filter(p => p.categoryId === found.categoryId && p.id !== found.id).slice(0, 4);
    setRelated(rel);
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const productReviews = reviews.filter(r => r.productId === product?.id);
  const avgRating = productReviews.length
    ? productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length
    : 4.7;

  const handleAddToCart = () => {
    if (!product?.in_stock) return;
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareMsg('Link copied!');
      setTimeout(() => setShareMsg(''), 2000);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] pt-24 flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl px-6">
          <div className="h-8 bg-[#E2DDDA] w-1/3" />
          <div className="h-64 bg-[#E2DDDA] w-full" />
        </div>
      </div>
    );
  }

  const TABS = [
    { id: 'details', label: 'Details' },
    { id: 'care', label: 'Care' },
    { id: 'reviews', label: `Reviews (${productReviews.length || '—'})` },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EE] pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 border-b border-[#E2DDDA]">
        <nav className="flex items-center gap-2 text-xs text-[#6B6860]">
          <Link to="/" className="hover:text-[#C8590A] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#C8590A] transition-colors">Shop</Link>
          {category && (
            <>
              <span>/</span>
              <Link to={`/shop?category=${category.slug}`} className="hover:text-[#C8590A] transition-colors">{category.name}</Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#1A1A18] truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Images */}
          <div className="space-y-3">
            <motion.div
              className="relative aspect-[4/5] bg-[#EDE9E1] overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className={`w-full h-full ${product.categoryId === '5' ? 'object-contain p-4' : 'object-cover'}`}
                loading="eager"
              />
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <span className="label-caps text-[9px] bg-[#C8590A] text-white px-2.5 py-1.5">Featured</span>
                </div>
              )}
            </motion.div>

            {/* Real-world context image placeholder */}
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square bg-[#EDE9E1] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600"
                  alt="In-use view"
                  className="w-full h-full object-cover opacity-80"
                  loading="lazy"
                />
              </div>
              <div className="aspect-square bg-[#EDE9E1] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558171813-c56ddc8d3a55?auto=format&fit=crop&q=80&w=600"
                  alt="Material detail"
                  className="w-full h-full object-cover opacity-80"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right: Product info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            {/* Category */}
            {category && (
              <Link to={`/shop?category=${category.slug}`} className="label-caps text-[#C8590A] text-xs mb-3 inline-block hover:underline">
                {category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="font-display text-3xl lg:text-4xl font-medium text-[#1A1A18] leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-4">
              <StarDisplay rating={avgRating} />
              <span className="text-xs text-[#6B6860]">{avgRating.toFixed(1)} · {productReviews.length || 'No'} reviews</span>
            </div>

            {/* Description */}
            <p className="mt-5 text-[#6B6860] leading-relaxed text-sm lg:text-base">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl font-medium text-[#1A1A18]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#6B6860]">incl. taxes</span>
            </div>

            {/* Key characteristics */}
            <div className="mt-6 space-y-2.5">
              {[
                'Reinforced seams and stress points',
                'Wipe-clean exterior',
                'Designed for daily use',
              ].map(trait => (
                <div key={trait} className="flex items-start gap-2.5 text-sm text-[#6B6860]">
                  <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8590A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 13L9 18L20 6" />
                  </svg>
                  {trait}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-7 border-t border-[#E2DDDA]" />

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-5">
              <span className="label-caps text-xs text-[#6B6860]">Quantity</span>
              <div className="flex items-center border border-[#E2DDDA]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3.5 py-2 hover:bg-[#EDE9E1] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="px-4 text-sm font-medium text-[#1A1A18] min-w-[40px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3.5 py-2 hover:bg-[#EDE9E1] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart CTA */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className={`w-full flex items-center justify-center gap-2.5 py-4 text-sm font-medium transition-all duration-300 ${
                  !product.in_stock
                    ? 'bg-[#E2DDDA] text-[#6B6860] cursor-not-allowed'
                    : isAdded
                    ? 'bg-[#C8590A] text-white'
                    : 'bg-[#1A1A18] text-white hover:bg-[#C8590A]'
                }`}
              >
                {!product.in_stock ? (
                  'Out of Stock'
                ) : isAdded ? (
                  <>
                    <VCheckmark size={16} color="white" animated /> Added to bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to Bag
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="w-full py-3.5 text-sm font-medium border border-[#E2DDDA] text-[#6B6860] hover:border-[#1A1A18] hover:text-[#1A1A18] transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={14} />
                {shareMsg || 'Share'}
              </button>
            </div>

            {/* Spec tabs */}
            <div className="mt-10">
              <div className="flex border-b border-[#E2DDDA]">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-b-2 border-[#C8590A] text-[#C8590A] -mb-px'
                        : 'text-[#6B6860] hover:text-[#1A1A18]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="pt-5"
                >
                  {activeTab === 'details' && (
                    <dl className="space-y-3">
                      {[
                        { label: 'Material', value: 'Canvas / Woven fabric' },
                        { label: 'Dimensions', value: 'Approx. 38 × 28 × 12 cm' },
                        { label: 'Weight', value: '~350g (empty)' },
                        { label: 'Closure', value: 'Zipper / Magnetic snap' },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between py-2 border-b border-[#E2DDDA]/60 text-sm">
                          <dt className="text-[#6B6860]">{item.label}</dt>
                          <dd className="text-[#1A1A18] font-medium">{item.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-3 text-sm text-[#6B6860] leading-relaxed">
                      <p>Wipe clean with a damp cloth. Do not machine wash.</p>
                      <p>Store in a cool, dry place. Avoid prolonged exposure to direct sunlight.</p>
                      <p>For deeper cleaning, use a mild soap solution and air dry completely before use.</p>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-5">
                      {productReviews.length === 0 ? (
                        <p className="text-sm text-[#6B6860]">No reviews for this product yet.</p>
                      ) : (
                        productReviews.map(r => (
                          <div key={r.id} className="pb-5 border-b border-[#E2DDDA] last:border-0">
                            <div className="flex items-center gap-2 mb-2">
                              <StarDisplay rating={r.rating} />
                              <span className="label-caps text-[#C8590A] text-[9px]">✓ Verified</span>
                            </div>
                            <p className="text-sm text-[#1A1A18] mb-1.5">"{r.text}"</p>
                            <p className="text-xs text-[#6B6860]">{r.author}, {r.location}</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#E2DDDA]">
            <h2 className="font-display text-2xl lg:text-3xl font-medium text-[#1A1A18] mb-10">
              You might also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
              {related.map((p, i) => {
                const cat = categories.find(c => c.id === p.categoryId);
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <ProductCard product={p} category={cat} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
