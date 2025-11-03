import React, { useState } from 'react';
import { UserRole } from '../types';
import type { TFunction } from '../types';
import { Icon } from './Icon';

interface AuthProps {
  onLogin: (name: string, role: UserRole) => void;
  t: TFunction;
}

const Auth: React.FC<AuthProps> = ({ onLogin, t }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Buyer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim(), role);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
            <div className="flex justify-center items-center space-x-2 mb-8">
                <Icon name="leaf" className="h-12 w-12 text-brand-orange-light"/>
                <h1 className="text-4xl font-bold tracking-tight text-brand-green">Kienyeji Link</h1>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-center text-brand-brown mb-6">{t('login_signup')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('your_name')}</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-brand-orange focus:border-brand-orange"
                            placeholder="e.g. Jane Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('choose_role')}</label>
                        <div className="mt-2 grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setRole(UserRole.Buyer)}
                                className={`py-3 px-4 rounded-md text-sm font-medium flex flex-col items-center justify-center border-2 transition-all ${role === UserRole.Buyer ? 'bg-brand-green-light border-brand-green text-white ring-2 ring-offset-2 ring-brand-green' : 'bg-white hover:bg-gray-50 border-gray-300'}`}
                            >
                                <Icon name="shoppingBag" className="w-6 h-6 mb-1"/>
                                I want to Buy
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole(UserRole.Seller)}
                                className={`py-3 px-4 rounded-md text-sm font-medium flex flex-col items-center justify-center border-2 transition-all ${role === UserRole.Seller ? 'bg-brand-green-light border-brand-green text-white ring-2 ring-offset-2 ring-brand-green' : 'bg-white hover:bg-gray-50 border-gray-300'}`}
                            >
                                <Icon name="store" className="w-6 h-6 mb-1"/>
                                I want to Sell
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!name.trim()}
                    >
                        {t('login')}
                    </button>
                </form>
            </div>
             <footer className="text-center p-4 mt-8 text-sm text-brand-brown/70">
                {/* FIX: Corrected typo 'newgetFullYear' to 'new Date().getFullYear()' */}
                <p>&copy; {new Date().getFullYear()} Kienyeji Link. {t('footer_empowering')}</p>
                <p className="font-bold mt-1">{t('footer_pitch')}</p>
            </footer>
        </div>
    </div>
  );
};

export default Auth;