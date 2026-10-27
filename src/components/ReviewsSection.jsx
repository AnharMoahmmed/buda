import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { reviewsData } from '../data/reviews';
import { Star, ChevronLeft, ChevronRight, Quote, Heart, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReviewsSection = () => {
  const { t, lang, dir } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const currentReview = reviewsData[activeIdx];

  return (
    <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/25 border border-white/30 text-white text-xs sm:text-sm font-semibold shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>{t('reviews.badge')}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {t('reviews.title')}
          </h2>

          <p className="text-white/85 text-sm sm:text-base leading-relaxed">
            {t('reviews.subtitle')}
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-[#FAF2E6] text-[#522518] rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-[#522518]/15 overflow-hidden">
          {/* Subtle Quote Watermark */}
          <Quote className="absolute top-6 right-8 w-20 h-20 text-[#522518]/10 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[...Array(currentReview.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#E09939] text-[#E09939]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-display text-xl sm:text-2xl lg:text-3xl text-[#522518] font-bold leading-relaxed text-start">
                "{currentReview.text[lang] || currentReview.text.en}"
              </p>

              {/* Author & Flavor Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#522518]/15">
                <div className="flex items-center gap-3.5">
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.author[lang] || currentReview.author.en}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="text-start">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-base text-[#522518]">
                        {currentReview.author[lang] || currentReview.author.en}
                      </span>
                      {currentReview.verified && (
                        <BadgeCheck className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <span className="text-xs text-[#522518]/70">
                      {currentReview.city[lang] || currentReview.city.en} • {t('reviews.verified')}
                    </span>
                  </div>
                </div>

                {/* Favorite Flavor Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-xs font-semibold text-[#522518] border border-[#522518]/15 shadow-sm self-start sm:self-auto">
                  <span>🍦 Favorite:</span>
                  <span className="font-bold text-[#DE7E59]">
                    {currentReview.flavor[lang] || currentReview.flavor.en}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls Footer */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#522518]/10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviewsData.map((rev, index) => (
                <button
                  key={rev.id}
                  onClick={() => setActiveIdx(index)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIdx === index
                      ? 'w-6 h-2.5 bg-[#522518]'
                      : 'w-2.5 h-2.5 bg-[#522518]/25 hover:bg-[#522518]/50'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                type="button"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#522518] hover:text-[#FAF2E6] text-[#522518] flex items-center justify-center border border-[#522518]/15 shadow-sm transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                {dir === 'rtl' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              <button
                onClick={handleNext}
                type="button"
                className="w-9 h-9 rounded-full bg-white hover:bg-[#522518] hover:text-[#FAF2E6] text-[#522518] flex items-center justify-center border border-[#522518]/15 shadow-sm transition-colors cursor-pointer"
                aria-label="Next review"
              >
                {dir === 'rtl' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
