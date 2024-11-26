import { axiosInstance } from './instance';
import { CartItemType } from '../redux/CartSlice/slice';
import { CreateCartItemValues } from './dto/CartGet';

export const fetchCart = async (): Promise<CartItemType> => {
  const { data } = await axiosInstance.get<CartItemType>('/cart');

  return data;
};

export const updateCart = async (id: number, countItem: number): Promise<CartItemType> => {
  return (await axiosInstance.patch<CartItemType>('/cart/' + id, { countItem })).data;
};

export const removeCart = async (id: number): Promise<CartItemType> => {
  return (await axiosInstance.delete<CartItemType>('/cart/' + id)).data;
};

export const addCart = async (productId: CreateCartItemValues): Promise<CartItemType> => {
  return (await axiosInstance.post<CartItemType>('/cart', productId)).data;
};

export const removeAllCart = async (id: number[]): Promise<CartItemType> => {
  return (await axiosInstance.put<CartItemType>('/cart', { id })).data;
};
