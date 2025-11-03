
import type { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    welcome: 'Welcome',
    buyer_dashboard: 'Buyer Dashboard',
    seller_dashboard: 'Seller Dashboard',
    view_seller_dashboard: 'View Seller Dashboard',
    view_buyer_dashboard: 'View Buyer Dashboard',
    cart: 'Cart',
    
    // Buyer Dashboard
    all_products: 'All Products',
    search_products: 'Search for products...',
    filters: 'Filters',
    category: 'Category',
    price_range: 'Price Range',
    add_to_cart: 'Add to Cart',
    
    // Cart
    your_cart: 'Your Cart',
    empty_cart: 'Your cart is empty. Start shopping!',
    subtotal: 'Subtotal',
    checkout: 'Checkout with M-Pesa',
    checkout_processing: 'Processing M-Pesa Payment...',
    checkout_success: 'Payment successful! Your order is confirmed.',
    checkout_fail: 'Payment failed. Please try again.',
    close: 'Close',
    
    // Seller Dashboard
    my_products: 'My Products',
    add_new_product: 'Add New Product',
    sales_overview: 'Sales Overview',
    product_name: 'Product Name',
    product_description: 'Product Description',
    price_ksh: 'Price (KSh)',
    quantity: 'Quantity in Stock',
    location: 'Location (e.g., County)',
    tags: 'Tags (comma-separated)',
    product_images: 'Product Images (up to 5)',
    submit_product: 'Submit Product',
    // ... other seller keys
    thumbnail: 'Thumbnail',
    name: 'Name',
    price: 'Price',
    stock: 'Stock',
    status: 'Status',
    actions: 'Actions',
    on_sale: 'On Sale',
    off_sale: 'Off Sale',
    edit: 'Edit',
    delete: 'Delete',

    // Auth
    login_signup: 'Login or Sign Up',
    your_name: 'Your Name',
    choose_role: 'Choose your role',
    login: 'Enter Kienyeji Link',
    logout: 'Logout',


    // Footer
    footer_empowering: 'Empowering local farmers, one sale at a time.',
    footer_pitch: 'Kienyeji Link: Farm-fresh sales in 3 taps – 10x farmer income, 0 middlemen.'
  },
  sw: {
    // Header
    welcome: 'Karibu',
    buyer_dashboard: 'Dashibodi ya Mnunuzi',
    seller_dashboard: 'Dashibodi ya Muuzaji',
    view_seller_dashboard: 'Tazama Dashibodi ya Muuzaji',
    view_buyer_dashboard: 'Tazama Dashibodi ya Mnunuzi',
    cart: 'Kikapu',

    // Buyer Dashboard
    all_products: 'Bidhaa Zote',
    search_products: 'Tafuta bidhaa...',
    filters: 'Vichujio',
    category: 'Aina',
    price_range: 'Kiwango cha Bei',
    add_to_cart: 'Weka Kwenye Kikapu',

    // Cart
    your_cart: 'Kikapu Chako',
    empty_cart: 'Kikapu chako ni tupu. Anza kununua!',
    subtotal: 'Jumla ndogo',
    checkout: 'Lipa na M-Pesa',
    checkout_processing: 'Inashughulikia malipo ya M-Pesa...',
    checkout_success: 'Malipo yamefanikiwa! Agizo lako limethibitishwa.',
    checkout_fail: 'Malipo yameshindikana. Tafadhali jaribu tena.',
    close: 'Funga',

    // Seller Dashboard
    my_products: 'Bidhaa Zangu',
    add_new_product: 'Ongeza Bidhaa Mpya',
    sales_overview: 'Muhtasari wa Mauzo',
    product_name: 'Jina la Bidhaa',
    product_description: 'Maelezo ya Bidhaa',
    price_ksh: 'Bei (KSh)',
    quantity: 'Idadi iliyopo',
    location: 'Mahali (k.m., Kaunti)',
    tags: 'Lebo (tenganisha kwa koma)',
    product_images: 'Picha za Bidhaa (hadi 5)',
    submit_product: 'Wasilisha Bidhaa',
    // ... other seller keys
    thumbnail: 'Picha',
    name: 'Jina',
    price: 'Bei',
    stock: 'Akiba',
    status: 'Hali',
    actions: 'Vitendo',
    on_sale: 'Inauzwa',
    off_sale: 'Haiuzwi',
    edit: 'Hariri',
    delete: 'Futa',

    // Auth
    login_signup: 'Ingia au Jisajili',
    your_name: 'Jina Lako',
    choose_role: 'Chagua jukumu lako',
    login: 'Ingia Kienyeji Link',
    logout: 'Toka',

    // Footer
    footer_empowering: 'Tunawawezesha wakulima wa ndani, mauzo moja kwa wakati mmoja.',
    footer_pitch: 'Kienyeji Link: Mauzo ya shambani kwa hatua 3 – 10x mapato ya mkulima, 0 madalali.'
  },
};
