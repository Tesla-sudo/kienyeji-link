
import React, { useState, useEffect, useMemo, RefObject } from 'react';
import type { Product, CartItem, TFunction } from '../types';
import { ProductCategory } from '../types';
import { getProducts } from '../services/mockApi';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import CartView from './CartView';

interface BuyerDashboardProps {
  addToCart: (product: Product, quantity: number) => void;
  cart: CartItem[];
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  t: TFunction;
  cartRef: RefObject<HTMLElement>;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ addToCart, cart, updateCartQuantity, clearCart, t, cartRef }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState<number>(5000);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
      .filter(p => p.price <= priceRange)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [products, selectedCategory, priceRange, searchTerm]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          t={t}
        />
        <main className="w-full md:w-1/2">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder={t('search_products')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border-2 border-brand-brown/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">{t('all_products')}</h2>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/50 rounded-lg shadow-md p-4 animate-pulse">
                  <div className="w-full h-40 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} t={t} />
              ))}
            </div>
          )}
          {filteredProducts.length === 0 && !loading && <p className="text-center py-8 text-gray-500">{t('empty_cart').replace('Your cart is empty.', 'No products found.')}</p>}
        </main>
        <aside className="w-full md:w-1/4" ref={cartRef}>
            <div className="sticky top-24">
                <CartView cart={cart} updateCartQuantity={updateCartQuantity} clearCart={clearCart} t={t} />
            </div>
        </aside>
      </div>
    </div>
  );
};

export default BuyerDashboard;
