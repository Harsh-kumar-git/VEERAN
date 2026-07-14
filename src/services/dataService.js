import initialCategories from '../data/categories.json';
import initialBags from '../data/products.json';
import initialSettings from '../data/settings.json';

const CATEGORIES_KEY = 'veeran_categories';
const PRODUCTS_KEY = 'veeran_products';
const SETTINGS_KEY = 'veeran_settings';

// Force bag-centric reset once (for users with existing local storage containing furniture/lighting)
const BAG_CENTRIC_RESET_KEY = 'veeran_bag_centric_reset_v2';
if (!localStorage.getItem(BAG_CENTRIC_RESET_KEY)) {
  localStorage.removeItem(CATEGORIES_KEY);
  localStorage.removeItem(PRODUCTS_KEY);
  localStorage.setItem(BAG_CENTRIC_RESET_KEY, 'true');
  localStorage.setItem('veeran_bags_seeded', 'true');
}

// Initialize default data if empty
if (!localStorage.getItem(CATEGORIES_KEY)) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
}
if (!localStorage.getItem(PRODUCTS_KEY)) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialBags));
}
if (!localStorage.getItem(SETTINGS_KEY)) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(initialSettings));
}

// Dev-only helper to write updates to local disk files
const persistToDisk = async (key, data) => {
  try {
    await fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, data }),
    });
  } catch (err) {
    console.warn('Persistence to local disk failed (normal in production):', err);
  }
};

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
  persistToDisk(CATEGORIES_KEY, categories);
  return newCategory;
};

export const updateCategory = (id, updatedData) => {
  let categories = getCategories();
  categories = categories.map(c => c.id === id ? { ...c, ...updatedData } : c);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  persistToDisk(CATEGORIES_KEY, categories);
};

export const deleteCategory = (id) => {
  let categories = getCategories();
  categories = categories.filter(c => c.id !== id);
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  persistToDisk(CATEGORIES_KEY, categories);
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
  persistToDisk(PRODUCTS_KEY, products);
  return newProduct;
};

export const updateProduct = (id, updatedData) => {
  let products = getProducts();
  products = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  persistToDisk(PRODUCTS_KEY, products);
};

export const deleteProduct = (id) => {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  persistToDisk(PRODUCTS_KEY, products);
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
  persistToDisk(SETTINGS_KEY, settings);
  return settings;
};
