
import React, { useState, useEffect } from 'react';
import type { TFunction, Product } from '../types';
import { getSellerProducts, addProduct } from '../services/mockApi';
import AddProductForm from './AddProductForm';
import ProductListTable from './ProductListTable';
import SalesChart from './SalesChart';
import { Icon } from './Icon';
import { ProductCategory } from '../types';


const SellerDashboard: React.FC<{ t: TFunction }> = ({ t }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            const sellerProducts = await getSellerProducts('seller-1'); // Mocked sellerId
            setProducts(sellerProducts);
            setIsLoading(false);
        };
        loadProducts();
    }, []);

    const handleAddProduct = async (formData: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'sellerRating'>) => {
        const newProductData = {
            ...formData,
            sellerId: 'seller-1', // Mocked
            sellerName: 'Farmer John',
            sellerRating: 5.0,
        };
        setIsAdding(true);
        const newProduct = await addProduct(newProductData);
        setProducts(prev => [newProduct, ...prev]);
        setIsAdding(false);
    };

    return (
        <div className="container mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 flex items-center"><Icon name="store" className="w-6 h-6 mr-2" />{t('my_products')}</h2>
                        <ProductListTable products={products} isLoading={isLoading} t={t} />
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 flex items-center"><Icon name="plus" className="w-6 h-6 mr-2"/>{t('add_new_product')}</h2>
                        <AddProductForm onAddProduct={handleAddProduct} isAdding={isAdding} t={t} />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4 flex items-center"><Icon name="chartBar" className="w-6 h-6 mr-2"/>{t('sales_overview')}</h2>
                        <SalesChart t={t} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
