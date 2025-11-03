
import React, { useState } from 'react';
import type { Product, TFunction } from '../types';
import { Icon } from './Icon';

interface ProductListTableProps {
    products: Product[];
    isLoading: boolean;
    t: TFunction;
}

const ProductListTable: React.FC<ProductListTableProps> = ({ products, isLoading, t }) => {
    const formatCurrency = (value: number) => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KSH', minimumFractionDigits: 0 }).format(value);

    // Mock state for on-sale/off-sale toggle
    const [saleStatus, setSaleStatus] = useState<Record<string, boolean>>(
        products.reduce((acc, p) => ({ ...acc, [p.id]: true }), {})
    );

    const toggleStatus = (id: string) => {
        setSaleStatus(prev => ({...prev, [id]: !prev[id]}));
    };

    if (isLoading) {
        return <div className="text-center p-4">{t('checkout_processing')}</div>
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('thumbnail')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('price')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover"/>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(product.price)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => toggleStatus(product.id)} className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${saleStatus[product.id] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {saleStatus[product.id] ? t('on_sale') : t('off_sale')}
                                </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <a href="#" className="text-brand-green hover:text-brand-green-light">{t('edit')}</a>
                                <a href="#" className="text-red-600 hover:text-red-800">{t('delete')}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductListTable;
