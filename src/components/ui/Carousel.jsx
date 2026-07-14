import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: '/images/bags/1000176910.jpg',
    title: 'LUMINOUS CASCADE',
    tagline: 'Premium designer sling bag, crafted for everyday grace.',
    cta: 'Explore Collection'
  },
  {
    id: 2,
    image: '/images/bags/1000176913.jpg',
    title: 'MIDNIGHT BLOOM',
    tagline: 'Sophisticated tote silhouette and premium craftsmanship.',
    cta: 'Shop Now'
  },
  {
    id: 3,
    image: '/images/bags/1000176916.jpg',
    title: 'CRIMSON TIDE',
    tagline: 'Designed with meticulous precision and bold details.',
    cta: 'View Catalog'
  },
  {
    id: 4,
    image: '/images/bags/1000176919.jpg',
    title: 'OBSIDIAN GRACE',
    tagline: 'An elegant clutch for the contemporary lifestyle.',
    cta: 'Discover More'
  }
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x;

    if (swipe < -50) {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    } else if (swipe > 50) {
      setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    }
  };

  return (
    <section 
      className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-stone-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={SLIDES[current].image}
              alt={SLIDES[current].title}
              loading={current === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover select-none"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 z-10 pointer-events-none">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-widest text-white mb-4"
            >
              {SLIDES[current].title}
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl font-light text-stone-200 mb-10 max-w-2xl"
            >
              {SLIDES[current].tagline}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="pointer-events-auto"
            >
              <Link 
                to="/products"
                className="group inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-stone-900 transition-all duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
              >
                {SLIDES[current].cta}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              index === current ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
