import { describe, it, expect } from 'vitest';
import { getWhatsAppLink } from '../src/utils/whatsapp';

describe('whatsapp utils', () => {
  it('generates a valid wa.me link with encoded product name', () => {
    const link = getWhatsAppLink('Voyager Duffel');
    expect(link).toContain('https://wa.me/');
    expect(link).toContain(encodeURIComponent("Hi, I'm interested in Voyager Duffel"));
  });

  it('handles empty or special characters in product name gracefully', () => {
    const link = getWhatsAppLink('Bag & Co.');
    expect(link).toContain(encodeURIComponent("Hi, I'm interested in Bag & Co."));
  });
});
