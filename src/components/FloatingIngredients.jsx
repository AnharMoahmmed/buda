import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const FloatingIngredients = ({ flavorId }) => {
  const shouldReduceMotion = useReducedMotion();

  // Container variants with staggerChildren: 0.08
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  // Staggered pop-in item variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.7,
      y: shouldReduceMotion ? 0 : 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.25 }
        : { type: "spring", stiffness: 320, damping: 22 },
    },
  };

  // Continuous floating idle animation parameters
  const getFloatTransition = (duration = 4, delay = 0) => ({
    repeat: Infinity,
    duration,
    delay,
    ease: "easeInOut",
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 3 Joy Motion Lines above the cup (from reference) */}
      <motion.svg
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute top-[16%] right-[32%] sm:right-[34%] w-10 h-10 sm:w-12 sm:h-12 text-white/80"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 28L4 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M22 22L18 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 26L36 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </motion.svg>

      {/* Cute Hand-Drawn Doodle Cup (from reference) */}
      <motion.svg
        animate={
          shouldReduceMotion
            ? {}
            : { y: [-6, 6, -6], rotate: [-2, 4, -2] }
        }
        transition={getFloatTransition(4.5, 0.2)}
        className="absolute top-[26%] right-[10%] sm:right-[14%] w-8 h-8 sm:w-10 sm:h-10 text-white/70"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 16C10 12 13 8 16 8C19 8 22 12 22 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 16C8 16 9 13 16 13C23 13 24 16 24 16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M9 16L11 26C11.3 27.2 12.3 28 13.5 28H18.5C19.7 28 20.7 27.2 21 26L23 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Ambient Sparkles */}
      <motion.div
        animate={shouldReduceMotion ? {} : { scale: [1, 1.25, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={getFloatTransition(3.2)}
        className="absolute top-[20%] left-[46%] w-2.5 h-2.5 rounded-full bg-white/70 shadow-sm"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : { scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={getFloatTransition(3.8, 1)}
        className="absolute bottom-[36%] right-[7%] w-2 h-2 rounded-full bg-white/60 shadow-sm"
      />

      {/* Staggered Flavor Ingredients with continuous idle float */}
      <AnimatePresence mode="wait">
        <motion.div
          key={flavorId}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute inset-0"
        >
          {flavorId === 'chocolate' && (
            <>
              {/* Ingredient 1: Chocolate Block */}
              <motion.div
                variants={itemVariants}
                className="absolute top-[36%] right-[42%] z-0"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { y: [-8, 8, -8], rotate: [-3, 3, -3] }
                  }
                  transition={getFloatTransition(4, 0)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-gradient-to-br from-[#3D1A10] to-[#200A05] border border-white/20 shadow-xl"
                  style={{
                    boxShadow: "0 10px 22px rgba(0,0,0,0.5), inset 1px 1px 2px rgba(255,255,255,0.25)"
                  }}
                />
              </motion.div>

              {/* Ingredient 2: Chocolate Chunk Lower Right */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-[28%] right-[38%] z-0"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { y: [8, -8, 8], rotate: [3, -4, 3] }
                  }
                  transition={getFloatTransition(4.4, 0.5)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#38160B] to-[#1C0803] border border-white/20 shadow-2xl -rotate-12"
                  style={{
                    boxShadow: "0 12px 25px rgba(0,0,0,0.55), inset 1px 1px 3px rgba(255,255,255,0.3)"
                  }}
                />
              </motion.div>

              {/* Ingredient 3: Cocoa Shaving / Nib */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-[24%] right-[46%] z-0"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { y: [-6, 6, -6], rotate: [20, 28, 20] }
                  }
                  transition={getFloatTransition(3.6, 1)}
                  className="w-4 h-3 rounded-sm bg-[#421A0F] border border-white/10 shadow-md rotate-45"
                />
              </motion.div>
            </>
          )}

          {flavorId === 'pistachio' && (
            <>
              {/* Ingredient 1: Whole Roasted Pistachio Nut */}
              <motion.div
                variants={itemVariants}
                className="absolute top-[35%] right-[40%] z-0"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { y: [-8, 8, -8], rotate: [-3, 3, -3] }
                  }
                  transition={getFloatTransition(4, 0)}
                  className="w-8 h-6 sm:w-9 sm:h-6 rounded-full bg-gradient-to-r from-[#8BB463] to-[#A3CC7A] border-2 border-[#D7B988] shadow-xl rotate-20"
                  style={{
                    boxShadow: "0 10px 20px rgba(0,0,0,0.45), inset 1px 1px 3px rgba(255,255,255,0.4)"
                  }}
                />
              </motion.div>

              {/* Ingredient 2: Pistachio Shell Half */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-[28%] right-[36%] z-0"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { y: [8, -8, 8], rotate: [4, -3, 4] }
                  }
                  transition={getFloatTransition(4.2, 0.4)}
                  className="w-9 h-6 sm:w-10 sm:h-6 rounded-full bg-gradient-to-b from-[#E6D0AC] to-[#C2A379] border border-[#96764B] shadow-lg -rotate-15"
                  style={{
                    boxShadow: "0 8px 18px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.3)"
                  }}
                />
              </motion.div>

              {/* Ingredient 3: Crushed Pistachio Sliver */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-[23%] right-[45%] z-0"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { y: [-7, 7, -7], rotate: [-10, 10, -10] }
                  }
                  transition={getFloatTransition(3.8, 0.8)}
                  className="w-4 h-3 rounded-full bg-[#83AA58] border border-[#C5A877] shadow-sm rotate-45"
                />
              </motion.div>
            </>
          )}

          {flavorId === 'strawberry' && (
            <>
              {/* Ingredient 1: Fresh Strawberry Slice */}
              <motion.div
                variants={itemVariants}
                className="absolute top-[34%] right-[40%] z-0"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { y: [-8, 8, -8], rotate: [-3, 3, -3] }
                  }
                  transition={getFloatTransition(4, 0)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#DE2A40] via-[#EF4358] to-[#FF7586] border border-white/20 shadow-xl"
                  style={{
                    boxShadow: "0 10px 22px rgba(0,0,0,0.45), inset 1px 1px 3px rgba(255,255,255,0.4)"
                  }}
                >
                  <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-white/60" />
                </motion.div>
              </motion.div>

              {/* Ingredient 2: Sweet Berry Heart Drop */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-[28%] right-[37%] z-0"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { y: [8, -8, 8], rotate: [4, -4, 4] }
                  }
                  transition={getFloatTransition(4.3, 0.5)}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#F43F5E] to-[#BE123C] border border-white/20 shadow-lg -rotate-12"
                  style={{
                    boxShadow: "0 8px 18px rgba(0,0,0,0.4)"
                  }}
                />
              </motion.div>

              {/* Ingredient 3: Fresh Strawberry Leaf */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-[24%] right-[45%] z-0"
              >
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? {}
                      : { y: [-6, 6, -6], rotate: [15, 25, 15] }
                  }
                  transition={getFloatTransition(3.7, 0.9)}
                  className="w-4 h-3.5 rounded-tr-xl rounded-bl-xl bg-[#4ADE80] border border-white/20 shadow-sm"
                />
              </motion.div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
