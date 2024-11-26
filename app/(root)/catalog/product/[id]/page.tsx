import { PageProps } from '@/.next/types/app/layout';
import { Container } from '@/components/shared/container';
import { Product } from '@/components/shared/Product.tsx/Product';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      Memory: true,
      Model: true,
      Diagonal: true,
      Color: true,
      MemoryOp: true,
      Size: true,
      Img: true,
      Procesor: true,
    },
  });
  const andProducts = await prisma.product.findMany({
    where: {
      modelId: product?.modelId,
      diagonalId: product?.diagonalId,
    },
    include: {
      Memory: true,
      Model: true,
      Diagonal: true,
      Color: true,
      MemoryOp: true,
      Size: true,
      Img: true,
      Procesor: true,
    },
  });

  if (!product) return notFound();

  return (
    <Container className="flex flex-col my-10">
      <Product product={product} andProducts={andProducts} />
    </Container>
  );
}
