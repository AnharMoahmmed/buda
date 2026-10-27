import React from 'react';

export const BudaLogo = ({ className = "h-8", color = "currentColor", withSmile = true }) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none font-display font-bold tracking-tight ${className}`}>
      {/* English Logo with signature smile arc */}
      <span className="relative flex items-center text-[1.4em] leading-none">
        <span>b</span>
        <span className="relative">
          <span>u</span>
          {withSmile && (
            <svg
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-2"
              viewBox="0 0 20 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2C6 8 14 8 18 2"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <span>da</span>
      </span>

      {/* Separator bar */}
      <span className="opacity-40 text-[1.1em] font-light">|</span>

      {/* Arabic Logo */}
      <span className="font-arabic text-[1.3em] font-extrabold leading-none pt-0.5">
        بوضة
      </span>
    </div>
  );
};
