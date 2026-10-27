import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { BudaLogo } from './BudaLogo';
import { FlavorSelector } from './FlavorSelector';
import { FloatingIngredients } from './FloatingIngredients';
import { flavorsData } from '../data/flavors';
import { ShoppingBag, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const HeroSection = ({ onOpenFlavorModal, onActiveFlavorChange }) => {
  const { lang, t, dir } = useLanguage();
  const { addItem, setIsOpen: setCartOpen } = useCart();
  const shouldReduceMotion = useReducedMotion();

  // The 3 primary carousel flavors (Chocolate, Pistachio, Strawberry)
  const heroFlavors = flavorsData.filter((f) => f.isHero);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const currentFlavor = heroFlavors[activeIdx];
  const nextIdx = (activeIdx + 1) % heroFlavors.length;
  const nextFlavor = heroFlavors[nextIdx];

  // Notify parent of active flavor for full page background harmony
  useEffect(() => {
    if (onActiveFlavorChange) {
      onActiveFlavorChange(currentFlavor);
    }
  }, [currentFlavor, onActiveFlavorChange]);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % heroFlavors.length);
  }, [heroFlavors.length]);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + heroFlavors.length) % heroFlavors.length);
  }, [heroFlavors.length]);

  const handleSelect = (idx) => {
    setActiveIdx(idx);
    resetAutoPlayTimer();
  };

  // Auto-play timer every 2 seconds (2000ms) as requested
  const resetAutoPlayTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 2000);
    }
  }, [handleNext, isPaused]);

  useEffect(() => {
    resetAutoPlayTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoPlayTimer]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        dir === 'rtl' ? handlePrev() : handleNext();
        resetAutoPlayTimer();
      } else if (e.key === 'ArrowLeft') {
        dir === 'rtl' ? handleNext() : handlePrev();
        resetAutoPlayTimer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, dir, resetAutoPlayTimer]);

  const isRtl = dir === 'rtl';

  // Cup Motion Variants
  const cupVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.25 } },
      }
    : {
        initial: {
          opacity: 0,
          scale: 0.8,
          x: isRtl ? -100 : 100,
          rotate: isRtl ? -8 : 8,
        },
        animate: {
          opacity: 1,
          scale: 1,
          x: 0,
          rotate: 0,
          transition: {
            type: "spring",
            stiffness: 280,
            damping: 22,
            mass: 0.75,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.85,
          x: isRtl ? 80 : -80,
          rotate: isRtl ? 6 : -6,
          transition: {
            duration: 0.35,
            ease: "easeInOut",
          },
        },
      };

  // Secondary Background Cup (Parallax with staggered delay 0.08 and softer spring)
  const bgCupVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 0.75, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        initial: {
          opacity: 0,
          scale: 0.75,
          x: isRtl ? -40 : 40,
          rotate: isRtl ? -4 : 4,
        },
        animate: {
          opacity: 0.75,
          scale: 0.9,
          x: 0,
          rotate: 0,
          transition: {
            delay: 0.08,
            type: "spring",
            stiffness: 220,
            damping: 24,
            mass: 1,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.7,
          x: isRtl ? 30 : -30,
          transition: { duration: 0.3, ease: "easeInOut" },
        },
      };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Card with Framer Motion dynamic backgroundColor transition */}
        <motion.div
          animate={{
            backgroundColor: currentFlavor.heroBg || currentFlavor.cardBg || '#522518',
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden text-white shadow-hero-card border border-white/10"
        >
          {/* Subtle Ambient Glow */}
          <motion.div
            animate={{
              backgroundColor: currentFlavor.accentColor,
            }}
            transition={{ duration: 0.6 }}
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          />

          {/* Doodles & Floating Ingredients with Staggered Entrance & Idle Float */}
          <FloatingIngredients flavorId={currentFlavor.id} />

          {/* Card Top Header */}
          <div className="relative z-10 flex items-center justify-between p-6 sm:p-8 lg:p-10 pb-0">
            {/* Brand Logo inside card (Fixed LTR display in RTL) */}
            <div className="text-white">
              <BudaLogo className="text-white text-xl sm:text-2xl" />
            </div>

            {/* Flavor Selector with layoutId="activePill" */}
            <FlavorSelector
              flavors={heroFlavors}
              activeFlavorIndex={activeIdx}
              onSelectFlavor={(idx) => {
                handleSelect(idx);
              }}
              onNextFlavor={() => {
                handleNext();
                resetAutoPlayTimer();
              }}
            />
          </div>

          {/* Card Main Body */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6 sm:px-10 lg:px-14 pt-6 sm:pt-8 pb-12 lg:pb-16 min-h-[480px] lg:min-h-[520px]">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-center lg:text-start">
              {/* Dynamic Tag with smooth cross-fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tag-${currentFlavor.id}`}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white/95"
                >
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: currentFlavor.accentColor }}
                  />
                  <span>{currentFlavor.tagline[lang] || currentFlavor.tagline.en}</span>
                </motion.div>
              </AnimatePresence>

              {/* Headline with smooth text cross-fade and slide-up: y: [15, 0], opacity: [0, 1] */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`headline-${currentFlavor.id}-${lang}`}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -15 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.8rem] leading-[1.08] tracking-tight text-white drop-shadow-sm"
                >
                  {t('hero.tagline')}
                </motion.h1>
              </AnimatePresence>

              {/* Subtitle / Description with smooth slide up */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`sub-${currentFlavor.id}-${lang}`}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="text-white/85 text-sm sm:text-base lg:text-lg max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed"
                >
                  {currentFlavor.description[lang] || currentFlavor.description.en}
                </motion.p>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                {/* Primary CTA (Cream Pill with Arrow) */}
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  onClick={() => {
                    const el = document.querySelector('#flavors');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  type="button"
                  className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#FAF2E6] hover:bg-white text-[#522518] font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <span>{t('hero.exploreFlavors')}</span>
                  {dir === 'rtl' ? (
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </motion.button>

                {/* Secondary CTA (Dark Chocolate Pill with Shopping Bag) */}
                <motion.button
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                  onClick={() => {
                    addItem(currentFlavor, 'single');
                    setCartOpen(true);
                  }}
                  type="button"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[#3B170E]/80 hover:bg-[#3B170E] text-[#FAF2E6] font-semibold text-sm sm:text-base border border-white/20 hover:border-white/40 backdrop-blur-md shadow-md transition-shadow duration-300 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#FAF2E6]" />
                  <span>{t('hero.orderNow')}</span>
                </motion.button>
              </div>
            </div>

            {/* Right Product Showcase: Continuous conveyor animation (Chocolate -> Pistachio -> Strawberry) */}
            <div className="lg:col-span-6 relative flex items-center justify-center mt-6 lg:mt-0 select-none min-h-[320px] sm:min-h-[380px]">
              {/* Secondary Background Cup (Offset, Peeking from the right, ready to swoop forward next) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`bg-cup-${nextFlavor.id}`}
                  variants={bgCupVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onClick={() => {
                    handleNext();
                    resetAutoPlayTimer();
                  }}
                  className="absolute right-0 sm:right-6 lg:right-4 top-1/2 -translate-y-1/2 w-48 sm:w-56 lg:w-64 cursor-pointer hover:opacity-95 transition-opacity z-0 pointer-events-auto"
                  title={`${t('hero.nextFlavor')}: ${nextFlavor.name[lang] || nextFlavor.name.en}`}
                >
                  <img
                    src={nextFlavor.image}
                    alt={nextFlavor.name[lang] || nextFlavor.name.en}
                    className="w-full h-auto object-contain filter drop-shadow-xl brightness-90 saturate-90"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Main Featured Cup with pristine transparent cutout and smooth entrance/exit */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`hero-cup-${currentFlavor.id}`}
                  variants={cupVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative z-10 w-64 sm:w-80 lg:w-[23rem] max-w-full drop-shadow-2xl cursor-pointer"
                  onClick={() => onOpenFlavorModal(currentFlavor)}
                >
                  <motion.img
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    src={currentFlavor.image}
                    alt={currentFlavor.name[lang] || currentFlavor.name.en}
                    className="w-full h-auto object-contain shadow-cup"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Organic Cream Wave along bottom of Hero Card */}
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
                  <div className="flex -space-x-2 rtl:space-x-reverse">
                    {heroFlavors.map((flavor, index) => (
                      <button
                        key={`badge-${flavor.id}`}
                        type="button"
                        onClick={() => {
                          handleSelect(index);
                        }}
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 transition-transform cursor-pointer ${
                          activeIdx === index
                            ? 'border-[#522518] scale-110 shadow-md'
                            : 'border-[#FAF2E6] opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={flavor.thumb}
                          alt={flavor.shortName[lang] || flavor.shortName.en}
                          className="w-full h-full object-cover"
                        />
                      </button>
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

                {/* Right: Carousel Controls (Arrows + Pagination Dots) with whileHover & whileTap */}
                <div className="flex items-center gap-4">
                  {/* Previous Button */}
                  <motion.button
                    onClick={() => {
                      handlePrev();
                      resetAutoPlayTimer();
                    }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    type="button"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#522518] hover:text-[#FAF2E6] text-[#522518] flex items-center justify-center border border-[#522518]/15 shadow-sm hover:shadow-md transition-colors cursor-pointer"
                    aria-label="Previous slide"
                  >
                    {dir === 'rtl' ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronLeft className="w-4 h-4" />
                    )}
                  </motion.button>

                  {/* Next Button */}
                  <motion.button
                    onClick={() => {
                      handleNext();
                      resetAutoPlayTimer();
                    }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                    type="button"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-[#522518] hover:text-[#FAF2E6] text-[#522518] flex items-center justify-center border border-[#522518]/15 shadow-sm hover:shadow-md transition-colors cursor-pointer"
                    aria-label="Next slide"
                  >
                    {dir === 'rtl' ? (
                      <ChevronLeft className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </motion.button>

                  {/* Pagination Dots */}
                  <div className="flex items-center gap-2">
                    {heroFlavors.map((flavor, index) => {
                      const isActive = activeIdx === index;
                      return (
                        <motion.button
                          key={`dot-${flavor.id}`}
                          onClick={() => handleSelect(index)}
                          whileHover={shouldReduceMotion ? {} : { scale: 1.2 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
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
        </motion.div>
      </div>
    </section>
  );
};
