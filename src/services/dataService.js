const CATEGORIES_KEY = 'veeran_categories';
const PRODUCTS_KEY = 'veeran_products';
const SETTINGS_KEY = 'veeran_settings';

// Seed Data
const initialCategories = [
  { id: '1', name: 'Furniture', slug: 'furniture', description: 'Modern home furniture' },
  { id: '2', name: 'Lighting', slug: 'lighting', description: 'Contemporary lighting fixtures' },
  { id: '3', name: 'Decor', slug: 'decor', description: 'Minimalist decor items' },
  { id: '4', name: 'Bags', slug: 'bags', description: 'Premium designer bags' },
];

const initialProducts = [
  {
    id: 'p1',
    name: 'Minimalist Oak Chair',
    categoryId: '1',
    price: 250,
    description: 'A beautifully crafted oak chair perfect for modern dining spaces.',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
    featured: true,
    in_stock: true,
  },
  {
    id: 'p2',
    name: 'Pendant Lamp',
    categoryId: '2',
    price: 120,
    description: 'Black matte pendant lamp providing warm, ambient lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800',
    featured: true,
    in_stock: true,
  },
  {
    id: 'p3',
    name: 'Ceramic Vase',
    categoryId: '3',
    price: 45,
    description: 'Hand-crafted ceramic vase for minimal style interiors.',
    imageUrl: 'https://images.unsplash.com/photo-1578500494198-246f612b3b3d?auto=format&fit=crop&q=80&w=800',
    featured: false,
    in_stock: true,
  },
  {
    id: 'p4',
    name: 'Lounge Sofa',
    categoryId: '1',
    price: 850,
    description: 'Comfortable textured lounge sofa with neutral tones.',
    imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800',
    featured: true,
    in_stock: false,
  }
];

const initialBags = [
  {
    id: 'bag_1000176910',
    name: 'Luminous Cascade Sling',
    categoryId: '4',
    price: 850,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176910.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176913',
    name: 'Midnight Bloom Tote',
    categoryId: '4',
    price: 750,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176913.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176916',
    name: 'Crimson Tide Satchel',
    categoryId: '4',
    price: 1150,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176916.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176919',
    name: 'Obsidian Grace Clutch',
    categoryId: '4',
    price: 700,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176919.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176931',
    name: 'Ivory Serenade Crossbody',
    categoryId: '4',
    price: 900,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176931.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176940',
    name: 'Golden Zenith Handbag',
    categoryId: '4',
    price: 1650,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176940.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176944',
    name: 'Azure Whisper Hobo',
    categoryId: '4',
    price: 2000,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176944.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176948',
    name: 'Emerald Echo Backpack',
    categoryId: '4',
    price: 1700,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176948.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176952',
    name: 'Ruby Dawn Messenger',
    categoryId: '4',
    price: 2000,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176952.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176956',
    name: 'Sapphire Dusk Shopper',
    categoryId: '4',
    price: 1750,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176956.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176960',
    name: 'Amethyst Aura Pouch',
    categoryId: '4',
    price: 1850,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176960.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176964',
    name: 'Topaz Glimmer Duffel',
    categoryId: '4',
    price: 1600,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176964.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176968',
    name: 'Pearl Essence Barrel',
    categoryId: '4',
    price: 1550,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176968.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176972',
    name: 'Opal Mirage Bucket',
    categoryId: '4',
    price: 1450,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176972.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176976',
    name: 'Coral Symphony Wristlet',
    categoryId: '4',
    price: 1800,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176976.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176980',
    name: 'Jade Tranquility Briefcase',
    categoryId: '4',
    price: 1600,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176980.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176984',
    name: 'Amber Horizon Weekender',
    categoryId: '4',
    price: 1750,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176984.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176988',
    name: 'Onyx Silhouette Envelope',
    categoryId: '4',
    price: 1900,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176988.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176992',
    name: 'Quartz Reverie Minaudiere',
    categoryId: '4',
    price: 2000,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176992.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000176996',
    name: 'Garnet Twilight Baguette',
    categoryId: '4',
    price: 1950,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000176996.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177000',
    name: 'Beryl Solstice Satchel',
    categoryId: '4',
    price: 1950,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177000.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177004',
    name: 'Citrine Radiance Tote',
    categoryId: '4',
    price: 1850,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177004.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177008',
    name: 'Spinel Vortex Sling',
    categoryId: '4',
    price: 1000,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177008.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177011',
    name: 'Tourmaline Enigma Clutch',
    categoryId: '4',
    price: 900,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177011.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177014',
    name: 'Zircon Celestial Crossbody',
    categoryId: '4',
    price: 750,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177014.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177017',
    name: 'Agate Whisper Handbag',
    categoryId: '4',
    price: 850,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177017.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177020',
    name: 'Moonstone Cascade Hobo',
    categoryId: '4',
    price: 800,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177020.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177023',
    name: 'Sunstone Zenith Backpack',
    categoryId: '4',
    price: 750,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177023.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177026',
    name: 'Malachite Echo Messenger',
    categoryId: '4',
    price: 900,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177026.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177029',
    name: 'Lapis Dusk Shopper',
    categoryId: '4',
    price: 950,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177029.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177032',
    name: 'Turquoise Aura Pouch',
    categoryId: '4',
    price: 850,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177032.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177035',
    name: 'Aquamarine Glimmer Duffel',
    categoryId: '4',
    price: 950,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177035.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177038',
    name: 'Tanzanite Essence Barrel',
    categoryId: '4',
    price: 950,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177038.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177041',
    name: 'Peridot Mirage Bucket',
    categoryId: '4',
    price: 900,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177041.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177044',
    name: 'Morganite Symphony Wristlet',
    categoryId: '4',
    price: 800,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177044.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177047',
    name: 'Kunzite Tranquility Briefcase',
    categoryId: '4',
    price: 900,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177047.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177050',
    name: 'Sugilite Horizon Weekender',
    categoryId: '4',
    price: 1000,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177050.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177053',
    name: 'Rhodonite Silhouette Envelope',
    categoryId: '4',
    price: 1000,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177053.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177056',
    name: 'Jasper Reverie Minaudiere',
    categoryId: '4',
    price: 700,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177056.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177059',
    name: 'Carnelian Twilight Baguette',
    categoryId: '4',
    price: 700,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177059.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177062',
    name: 'Chrysoprase Solstice Satchel',
    categoryId: '4',
    price: 1150,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177062.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177065',
    name: 'Bloodstone Radiance Tote',
    categoryId: '4',
    price: 1250,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177065.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177068',
    name: 'Ametrine Vortex Sling',
    categoryId: '4',
    price: 1100,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177068.jpg',
    featured: false,
    in_stock: true,
  },
  {
    id: 'bag_1000177071',
    name: 'Iolite Enigma Clutch',
    categoryId: '4',
    price: 1150,
    description: 'A beautifully crafted generic bag with an intricate design.',
    imageUrl: '/images/bags/1000177071.jpg',
    featured: false,
    in_stock: true,
  }
];

const initialSettings = {
  siteName: 'VEERAN',
  contactEmail: 'hello@veeran.com',
  whatsappNumber: '919876543210',
};

// Initialize default data if empty
if (!localStorage.getItem(CATEGORIES_KEY)) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
}
if (!localStorage.getItem(PRODUCTS_KEY)) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify([...initialProducts, ...initialBags]));
}

// Seed bags into existing localStorage if not present
if (!localStorage.getItem('veeran_bags_seeded')) {
  const currentProducts = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
  const currentCategories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
  
  if (!currentCategories.find(c => c.name === 'Bags')) {
    currentCategories.push({ id: '4', name: 'Bags', slug: 'bags', description: 'Premium designer bags' });
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(currentCategories));
  }
  
  const existingIds = new Set(currentProducts.map(p => p.id));
  const bagsToAdd = initialBags.filter(b => !existingIds.has(b.id));
  
  if (bagsToAdd.length > 0) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([...currentProducts, ...bagsToAdd]));
  }
  localStorage.setItem('veeran_bags_seeded', 'true');
}
if (!localStorage.getItem(SETTINGS_KEY)) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(initialSettings));
}

// ========================
// CATEGORIES
// ========================
export const getCategories = () => {
  const data = localStorage.getItem(CATEGORIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addCategory = (category) => {
  const categories = getCategories();
  const newCategory = { ...category, id: Date.now().toString() };
  categories.push(newCategory);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  return newCategory;
};

export const updateCategory = (id, updatedData) => {
  let categories = getCategories();
  categories = categories.map(c => c.id === id ? { ...c, ...updatedData } : c);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const deleteCategory = (id) => {
  let categories = getCategories();
  categories = categories.filter(c => c.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

// ========================
// PRODUCTS
// ========================
export const getProducts = () => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now().toString() };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (id, updatedData) => {
  let products = getProducts();
  products = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const deleteProduct = (id) => {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

// ========================
// SETTINGS
// ========================
export const getSettings = () => {
  const data = localStorage.getItem(SETTINGS_KEY);
  return data ? JSON.parse(data) : initialSettings;
};

export const updateSettings = (updatedConfig) => {
  let settings = getSettings();
  settings = { ...settings, ...updatedConfig };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  return settings;
};
