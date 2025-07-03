import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Product } from '@/pages/home/type';


interface cartType{
    num: number
    product: Product,
    selectedSize: string
}

// 定义布局状态接口
interface shopState {
    isCartIconClick: boolean;
    selectSize: string[];
    priceRange: [number, number];
    sortOrder: 'asc' | 'desc';
    cart: cartType[]
}

// 初始状态
const initialState: shopState = {
    isCartIconClick: false,
    selectSize: [],
    priceRange: [0, 10000],
    sortOrder: 'asc',
    cart: []
};

// 创建布局切片
const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        // 切换购物车图标点击状态
        toggleCartIconClick: (state) => {
            state.isCartIconClick = !state.isCartIconClick;
        },
        // 切换尺寸选择状态
        toggleSizeSelect: (state, action: PayloadAction<string>) => {
            const { payload } = action;
            if (state.selectSize.includes(payload)) {
                state.selectSize = state.selectSize.filter(size => size !== payload);
            } else {
                state.selectSize.push(payload);
            }
        },
        // 切换价格范围
        togglePriceRange: (state, action: PayloadAction<[number, number]>) => {
            const { payload } = action;
            state.priceRange = payload;
        },
        // 切换排序方式
        toggleSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
            const { payload } = action;
            state.sortOrder = payload;
        },
        // 添加商品到购物车
        addToCart: (state, action: PayloadAction<{product: Product, quantity: number, selectedSize: string}>) => {
            const { payload } = action;
            const cart = state.cart;
            const index = cart.findIndex(item => 
                item.product.id === payload.product.id && 
                item.selectedSize === payload.selectedSize
            );
            if (index !== -1) {
                cart[index].num += payload.quantity;
            } else {
                cart.push({
                    num: payload.quantity,
                    product: payload.product,
                    selectedSize: payload.selectedSize
                });
            }
        },
        // 从购物车删除商品
        removeFromCart: (state, action: PayloadAction<{productId: string, selectedSize: string}>) => {
            const { payload } = action;
            state.cart = state.cart.filter(item => 
                !(item.product.id === payload.productId && item.selectedSize === payload.selectedSize)
            );
        },
        // 更新购物车商品数量
        updateCartQuantity: (state, action: PayloadAction<{productId: string, selectedSize: string, quantity: number}>) => {
            const { payload } = action;
            const index = state.cart.findIndex(item => 
                item.product.id === payload.productId && 
                item.selectedSize === payload.selectedSize
            );
            if (index !== -1) {
                if (payload.quantity <= 0) {
                    state.cart.splice(index, 1);
                } else {
                    state.cart[index].num = payload.quantity;
                }
            }
        },
        // 清空购物车
        clearCart: (state) => {
            state.cart = [];
        },
        // 重置所有筛选条件
        resetFilters: (state) => {
            state.selectSize = [];
            state.priceRange = [0, 10000];
            state.sortOrder = 'asc';
        }
    }
});

const shopPersistConfig = {
    key: shopSlice.name,
    storage,
}

const shopReducer = persistReducer(shopPersistConfig, shopSlice.reducer);

export const { 
    toggleCartIconClick,
    toggleSizeSelect,
    togglePriceRange,
    toggleSortOrder,
    resetFilters,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart
} = shopSlice.actions;
export default shopReducer;
