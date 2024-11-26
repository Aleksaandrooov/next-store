import { axiosInstance } from './instance';
import { ProductsTabl } from '@/components/shared/productCart';

export const localProduct = async (local: string): Promise<ProductsTabl[]> => {
  return (
    await axiosInstance.get<ProductsTabl[]>('/products', {
      params: { local },
    })
  ).data;
};
