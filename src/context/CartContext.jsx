import { createContext, useContext, useState, useCallback } from 'react';
import {
  getCart,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
  updateQuantity as updateQuantityService,
  clearCart as clearCartService,
  getCartCount,
  getCartTotal,
  buildCartWhatsAppLink
} from '../services/cartService';
import { getSettings } from '../services/dataService';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => getCart());
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  const addToCart = useCallback((product, quantity = 1) => {
    const updated = addToCartService(product, quantity);
    setCart(updated);
    setLastAdded(product);
    setIsMiniCartOpen(true);
    // Clear lastAdded after animation
    setTimeout(() => setLastAdded(null), 2000);
  }, []);

  const removeFromCart = useCallback((productId) => {
    const updated = removeFromCartService(productId);
    setCart(updated);
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const updated = updateQuantityService(productId, quantity);
    setCart(updated);
  }, []);

  const clearCart = useCallback(() => {
    const updated = clearCartService();
    setCart(updated);
  }, []);

  const checkoutViaWhatsApp = useCallback(() => {
    const settings = getSettings();
    const link = buildCartWhatsAppLink(cart, settings.whatsappNumber);
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }, [cart]);

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      count,
      total,
      lastAdded,
      isMiniCartOpen,
      setIsMiniCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      checkoutViaWhatsApp
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
