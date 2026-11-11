import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Droplets, Heart, Feather, Coffee } from 'lucide-react';

const BOTTLE_COLLECTIONS = [
  {
    key: 'animal',
    title: 'Animal Characters',
    subtitle: '3D Cute Friends with Double-Wall Vacuum Insulation',
    banner: '/images/bottles/kids-animal-bottles-collection-poster.jpg',
    features: [
      { icon: Flame, text: 'Keeps Hot & Cold For Hours' },
      { icon: ShieldCheck, text: 'Food Grade Stainless Steel' },
      { icon: Sparkles, text: '100% BPA Free & Safe' },
      { icon: Droplets, text: 'Leak Proof Character Lid' }
    ],
    items: [
      {
        id: 'bottle_snowy_penguin',
        name: 'Snowy Penguin',
        tagline: 'Cool Sips All Day',
        price: '₹699',
        badge: 'Chilly Buddy',
        image: '/images/bottles/snowy-penguin-poster.jpg',
        specs: 'Stainless Steel • Double-Wall'
      },
      {
        id: 'bottle_ella_elephant',
        name: 'Ella The Elephant',
        tagline: 'Big on Style, Bigger on Hydration',
        price: '₹699',
        badge: 'Sip Happier',
        image: '/images/bottles/ella-elephant-poster.jpg',
        specs: 'Stainless Steel • Double-Wall'
      },
      {
        id: 'bottle_shiba_pup',
        name: 'Shiba Pup',
        tagline: 'Playful Sips For Brighter Days',
        price: '₹699',
        badge: 'Stay Pawsitive',
        image: '/images/bottles/shiba-pup-poster.jpg',
        specs: 'Stainless Steel • Double-Wall'
      },
      {
        id: 'bottle_moo_moo',
        name: 'Moo Moo Cow',
        tagline: 'Fresh Sips Every Day',
        price: '₹699',
        badge: 'Mooo Happiness',
        image: '/images/bottles/moo-moo-bottle-poster.jpg',
        specs: 'Stainless Steel • Double-Wall'
      },
      {
        id: 'bottle_kitty_delight',
        name: 'Kitty Delight',
        tagline: 'Cute Sips for a Happier You',
        price: '₹699',
        badge: 'Stay Cute',
        image: '/images/bottles/kitty-delight-poster.jpg',
        specs: 'Stainless Steel • Double-Wall'
      }
    ]
  },
  {
    key: 'fluted',
    title: 'Ribbed & Fluted Pastel',
    subtitle: '350ml Compact Everyday Bottles with Beaded Easy-Carry Loop',
    banner: '/images/bottles/fluted-pastel-bottles-collection-poster.jpg',
    features: [
      { icon: Feather, text: 'Compact 350ml Everyday Size' },
      { icon: Droplets, text: 'Beaded Easy-Carry Strap' },
      { icon: Sparkles, text: 'Modern Tactile Ribbed Grip' },
      { icon: ShieldCheck, text: 'Leak Proof Precision Cap' }
    ],
    items: [
      {
        id: 'bottle_fluted_classic_ivory',
        name: 'Classic Ivory',
        tagline: 'Compact Everyday Size',
        price: '₹549',
        badge: '350ml Bottle',
        image: '/images/bottles/fluted-classic-ivory-bottle.jpg',
        specs: 'Fluted Grip • Carry Loop'
      },
      {
        id: 'bottle_fluted_soft_pink',
        name: 'Soft Pink',
        tagline: 'Delicate Floral Pastel',
        price: '₹549',
        badge: '350ml Bottle',
        image: '/images/bottles/fluted-soft-pink-bottle.jpg',
        specs: 'Fluted Grip • Carry Loop'
      },
      {
        id: 'bottle_fluted_cherry_red',
        name: 'Cherry Red',
        tagline: 'Bold Statement Hydration',
        price: '₹549',
        badge: '350ml Bottle',
        image: '/images/bottles/fluted-cherry-red-bottle.jpg',
        specs: 'Fluted Grip • Carry Loop'
      },
      {
        id: 'bottle_fluted_lavender_dream',
        name: 'Lavender Dream',
        tagline: 'Soothing Serene Tone',
        price: '₹549',
        badge: '350ml Bottle',
        image: '/images/bottles/fluted-lavender-dream-bottle.jpg',
        specs: 'Fluted Grip • Carry Loop'
      }
    ]
  },
  {
    key: 'bunny',
    title: 'Cute Bunny Glass',
    subtitle: '330ml High-Borosilicate Glass Bottles with Carry Loop for School & Travel',
    banner: '/images/bottles/bunny-rabbit-glass-bottles-collection-poster.jpg',
    features: [
      { icon: Feather, text: 'Compact & Lightweight' },
      { icon: Heart, text: 'Adorable Bunny Artwork' },
      { icon: Droplets, text: 'Silicone Carry Loop' },
      { icon: ShieldCheck, text: '100% Pure Glass Hygiene' }
    ],
    items: [
      {
        id: 'bottle_bunny_buddy_mint',
        name: 'Bunny Buddy',
        tagline: "Little Moments, Big Stories ('I'm reading!')",
        price: '₹499',
        badge: '330ml Glass',
        image: '/images/bottles/bunny-buddy-mint-bottle.jpg',
        specs: 'Pure Glass • School & Travel'
      },
      {
        id: 'bottle_cute_rabbit_pink',
        name: 'Cute Rabbit',
        tagline: "It's a Cute Rabbit!",
        price: '₹499',
        badge: '330ml Glass',
        image: '/images/bottles/cute-rabbit-pink-bottle.jpg',
        specs: 'Pure Glass • School & Travel'
      },
      {
        id: 'bottle_hulu_hulu_peach',
        name: 'Hulu Hulu',
        tagline: 'Little Sips, Brighter Days',
        price: '₹499',
        badge: '330ml Glass',
        image: '/images/bottles/hulu-hulu-peach-bottle.jpg',
        specs: 'Pure Glass • School & Travel'
      }
    ]
  },
  {
    key: 'nice',
    title: 'NICE Metallic Sleek Glass',
    subtitle: 'Urban Lifestyle Glass Bottles with Brushed Chrome Cap & Thermal Retention',
    banner: '/images/bottles/nice-sleek-glass-bottles-collection-poster.jpg',
    features: [
      { icon: Coffee, text: 'Keeps Drinks Hot & Cold' },
      { icon: ShieldCheck, text: 'Premium Metallic Accent Cap' },
      { icon: Droplets, text: '100% Leak Proof Silicone Seal' },
      { icon: Sparkles, text: 'Infused Water & Office Ready' }
    ],
    items: [
      {
        id: 'bottle_nice_classic_white',
        name: 'Classic White',
        tagline: 'Timeless Style For Every Day',
        price: '₹599',
        badge: 'Metallic Cap',
        image: '/images/bottles/nice-classic-white-bottle.jpg',
        specs: 'Borosilicate Glass • Hot/Cold'
      },
      {
        id: 'bottle_nice_fresh_mint',
        name: 'Fresh Mint',
        tagline: 'A Fresh Shade For Bright Days',
        price: '₹599',
        badge: 'Metallic Cap',
        image: '/images/bottles/nice-fresh-mint-bottle.jpg',
        specs: 'Borosilicate Glass • Hot/Cold'
      },
      {
        id: 'bottle_nice_cool_blue',
        name: 'Cool Blue',
        tagline: 'Cool Outside, Calm Inside',
        price: '₹599',
        badge: 'Metallic Cap',
        image: '/images/bottles/nice-cool-blue-bottle.jpg',
        specs: 'Borosilicate Glass • Hot/Cold'
      },
      {
        id: 'bottle_nice_blush_pink',
        name: 'Blush Pink',
        tagline: 'Pretty Sips, Brighter Days',
        price: '₹599',
        badge: 'Metallic Cap',
        image: '/images/bottles/nice-blush-pink-bottle.jpg',
        specs: 'Borosilicate Glass • Hot/Cold'
      }
    ]
  }
];

export default function BottlePosterShowcase() {
  const [activeTab, setActiveTab] = useState('animal');
  const currentCollection = BOTTLE_COLLECTIONS.find(c => c.key === activeTab) || BOTTLE_COLLECTIONS[0];

  return (
    <section className="w-full py-20 bg-stone-900 text-stone-100 relative overflow-hidden" aria-label="Veeran Bottle Collections">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-medium tracking-wider uppercase mb-4">
              <Sparkles size={13} />
              <span>Hydration Collection • 4 Series</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white font-serif">
              Bottles & Everyday Hydration
            </h2>
            <p className="mt-3 text-stone-300 text-base sm:text-lg leading-relaxed">
              Explore 16 designer bottle posters across 4 curated series: Animal 3D character thermoses,
              ribbed pastel everyday bottles, playful bunny glass tumblers, and urban metallic cap flasks.
            </p>
          </div>
          <Link
            to="/shop?category=bottles"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-white bg-amber-600 hover:bg-amber-500 px-6 py-3.5 rounded-sm transition-all shadow-md group self-start md:self-auto shrink-0"
          >
            <span>View All 16 Bottles</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Series Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-stone-800 scrollbar-none">
          {BOTTLE_COLLECTIONS.map((col) => {
            const isActive = col.key === activeTab;
            return (
              <button
                key={col.key}
                onClick={() => setActiveTab(col.key)}
                className={`px-5 py-2.5 rounded-sm text-xs font-medium uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700/60'
                }`}
              >
                {col.title} ({col.items.length})
              </button>
            );
          })}
        </div>

        {/* Active Series Subheading & Features */}
        <div className="mb-10 p-6 bg-stone-850/80 border border-stone-800 rounded-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">Active Series</span>
              <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
                {currentCollection.title}
              </h3>
              <p className="text-sm text-stone-300 mt-1">
                {currentCollection.subtitle}
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentCollection.features.map((feat, i) => {
                const IconComponent = feat.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2 bg-stone-800/80 border border-stone-700/60 rounded-sm">
                    <IconComponent className="text-amber-400 shrink-0" size={16} />
                    <span className="text-xs text-stone-200 font-medium leading-tight">{feat.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Poster Grid for the Selected Series */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
          currentCollection.items.length === 5 
            ? 'lg:grid-cols-5' 
            : currentCollection.items.length === 4 
              ? 'lg:grid-cols-4' 
              : 'lg:grid-cols-3'
        } gap-6`}>
          {currentCollection.items.map((bottle) => (
            <Link
              key={bottle.id}
              to={`/products/${bottle.id}`}
              className="group flex flex-col bg-stone-800/60 border border-stone-700/50 hover:border-amber-500/60 rounded-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl"
            >
              {/* Poster image container */}
              <div className="relative aspect-[1/2.3] w-full overflow-hidden bg-stone-950">
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
                  {bottle.price}
                </span>
              </div>

              {/* Info footer */}
              <div className="p-4 flex flex-col flex-1 justify-between bg-stone-850">
                <div>
                  <h4 className="font-serif text-lg text-white group-hover:text-amber-400 transition-colors">
                    {bottle.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-1 italic">
                    "{bottle.tagline}"
                  </p>
                  <p className="text-[11px] text-stone-400 mt-2 font-mono">
                    {bottle.specs}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-700/60 flex items-center justify-between text-xs text-amber-400 font-medium">
                  <span>Order on WhatsApp</span>
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
