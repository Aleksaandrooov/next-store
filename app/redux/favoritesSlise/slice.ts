import { Api } from '@/app/services/apiClient';
import { sort } from '@/components/shared/lib/sortType';
import {
  Color,
  Diagonal,
  Favorites,
  FavoritesItem,
  Img,
  Memory,
  MemoryOp,
  Model,
  Product,
  Size,
} from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export type favoritesItemType = Favorites & {
  items: FavoritesItem & {
    productItem: Product & {
      Memory: Memory;
      MemoryOp: MemoryOp;
      Size: Size;
      Color: Color;
      Diagonal: Diagonal;
      Model: Model;
      Img: Img;
    };
  };
};

interface initialFavoritesSlice {
  items: favoritesItemType['items'][];
  count: number;
  sortItem: sort;
}

const initialState: initialFavoritesSlice = {
  items: [],
  sortItem: { id: 0, name: 'Популярные', type: 'rating', acc: 'desc' },
  count: 0,
};

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
  const data = await Api.favorites.fetchFavorites();

  return data;
});

export const addFavorites = createAsyncThunk(
  'favorites/addFavorites',
  async (productId: number) => {
    const data = await Api.favorites.addFavorites({ productId });

    return data;
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setSort(state, action) {
      state.sortItem = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        const items = Array.isArray(action.payload.items) ? action.payload.items : [];
        state.items = items;
        state.count = items.length;
      })
      .addCase(addFavorites.fulfilled, (state, action) => {
        const items = Array.isArray(action.payload.items) ? action.payload.items : [];
        state.items = items;
        state.count = items.length;
      })
      .addCase(addFavorites.rejected, () => {
        toast.error('Для добавление товара в избранные требуется авторизация', {
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
        });
      });
  },
});

export const { setSort } = favoritesSlice.actions;

export default favoritesSlice.reducer;
