import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { flavorsData } from '../data/flavors';
import { FlavorCard } from './FlavorCard';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FlavorsGrid = ({ onOpenFlavorModal }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('flavors.categories.all') },
    { id: 'chocolate', label: t('flavors.categories.chocolate') },
    { id: 'nuts', label: t('flavors.categories.nuts') },
    { id: 'fruity', label: t('flavors.categories.fruity') },
  ];

  const filteredFlavors =
    selectedCategory === 'all'
      ? flavorsData
      : flavorsData.filter((f) => f.category === selectedCategory);

  return (
    <section id="flavors" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/25 border border-white/30 text-white text-xs sm:text-sm font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('flavors.badge')}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {t('flavors.title')}
          </h2>

          <p className="text-white/85 text-sm sm:text-base leading-relaxed">
            {t('flavors.subtitle')}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-sm ${
                    isActive
                      ? 'bg-[#522518] text-[#FAF2E6] scale-105 shadow-md'
                      : 'bg-white/20 hover:bg-white/30 text-white border border-white/25'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Flavors Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredFlavors.map((flavor) => (
              <FlavorCard
                key={flavor.id}
                flavor={flavor}
                onOpenModal={onOpenFlavorModal}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
