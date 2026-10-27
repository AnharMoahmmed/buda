import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { BudaLogo } from './BudaLogo';
import { FlavorSelector } from './FlavorSelector';
import { FloatingDoodles } from './FloatingDoodles';
import { flavorsData } from '../data/flavors';
import { ShoppingBag, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroSection = ({ onOpenFlavorModal }) => {
  const { lang, t, dir } = useLanguage();
  const { addItem, setIsOpen: setCartOpen } = useCart();

  // The 3 primary carousel flavors (Chocolate, Pistachio, Strawberry)
  const heroFlavors = flavorsData.filter((f) => f.isHero);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentFlavor = heroFlavors[activeIdx];
  // Next flavor to peek in background (just like reference image!)
  const nextIdx = (activeIdx + 1) % heroFlavors.length;
  const nextFlavor = heroFlavors[nextIdx];
  const prevIdx = (activeIdx - 1 + heroFlavors.length) % heroFlavors.length;

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % heroFlavors.length);
  }, [heroFlavors.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + heroFlavors.length) % heroFlavors.length);
  }, [heroFlavors.length]);

  const handleSelect = (idx) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        dir === 'rtl' ? handlePrev() : handleNext();
      } else if (e.key === 'ArrowLeft') {
        dir === 'rtl' ? handleNext() : handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, dir]);

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Chocolate Hero Card */}
        <div
          className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden text-white shadow-hero-card border border-white/10 transition-colors duration-700"
          style={{
            backgroundColor: currentFlavor.cardBg || '#522518',
            backgroundImage: `radial-gradient(circle at 75% 40%, ${currentFlavor.accentColor}33 0%, transparent 65%)`,
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: currentFlavor.accentColor }}
          />

          {/* Doodles & Floating Ingredients */}
          <FloatingDoodles flavorId={currentFlavor.id} />

          {/* Card Top Header */}
          <div className="relative z-10 flex items-center justify-between p-6 sm:p-8 lg:p-10 pb-0">
            {/* Brand Logo inside card */}
            <div className="text-white">
              <BudaLogo className="text-white text-xl sm:text-2xl" />
            </div>

            {/* Flavor Selector (Top Right) */}
            <FlavorSelector
              flavors={heroFlavors}
              activeFlavorIndex={activeIdx}
              onSelectFlavor={handleSelect}
              onNextFlavor={handleNext}
            />
          </div>

          {/* Card Main Body */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6 sm:px-10 lg:px-14 pt-6 sm:pt-8 pb-12 lg:pb-16 min-h-[480px] lg:min-h-[520px]">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-start">
              {/* Dynamic Tag */}
              <motion.div
                key={`tag-${currentFlavor.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white/95"
              >
                <span
                  className="w-2 h-2 rounded-full animate-ping"
                  style={{ backgroundColor: currentFlavor.accentColor }}
                />
                <span>{currentFlavor.tagline[lang] || currentFlavor.tagline.en}</span>
              </motion.div>

              {/* Headline */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`headline-${currentFlavor.id}-${lang}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.8rem] leading-[1.08] tracking-tight text-white drop-shadow-sm"
                >
                  {t('hero.tagline')}
                </motion.h1>
              </AnimatePresence>

              {/* Subtitle / Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`sub-${currentFlavor.id}-${lang}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-white/85 text-sm sm:text-base lg:text-lg max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed"
                >
                  {currentFlavor.description[lang] || currentFlavor.description.en}
                </motion.p>
              </AnimatePresence>

              {/* Action Buttons (Matches reference exactly) */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                {/* Primary CTA (Cream Pill with Arrow) */}
                <button
                  onClick={() => {
                    const el = document.querySelector('#flavors');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  type="button"
                  className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#FAF2E6] hover:bg-white text-[#522518] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <span>{t('hero.exploreFlavors')}</span>
                  {dir === 'rtl' ? (
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>

                {/* Secondary CTA (Dark Chocolate Pill with Shopping Bag) */}
                <button
                  onClick={() => {
                    addItem(currentFlavor, 'single');
                    setCartOpen(true);
                  }}
                  type="button"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[#3B170E]/80 hover:bg-[#3B170E] text-[#FAF2E6] font-semibold text-sm sm:text-base border border-white/20 hover:border-white/40 backdrop-blur-md shadow-md transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#FAF2E6]" />
                  <span>{t('hero.orderNow')}</span>
                </button>
              </div>
            </div>

            {/* Right Product Showcase (Hero Cup + Background Cup) */}
            <div className="lg:col-span-6 relative flex items-center justify-center mt-6 lg:mt-0 select-none">
              {/* Secondary Background Cup (Offset, Peeking from the right just like reference) */}
              <motion.div
                key={`bg-cup-${nextFlavor.id}`}
                initial={{ opacity: 0, scale: 0.85, x: 20 }}
                animate={{ opacity: 0.75, scale: 0.9, x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onClick={handleNext}
                className="absolute right-0 sm:right-6 lg:right-4 top-1/2 -translate-y-1/2 w-48 sm:w-56 lg:w-64 cursor-pointer hover:opacity-95 transition-opacity z-0 pointer-events-auto"
                title={`${t('hero.nextFlavor')}: ${nextFlavor.name[lang] || nextFlavor.name.en}`}
              >
                <img
                  src={nextFlavor.image}
                  alt={nextFlavor.name[lang] || nextFlavor.name.en}
                  className="w-full h-auto object-contain filter drop-shadow-xl brightness-90 saturate-90"
                />
              </motion.div>

              {/* Main Featured Cup */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`hero-cup-${currentFlavor.id}`}
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.88, y: 20, rotate: direction * 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -20, rotate: -direction * 4 }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 24,
                  }}
                  className="relative z-10 w-64 sm:w-80 lg:w-[23rem] max-w-full drop-shadow-2xl cursor-pointer"
                  onClick={() => onOpenFlavorModal(currentFlavor)}
                >
                  <motion.img
                    src={currentFlavor.image}
                    alt={currentFlavor.name[lang] || currentFlavor.name.en}
                    className="w-full h-auto object-contain shadow-cup hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Organic Cream Wave along bottom of Hero Card (Exact recreation from Reference) */}
          <div className="relative w-full">
            {/* SVG Wave Path */}
            <svg
              className="w-full h-16 sm:h-20 lg:h-24 text-[#FAF2E6] fill-current block"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0,0 C150,90 350,-40 600,45 C850,130 1050,20 1200,60 L1200,120 L0,120 Z" />
            </svg>

            {/* Content inside bottom cream wave */}
            <div className="bg-[#FAF2E6] text-[#522518] px-6 sm:px-10 lg:px-14 pb-6 pt-2">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left: Quality Badge with 3 overlapping scoop avatars */}
                <div className="flex items-center gap-3.5">
                  {/* Overlapping Flavor Scoops */}
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {heroFlavors.map((flavor) => (
                      <div
                        key={`badge-${flavor.id}`}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#FAF2E6] shadow-sm"
                      >
                        <img
                          src={flavor.thumb}
                          alt={flavor.shortName[lang] || flavor.shortName.en}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Vertical separator */}
                  <div className="w-[1.5px] h-7 bg-[#522518]/25" />

                  {/* Text Quality Message */}
                  <div className="text-start">
                    <p className="text-xs sm:text-sm font-bold text-[#522518] leading-tight">
                      {t('hero.qualityBadgeTitle')}
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#522518]/75 leading-tight">
                      {t('hero.qualityBadgeSubtitle')}
                    </p>
                  </div>
                </div>

                {/* Right: Carousel Controls (Arrows + Pagination Dots) */}
                <div className="flex items-center gap-4">
                  {/* Previous Button */}
                  <button
                    onClick={handlePrev}
                    type="button"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#522518] hover:text-[#FAF2E6] text-[#522518] flex items-center justify-center border border-[#522518]/15 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                    aria-label="Previous slide"
                  >
                    {dir === 'rtl' ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronLeft className="w-4 h-4" />
                    )}
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    type="button"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#522518] hover:text-[#FAF2E6] text-[#522518] flex items-center justify-center border border-[#522518]/15 shadow-sm transition-all duration-200 cursor-pointer active:scale-95"
                    aria-label="Next slide"
                  >
                    {dir === 'rtl' ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {/* Pagination Dots */}
                  <div className="flex items-center gap-2">
                    {heroFlavors.map((flavor, index) => {
                      const isActive = activeIdx === index;
                      return (
                        <button
                          key={`dot-${flavor.id}`}
                          onClick={() => handleSelect(index)}
                          type="button"
                          className={`transition-all duration-300 rounded-full cursor-pointer ${
                            isActive
                              ? 'w-5 h-2.5 bg-[#522518]'
                              : 'w-2.5 h-2.5 bg-[#522518]/25 hover:bg-[#522518]/50'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
