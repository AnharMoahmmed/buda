import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const FlavorSelector = ({
  flavors,
  activeFlavorIndex,
  onSelectFlavor,
  onNextFlavor,
}) => {
  const { lang, dir } = useLanguage();

  return (
    <div className="flex items-center gap-3 sm:gap-4 select-none">
      {/* 3 Circular Flavor Pills */}
      <div className="flex items-center gap-2 sm:gap-3">
        {flavors.map((flavor, index) => {
          const isActive = activeFlavorIndex === index;
          return (
            <button
              key={flavor.id}
              onClick={() => onSelectFlavor(index)}
              type="button"
              className="group flex flex-col items-center cursor-pointer focus:outline-none"
              aria-label={`Select ${flavor.name[lang] || flavor.name.en}`}
            >
              <div
                className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 transition-all duration-300 ${
                  isActive
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-[#522518] scale-110 shadow-lg'
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
              >
                <img
                  src={flavor.thumb}
                  alt={flavor.shortName[lang] || flavor.shortName.en}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Flavor Label below circle (shown clearly for active, subtle for others) */}
              <span
                className={`mt-1.5 text-[11px] sm:text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white font-bold opacity-100'
                    : 'text-white/60 opacity-0 sm:opacity-70 group-hover:opacity-100'
                }`}
              >
                {flavor.shortName[lang] || flavor.shortName.en}
              </span>
            </button>
          );
        })}
      </div>

      {/* Next Flavor Circle Button (from reference image) */}
      <button
        onClick={onNextFlavor}
        type="button"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center border border-white/25 backdrop-blur-md transition-all shadow-md cursor-pointer self-start mt-1"
        aria-label="Next flavor"
      >
        <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
};
