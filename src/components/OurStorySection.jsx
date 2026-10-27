import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const OurStorySection = () => {
  const { t, lang } = useLanguage();

  const stats = [
    { number: t('story.stat1Number'), label: t('story.stat1Label'), icon: Heart },
    { number: t('story.stat2Number'), label: t('story.stat2Label'), icon: ShieldCheck },
    { number: t('story.stat3Number'), label: t('story.stat3Label'), icon: Sparkles },
    { number: t('story.stat4Number'), label: t('story.stat4Label'), icon: Award },
  ];

  return (
    <section id="story" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Main Story Container with Warm Chocolate & Cream Editorial Styling */}
        <div className="bg-[#FAF2E6] text-[#522518] rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-[#522518]/15 relative overflow-hidden">
          {/* Background Decorative Stamp */}
          <div className="absolute top-10 right-10 opacity-5 pointer-events-none select-none">
            <span className="font-display font-black text-9xl">buda</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Story Text Column */}
            <div className="lg:col-span-7 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#522518]/10 text-[#522518] text-xs sm:text-sm font-bold">
                <Heart className="w-3.5 h-3.5 text-[#DE7E59] fill-[#DE7E59]" />
                <span>{t('story.badge')}</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#522518] leading-[1.15] tracking-tight">
                {t('story.title')}
              </h2>

              <p className="text-base sm:text-lg text-[#522518]/85 leading-relaxed font-normal">
                {t('story.p1')}
              </p>

              <p className="text-sm sm:text-base text-[#522518]/80 leading-relaxed font-normal">
                {t('story.p2')}
              </p>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#522518]/15">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3 }}
                      className="p-3.5 rounded-2xl bg-white/70 border border-[#522518]/10 text-center space-y-1 shadow-sm"
                    >
                      <Icon className="w-4 h-4 mx-auto text-[#DE7E59]" />
                      <p className="font-display font-extrabold text-2xl sm:text-3xl text-[#522518]">
                        {stat.number}
                      </p>
                      <p className="text-[11px] sm:text-xs text-[#522518]/75 font-semibold leading-tight">
                        {stat.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Story Visual Imagery Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm">
                {/* Visual Frame */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src="/images/scoops-tubs-raw.png"
                    alt="buda artisanal gelato tubs and scoops"
                    className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#522518]/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                      buda | بوضة kitchen
                    </p>
                    <p className="text-sm font-semibold">
                      {lang === 'ar' ? 'شغف صناعة الجيلاتو الصافي' : 'The art of slow-churned pure gelato'}
                    </p>
                  </div>
                </div>

                {/* Floating Highlight Badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-5 -left-5 sm:-left-8 bg-[#522518] text-[#FAF2E6] px-4 py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 z-10"
                >
                  <div className="w-10 h-10 rounded-full bg-[#DE7E59] flex items-center justify-center font-display font-bold text-lg text-white">
                    100%
                  </div>
                  <div className="text-start">
                    <p className="text-xs font-bold leading-tight">
                      {lang === 'ar' ? 'طبيعي وطازج' : 'All Natural Dairy'}
                    </p>
                    <p className="text-[10px] text-white/70">
                      {lang === 'ar' ? 'بدون إضافات صناعية' : 'No synthetic fillers'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
