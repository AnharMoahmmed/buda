import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Sparkles, ShoppingBag, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export const FeaturedProductSection = ({ onOpenFlavorModal, featuredFlavor }) => {
  const { t, lang, dir } = useLanguage();
  const { addItem, setIsOpen: setCartOpen } = useCart();

  if (!featuredFlavor) return null;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-br from-[#451C11] via-[#522518] to-[#38150C] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10 overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#E08A63]/25 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-[#FAF2E6]">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{t('featured.badge')}</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                {t('featured.title')}
              </h2>

              <p className="text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed">
                {t('featured.description')}
              </p>

              {/* Tasting Notes Pills */}
              <div className="space-y-2 pt-1">
                <span className="text-xs uppercase tracking-wider text-white/70 font-semibold block">
                  {lang === 'ar' ? 'مواصفات التذوق الفاخر:' : 'Signature Tasting Notes:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(t('featured.notes') || []).map((note, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs sm:text-sm text-white"
                    >
                      <Sparkles className="w-3 h-3 text-[#E08A63]" />
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={() => {
                    addItem(featuredFlavor, 'single');
                    setCartOpen(true);
                  }}
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF2E6] hover:bg-white text-[#522518] font-bold text-sm sm:text-base shadow-xl transition-all cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#522518]" />
                  <span>{t('featured.cta')}</span>
                </button>

                <button
                  onClick={() => onOpenFlavorModal(featuredFlavor)}
                  type="button"
                  className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base border border-white/25 backdrop-blur-md transition-all cursor-pointer"
                >
                  {t('flavors.viewFlavor')}
                </button>
              </div>
            </div>

            {/* Right Product Imagery */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative cursor-pointer"
                onClick={() => onOpenFlavorModal(featuredFlavor)}
              >
                <img
                  src={featuredFlavor.image}
                  alt={featuredFlavor.name[lang] || featuredFlavor.name.en}
                  className="w-72 sm:w-88 lg:w-96 h-auto object-contain filter drop-shadow-2xl"
                />

                {/* Floating Ribbon / Seal */}
                <div className="absolute top-2 right-2 sm:right-6 bg-[#FAF2E6] text-[#522518] px-3.5 py-1.5 rounded-full shadow-lg border border-[#522518]/20 font-display font-extrabold text-xs sm:text-sm flex items-center gap-1.5 rotate-6">
                  <span>⭐️ 4.9</span>
                  <span>•</span>
                  <span>{lang === 'ar' ? 'الأكثر طلباً' : 'Bestseller'}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
