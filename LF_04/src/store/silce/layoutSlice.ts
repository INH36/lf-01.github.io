import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 定义布局状态接口
interface LayoutState {
    siderCollapsed: boolean;   // 侧边栏折叠状态
    themeMode: 'light' | 'dark'; // 当前主题模式
    language: 'zh' | 'en';      // 当前语言
}

// 初始状态
const initialState: LayoutState = {
    siderCollapsed: false,
    themeMode: 'light',
    language: 'zh',  // 默认中文
};

// 创建布局切片
const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        // 切换侧边栏状态
        toggleSider: (state) => {
            state.siderCollapsed = !state.siderCollapsed;
        },
        // 设置主题模式
        setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.themeMode = action.payload;
        },
        // 设置语言
        setLanguage: (state, action: PayloadAction<'zh' | 'en'>) => {
            state.language = action.payload;
        },
    }
});

export const { toggleSider, setThemeMode, setLanguage } = layoutSlice.actions;
export default layoutSlice.reducer;
