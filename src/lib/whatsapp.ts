import { Book, CartItem, StoreSettings } from '../types';

export const formatCurrency = (amount: number, symbol: string = '₦'): string => {
  return `${symbol}${amount.toLocaleString('en-NG')}`;
};

/**
 * Clean phone number for WhatsApp URL (removes spaces, dashes, +)
 */
export const sanitizeWhatsAppNumber = (phone?: string): string => {
  if (!phone) return '2349124161597';
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned || '2349124161597';
};

/**
 * Generate a WhatsApp inquiry/order link for a single book
 */
export const createBookWhatsAppUrl = (
  book: Book,
  settings: StoreSettings
): string => {
  const phone = sanitizeWhatsAppNumber(settings.whatsapp_number);
  const priceFormatted = formatCurrency(
    book.discount_price || book.price,
    settings.currency_symbol
  );

  const baseUrl = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://maktabatulalbani.vercel.app';
  const bookUrl = `${baseUrl}/book/${book.slug}`;

  const details: string[] = [
    `*Title:* ${book.title}`
  ];

  if (book.arabic_title && book.arabic_title.trim()) {
    details.push(`*Arabic Title:* ${book.arabic_title.trim()}`);
  }

  details.push(`*Author:* ${book.author}`);
  details.push(`*Price:* ${priceFormatted}`);

  const message = [
    `Assalamu ‘Alaikum wa Rahmatullāh, Abā Abdillah Al-Badr @ Maktabah Imam Al-Albani,`,
    ``,
    `I would like to inquire about/purchase the following book from your catalogue:`,
    ``,
    details.join('\n\n'),
    ``,
    `Please confirm if this copy is currently available for delivery or pickup.`,
    ``,
    `*Book Link:* ${bookUrl}`
  ].join('\n');

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate a WhatsApp inquiry link for multiple cart/selection items
 */
export const createCartWhatsAppUrl = (
  items: CartItem[],
  settings: StoreSettings
): string => {
  const phone = sanitizeWhatsAppNumber(settings.whatsapp_number);
  const totalAmount = items.reduce(
    (sum, item) => sum + (item.book.discount_price || item.book.price) * item.quantity,
    0
  );

  const baseUrl = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'https://maktabatulalbani.vercel.app';

  const booksList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.book.title}*\n   Author: ${item.book.author}\n   Qty: ${item.quantity} × ${formatCurrency(
          item.book.discount_price || item.book.price,
          settings.currency_symbol
        )}\n   Link: ${baseUrl}/book/${item.book.slug}`
    )
    .join('\n\n');

  const message = [
    `Assalamu ‘Alaikum wa Rahmatullāh, Abā Abdillah Al-Badr @ Maktabah Imam Al-Albani,`,
    ``,
    `I would like to order/inquire about the following book(s) from your catalogue:`,
    ``,
    booksList,
    ``,
    `*Total Estimated Value:* ${formatCurrency(totalAmount, settings.currency_symbol)}`,
    ``,
    `Please confirm stock availability and payment/delivery details.`,
    ``,
    `Jazākumullāhu Khayran.`
  ].join('\n');

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

/**
 * Generate a general inquiry WhatsApp link
 */
export const createGeneralWhatsAppUrl = (
  settings: StoreSettings,
  customInquiry?: string
): string => {
  const phone = sanitizeWhatsAppNumber(settings.whatsapp_number);
  const message =
    customInquiry ||
    settings.whatsapp_default_message ||
    'Assalamu ‘Alaikum wa Rahmatullāh, Abā Abdillah Al-Badr @ Maktabah Imam Al-Albani,\n\nI would like to make an inquiry regarding your book collection and services.';

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
