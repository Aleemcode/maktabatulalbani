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

  const message = [
    `*Assalamu Alaykum Abu Abdillah Albadr (Maktabah Imam Albani),*`,
    ``,
    `I would like to inquire about / purchase the following book from your catalogue:`,
    `*Title:* ${book.title}`,
    book.arabic_title ? `*Arabic Title:* ${book.arabic_title}` : '',
    `*Author:* ${book.author}`,
    `*Price:* ${priceFormatted}`,
    book.isbn ? `*ISBN:* ${book.isbn}` : '',
    ``,
    `Is this copy currently available for delivery or pickup?`,
    `Ref: ${typeof window !== 'undefined' ? window.location.origin : ''}/book/${book.slug}`
  ]
    .filter(Boolean)
    .join('\n');

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

  const booksList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.book.title}* (Qty: ${item.quantity}) - ${formatCurrency(
          (item.book.discount_price || item.book.price) * item.quantity,
          settings.currency_symbol
        )}`
    )
    .join('\n');

  const message = [
    `*Assalamu Alaykum Abu Abdillah Albadr (Maktabah Imam Albani),*`,
    ``,
    `I would like to order the following book(s) from your catalogue:`,
    booksList,
    ``,
    `*Total Estimated Value:* ${formatCurrency(totalAmount, settings.currency_symbol)}`,
    ``,
    `Please confirm stock availability and payment/delivery details.`,
    `Jazakumullahu Khayran.`
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
    'Assalamu Alaykum Abu Abdillah Albadr, I would like to make an inquiry regarding your book collection at Maktabah Imam Albani.';

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
