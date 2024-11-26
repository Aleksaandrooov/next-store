import { axiosInstance } from './instance';
import { favoritesItemType } from '../redux/favoritesSlise/slice';
import { FavoritesItem } from './dto/FavoritesGet';

export const fetchFavorites = async (): Promise<favoritesItemType> => {
  const { data } = await axiosInstance.get<favoritesItemType>('/favorites');

  return data;
};

export const addFavorites = async (productId: FavoritesItem): Promise<favoritesItemType> => {
  const { data } = await axiosInstance.post<favoritesItemType>('/favorites', productId);

  return data;
};
