'use client';

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import category from './CategorySlice/slice';
import cart from './CartSlice/slice';
import favorites from './favoritesSlise/slice';
import sort from './sortSlice/slice';

export const store = configureStore({
  reducer: {
    category,
    cart,
    favorites,
    sort,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
