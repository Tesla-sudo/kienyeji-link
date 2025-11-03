
import type { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

// Empowering mama mboga to market queen! This mock API simulates our backend.
const products: Product[] = [...MOCK_PRODUCTS];

const simulateDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getProducts = async (): Promise<Product[]> => {
  await simulateDelay(500);
  return products;
};

export const addProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  await simulateDelay(700);
  const newProduct: Product = {
    ...productData,
    id: `prod-${Date.now()}`,
  };
  products.unshift(newProduct);
  return newProduct;
};

export const getSellerProducts = async (sellerId: string): Promise<Product[]> => {
    await simulateDelay(500);
    // In a real app, we'd filter by sellerId. Here, we just return a subset.
    return products.filter(p => p.id !== 'prod-7');
}
