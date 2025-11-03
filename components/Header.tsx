
import React from 'react';
import type { User, Language, TFunction } from '../types';
import { UserRole } from '../types';
import { Icon } from './Icon';

interface HeaderProps {
  user: User;
  cartCount: number;
  onToggleRole: () => void;
  onToggleLanguage: () => void;
  language: Language;
  t: TFunction;
}

const Header: React.FC<HeaderProps> = ({ user, cartCount, onToggleRole, onToggleLanguage, language, t }) => {
  return (
    <header className="bg-brand-green shadow-md sticky top-0 z-10 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Icon name="leaf" className="h-8 w-8 text-brand-orange-light"/>
          <h1 className="text-2xl font-bold tracking-tight">Kienyeji Link</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right">
            <p className="text-sm">{t('welcome')}, <span className="font-semibold">{user.name}</span></p>
            <p className="text-xs text-green-200">{user.role === UserRole.Buyer ? t('buyer_dashboard') : t('seller_dashboard')}</p>
          </div>

          <button
            onClick={onToggleLanguage}
            className="flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-brand-orange-light"
            aria-label="Toggle language"
          >
            <span className="font-bold text-sm">{language === 'en' ? 'SW' : 'EN'}</span>
          </button>
          
          <button
            onClick={onToggleRole}
            className="flex items-center space-x-2 bg-brand-orange hover:bg-brand-orange-light text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors"
            title={user.role === UserRole.Buyer ? t('view_seller_dashboard') : t('view_buyer_dashboard')}
          >
            <Icon name={user.role === UserRole.Buyer ? 'store' : 'shoppingBag'} className="h-5 w-5"/>
            <span className="hidden sm:inline">{user.role === UserRole.Buyer ? 'Sell' : 'Buy'}</span>
          </button>

          {user.role === UserRole.Buyer && (
            <div className="relative">
              <Icon name="shoppingCart" className="h-7 w-7"/>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
