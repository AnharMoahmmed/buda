import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FlavorsGrid } from './components/FlavorsGrid';
import { OurStorySection } from './components/OurStorySection';
import { WhyBudaSection } from './components/WhyBudaSection';
import { FeaturedProductSection } from './components/FeaturedProductSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FlavorModal } from './components/FlavorModal';
import { CartDrawer } from './components/CartDrawer';
import { flavorsData } from './data/flavors';
import { ShoppingBag, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function BudaApp() {
  const { lang, t, dir } = useLanguage();
  const { totalItems, setIsOpen: setCartOpen } = useCart();
  const [selectedFlavorModal, setSelectedFlavorModal] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredFlavor = flavorsData.find((f) => f.id === 'chocolate') || flavorsData[0];

  return (
    <div className="min-h-screen bg-[#E58B68] text-[#522518] selection:bg-[#522518] selection:text-[#FAF2E6] font-body relative overflow-x-hidden">
      {/* Navigation Header */}
      <Header />

      {/* Hero Section (Recreates Reference Design) */}
      <HeroSection onOpenFlavorModal={(flavor) => setSelectedFlavorModal(flavor)} />

      {/* Section A — Discover Our Flavors */}
      <FlavorsGrid onOpenFlavorModal={(flavor) => setSelectedFlavorModal(flavor)} />

      {/* Section B — Our Story */}
      <OurStorySection />

      {/* Section C — Why Buda? (Brand Values) */}
      <WhyBudaSection />

      {/* Section D — Featured Product Showcase */}
      <FeaturedProductSection
        featuredFlavor={featuredFlavor}
        onOpenFlavorModal={(flavor) => setSelectedFlavorModal(flavor)}
      />

      {/* Section E — Customer Reviews */}
      <ReviewsSection />

      {/* Section F — Visit Us / Store & Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Flavor Details Quick View Modal */}
      {selectedFlavorModal && (
        <FlavorModal
          flavor={selectedFlavorModal}
          onClose={() => setSelectedFlavorModal(null)}
        />
      )}

      {/* Order Bag Drawer */}
      <CartDrawer />

      {/* Floating Bottom Action Buttons */}
      <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex flex-col items-center gap-3">
        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              type="button"
              className="w-10 h-10 rounded-full bg-white/30 hover:bg-white text-white hover:text-[#522518] backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-center transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Cart Pill */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCartOpen(true)}
          type="button"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#522518] hover:bg-[#38150C] text-[#FAF2E6] font-bold text-sm shadow-2xl border-2 border-[#FAF2E6]/30 cursor-pointer"
          aria-label="Open Order Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#DE7E59] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </div>
          <span className="hidden sm:inline">
            {lang === 'ar' ? 'سلة الطلب' : 'Your Order'}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <BudaApp />
      </CartProvider>
    </LanguageProvider>
  );
}
