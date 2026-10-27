import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Milk, Leaf, Clock, PackageCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyBudaSection = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Milk,
      title: t('whyBuda.card1Title'),
      desc: t('whyBuda.card1Desc'),
      color: 'from-amber-500/20 to-orange-500/10',
    },
    {
      icon: Leaf,
      title: t('whyBuda.card2Title'),
      desc: t('whyBuda.card2Desc'),
      color: 'from-emerald-500/20 to-teal-500/10',
    },
    {
      icon: Clock,
      title: t('whyBuda.card3Title'),
      desc: t('whyBuda.card3Desc'),
      color: 'from-blue-500/20 to-indigo-500/10',
    },
    {
      icon: PackageCheck,
      title: t('whyBuda.card4Title'),
      desc: t('whyBuda.card4Desc'),
      color: 'from-rose-500/20 to-pink-500/10',
    },
  ];

  return (
    <section id="why-buda" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/25 border border-white/30 text-white text-xs sm:text-sm font-semibold shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t('whyBuda.badge')}</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            {t('whyBuda.title')}
          </h2>

          <p className="text-white/85 text-sm sm:text-base leading-relaxed">
            {t('whyBuda.subtitle')}
          </p>
        </div>

        {/* 4 Brand Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-[#FAF2E6] text-[#522518] rounded-3xl p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-[#522518]/10 group"
              >
                <div>
                  {/* Icon Circle */}
                  <div className="w-13 h-13 rounded-2xl bg-[#522518] text-[#FAF2E6] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#DE7E59] transition-all duration-300 shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#522518] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#522518]/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-4 border-t border-[#522518]/10 flex items-center justify-between text-[11px] font-bold text-[#DE7E59]">
                  <span>buda standard</span>
                  <span>0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
