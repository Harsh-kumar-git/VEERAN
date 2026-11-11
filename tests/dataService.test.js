import { describe, it, expect, beforeEach } from 'vitest';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getSettings,
  updateSettings
} from '../src/services/dataService';

describe('dataService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads default categories and products', () => {
    const categories = getCategories();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);

    const products = getProducts();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  it('adds, updates, and deletes categories', () => {
    const initialCount = getCategories().length;
    const newCat = addCategory({ name: 'Travel Duffels', slug: 'travel-duffels', description: 'Rugged duffels' });
    expect(newCat.id).toBeDefined();
    expect(getCategories().length).toBe(initialCount + 1);

    updateCategory(newCat.id, { name: 'Expedition Duffels' });
    const updated = getCategories().find(c => c.id === newCat.id);
    expect(updated.name).toBe('Expedition Duffels');

    deleteCategory(newCat.id);
    expect(getCategories().find(c => c.id === newCat.id)).toBeUndefined();
  });

  it('adds, updates, and deletes products', () => {
    const initialCount = getProducts().length;
    const newProd = addProduct({
      name: 'Rambler Rucksack',
      price: 6500,
      description: 'Handcrafted leather rucksack',
      categoryId: 'backpacks'
    });
    expect(newProd.id).toBeDefined();
    expect(getProducts().length).toBe(initialCount + 1);

    updateProduct(newProd.id, { price: 6900 });
    const updated = getProducts().find(p => p.id === newProd.id);
    expect(updated.price).toBe(6900);

    deleteProduct(newProd.id);
    expect(getProducts().find(p => p.id === newProd.id)).toBeUndefined();
  });

  it('updates and retrieves settings', () => {
    const current = getSettings();
    expect(current).toBeDefined();

    updateSettings({ siteName: 'VEERAN CRAFTWORKS', whatsappNumber: '919999999999' });
    const updated = getSettings();
    expect(updated.siteName).toBe('VEERAN CRAFTWORKS');
    expect(updated.whatsappNumber).toBe('919999999999');
  });
});
