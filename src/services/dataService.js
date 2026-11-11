import initialCategories from '../data/categories.json';
import initialBags from '../data/products.json';
import initialSettings from '../data/settings.json';
import { getAuthToken } from './authService';

const CATEGORIES_KEY = 'veeran_categories';
const PRODUCTS_KEY = 'veeran_products';
const SETTINGS_KEY = 'veeran_settings';

// Force catalog refresh to seed bottles and latest categories
const CATALOG_RESET_KEY = 'veeran_catalog_reset_v3';
try {
  if (!localStorage.getItem(CATALOG_RESET_KEY)) {
    localStorage.removeItem(CATEGORIES_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.setItem(CATALOG_RESET_KEY, 'true');
    localStorage.setItem('veeran_catalog_seeded', 'true');
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
} catch {
  // Graceful fallback for non-browser or restricted storage environments
}

// Dev-only helper to write updates to local disk files with authentication
const persistToDisk = async (key, data) => {
  if (typeof window === 'undefined') return;
  try {
    const token = getAuthToken();
    await fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ key, data }),
    });
  } catch (err) {
    // Normal in production or standalone client deployments
    if (import.meta.env.DEV) {
      console.warn('Persistence to local disk failed:', err);
    }
  }
};

// ========================
// CATEGORIES
// ========================
export const getCategories = () => {
  try {
    const data = localStorage.getItem(CATEGORIES_KEY);
    return data ? JSON.parse(data) : (initialCategories || []);
  } catch {
    return initialCategories || [];
  }
};

export const addCategory = (category) => {
  const categories = getCategories();
  const newCategory = { ...category, id: Date.now().toString() };
  categories.push(newCategory);
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch {
    // Storage quota fallback
  }
  persistToDisk(CATEGORIES_KEY, categories);
  return newCategory;
};

export const updateCategory = (id, updatedData) => {
  let categories = getCategories();
  categories = categories.map(c => c.id === id ? { ...c, ...updatedData } : c);
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch {
    // Storage quota fallback
  }
  persistToDisk(CATEGORIES_KEY, categories);
  return categories;
};

export const deleteCategory = (id) => {
  let categories = getCategories();
  categories = categories.filter(c => c.id !== id);
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch {
    // Storage quota fallback
  }
  persistToDisk(CATEGORIES_KEY, categories);
  return categories;
};

// ========================
// PRODUCTS
// ========================
export const getProducts = () => {
  try {
    const data = localStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : (initialBags || []);
  } catch {
    return initialBags || [];
  }
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now().toString() };
  products.push(newProduct);
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    // Storage quota fallback
  }
  persistToDisk(PRODUCTS_KEY, products);
  return newProduct;
};

export const updateProduct = (id, updatedData) => {
  let products = getProducts();
  products = products.map(p => p.id === id ? { ...p, ...updatedData } : p);
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    // Storage quota fallback
  }
  persistToDisk(PRODUCTS_KEY, products);
  return products;
};

export const deleteProduct = (id) => {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    // Storage quota fallback
  }
  persistToDisk(PRODUCTS_KEY, products);
  return products;
};

// ========================
// SETTINGS
// ========================
export const getSettings = () => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? JSON.parse(data) : (initialSettings || {});
  } catch {
    return initialSettings || {};
  }
};

export const updateSettings = (updatedConfig) => {
  let settings = getSettings();
  settings = { ...settings, ...updatedConfig };
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Storage quota fallback
  }
  persistToDisk(SETTINGS_KEY, settings);
  return settings;
};
