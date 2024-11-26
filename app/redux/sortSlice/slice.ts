import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortItem: { id: 0, name: 'Популярные', type: 'rating', acc: 'desc' },
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort(state, action) {
      state.sortItem = action.payload;
    },
  },
});

export default sortSlice.reducer;

export const { setSort } = sortSlice.actions;
