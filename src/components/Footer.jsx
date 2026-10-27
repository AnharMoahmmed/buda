import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BudaLogo } from './BudaLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Heart, MapPin, Clock } from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
  </svg>
);

export const Footer = () => {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-[#522518] text-[#FAF2E6] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4 text-start">
            <BudaLogo className="text-white text-2xl" />
            <p className="text-sm text-[#FAF2E6]/75 max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#location"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                aria-label="Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-start">
            <h4 className="font-display font-bold text-base text-white">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF2E6]/75">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#flavors" className="hover:text-white transition-colors">
                  {t('nav.flavors')}
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  {t('nav.story')}
                </a>
              </li>
              <li>
                <a href="#why-buda" className="hover:text-white transition-colors">
                  {t('nav.whyBuda')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t('nav.visit')}
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Flavors */}
          <div className="md:col-span-4 space-y-3 text-start">
            <h4 className="font-display font-bold text-base text-white">
              {t('footer.flavorsList')}
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { name: lang === 'ar' ? 'شوكولاتة بلجيكية' : 'Belgian Chocolate' },
                { name: lang === 'ar' ? 'فستق صقلي فاخر' : 'Bronte Pistachio' },
                { name: lang === 'ar' ? 'فراولة طازجة' : 'Fresh Strawberry' },
                { name: lang === 'ar' ? 'كراميل لوتس' : 'Salted Caramel' },
                { name: lang === 'ar' ? 'مانجو ألفونسو' : 'Alphonso Mango' },
                { name: lang === 'ar' ? 'فانيلا مدغشقر' : 'Madagascar Vanilla' },
              ].map((f, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
                >
                  {f.name}
                </span>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-2">
              <span className="text-xs text-[#FAF2E6]/60">
                {lang === 'ar' ? 'اللغة / Language:' : 'Language:'}
              </span>
              <LanguageSwitcher variant="pill" />
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF2E6]/60">
          <p>© {new Date().getFullYear()} buda | بوضة. {t('footer.copyright')}</p>
          <div className="flex items-center gap-1.5">
            <span>{t('footer.madeWithJoy')}</span>
            <Heart className="w-3.5 h-3.5 text-[#DE7E59] fill-[#DE7E59]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
