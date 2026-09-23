import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { getProducts, getCategories } from '../../services/dataService';

const STEP_1 = [
  { id: 'home', label: 'Home', emoji: '🏠' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'storage', label: 'Storage', emoji: '📦' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'everyday', label: 'Everyday', emoji: '⚡' },
];

const STEP_2 = {
  home: [
    { id: 'small', label: 'Small spaces', hint: 'Under 1 sq ft' },
    { id: 'medium', label: 'Medium rooms', hint: '1–3 sq ft' },
    { id: 'large', label: 'Large areas', hint: 'Wardrobe, pantry' },
  ],
  shopping: [
    { id: 'daily', label: 'Daily grocery run', hint: '5–8 kg' },
    { id: 'weekend', label: 'Weekend market', hint: '10–15 kg' },
    { id: 'bulk', label: 'Bulk monthly shop', hint: '15+ kg' },
  ],
  storage: [
    { id: 'light', label: 'Documents & stationery' },
    { id: 'medium', label: 'Clothes & linens' },
    { id: 'heavy', label: 'Kitchen & pantry' },
  ],
  business: [
    { id: 'laptop', label: 'Laptop + essentials', hint: 'Daily commute' },
    { id: 'full', label: 'Full work bag', hint: 'Meetings, travel' },
    { id: 'compact', label: 'Compact & minimal', hint: 'Quick trips' },
  ],
  travel: [
    { id: 'day', label: 'Day trip', hint: '1–2 days' },
    { id: 'weekend', label: 'Weekend away', hint: '2–4 days' },
    { id: 'extended', label: 'Extended travel', hint: '5+ days' },
  ],
  everyday: [
    { id: 'minimal', label: 'Minimal carry', hint: 'Phone, keys, wallet' },
    { id: 'moderate', label: 'Moderate carry', hint: 'Plus a book or lunch' },
    { id: 'full', label: 'Full day carry', hint: 'Everything you need' },
  ],
};

export default function FindYourVeeran() {
  const [step, setStep] = useState(1);
  const [useCase, setUseCase] = useState(null);
  const [size, setSize] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts(getProducts());
    setCategories(getCategories());
  }, []);

  const handleUseCase = (id) => {
    setUseCase(id);
    setStep(2);
  };

  const handleSize = (id) => {
    setSize(id);
    // Recommend: just pick featured or first 3 in-stock products
    const picks = allProducts.filter(p => p.in_stock).slice(0, 3);
    setRecommended(picks);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setUseCase(null);
    setSize(null);
    setRecommended([]);
  };

  return (
    <section className="py-24 lg:py-28 bg-[#EDE9E1]">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="label-caps text-[#C8590A] text-xs mb-3">Find Your Fit</p>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-[#1A1A18]">
            Find Your VEERAN
          </h2>
          <p className="mt-3 text-[#6B6860] text-sm max-w-sm mx-auto">
            Two quick questions. The right product.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-center font-medium text-[#1A1A18] mb-8 text-lg">
                What are you looking for?
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STEP_1.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleUseCase(option.id)}
                    className="group flex flex-col items-center gap-3 p-6 bg-white border border-[#E2DDDA] hover:border-[#C8590A] hover:bg-[#F7F4EE] transition-all duration-200 text-center"
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="text-sm font-medium text-[#1A1A18] group-hover:text-[#C8590A] transition-colors">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && useCase && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <p className="font-medium text-[#1A1A18] text-lg">
                  What's your typical load?
                </p>
                <button onClick={reset} className="text-xs text-[#6B6860] flex items-center gap-1.5 hover:text-[#C8590A]">
                  <RotateCcw size={12} /> Start over
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(STEP_2[useCase] || STEP_2.everyday).map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleSize(option.id)}
                    className="group flex flex-col items-start gap-1.5 p-6 bg-white border border-[#E2DDDA] hover:border-[#C8590A] hover:bg-[#F7F4EE] transition-all text-left"
                  >
                    <span className="font-medium text-[#1A1A18] group-hover:text-[#C8590A] transition-colors">
                      {option.label}
                    </span>
                    {option.hint && (
                      <span className="text-xs text-[#6B6860]">{option.hint}</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="label-caps text-[#C8590A] text-xs mb-1">Your Recommendations</p>
                  <p className="font-display text-xl font-medium text-[#1A1A18]">
                    Based on your answers
                  </p>
                </div>
                <button onClick={reset} className="text-xs text-[#6B6860] flex items-center gap-1.5 hover:text-[#C8590A]">
                  <RotateCcw size={12} /> Try again
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {recommended.map(product => {
                  const category = categories.find(c => c.id === product.categoryId);
                  return (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="group bg-white border border-[#E2DDDA] hover:border-[#C8590A] transition-colors overflow-hidden"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[#EDE9E1]">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        {category && <p className="label-caps text-[#6B6860] text-[9px] mb-1">{category.name}</p>}
                        <p className="font-medium text-[#1A1A18] text-sm line-clamp-2">{product.name}</p>
                        <p className="text-[#C8590A] text-sm font-medium mt-1">₹{product.price.toLocaleString('en-IN')}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1A1A18] hover:text-[#C8590A] underline underline-offset-4 transition-colors"
                >
                  Browse all products <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-12">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-300 ${
                s === step ? 'w-8 bg-[#C8590A]' : s < step ? 'w-4 bg-[#C8590A]/40' : 'w-4 bg-[#E2DDDA]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
