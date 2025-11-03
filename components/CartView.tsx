
import React, { useState } from 'react';
import type { CartItem, TFunction } from '../types';
import { Icon } from './Icon';

interface CartViewProps {
  cart: CartItem[];
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  onClose: () => void;
  t: TFunction;
}

type CheckoutState = 'idle' | 'processing' | 'success' | 'failed';

const CartView: React.FC<CartViewProps> = ({ cart, updateCartQuantity, clearCart, onClose, t }) => {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('idle');
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KSH' }).format(value);
  
  const handleCheckout = () => {
    setCheckoutState('processing');
    setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        if (success) {
            setCheckoutState('success');
            clearCart();
        } else {
            setCheckoutState('failed');
        }
    }, 3000);
  };

  const handleClose = () => {
    if (checkoutState === 'processing') return;
    onClose();
  }

  const renderCheckoutContent = () => {
    switch (checkoutState) {
        case 'processing':
            return (
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-green mx-auto"></div>
                    <h3 className="text-xl font-bold mt-4">{t('checkout_processing')}</h3>
                    <p>Please check your phone to enter your M-Pesa PIN.</p>
                </div>
            );
        case 'success':
            return (
                <div className="text-center p-8">
                    <div className="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center">
                        <svg className="h-12 w-12 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mt-4 text-brand-green">{t('checkout_success')}</h3>
                    <p>You will receive an SMS confirmation shortly.</p>
                    <button onClick={handleClose} className="mt-6 bg-brand-green text-white py-2 px-6 rounded-lg">{t('close')}</button>
                </div>
            );
        case 'failed':
            return (
                <div className="text-center p-8">
                    <div className="mx-auto bg-red-100 rounded-full h-20 w-20 flex items-center justify-center">
                        <svg className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </div>
                    <h3 className="text-xl font-bold mt-4 text-red-600">{t('checkout_fail')}</h3>
                    <button onClick={() => setCheckoutState('idle')} className="mt-6 bg-brand-orange text-white py-2 px-6 rounded-lg">Try Again</button>
                </div>
            )
        default:
            return (
                <>
                {cart.length > 0 ? (
                    <div className="p-6 flex-grow overflow-y-auto">
                        {cart.map(item => (
                            <div key={item.product.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                                <div className="flex items-center">
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 rounded-md object-cover mr-4"/>
                                    <div>
                                        <p className="font-semibold">{item.product.name}</p>
                                        <p className="text-sm text-gray-500">{formatCurrency(item.product.price)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><Icon name="minus" className="w-4 h-4"/></button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><Icon name="plus" className="w-4 h-4"/></button>
                                    <button onClick={() => updateCartQuantity(item.product.id, 0)} className="p-1 text-red-500 hover:text-red-700"><Icon name="trash" className="w-5 h-5"/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <div className="p-6 text-center text-gray-500 flex-grow">{t('empty_cart')}</div>}

                {cart.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        <div className="flex justify-between items-center font-bold text-lg mb-4">
                            <span>{t('subtotal')}:</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <button onClick={handleCheckout} className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-3 rounded-lg shadow-lg transition-transform hover:scale-105">
                            {t('checkout')}
                        </button>
                    </div>
                )}
                </>
            );
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-brand-cream rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">{t('your_cart')}</h2>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-gray-200"><Icon name="x" className="w-6 h-6"/></button>
        </div>
        {renderCheckoutContent()}
      </div>
    </div>
  );
};

export default CartView;
