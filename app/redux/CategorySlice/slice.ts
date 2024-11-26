'use client';

import { createSlice } from '@reduxjs/toolkit';

interface initialStateInterface {
  idItem: number;
}

const initialState: initialStateInterface = {
  idItem: 1,
};

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.idItem = action.payload;
    },
  },
});

export const { setCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
