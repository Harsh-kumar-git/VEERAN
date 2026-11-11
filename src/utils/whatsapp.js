import { getSettings } from '../services/dataService';

export const getWhatsAppLink = (productName) => {
  const settings = getSettings();
  const whatsappNumber = settings?.whatsappNumber || '919876543210';
  
  // Format the number to remove any non-numeric characters
  const cleanNumber = String(whatsappNumber).replace(/\D/g, '');
  
  const message = `Hi, I'm interested in ${productName || 'products from Veeran'}`;
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};
