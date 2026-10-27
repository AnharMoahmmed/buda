import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = ({ variant = "pill" }) => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className={`group relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer active:scale-95 ${
        variant === "pill"
          ? "bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/25 shadow-sm"
          : "bg-[#FAF2E6] text-[#522518] hover:bg-white shadow-sm"
      }`}
      aria-label={lang === 'en' ? 'تبديل إلى اللغة العربية' : 'Switch to English'}
    >
      <Globe className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45 opacity-80" />
      <span className="tracking-wide">
        {lang === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  );
};
