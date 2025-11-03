
import React, { useState, useCallback } from 'react';
import type { User, Product, CartItem, Language } from './types';
import { UserRole } from './types';
import Header from './components/Header';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';
import { translations } from './lib/i18n';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'user-1',
    name: 'Jane Doe',
    role: UserRole.Buyer,
  });
  const [language, setLanguage] = useState<Language>('en');
  const [cart, setCart] = useState<CartItem[]>([]);

  const t = useCallback((key: keyof typeof translations.en) => {
    return translations[language][key] || key;
  }, [language]);

  const toggleRole = () => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      role: prevUser.role === UserRole.Buyer ? UserRole.Seller : UserRole.Buyer,
      name: prevUser.role === UserRole.Buyer ? 'Farmer John' : 'Jane Doe'
    }));
  };
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'sw' : 'en');
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.product.id !== productId);
      }
      return prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  }

  return (
    <div className="bg-brand-cream min-h-screen font-sans text-brand-brown">
      <Header 
        user={currentUser} 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onToggleRole={toggleRole}
        onToggleLanguage={toggleLanguage}
        language={language}
        t={t}
      />
      <main className="p-4 md:p-8">
        {currentUser.role === UserRole.Buyer ? (
          <BuyerDashboard 
            addToCart={addToCart} 
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            clearCart={clearCart}
            t={t} 
          />
        ) : (
          <SellerDashboard t={t} />
        )}
      </main>
      <footer className="text-center p-4 text-sm text-brand-brown/70 border-t border-brand-brown/10">
        <p>&copy; {new Date().getFullYear()} Kienyeji Link. {t('footer_empowering')}</p>
        <p className="font-bold mt-1">{t('footer_pitch')}</p>
      </footer>
    </div>
  );
};

export default App;
