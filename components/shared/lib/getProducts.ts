import { prisma } from '@/prisma/prisma-client';

export type getProductsParams = {
  category?: string;
  memoryType?: string;
  modelType?: string;
  diagonalType?: string;
  sizeType?: string;
  procesorType?: string;
  memoryOpType?: string;
  colorType?: string;
  priceForm?: string;
  priceTo?: string;
  sort?: string;
  type?: 'asc' | 'desc';
};

export const getProducts = async (params: getProductsParams) => {
  params = await params;

  const categoryId = params.category || 1;
  const memoryId = params.memoryType?.split(',').map(Number);
  const modelId = params.modelType?.split(',').map(Number);
  const diagonalId = params.diagonalType?.split(',').map(Number);
  const sizeId = params.sizeType?.split(',').map(Number);
  const procesorId = params.procesorType?.split(',').map(Number);
  const memoryOpId = params.memoryOpType?.split(',').map(Number);
  const colorId = params.colorType?.split(',').map(Number);
  const sort = params.sort || 'rating';
  const type = params.type ? params.type : 'desc';

  const minPrice = Number(params.priceForm) || 390;
  const maxPrice = Number(params.priceTo) || 429990;

  const products = await prisma.product.findMany({
    where: {
      categoryId: Number(categoryId),
      memoryId: {
        in: memoryId,
      },
      modelId: {
        in: modelId,
      },
      diagonalId: {
        in: diagonalId,
      },
      sizeId: {
        in: sizeId,
      },
      procesorId: {
        in: procesorId,
      },
      memoryOpId: {
        in: memoryOpId,
      },
      colorId: {
        in: colorId,
      },
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    },
    orderBy: [
      { rating: sort == 'rating' ? type : undefined },
      { price: sort == 'rating' ? undefined : type },
    ],
    include: {
      Memory: true,
      Model: true,
      Diagonal: true,
      Color: true,
      MemoryOp: true,
      Size: true,
      Procesor: true,
      Img: true,
    },
  });

  return products;
};
