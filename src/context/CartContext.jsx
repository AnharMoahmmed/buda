import React, { createContext, useContext, useState, useMemo } from 'react';
import { useLanguage } from './LanguageContext';
import { flavorsData } from '../data/flavors';

const CartContext = createContext(null);

export const DEFAULT_WHATSAPP_NUMBER = "966555123456";

export const CartProvider = ({ children }) => {
  const { lang, t } = useLanguage();
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  const addItem = (flavor, size = 'single') => {
    const sizePrice = flavor.prices[size] || flavor.prices.single;
    const itemId = `${flavor.id}-${size}`;

    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === itemId);
      if (existing) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: itemId,
          flavorId: flavor.id,
          name: flavor.name,
          size,
          price: sizePrice,
          quantity: 1,
          image: flavor.image,
          accentColor: flavor.accentColor,
        }
      ];
    });

    setLastAddedItem({ ...flavor, size });
    setTimeout(() => setLastAddedItem(null), 3000);
  };

  const removeItem = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const getWhatsAppOrderUrl = (customPhone = DEFAULT_WHATSAPP_NUMBER) => {
    if (items.length === 0) {
      const defaultText = lang === 'ar'
        ? "مرحباً بوضة | buda! أود الاستفسار عن النكهات والطلب."
        : "Hello buda! I would like to inquire about your flavors and place an order.";
      return `https://wa.me/${customPhone}?text=${encodeURIComponent(defaultText)}`;
    }

    const lines = [];
    if (lang === 'ar') {
      lines.push("🍦 مرحباً بوضة | buda، أود تأكيد الطلب التالي:");
      lines.push("");
      items.forEach(item => {
        const sizeLabel = t(`flavors.${item.size === 'single' ? 'singleScoop' : item.size === 'double' ? 'doubleScoop' : 'pintTub'}`);
        lines.push(`• ${item.name[lang] || item.name.ar} (${sizeLabel}) × ${item.quantity} = ${item.price * item.quantity} ر.س`);
      });
      lines.push("");
      lines.push(`المجموع التقديري: ${totalAmount} ر.س`);
      lines.push("شكراً لكم!");
    } else {
      lines.push("🍦 Hello buda! I would like to place this order:");
      lines.push("");
      items.forEach(item => {
        const sizeLabel = t(`flavors.${item.size === 'single' ? 'singleScoop' : item.size === 'double' ? 'doubleScoop' : 'pintTub'}`);
        lines.push(`• ${item.name[lang] || item.name.en} (${sizeLabel}) × ${item.quantity} = ${item.price * item.quantity} SAR`);
      });
      lines.push("");
      lines.push(`Estimated Total: ${totalAmount} SAR`);
      lines.push("Thank you!");
    }

    return `https://wa.me/${customPhone}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        totalItems,
        totalAmount,
        lastAddedItem,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
