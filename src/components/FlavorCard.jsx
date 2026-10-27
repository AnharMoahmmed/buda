import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Plus, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const FlavorCard = ({ flavor, onOpenModal }) => {
  const { lang, t } = useLanguage();
  const { addItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35 }}
      className="group relative bg-[#FAF2E6] rounded-3xl p-5 sm:p-6 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-[#522518]/10 overflow-hidden"
    >
      {/* Decorative Subtle Background Corner */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 pointer-events-none group-hover:scale-150 transition-transform duration-500"
        style={{ backgroundColor: flavor.accentColor }}
      />

      {/* Top Header: Category Tag & Rating */}
      <div className="flex items-center justify-between gap-2 z-10 mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#522518]/10 text-[#522518]">
          {flavor.category === 'chocolate'
            ? t('flavors.categories.chocolate')
            : flavor.category === 'fruity'
            ? t('flavors.categories.fruity')
            : t('flavors.categories.nuts')}
        </span>

        <div className="flex items-center gap-1 text-xs font-bold text-[#522518]">
          <Star className="w-3.5 h-3.5 fill-[#E09939] text-[#E09939]" />
          <span>{flavor.rating}</span>
        </div>
      </div>

      {/* Center Image with floating effect */}
      <div
        onClick={() => onOpenModal(flavor)}
        className="relative my-3 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform duration-500"
      >
        <img
          src={flavor.image}
          alt={flavor.name[lang] || flavor.name.en}
          className="w-48 sm:w-52 h-48 sm:h-52 object-contain filter drop-shadow-xl"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="z-10 text-start space-y-2 mt-1">
        <div className="flex items-start justify-between gap-2">
          <h3
            onClick={() => onOpenModal(flavor)}
            className="font-display font-bold text-lg sm:text-xl text-[#522518] hover:text-[#DE7E59] cursor-pointer transition-colors leading-snug"
          >
            {flavor.name[lang] || flavor.name.en}
          </h3>
          <span className="font-display font-extrabold text-base text-[#522518] shrink-0">
            {flavor.prices.single} {t('flavors.sar')}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#522518]/75 line-clamp-2 leading-relaxed">
          {flavor.description[lang] || flavor.description.en}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(flavor.tags[lang] || flavor.tags.en).slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/70 text-[#522518]/80 border border-[#522518]/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#522518]/10">
          <button
            onClick={() => onOpenModal(flavor)}
            type="button"
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-white hover:bg-[#522518]/5 text-[#522518] text-xs font-semibold border border-[#522518]/15 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t('flavors.viewFlavor')}</span>
          </button>

          <button
            onClick={() => addItem(flavor, 'single')}
            type="button"
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full bg-[#522518] hover:bg-[#38150C] text-[#FAF2E6] text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t('flavors.orderCup')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
