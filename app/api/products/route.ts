import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const local = req.nextUrl.searchParams.get('local')?.split(',').map(Number) || [];

  // local = [13,27,51,1,18]

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: local,
      },
    },

    include: {
      Memory: true,
      MemoryOp: true,
      Size: true,
      Color: true,
      Diagonal: true,
      Img: true,
    },
  });

  const sortedProducts = local
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  return NextResponse.json(sortedProducts);
}
