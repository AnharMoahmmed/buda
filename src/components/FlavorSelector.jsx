import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const FlavorSelector = ({
  flavors,
  activeFlavorIndex,
  onSelectFlavor,
  onNextFlavor,
}) => {
  const { lang, dir } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-3 sm:gap-4 select-none relative z-20">
      {/* 3 Circular Flavor Pills with layoutId="activePill" */}
      <div className="flex items-center gap-2 sm:gap-3">
        {flavors.map((flavor, index) => {
          const isActive = activeFlavorIndex === index;
          return (
            <button
              key={flavor.id}
              onClick={() => onSelectFlavor(index)}
              type="button"
              className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
              aria-label={`Select ${flavor.name[lang] || flavor.name.en}`}
            >
              {/* Outer container with active pill indicator */}
              <div className="relative p-1">
                {/* Seamless sliding active pill background / ring */}
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.25 }
                        : { type: "spring", stiffness: 380, damping: 28 }
                    }
                    className="absolute inset-0 rounded-full bg-white/20 ring-2 ring-white ring-offset-2 ring-offset-[#522518] shadow-glow"
                  />
                )}

                {/* Flavor Thumbnail */}
                <div
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden transition-transform duration-300 ${
                    isActive ? 'scale-105' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'
                  }`}
                >
                  <img
                    src={flavor.thumb}
                    alt={flavor.shortName[lang] || flavor.shortName.en}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Flavor Label below circle */}
              <span
                className={`mt-1 text-[11px] sm:text-xs font-medium transition-all duration-300 ${
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

      {/* Next Flavor Circle Button with whileHover={{ scale: 1.05 }} and whileTap={{ scale: 0.9 }} */}
      <motion.button
        onClick={onNextFlavor}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
        type="button"
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center border border-white/25 backdrop-blur-md transition-shadow shadow-md hover:shadow-xl cursor-pointer self-start mt-1.5"
        aria-label="Next flavor"
      >
        <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
      </motion.button>
    </div>
  );
};
