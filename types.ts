
export enum UserRole {
  Buyer = 'buyer',
  Seller = 'seller',
  Admin = 'admin',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export enum ProductCategory {
  Food = 'Food Products',
  Accessories = 'Accessories',
  Jewellery = 'Jewellery',
  Poultry = 'Poultry',
  Livestock = 'Livestock',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: ProductCategory;
  imageUrl: string;
  location: string;
  tags: string[];
  sellerId: string;
  sellerName: string;
  sellerRating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Language = 'en' | 'sw';

export type TranslationKey = keyof (typeof import('./lib/i18n').translations.en);

export type TFunction = (key: TranslationKey) => string;
