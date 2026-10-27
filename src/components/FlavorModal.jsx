import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { X, Star, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FlavorModal = ({ flavor, onClose }) => {
  const { lang, t } = useLanguage();
  const { addItem, setIsOpen: setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState('single');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!flavor) return null;

  const currentPrice = flavor.prices[selectedSize] || flavor.prices.single;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(flavor, selectedSize);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setCartOpen(true);
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#FAF2E6] text-[#522518] rounded-[2rem] shadow-2xl border border-[#522518]/15 overflow-hidden z-10 my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-5 right-5 rtl:right-auto rtl:left-5 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#522518] shadow-md transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
            {/* Left Column: Big Product Showcase */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative p-4 rounded-2xl bg-white/60 border border-[#522518]/10">
              <div
                className="absolute inset-0 rounded-2xl opacity-15"
                style={{ backgroundColor: flavor.accentColor }}
              />
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={flavor.image}
                alt={flavor.name[lang] || flavor.name.en}
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain filter drop-shadow-2xl relative z-10"
              />
              <span className="mt-3 text-xs font-semibold px-3 py-1 rounded-full bg-[#522518] text-[#FAF2E6]">
                buda | بوضة signature
              </span>
            </div>

            {/* Right Column: Flavor Info & Ordering */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#DE7E59]">
                    {flavor.category.toUpperCase()}
                  </span>
                  <span className="text-[#522518]/30">•</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#522518]">
                    <Star className="w-3.5 h-3.5 fill-[#E09939] text-[#E09939]" />
                    <span>{flavor.rating}</span>
                    <span className="text-[#522518]/50">({flavor.reviewsCount})</span>
                  </div>
                </div>

                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#522518] leading-tight">
                  {flavor.name[lang] || flavor.name.en}
                </h2>

                <p className="text-sm text-[#522518]/80 mt-2 leading-relaxed">
                  {flavor.description[lang] || flavor.description.en}
                </p>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-xs font-bold text-[#522518] uppercase tracking-wider mb-2">
                  Select Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'single', label: t('flavors.singleScoop'), price: flavor.prices.single },
                    { id: 'double', label: t('flavors.doubleScoop'), price: flavor.prices.double },
                    { id: 'pint', label: t('flavors.pintTub'), price: flavor.prices.pint },
                  ].map((size) => {
                    const isSelected = selectedSize === size.id;
                    return (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setSelectedSize(size.id)}
                        className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#522518] text-[#FAF2E6] border-[#522518] shadow-md font-bold'
                            : 'bg-white hover:bg-white/80 text-[#522518] border-[#522518]/15'
                        }`}
                      >
                        <p className="text-[11px] sm:text-xs leading-tight">{size.label}</p>
                        <p className="text-xs sm:text-sm font-extrabold mt-1">
                          {size.price} {t('flavors.sar')}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tasting Notes */}
              <div>
                <h4 className="text-xs font-bold text-[#522518] uppercase tracking-wider mb-1.5">
                  {t('flavors.flavorNotesTitle')}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(flavor.tastingNotes[lang] || flavor.tastingNotes.en).map((note, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-full bg-white text-[#522518] border border-[#522518]/10 font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Counter & Add CTA */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#522518]/15">
                {/* Quantity */}
                <div className="flex items-center bg-white rounded-full border border-[#522518]/20 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#522518] hover:bg-[#522518]/10 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[#522518] hover:bg-[#522518]/10 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  type="button"
                  disabled={added}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer active:scale-95 ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#522518] hover:bg-[#38150C] text-[#FAF2E6]'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t('flavors.addedToBag')}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        {t('hero.orderNow')} • {currentPrice * quantity} {t('flavors.sar')}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
