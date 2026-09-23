import React from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCatalogue } from '../../context/CatalogueContext';
import { formatCurrency, createCartWhatsAppUrl } from '../../lib/whatsapp';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { settings } = useCatalogue();

  if (!isOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    const url = createCartWhatsAppUrl(items, settings);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFCFB] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#EFECE6] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#18181B]" />
              <h2 className="text-base font-semibold text-[#18181B]">Inquiry Selection</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F4F4F5] text-[#71717A] font-medium">
                {items.length} {items.length === 1 ? 'book' : 'books'}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-md hover:bg-[#F4F4F5] text-[#71717A] hover:text-[#18181B]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body items list */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#F4F4F5] flex items-center justify-center text-[#A1A1AA] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-semibold text-[#18181B]">Your selection is empty</h3>
                <p className="text-xs text-[#71717A] mt-1 max-w-xs leading-relaxed">
                  Browse our catalogue and select books to generate a unified order inquiry on WhatsApp.
                </p>
              </div>
            ) : (
              items.map(({ book, quantity }) => (
                <div
                  key={book.id}
                  className="flex gap-3 p-3 rounded-lg border border-[#EFECE6] bg-white"
                >
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded bg-[#F4F4F5] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="text-xs font-semibold text-[#18181B] truncate">{book.title}</h4>
                      <p className="text-[11px] text-[#71717A] truncate">{book.author}</p>
                      <p className="text-xs font-bold text-[#18181B] mt-1">
                        {formatCurrency(book.discount_price || book.price, settings.currency_symbol)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#EFECE6] rounded-md overflow-hidden bg-[#FDFCFB]">
                        <button
                          onClick={() => updateQuantity(book.id, quantity - 1)}
                          className="p-1 hover:bg-[#F4F4F5] text-[#71717A]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-[#18181B]">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(book.id, quantity + 1)}
                          className="p-1 hover:bg-[#F4F4F5] text-[#71717A]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(book.id)}
                        className="text-[#A1A1AA] hover:text-red-500 p-1"
                        aria-label="Remove book from inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Conversion CTA */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EFECE6] bg-white space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#71717A]">Estimated Total:</span>
                <span className="font-bold text-base text-[#18181B]">
                  {formatCurrency(totalPrice, settings.currency_symbol)}
                </span>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Send Order Inquiry on WhatsApp</span>
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-[#71717A] hover:text-red-600 transition-colors py-1"
              >
                Clear all selections
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
