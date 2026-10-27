import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = () => {
  const { lang, t, dir } = useLanguage();
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalAmount,
    getWhatsAppOrderUrl,
  } = useCart();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Slide-out Drawer */}
        <motion.div
          initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
          animate={{ x: 0 }}
          exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className={`relative ml-auto rtl:ml-0 rtl:mr-auto w-full max-w-md bg-[#FAF2E6] text-[#522518] shadow-2xl flex flex-col h-full z-10 border-l rtl:border-l-0 rtl:border-r border-[#522518]/15`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#522518]/15 bg-white/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#522518]" />
              <h2 className="font-display font-extrabold text-xl text-[#522518]">
                {t('cart.title')}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#522518] text-[#FAF2E6] font-bold">
                {totalItems}
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="p-1.5 rounded-full hover:bg-[#522518]/10 text-[#522518] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-[#522518]/70">
                <div className="w-16 h-16 rounded-full bg-[#522518]/10 flex items-center justify-center text-2xl">
                  🍦
                </div>
                <p className="text-sm font-semibold max-w-xs">{t('cart.empty')}</p>
                <button
                  onClick={() => setIsOpen(false)}
                  type="button"
                  className="mt-2 text-xs font-bold text-[#DE7E59] hover:underline"
                >
                  {t('hero.exploreFlavors')}
                </button>
              </div>
            ) : (
              items.map((item) => {
                const sizeLabel = t(
                  `flavors.${
                    item.size === 'single'
                      ? 'singleScoop'
                      : item.size === 'double'
                      ? 'doubleScoop'
                      : 'pintTub'
                  }`
                );

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#522518]/10 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name[lang] || item.name.en}
                      className="w-16 h-16 object-contain shrink-0"
                    />

                    <div className="flex-1 min-w-0 text-start">
                      <h4 className="font-display font-bold text-sm text-[#522518] truncate">
                        {item.name[lang] || item.name.en}
                      </h4>
                      <p className="text-xs text-[#522518]/65 font-medium">{sizeLabel}</p>
                      <p className="text-xs font-extrabold text-[#522518] mt-1">
                        {item.price * item.quantity} {t('flavors.sar')}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-[#FAF2E6] rounded-full p-1 border border-[#522518]/15">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        type="button"
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[#522518] hover:bg-[#522518]/15"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        type="button"
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[#522518] hover:bg-[#522518]/15"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeItem(item.id)}
                      type="button"
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#522518]/15 bg-white/70 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-[#522518]">
                <span>{t('cart.total')}</span>
                <span className="font-display text-2xl font-extrabold">
                  {totalAmount} {t('flavors.sar')}
                </span>
              </div>

              <a
                href={getWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm sm:text-base shadow-lg transition-all active:scale-95 text-center"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white" />
                <span>{t('cart.checkoutWhatsapp')}</span>
              </a>

              <div className="flex items-center justify-between pt-1 text-xs text-[#522518]/60">
                <button
                  onClick={clearCart}
                  type="button"
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'إفراغ السلة' : 'Clear Bag'}
                </button>
                <span>{lang === 'ar' ? 'توصيل مبرد سريع' : 'Fast chilled delivery'}</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
