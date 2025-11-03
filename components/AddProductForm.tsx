
import React, { useState } from 'react';
import type { TFunction, Product } from '../types';
import { ProductCategory } from '../types';
import { Icon } from './Icon';

interface AddProductFormProps {
    onAddProduct: (formData: Omit<Product, 'id' | 'sellerId' | 'sellerName' | 'sellerRating'>) => void;
    isAdding: boolean;
    t: TFunction;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct, isAdding, t }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState<ProductCategory>(ProductCategory.Food);
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).slice(0, 5);
            setImages(files);

            // FIX: Explicitly cast file to Blob to resolve TypeScript type inference issue.
            const previews = files.map(file => URL.createObjectURL(file as Blob));
            setImagePreviews(previews);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we use a placeholder image URL as we don't have a backend to upload to.
        const mockImageUrl = images.length > 0 ? imagePreviews[0] : 'https://picsum.photos/seed/newproduct/400/300';
        
        onAddProduct({
            name,
            description,
            price: Number(price),
            quantity: Number(quantity),
            category,
            imageUrl: mockImageUrl,
            location,
            tags: tags.split(',').map(tag => tag.trim()),
        });
        
        // Reset form
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setCategory(ProductCategory.Food);
        setLocation('');
        setTags('');
        setImages([]);
        setImagePreviews([]);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">{t('product_name')}</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium">{t('category')}</label>
                <select value={category} onChange={e => setCategory(e.target.value as ProductCategory)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    {Object.values(ProductCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">{t('product_description')}</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">{t('price_ksh')}</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium">{t('quantity')}</label>
                    <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium">{t('location')}</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
                <label className="block text-sm font-medium">{t('tags')}</label>
                <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
             <div>
                <label className="block text-sm font-medium">{t('product_images')}</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <Icon name="upload" className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-green hover:text-brand-green-light">
                                <span>Upload files</span>
                                <input id="file-upload" name="file-upload" type="file" multiple accept="image/*" className="sr-only" onChange={handleImageChange} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                </div>
                {imagePreviews.length > 0 && (
                    <div className="mt-2 grid grid-cols-5 gap-2">
                        {imagePreviews.map((src, i) => <img key={i} src={src} alt="Preview" className="w-full h-16 object-cover rounded"/>)}
                    </div>
                )}
            </div>
            <button type="submit" disabled={isAdding} className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400">
                {isAdding ? 'Submitting...' : t('submit_product')}
            </button>
        </form>
    );
};

export default AddProductForm;