import { Api } from '@/app/services/apiClient';
import { CreateCartItemValues } from '@/app/services/dto/CartGet';
import {
  Cart,
  CartItem,
  Color,
  Diagonal,
  Img,
  Memory,
  MemoryOp,
  Model,
  Product,
  Size,
} from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type CartItemType = Cart & {
  items: CartItem & {
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

interface initialCartSlice {
  CartItems: CartItemType['items'][];
  status: 'loading' | 'success' | 'error';
  totalAmount: number;
  totalCount: number;
  headerPrice: number;
  totalItems: CartItemType['items'][];
}
interface paramsUpdate {
  id: number;
  count: number;
}

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const data: CartItemType = await Api.cart.fetchCart();

  return data;
});

export const updateItemCart = createAsyncThunk(
  'cart/updateItemCart',
  async function update(params: paramsUpdate) {
    const { id, count } = params;

    const data: CartItemType = await Api.cart.updateCart(id, count);

    return data;
  },
);

export const removeItemCart = createAsyncThunk('cart/removeItemCart', async (id: number) => {
  const data: CartItemType = await Api.cart.removeCart(id);

  return data;
});

export const removeAllItemCart = createAsyncThunk(
  'cart/removeAllItemCart',
  async (params: Set<number>) => {
    const id = Array.from(params);

    const data: CartItemType = await Api.cart.removeAllCart(id);

    return data;
  },
);

export const addItemCart = createAsyncThunk(
  'cart/addItemCart',
  async (params: CreateCartItemValues) => {
    const data: CartItemType = await Api.cart.addCart(params);

    return data;
  },
);

const initialState: initialCartSlice = {
  CartItems: [],
  status: 'loading',
  totalCount: 0,
  totalAmount: 0,
  headerPrice: 0,
  totalItems: [],
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setChangeItems(state, action) {
      if (action.payload.length) {
        state.totalAmount = action.payload.reduce((sum: number, cur: CartItemType['items']) => {
          return sum + cur.productItem.price * cur.countItem;
        }, 0);
        state.totalItems = action.payload;
        state.totalCount = action.payload.reduce((sum: number, cur: CartItemType['items']) => {
          return sum + cur.countItem;
        }, 0);
      } else {
        state.totalAmount = 0;
        state.totalCount = 0;
        state.totalItems = [];
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        const items = Array.isArray(action.payload.items) ? action.payload.items : [];
        state.CartItems = items;
        state.status = 'success';
        state.totalAmount = action.payload.totalAmount;
        state.headerPrice = action.payload.totalAmount;
      })
      .addCase(updateItemCart.fulfilled, (state, action) => {
        const items = Array.isArray(action.payload.items) ? action.payload.items : [];
        state.CartItems = items;
        state.headerPrice = action.payload.totalAmount;
      })
      .addCase(removeItemCart.fulfilled, (state, action) => {
        const items = Array.isArray(action.payload.items) ? action.payload.items : [];
        state.CartItems = items;
        state.headerPrice = action.payload.totalAmount;
      })
      .addCase(addItemCart.fulfilled, (state, action) => {
        const items = Array.isArray(action.payload.items) ? action.payload.items : [];
        state.CartItems = items;
        state.totalAmount = action.payload.totalAmount;
        state.headerPrice = action.payload.totalAmount;
      })
      .addCase(removeAllItemCart.fulfilled, (state, action) => {
        const items = Array.isArray(action.payload.items) ? action.payload.items : [];
        state.CartItems = items;
        state.headerPrice = action.payload.totalAmount;
      });
  },
});

export const { setChangeItems } = CartSlice.actions;

export default CartSlice.reducer;
