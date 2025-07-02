import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// 定义布局状态接口
interface shopState {
    isCartIconClick: boolean;
}

// 初始状态
const initialState: shopState = {
    isCartIconClick: false,
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
    }
});

const shopPersistConfig = {
    key: shopSlice.name,
    storage,
}

const shopReducer = persistReducer(shopPersistConfig, shopSlice.reducer);

export const { toggleCartIconClick } = shopSlice.actions;
export default shopReducer;
