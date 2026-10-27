import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { BudaLogo } from './BudaLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const { lang, t, dir } = useLanguage();
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('nav.home'), href: '#home' },
    { id: 'flavors', label: t('nav.flavors'), href: '#flavors' },
    { id: 'story', label: t('nav.story'), href: '#story' },
    { id: 'why-buda', label: t('nav.whyBuda'), href: '#why-buda' },
    { id: 'reviews', label: t('nav.reviews'), href: '#reviews' },
    { id: 'contact', label: t('nav.visit'), href: '#contact' },
  ];

  const handleNavClick = (id, href) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#E58B68]/90 backdrop-blur-md py-3 shadow-md border-b border-white/10'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home', '#home');
            }}
            className="flex items-center text-white hover:opacity-95 transition-opacity"
          >
            <BudaLogo className="text-white text-xl sm:text-2xl" />
          </a>

          {/* Desktop Nav Items (Pill Style from Reference) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/15 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-pill">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  type="button"
                  className={`px-4 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#FAF2E6] text-[#522518] shadow-sm font-semibold scale-100'
                      : 'text-white/90 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              type="button"
              className="relative p-2 text-white bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 rounded-full transition-all cursor-pointer active:scale-95 shadow-sm"
              aria-label="Order Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#522518] text-[#FAF2E6] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF2E6] shadow">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Order Now Button (Reference Image Pill Style) */}
            <button
              onClick={() => {
                const flavorsEl = document.querySelector('#flavors');
                if (flavorsEl) flavorsEl.scrollIntoView({ behavior: 'smooth' });
              }}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs lg:text-sm font-semibold rounded-full text-white bg-white/15 hover:bg-white/25 border border-white/40 backdrop-blur-md transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t('nav.orderNow')}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 text-white bg-white/20 hover:bg-white/30 rounded-full border border-white/25 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#DE7E59]/95 backdrop-blur-xl border-b border-white/20 shadow-xl"
          >
            <div className="px-5 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.href)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                    activeNav === item.id
                      ? 'bg-[#FAF2E6] text-[#522518] font-bold shadow'
                      : 'text-white hover:bg-white/15'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 opacity-60 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                </button>
              ))}

              <div className="pt-3 border-t border-white/20">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const flavorsEl = document.querySelector('#flavors');
                    if (flavorsEl) flavorsEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#522518] text-[#FAF2E6] font-semibold text-sm shadow-md active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('nav.orderNow')}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
