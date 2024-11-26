import { Category } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constans';

export const getFilter = async (filter: string): Promise<Category[]> => {
  return (await axiosInstance.get<Category[]>(ApiRoutes.FILTER, { params: { filter } })).data;
};
