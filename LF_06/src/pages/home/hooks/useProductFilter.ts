import { useState, useMemo } from 'react';

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

/**
 * 商品筛选逻辑 Hook
 * @param products 商品数据
 * @returns 筛选状态和筛选后的商品
 */
export const useProductFilter = (products: Product[]) => {
    const [filters, setFilters] = useState<FilterState>({
        selectedSizes: [],
        priceRange: [0, 10000],
        sortOrder: null
    });

    // 根据筛选条件过滤和排序商品
    const filteredProducts = useMemo(() => {
        const result = products.filter(product => {
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
    }, [products, filters]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    return {
        filters,
        filteredProducts,
        handleFilterChange
    };
};

export type { Product, FilterState };