import { axiosInstance } from './instance';
import { ApiRoutes } from './constans';
import { ProductsTabl } from '@/components/shared/productCart';

export const search = async (query: string): Promise<ProductsTabl[]> => {
  return (
    await axiosInstance.get<ProductsTabl[]>(ApiRoutes.SEARCH_PRODUCTS, {
      params: { query },
    })
  ).data;
};
