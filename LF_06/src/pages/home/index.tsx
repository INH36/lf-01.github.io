import React from 'react';
import { useProductFilter } from './hooks/useProductFilter';
import { mockProducts } from './data/mockProducts';
import LazyComponent from '@/components/lazy-components';

const Home: React.FC = () => {
    const { filters, filteredProducts, handleFilterChange } = useProductFilter(mockProducts);


    return (
        <div className="h-full w-full bg-gray-50 p-6 flex flex-col items-center">
            <div className="w-4/5 flex-1 h-full flex flex-col justify-center items-center">
                <div className="flex w-full h-full gap-6 flex-1 min-h-0">
                    <div className="w-80 flex-shrink-0">
                        <LazyComponent importComponent={() => import('./components/category-filter')} componentProps={{ onFilterChange: handleFilterChange }} />
                    </div>
                    <div className="flex-1 h-full">
                        <LazyComponent importComponent={() => import('./components/shop-list')} componentProps={{ products: filteredProducts, sortOrder: filters.sortOrder }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;