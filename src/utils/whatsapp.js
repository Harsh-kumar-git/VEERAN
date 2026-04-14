import { getSettings } from '../services/dataService';

export const getWhatsAppLink = (productName) => {
  const settings = getSettings();
  const whatsappNumber = settings.whatsappNumber;
  
  // Format the number to remove any non-numeric characters just in case
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  
  const message = `Hi, I'm interested in ${productName}`;
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
};
