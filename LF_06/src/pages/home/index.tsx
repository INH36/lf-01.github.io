import React, { useCallback } from 'react';
import LazyComponent from '@/components/lazy-components';
import { Drawer } from 'antd';
import ShopCarts from './components/shop-cart';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleCartIconClick } from '@/store/silce/shopSlice';


const Home: React.FC = () => {
    const shop = useSelector((state: RootState) => state.shop)
    const dispatch = useDispatch();
    const importCategoryFilter = useCallback(() => import('./components/category-filter'), []);
    const importShopList = useCallback(() => import('./components/shop-list'), []);

    return (
        <div className="h-full w-full bg-gray-50 p-6 flex flex-col items-center">
            <div className="w-4/5 flex-1 h-full flex flex-col justify-center items-center">
                <div className="flex w-full h-full gap-6 flex-1 min-h-0">
                    <div className="w-80 flex-shrink-0">
                        <LazyComponent importComponent={importCategoryFilter} />
                    </div>
                    <div className="flex-1 h-full">
                        <LazyComponent importComponent={importShopList} />
                    </div>
                </div>
            </div>
            <Drawer title="购物车" closable={{ 'aria-label': 'Close Button' }} open={shop.isCartIconClick} onClose={() => dispatch(toggleCartIconClick())}>
                <ShopCarts />
            </Drawer>
        </div>
    );
};

export default Home;