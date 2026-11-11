import { describe, it, expect, beforeEach } from 'vitest';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getCartCount,
  getCartTotal,
  buildCartWhatsAppLink
} from '../src/services/cartService';

describe('cartService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with an empty cart', () => {
    expect(getCart()).toEqual([]);
    expect(getCartCount()).toBe(0);
    expect(getCartTotal()).toBe(0);
  });

  it('adds products to cart and calculates count & total correctly', () => {
    const item1 = { id: 'p1', name: 'Leather Duffel Bag', price: 4500 };
    const item2 = { id: 'p2', name: 'Waxed Canvas Backpack', price: 3200 };

    addToCart(item1, 1);
    expect(getCartCount()).toBe(1);
    expect(getCartTotal()).toBe(4500);

    addToCart(item1, 2);
    expect(getCartCount()).toBe(3);
    expect(getCartTotal()).toBe(13500);

    addToCart(item2, 1);
    expect(getCartCount()).toBe(4);
    expect(getCartTotal()).toBe(16700);
  });

  it('updates quantity and removes item when quantity is 0', () => {
    const item = { id: 'p1', name: 'Tote Bag', price: 1500 };
    addToCart(item, 2);
    expect(getCartCount()).toBe(2);

    updateQuantity('p1', 5);
    expect(getCartCount()).toBe(5);

    updateQuantity('p1', 0);
    expect(getCartCount()).toBe(0);
    expect(getCart()).toEqual([]);
  });

  it('removes item and clears cart', () => {
    const item1 = { id: 'p1', name: 'Item 1', price: 1000 };
    const item2 = { id: 'p2', name: 'Item 2', price: 2000 };
    addToCart(item1, 1);
    addToCart(item2, 1);

    removeFromCart('p1');
    expect(getCart().length).toBe(1);
    expect(getCart()[0].id).toBe('p2');

    clearCart();
    expect(getCart()).toEqual([]);
  });

  it('builds a valid WhatsApp order link with phone and encoded summary', () => {
    const item = { id: 'p1', name: 'Heritage Messenger', price: 5000 };
    addToCart(item, 2);

    const link = buildCartWhatsAppLink(getCart(), '+91 98765-43210');
    expect(link).toContain('https://wa.me/919876543210');
    expect(link).toContain(encodeURIComponent('Heritage Messenger'));
  });

  it('returns null if cart is empty or phone number is missing', () => {
    expect(buildCartWhatsAppLink([], '919876543210')).toBeNull();
    const item = { id: 'p1', name: 'Bag', price: 1000 };
    addToCart(item, 1);
    expect(buildCartWhatsAppLink(getCart(), '')).toBeNull();
  });
});
