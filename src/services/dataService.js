const CATEGORIES_KEY = 'veeran_categories';
const PRODUCTS_KEY = 'veeran_products';
const SETTINGS_KEY = 'veeran_settings';

// Seed Data
const initialCategories = [
  { id: '1', name: 'Furniture', slug: 'furniture', description: 'Modern home furniture' },
  { id: '2', name: 'Lighting', slug: 'lighting', description: 'Contemporary lighting fixtures' },
  { id: '3', name: 'Decor', slug: 'decor', description: 'Minimalist decor items' },
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
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
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
