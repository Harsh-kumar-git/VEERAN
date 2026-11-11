import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Droplets } from 'lucide-react';

const BOTTLE_SPOTLIGHTS = [
  {
    id: 'bottle_snowy_penguin',
    name: 'Snowy Penguin',
    tagline: 'Cool Sips All Day',
    slogan: 'Your Chilly Buddy Everyday!',
    image: '/images/bottles/snowy-penguin-poster.jpg',
    color: '#0284C7',
    badge: 'Best For Cold Sips'
  },
  {
    id: 'bottle_ella_elephant',
    name: 'Ella The Elephant',
    tagline: 'Big on Style, Bigger on Hydration',
    slogan: 'Sip Happier Everyday',
    image: '/images/bottles/ella-elephant-poster.jpg',
    color: '#6366F1',
    badge: 'Gentle & Big Capacity'
  },
  {
    id: 'bottle_shiba_pup',
    name: 'Shiba Pup',
    tagline: 'Playful Sips For Brighter Days',
    slogan: 'Stay Pawsitive & Hydrated!',
    image: '/images/bottles/shiba-pup-poster.jpg',
    color: '#D97706',
    badge: 'Most Energetic'
  },
  {
    id: 'bottle_moo_moo',
    name: 'Moo Moo Cow',
    tagline: 'Fresh Sips Every Day',
    slogan: 'Mooo Hydration, Mooore Happiness!',
    image: '/images/bottles/moo-moo-bottle-poster.jpg',
    color: '#10B981',
    badge: 'Fresh & Cheerful'
  },
  {
    id: 'bottle_kitty_delight',
    name: 'Kitty Delight',
    tagline: 'Cute Sips for a Happier You',
    slogan: 'Stay Cute, Stay Hydrated',
    image: '/images/bottles/kitty-delight-poster.jpg',
    color: '#EC4899',
    badge: 'Sweet & Adorable'
  }
];

export default function BottlePosterShowcase() {
  return (
    <section className="w-full py-20 bg-stone-900 text-stone-100 relative overflow-hidden" aria-label="Animal Character Bottle Collection">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-medium tracking-wider uppercase mb-4">
              <Sparkles size={13} />
              <span>New Arrival Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white font-serif">
              Animal Character Insulated Bottles
            </h2>
            <p className="mt-4 text-stone-300 text-base sm:text-lg leading-relaxed">
              Whimsical 3D character lids meet heavy-duty double-wall vacuum insulation. 
              Food-grade stainless steel that keeps drinks ice cold or piping hot for hours.
            </p>
          </div>
          <Link
            to="/shop?category=bottles"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-white bg-amber-600 hover:bg-amber-500 px-6 py-3.5 rounded-sm transition-all shadow-md group self-start md:self-auto"
          >
            <span>View All Bottles</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="flex items-center gap-3 p-3.5 bg-stone-800/80 border border-stone-700/60 rounded-sm">
            <Flame className="text-amber-400 shrink-0" size={20} />
            <span className="text-xs text-stone-200 font-medium">Keeps Hot & Cold For Hours</span>
          </div>
          <div className="flex items-center gap-3 p-3.5 bg-stone-800/80 border border-stone-700/60 rounded-sm">
            <ShieldCheck className="text-emerald-400 shrink-0" size={20} />
            <span className="text-xs text-stone-200 font-medium">Food Grade Stainless Steel</span>
          </div>
          <div className="flex items-center gap-3 p-3.5 bg-stone-800/80 border border-stone-700/60 rounded-sm">
            <Sparkles className="text-sky-400 shrink-0" size={20} />
            <span className="text-xs text-stone-200 font-medium">100% BPA Free & Safe</span>
          </div>
          <div className="flex items-center gap-3 p-3.5 bg-stone-800/80 border border-stone-700/60 rounded-sm">
            <Droplets className="text-cyan-400 shrink-0" size={20} />
            <span className="text-xs text-stone-200 font-medium">Leak Proof Silicone Seal</span>
          </div>
        </div>

        {/* 5 Poster Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {BOTTLE_SPOTLIGHTS.map((bottle) => (
            <Link
              key={bottle.id}
              to={`/products/${bottle.id}`}
              className="group flex flex-col bg-stone-800/60 border border-stone-700/50 hover:border-amber-500/60 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
            >
              {/* Poster image container */}
              <div className="relative aspect-[1/2.5] w-full overflow-hidden bg-stone-950">
                <img
                  src={bottle.image}
                  alt={`${bottle.name} Poster`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-sm text-stone-200 text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-sm border border-stone-700 font-medium">
                  {bottle.badge}
                </span>
                <span className="absolute bottom-3 right-3 bg-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-sm shadow-md">
                  ₹699
                </span>
              </div>

              {/* Info footer */}
              <div className="p-4 flex flex-col flex-1 justify-between bg-stone-850">
                <div>
                  <h3 className="font-serif text-lg text-white group-hover:text-amber-400 transition-colors">
                    {bottle.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 italic">
                    "{bottle.tagline}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-700/60 flex items-center justify-between text-xs text-amber-400 font-medium">
                  <span>View Details</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
