const CART_KEY = 'veeran_cart';

export const getCart = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  return cart;
};

export const updateQuantity = (productId, quantity) => {
  if (quantity <= 0) return removeFromCart(productId);
  const cart = getCart().map(item =>
    item.id === productId ? { ...item, quantity } : item
  );
  saveCart(cart);
  return cart;
};

export const clearCart = () => {
  saveCart([]);
  return [];
};

export const getCartCount = () => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};

export const getCartTotal = () => {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/**
 * Build a WhatsApp message from cart items and settings
 */
export const buildCartWhatsAppLink = (cart, whatsappNumber) => {
  if (!whatsappNumber || cart.length === 0) return null;

  const lines = cart.map(item =>
    `• ${item.quantity}× ${item.name} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
  );

  const total = getCartTotal();
  const message = [
    "Hi, I'd like to order from VEERAN:",
    '',
    ...lines,
    '',
    `Total: ₹${total.toLocaleString('en-IN')}`,
    '',
    'Please confirm availability and share payment details.'
  ].join('\n');

  return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
};
