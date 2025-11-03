
import React from 'react';
import { ProductCategory } from '../types';
import type { TFunction } from '../types';
import { Icon } from './Icon';

interface FilterSidebarProps {
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (category: ProductCategory | 'all') => void;
  priceRange: number;
  setPriceRange: (price: number) => void;
  t: TFunction;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ selectedCategory, setSelectedCategory, priceRange, setPriceRange, t }) => {
  const categories = ['all', ...Object.values(ProductCategory)];
  const formatCurrency = (value: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KSH', minimumFractionDigits: 0 }).format(value);

  return (
    <aside className="md:w-1/4 lg:w-1/5">
      <div className="bg-white/60 p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4 flex items-center"><Icon name="filter" className="w-5 h-5 mr-2"/>{t('filters')}</h3>
        
        {/* Category Filter */}
        <div>
          <h4 className="font-semibold mb-2">{t('category')}</h4>
          <ul>
            {categories.map(cat => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat as ProductCategory | 'all')}
                  className={`w-full text-left p-2 rounded-md transition-colors ${
                    selectedCategory === cat
                      ? 'bg-brand-green text-white font-bold'
                      : 'hover:bg-brand-cream'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Price Range Filter */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">{t('price_range')}</h4>
          <input
            type="range"
            min="50"
            max="5000"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
          />
          <div className="text-center mt-2 font-medium text-brand-brown">
            Up to {formatCurrency(priceRange)}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
