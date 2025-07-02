import React, { useState, useMemo } from 'react';
import { Card, Tag, Space } from 'antd';
import CategoryFilter from './components/category-filter';
import ShopList from './components/shop-list';

interface Product {
    id: number;
    name: string;
    price: number;
    size: string;
    image: string;
    tags: string[];
}

interface FilterState {
    selectedSizes: string[];
    priceRange: [number, number];
    sortOrder: 'asc' | 'desc' | null;
}

// 模拟商品数据
const mockProducts: Product[] = [
    { id: 1, name: '时尚T恤', price: 299, size: 'L', image: '/api/placeholder/200/200', tags: ['热销', '新品'] },
    { id: 2, name: '休闲牛仔裤', price: 599, size: 'M', image: '/api/placeholder/200/200', tags: ['经典'] },
    { id: 3, name: '运动鞋', price: 899, size: '43', image: '/api/placeholder/200/200', tags: ['运动', '舒适'] },
    { id: 4, name: '商务衬衫', price: 399, size: 'XL', image: '/api/placeholder/200/200', tags: ['商务', '正装'] },
    { id: 5, name: '连帽卫衣', price: 459, size: 'L', image: '/api/placeholder/200/200', tags: ['休闲', '保暖'] },
    { id: 6, name: '皮质手包', price: 1299, size: 'S', image: '/api/placeholder/200/200', tags: ['奢华', '皮质'] },
    { id: 7, name: '棒球帽', price: 159, size: 'XL', image: '/api/placeholder/200/200', tags: ['潮流', '防晒'] },
    { id: 8, name: '羊毛围巾', price: 299, size: 'M', image: '/api/placeholder/200/200', tags: ['保暖', '羊毛'] },
    { id: 9, name: '智能手表', price: 2999, size: '42', image: '/api/placeholder/200/200', tags: ['科技', '智能'] },
    { id: 10, name: '真皮钱包', price: 699, size: 'XS', image: '/api/placeholder/200/200', tags: ['真皮', '实用'] },
];

const Home: React.FC = () => {
    const [filters, setFilters] = useState<FilterState>({
        selectedSizes: [],
        priceRange: [0, 10000],
        sortOrder: null
    });

    // 根据筛选条件过滤和排序商品
    const filteredProducts = useMemo(() => {
        const result = mockProducts.filter(product => {
            const sizeMatch = filters.selectedSizes.length === 0 || filters.selectedSizes.includes(product.size);
            const priceInRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
            return sizeMatch && priceInRange;
        });

        // 价格排序
        if (filters.sortOrder === 'asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (filters.sortOrder === 'desc') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [filters]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    return (
        <div className='w-full h-full flex justify-center items-center py-6 bg-gray-50'>
            <div className='flex gap-6 w-4/5 h-full'>
                <div>
                    <CategoryFilter onFilterChange={handleFilterChange} />
                </div>

                <ShopList products={filteredProducts} />
            </div>
        </div>
    );
};

export default Home;