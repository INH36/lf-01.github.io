import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './silce/layoutSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    layout: layoutReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;