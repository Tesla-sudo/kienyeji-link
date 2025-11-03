
import React from 'react';
import type { Product, TFunction } from '../types';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, quantity: number) => void;
  t: TFunction;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, t }) => {
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KSH' }).format(value);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-brand-green bg-green-100 px-2 py-1 rounded-full self-start">{product.category}</span>
        <h3 className="text-lg font-bold mt-2 text-brand-brown">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1 flex-grow">{product.description.substring(0, 70)}...</p>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            By <span className="font-semibold text-brand-green">{product.sellerName}</span> ({product.sellerRating} ★)
          </p>
          <p className="text-sm text-gray-500">{product.location}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <p className="text-xl font-bold text-brand-orange">{formatCurrency(product.price)}</p>
        <button 
          onClick={() => addToCart(product, 1)}
          className="bg-brand-green hover:bg-brand-green-light text-white font-bold py-2 px-4 rounded-lg transition-colors shadow"
        >
          {t('add_to_cart')}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
