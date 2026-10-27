import React from 'react';
import { motion } from 'framer-motion';

export const FloatingDoodles = ({ flavorId }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
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
        animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[28%] right-[10%] sm:right-[14%] w-8 h-8 sm:w-10 sm:h-10 text-white/70"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ice cream scoop swirl */}
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
        {/* Cup outline */}
        <path
          d="M9 16L11 26C11.3 27.2 12.3 28 13.5 28H18.5C19.7 28 20.7 27.2 21 26L23 16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Floating Sparkles / Joy Star */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[22%] left-[45%] w-2.5 h-2.5 rounded-full bg-white/70 shadow-sm"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        className="absolute bottom-[35%] right-[8%] w-2 h-2 rounded-full bg-white/60 shadow-sm"
      />

      {/* Flavor-specific floating ingredient pieces */}
      {flavorId === 'chocolate' && (
        <>
          {/* Chocolate Chunk 1 */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[36%] right-[42%] w-6 h-6 sm:w-7 sm:h-7 bg-[#2E120A] rounded-md shadow-md border border-white/10 rotate-12"
            style={{
              boxShadow: "0 8px 16px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.2)"
            }}
          />
          {/* Chocolate Chunk 2 */}
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [-15, -8, -15] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
            className="absolute bottom-[28%] right-[38%] w-8 h-8 sm:w-9 sm:h-9 bg-[#260E07] rounded-md shadow-lg border border-white/10 -rotate-12"
            style={{
              boxShadow: "0 10px 20px rgba(0,0,0,0.45), inset 1px 1px 2px rgba(255,255,255,0.25)"
            }}
          />
          {/* Shaving */}
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [25, 35, 25] }}
            transition={{ duration: 3.8, repeat: Infinity, delay: 1, ease: "easeInOut" }}
            className="absolute bottom-[24%] right-[46%] w-4 h-3 bg-[#38160B] rounded-sm shadow-sm rotate-45"
          />
        </>
      )}

      {flavorId === 'pistachio' && (
        <>
          {/* Whole roasted pistachio nut */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [15, 30, 15] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[35%] right-[40%] w-7 h-5 bg-[#96B874] rounded-full shadow-md border border-[#C5A877] rotate-25"
            style={{
              boxShadow: "0 6px 14px rgba(0,0,0,0.35), inset 1px 1px 3px rgba(255,255,255,0.4)"
            }}
          />
          {/* Pistachio shell half */}
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [-20, -5, -20] }}
            transition={{ duration: 4.2, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
            className="absolute bottom-[28%] right-[36%] w-8 h-5 bg-[#CBB18B] rounded-full shadow-md -rotate-15 border border-[#8B7355]"
          />
        </>
      )}

      {flavorId === 'strawberry' && (
        <>
          {/* Strawberry heart slice */}
          <motion.div
            animate={{ y: [0, -9, 0], rotate: [-10, 5, -10] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[35%] right-[40%] w-8 h-8 rounded-full bg-[#E5394B] shadow-md border border-white/20"
            style={{
              boxShadow: "0 8px 18px rgba(0,0,0,0.35), inset 1px 1px 3px rgba(255,255,255,0.4)"
            }}
          >
            <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-white/50" />
          </motion.div>
        </>
      )}
    </div>
  );
};
